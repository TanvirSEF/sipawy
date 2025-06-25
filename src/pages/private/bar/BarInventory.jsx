import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalenderIcon } from "@/assets/icons/icons";
import { ClockIcon, EditIcon, Pencil } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import useAxios from "@/Components/Hooks/Api/UseAxios";
import toast from "react-hot-toast";
import { PiSpinnerBold } from "react-icons/pi";
import useFetchData from "@/Components/Hooks/Api/UseFetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const BarInventory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      productId: "",
      date: null,
      hours: "7",
      minutes: "00",
      ampm: "AM",
      assignedBy: "",
      category: "",
      shelfNumber: "",
      price: "",
      sellingPrice: "",
      image: null,
      quantity: "",
      description: "",
      drink_type: "",
    },
  });

  const Axios = useAxios();
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const { data } = useFetchData("/api/dashboard/bar/product/index", token);
  const { data: category } = useFetchData(
    "/api/dashboard/product/category",
    token
  );

  const [imagePreview, setImagePreview] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeFlqTATP975Z-xQ9rZwjE1K5yjliF6gsXHQ&s"
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        setValue("image", file);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    maxFiles: 1,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const hours = parseInt(data.hours, 10);
      const minutes = parseInt(data.minutes, 10);
      const finalHours =
        data.ampm === "PM" && hours < 12
          ? hours + 12
          : data.ampm === "AM" && hours === 12
          ? 0
          : hours;
      const formattedTime = `${String(finalHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:00`;

      const dateString = data.date ? format(data.date, "yyyy-MM-dd") : "";

      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("category_id", data.category);
      formData.append("assigned_by", data.assignedBy);
      formData.append("name", data.name);
      formData.append("product_id", data.productId);
      formData.append("price", data.price);
      formData.append("selling_price", data.sellingPrice);
      formData.append("shelf_number", data.shelfNumber);
      formData.append("date", dateString);
      formData.append("time", formattedTime);
      formData.append("quantity", data.quantity);
      formData.append("description", data.description);
      formData.append("drink_type", data.drink_type);

      const response = await Axios.post(
        "/api/dashboard/bar/product/store",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      toast.success("Product added successfully");
      reset();

      queryClient.invalidateQueries({
        queryKey: ["/api/dashboard/bar/product/index"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleproductadd = (data, event) => {
    event.preventDefault();
    mutation.mutate(data);
  };

  const { data: stafflist } = useFetchData(
    "/api/dashboard/bar/staff/index",
    token
  );

  const handleqrcode = () => {};

  return (
    <section className="bg-[#F8F8FF] pt-12">
      <section className="px-6 sm:px-10 overflow-hidden">
        <div className="sm:flex justify-between items-center text-center">
          <h2 className="text-xl font-semibold mb-6">Add product</h2>
          <Link to="/bar-dashboard/addtable">
            <h2 className="text-xl font-semibold mb-6 border-2 border-[#DBA514] p-2 rounded-[6px] cursor-pointer">
              + Add table
            </h2>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(handleproductadd)}
          className="px-4 sm:px-6 py-10 space-y-8 bg-[#FAFAFA] border border-[#DBA514] rounded-[6px]"
        >
          <div className="mx-auto w-fit mb-12 relative">
            <div {...getRootProps()} className="relative cursor-pointer group">
              <input {...getInputProps()} />
              <div className="size-[220px] rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 relative">
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Pencil className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Floating Edit Icon */}
            <div className="absolute right-2 bottom-2 bg-[#D9D9D9] size-12 rounded-full flex justify-center items-center pointer-events-none">
              <EditIcon className="size-6" />
            </div>

            {/* Optional error message */}
            {errors.image && (
              <p className="text-red-500 text-sm text-center mt-2">
                {errors.avatar.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Product Name */}
            <div>
              <Label
                htmlFor="name"
                className="block mb-2 text-[#353B48] font-medium md:text-base"
              >
                Product Name
              </Label>
              <Input
                id="name"
                {...register("name", {
                  required: "Product name is required",
                })}
                className={`w-full h-[56px] bg-white ${
                  errors.name ? "border border-red-500" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <Label className="block mb-2 text-[#353B48] font-medium md:text-base">
                Date
              </Label>
              <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-between text-left font-normal h-[56px] ${
                            errors.date ? "border-red-500" : ""
                          }`}
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Select date"}
                          <CalenderIcon className="size-6" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        side="bottom"
                        align="end"
                      >
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.date.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label
                htmlFor="hours"
                className="block font-medium text-[#353B48] md:text-base"
              >
                <span className="mb-2 block">Time</span>
              </Label>

              <div className="flex justify-between items-center h-[56px] bg-white rounded-md px-3 border border-input">
                <div className="flex gap-2 items-center">
                  <Input
                    {...register("hours")}
                    className="w-16 bg-[#F8F8FF] rounded-[6px]"
                    maxLength={2}
                  />
                  <Input
                    {...register("minutes")}
                    className="w-16 bg-[#F8F8FF] rounded-[6px]"
                    maxLength={2}
                  />
                  <Controller
                    name="ampm"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-20 bg-[#F8F8FF] rounded-[6px]">
                          <SelectValue placeholder="AM/PM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <ClockIcon className="size-6 text-[#4E4E4E] opacity-90" />
              </div>

              {/* Unified time error */}
              {errors.hours && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.hours.message}
                </span>
              )}
            </div>

            <div>
              <Label className="block mb-2 font-medium text-[#353B48] md:text-base">
                Assigned by
              </Label>
              <Controller
                name="assignedBy"
                control={control}
                rules={{ required: "Assigned by is required" }}
                render={({ field }) => (
                  <>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={`w-full h-[56px] bg-white ${
                          errors.assignedBy ? "border border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        {stafflist?.data?.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.assignedBy && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.assignedBy.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Drink Type */}
            <div>
              <Label className="block mb-2 font-medium text-[#353B48] md:text-base">
                Drink Type
              </Label>
              <Controller
                name="drink_type"
                control={control}
                rules={{ required: "drink_type type is required" }}
                render={({ field }) => (
                  <>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={`w-full h-[56px] bg-white ${
                          errors.drink_type ? "border border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="feature">Feature</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.drink_type && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.drink_type.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Categories */}
            <div>
              <Label className="block mb-2 font-medium text-[#353B48] md:text-base">
                Categories
              </Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={`w-full h-[56px] bg-white ${
                          errors.category ? "border border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {category?.data?.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.category.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Shelf Number */}
            <div>
              <Label className="block mb-2 font-medium text-[#353B48] md:text-base">
                Shelf Number
              </Label>
              <Controller
                name="shelfNumber"
                control={control}
                rules={{ required: "Shelf number is required" }}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      placeholder="Enter shelf number"
                      {...field}
                      className={`w-full h-[56px] px-4 py-2 border rounded-md bg-white ${
                        errors.shelfNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.shelfNumber && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.shelfNumber.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Price */}
            <div>
              <Label className="block mb-2 font-medium text-[#353B48] md:text-base">
                Price
              </Label>
              <Input
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                type="number"
                step="0.01"
                className={`w-full h-[56px] bg-white ${
                  errors.price ? "border border-red-500" : ""
                }`}
              />
              {errors.price && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Selling Price */}
            <div>
              <Label className="block mb-2 font-medium text-[#353B48] md:text-base">
                Selling Price
              </Label>
              <Input
                {...register("sellingPrice", {
                  required: "Selling price is required",
                  valueAsNumber: true,
                })}
                type="number"
                step="0.01"
                className={`w-full h-[56px] bg-white ${
                  errors.sellingPrice ? "border border-red-500" : ""
                }`}
              />
              {errors.sellingPrice && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.sellingPrice.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label className="block mb-2 font-medium text-[#353B48] md:text-base">
                Quantity
              </Label>
              <Input
                {...register("quantity", {
                  required: "quantity  required",
                })}
                type="number"
                className={`w-full h-[56px] bg-white ${
                  errors.quantity ? "border border-red-500" : ""
                }`}
              />
              {errors.quantity && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.quantity.message}
                </span>
              )}
            </div>
            <div>
              <Label className="block mb-2 font-medium text-[#353B48] md:text-base">
                Description
              </Label>
              <textarea
                {...register("description", {
                  required: "description  required",
                })}
                type="text"
                className={`w-full h-[56px] bg-white p-5 ${
                  errors.description ? "border border-red-500" : ""
                }`}
              />
              {errors.description && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <button
              type="button"
              className="bg-[#1F1F1F] text-base sm:text-lg font-medium text-white w-full sm:w-auto px-6 py-4 leading-none rounded-md hover:shadow-xl"
              onClick={handleqrcode}
            >
              Generate QR code
            </button>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                type="button"
                className="bg-[#1F1F1F] text-base sm:text-lg font-medium text-white w-full sm:w-auto px-6 py-4 leading-none rounded-md hover:shadow-xl"
                onClick={() => console.log("Add receipt")}
              >
                Add receipt
              </button>
              <button
                disabled={mutation.isPending}
                type="submit"
                className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-base sm:text-lg font-medium text-black w-full sm:w-auto px-6 py-4 leading-none rounded-md hover:shadow-xl cursor-pointer"
              >
                {mutation.isPending ? (
                  <PiSpinnerBold className="animate-spin size-[20px] fill-white" />
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </div>
        </form>
      </section>

      <section className="px-10 overflow-hidden pb-4 pt-8 border-t">
        <div className="sm:flex items-center justify-between mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2 sm:mb-0">
            Recently added Product
          </h2>

          <div>
            <button
              type="button"
              className="text-lg  font-medium text-[#0E0E0E] bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] py-3.5 px-7 rounded-[6px]"
            >
              View all products
            </button>
          </div>
        </div>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={false}
          spaceBetween={20}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          modules={[Pagination]}
          className="!overflow-visible"
        >
          {data?.data?.map((product, idx) => (
            <SwiperSlide key={idx} className="!w-fit mb-12">
              <div className="bg-[#fafafa] flex md:flex-row flex-col gap-5 xl:gap-4 text-[#181818] p-[18px] rounded-[6px] w-full sm:w-[350px] xl:w-[450px] h-full border border-[#C8C8C8]">
                <div className="left flex-1 shrink-0 h-full">
                  <figure className="rounded-[6px] border border-[#C8C8C8] overflow-hidden md:h-[250px] h-[150px]">
                    <img
                      src={
                        product.image
                          ? `${import.meta.env.VITE_BASE_URL}/${product.image}`
                          : "https://i.ibb.co.com/fYcPSK0y/profile-2.png"
                      }
                      alt={product.name}
                      className="h-full object-center w-full"
                    />
                  </figure>
                </div>
                <div className="right text-sm flex-1 shrink-0">
                  <h3 className="text-xl font-instrument mb-1 line-clamp-1 tracking-[0.6px]">
                    {product.name}
                  </h3>
                  <h4>Id: #{product.product_id}</h4>
                  <h4>Table: {product?.shelf_number}</h4>
                  <h4>Date : {product?.date}</h4>
                  <h4>Time : {product?.time}</h4>
                  <h4>Assigned by : {product?.assigned_by}</h4>
                  <h4>Categories : {product?.category_id}</h4>
                  <h4>Shelf Number : {product?.shelf_number}</h4>
                  <h4 className="mb-3">Quantity : 02</h4>
                  <h3 className="text-xl font-semibold">
                    ${product?.selling_price}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
};

export default BarInventory;
