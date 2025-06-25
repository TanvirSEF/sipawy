// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAxios from "@/Components/Hooks/Api/UseAxios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";
import { PiSpinnerBold } from "react-icons/pi";
import useFetchData from "@/Components/Hooks/Api/UseFetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BarStaffs = () => {
  const Axios = useAxios();
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const { data } = useFetchData("/api/dashboard/bar/staff/index", token);
  const { data: staffdetails } = useFetchData(
    "/api/dashboard/bar/staff/list/details",
    token
  );
  console.log("bardata", data);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const imageFile = watch("avatar");

  const queryClient = useQueryClient();

  const createStaff = async ({ data, token }) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("name", data.name);
    formData.append("designation", data.designation);
    formData.append("employeeId", data.employeeId);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("shift", data.shift);
    formData.append("address", data.address);
    formData.append("identification", data.identification);

    const response = await Axios.post(
      "/api/dashboard/bar/staff/store",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  };

  const useCreateStaff = (token, reset) =>
    useMutation({
      mutationFn: (formData) => createStaff({ data: formData, token }),
      onSuccess: () => {
        toast.success("Staff created successfully");
        queryClient.invalidateQueries(["staffs"]);
        reset();
      },
      onError: (error) => {
        const message = error.response?.data || error.message;
        console.error("Upload error:", message);
        toast.error(`Upload error: ${message}`);
      },
    });
  const { mutate: submitStaff, isPending } = useCreateStaff(
    token,
    reset,
    isSubmitting
  );

  const onSubmit = (data) => {
    submitStaff(data);
  };

  return (
    <section className="bg-[#F8F8FF] pt-12">
      <section className="px-6 sm:px-10 pb-16">
        <h2 className="text-xl font-semibold mb-6">Add Staff</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 py-10 space-y-8 bg-[#FAFAFA] border border-[#DBA514] rounded-[6px]"
        >
          <div className="relative ">
            <Label
              htmlFor="avatar"
              className="block mb-2 font-medium text-[#353B48] md:text-base"
            >
              Upload Profile Image
            </Label>

            <input
              className="opacity-0"
              id="avatar"
              type="file"
              accept="image/*"
              {...register("avatar", { required: "avatar is required" })}
            />

            <label
              htmlFor="avatar"
              className="cursor-pointer border border-[#DBA514] bg-white flex items-center justify-center w-[220px] sm:w-[250px] h-[220px]  sm:h-[250px] rounded-full relative overflow-hidden
               "
            >
              {imageFile?.[0] ? (
                <img
                  src={URL.createObjectURL(imageFile[0])}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <Camera className="w-10 h-10 text-[#C8C8C8]" />
              )}

              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label
                htmlFor="name"
                className="block mb-2 font-medium text-[#353B48] md:text-base"
              >
                Name
              </Label>
              <Input
                id="name"
                className="w-full h-[56px] bg-white"
                {...register("name", { required: "name is required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <Label
                htmlFor="designation"
                className="block mb-2 font-medium text-[#353B48] md:text-base"
              >
                Designation
              </Label>
              <Select onValueChange={(val) => setValue("designation", val)}>
                <SelectTrigger
                  id="designation"
                  className="w-full h-[56px] bg-white"
                >
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("designation", {
                  required: "designation is required",
                })}
              />
              {errors.designation && (
                <span className="text-red-500 text-sm">
                  {errors.designation.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label
                htmlFor="employeeId"
                className="block mb-2 font-medium text-[#353B48] md:text-base"
              >
                Employee Id
              </Label>
              <Input
                id="employeeId"
                className="w-full h-[56px] bg-white"
                {...register("employeeId", {
                  required: "employeeId is required",
                })}
              />
              {errors.employeeId && (
                <span className="text-red-500 text-sm">
                  {errors.employeeId.message}
                </span>
              )}
            </div>
            <div>
              <Label
                htmlFor="email"
                className="block mb-2 font-medium text-[#353B48] md:text-base"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="w-full h-[56px] bg-white"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label
                htmlFor="phone"
                className="block mb-2 font-medium text-[#353B48] md:text-base"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                className="w-full h-[56px] bg-white"
                {...register("phone", { required: "phone is required" })}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div>
              <Label
                htmlFor="shift"
                className="block mb-2 font-medium text-[#353B48] md:text-base"
              >
                Shift
              </Label>
              <Select onValueChange={(val) => setValue("shift", val)}>
                <SelectTrigger id="shift" className="w-full h-[56px] bg-white">
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">day</SelectItem>
                  <SelectItem value="night">night</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("shift", { required: "shift is required" })}
              />
              {errors.shift && (
                <span className="text-red-500 text-sm">
                  {errors.shift.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label
                htmlFor="address"
                className="block mb-2 font-medium text-[#353B48] md:text-base"
              >
                Address
              </Label>
              <Input
                id="address"
                className="w-full h-[56px] bg-white"
                {...register("address", { required: "address is required" })}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>
            <div>
              <Label
                htmlFor="identification"
                className="block mb-2 font-medium text-[#353B48] md:text-base"
              >
                Identification
              </Label>
              <Select onValueChange={(val) => setValue("identification", val)}>
                <SelectTrigger
                  id="identification"
                  className="w-full h-[56px] bg-white"
                >
                  <SelectValue placeholder="Select identification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="nationalId">National ID</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("identification", {
                  required: "identification is required",
                })}
              />
              {errors.identification && (
                <span className="text-red-500 text-sm">
                  {errors.identification.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black sm:w-auto px-6 py-4 leading-none rounded-md hover:shadow-xl cursor-pointer min-w-[204px] flex items-center justify-center"
            >
              {isPending ? (
                <PiSpinnerBold className="animate-spin size-[20px] fill-white" />
              ) : (
                "Add Staff"
              )}
            </button>
          </div>
        </form>
      </section>
      <section className="px-6 sm:px-10 overflow-hidden pb-4 pt-8 border-t">
        <div className="flex items-center justify-between  mb-8">
          <h2 className="text-xl font-semibold tracking-[0.6px]">Stuff list</h2>
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
          {staffdetails?.data?.map((staff, idx) => (
            <SwiperSlide key={idx} className="!w-fit mb-8 sm:mb-12">
              <div className="bg-[#fafafa] flex gap-4 text-[#181818] p-[18px] rounded-[6px] w-[350px] sm:w-[450px] border border-[#C8C8C8]">
                <div className="left shrink-0">
                  <figure className="w-[135px] h-full rounded-[6px] border border-[#C8C8C8] flex justify-center items-center">
                    <img
                      src={
                        staff.avatar
                          ? `${import.meta.env.VITE_BASE_URL}/${staff.avatar}`
                          : "https://i.ibb.co.com/fYcPSK0y/profile-2.png"
                      }
                      alt={staff.name}
                      className="w-fit h-[150px]"
                    />
                  </figure>
                </div>
                <div className="right text-sm grow">
                  <h3 className="text-xl font-instrument mb-1 line-clamp-1 tracking-[0.6px]">
                    {staff.name}
                  </h3>
                  <h4>Id: #{staff.employee_id}</h4>
                  <h4>Designation: {staff.designation}</h4>
                  <h4>Email: {staff.email}</h4>
                  <h4>Phone: {staff.phone}</h4>
                  <h4>Shift: {staff.shift}</h4>
                  <h4>Address: {staff.address || "N/A"}</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center sm:justify-end">
          <button
            type="button"
            className="text-lg font-medium text-[#0E0E0E] bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] py-3.5 px-7 rounded-[6px] tracking-[0.54px] cursor-pointer"
          >
            View all staffs
          </button>
        </div>
      </section>
    </section>
  );
};

export default BarStaffs;
