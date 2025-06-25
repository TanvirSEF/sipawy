import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "@/assets/icons/icons";
import useAxios from "@/Components/Hooks/Api/UseAxios";
import useFetchData from "@/Components/Hooks/Api/UseFetchData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  { title: "Name", id: "User Name" },
  { title: "Email", id: "email" },
  // { title: "Password", id: "password" },
  { title: "Birthday", id: "dob" },
  { title: "Address", id: "address" },
];

export default function UserProfileDetails() {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const Axios = useAxios();
  const { data } = useFetchData("/api/me", token);
  console.log(data);

  const [imagePreview, setImagePreview] = useState(
    "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        setValue("cover_photo", file);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    maxFiles: 1,
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await Axios.post("/api/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Success:", res.data);
      toast.success("User profile updated successfully");
      reset();
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error(error.message);
    }
  };

  const imageFromAPI = `${import.meta.env.VITE_BASE_URL}/${data?.data?.avatar}`

  return (
    <section className="pt-12 px-10 font-poppins">
      <h2 className="text-xl font-semibold mb-12">Update Profile</h2>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto w-fit mb-12 relative">
            <div {...getRootProps()} className="relative cursor-pointer group">
              <input {...getInputProps()} />
              <div className="size-[220px] rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 relative">
                <img
                  src={data?.data?.cover_photo ? imageFromAPI : imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Pencil className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="absolute right-2 bottom-2 bg-[#D9D9D9] size-12 rounded-full flex justify-center items-center pointer-events-none">
              <EditIcon className="size-6" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item, idx) => (
              <div key={idx}>
                <Label
                  htmlFor={item.id}
                  className="block mb-2 font-medium text-[#353B48] md:text-base"
                >
                  {item?.title}
                </Label>
                <div className="relative">
                  <Input
                    id={item.id}
                    className="w-full h-[56px] bg-white"
                    {...register(item.id)}
                    placeholder={data?.data?.[item.id] || ""}
                  />
                  {errors[item.id] && (
                    <span className="text-red-500 text-sm block pt-1">
                      {errors[item.id].message}
                    </span>
                  )}
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
                    <EditIcon
                      className={`size-6 ${
                        item.id === "email" && "fill-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div>
              <Label
                htmlFor="gender"
                className="block mb-2 font-medium text-[#353B48] md:text-base"
              >
                Gender
              </Label>
              <Select
                defaultValue={data?.data?.gender?.toLowerCase()}
                onValueChange={(value) => setValue("gender", value)}
              >
                <SelectTrigger id="gender" className="w-full h-[56px] bg-white">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <button
              type="submit"
              className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black w-full sm:w-auto px-6 py-4 leading-none rounded-md hover:shadow-xl cursor-pointer"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
