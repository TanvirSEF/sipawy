import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "@/assets/icons/icons";
import toast from "react-hot-toast";
import useAxios from "@/Components/Hooks/Api/UseAxios";
import useFetchData from "@/Components/Hooks/Api/UseFetchData";
import { PiSpinnerBold } from "react-icons/pi";

const items = [
  { title: "Bar Name", id: "barName" },
  { title: "Email", id: "email" },
  { title: "Address", id: "address" },
  { title: "Password", id: "password" },
  { title: "Description", id: "description", type: "textarea" },
];

export default function ProfileDetails() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    profileImage: null,
    profileImageUrl: "https://i.ibb.co.com/XkYLH2xR/avatar.png",
    barName: "",
    email: "",
    address: "",
    password: "",
    description: "",
  });

  const axios = useAxios();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        profileImage: file,
        profileImageUrl: imageUrl,
      }));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    maxFiles: 1,
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userToken = JSON.parse(localStorage.getItem("usertoken"));
      const token = userToken?.token;

      const data = new FormData();
      data.append("bar_name", formData.barName || "");
      data.append("email", formData.email || "");
      data.append("address", formData.address || "");
      // data.append("password", formData.password || "");
      data.append("description", formData.description || "");
      if (formData.profileImage) {
        data.append("cover_photo", formData.profileImage);
      }

      const res = await axios.post("/api/update-profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      

      toast.success("Successfully updated profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const { data: barprofileinfo } = useFetchData("/api/me", token);
  console.log(barprofileinfo);
  

  useEffect(() => {
    if (barprofileinfo?.data) {
      setFormData((prev) => ({
        ...prev,
        barName: barprofileinfo.data.bar_name ?? "",
        email: barprofileinfo.data.email ?? "",
        address: barprofileinfo.data.address ?? "",
        description: barprofileinfo.data.description ?? "",
        profileImageUrl: barprofileinfo.data.cover_photo
          ? `${import.meta.env.VITE_BASE_URL}/${barprofileinfo.data.cover_photo}`
          : prev.profileImageUrl,
      }));
    }
  }, [barprofileinfo]);

  return (
    <section className="py-12 px-10 font-poppins">
      <h2 className="text-xl font-semibold mb-12">Bar Profile</h2>
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <figure className="w-full h-[250px] absolute">
              <img
                src="https://i.ibb.co.com/HpYmvJkT/banner-2.png"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </figure>
            <div className="mx-auto w-fit mb-12 relative pt-38">
              <div {...getRootProps()} className="relative cursor-pointer group">
                <input {...getInputProps()} />
                <div className="size-[220px] rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 relative">
                  <img
                    src={formData.profileImageUrl}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`relative ${
                  item.type === "textarea" ? "md:col-span-2" : ""
                }`}
              >
                <Label
                  htmlFor={item.id}
                  className="block mb-2 font-medium text-[#353B48] md:text-base"
                >
                  {item.title}
                </Label>
                {item.type === "textarea" ? (
                  <textarea
                    id={item.id}
                    className="w-full h-[112px] resize-none border border-gray-300 rounded px-4 py-3 focus:outline-none"
                    value={formData[item.id]}
                    onChange={(e) => updateFormData(item.id, e.target.value)}
                  />
                ) : (
                  <Input
                    id={item.id}
                    className="w-full h-[56px] bg-white"
                    value={formData[item.id]}
                    onChange={(e) => updateFormData(item.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center gap-2 bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black w-full sm:w-auto px-6 py-4 leading-none rounded-md hover:shadow-xl cursor-pointer ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting && <PiSpinnerBold className="w-5 h-5 animate-spin" />}
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
