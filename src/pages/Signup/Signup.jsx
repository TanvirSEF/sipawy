import Container from "@/Shared/Container";
import { useState } from "react";
import Signupbg from "../../assets/images/Signup/signupmainbg.png";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "@/Components/Hooks/Api/Useaxios";
import toast from "react-hot-toast";
import { PiSpinnerBold } from "react-icons/pi";

const Signup = () => {
  const Axios = useAxios();
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordconfirm, setShowPasswordconfirm] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      let response = await Axios.post("/api/register", data, {});
      newFunction(response);
      reset();
      toast.success("Registered successfully");
      Navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
    function newFunction(response) {
      console.log(response);
    }
  };

  return (
    <section className="bg-[#000] min-h-screen overflow-y-auto flex items-center py-10 px-3">
      <Container className="font-poppins w-full">
        <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-x-20 items-center">
          {/* Form Section */}
          <div className="flex-1 w-full">
            <h3 className="text-[24px] md:text-[30px] text-[#FFF] font-normal font-instrument text-center lg:text-left">
              Sign up for <span className="text-[#EEB609]">OrderUp</span>
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#F8F8FF] font-normal font-itc text-center lg:text-left">
              By proceeding, you agree to Yelp’s{" "}
              <span className="text-[#EEB609] underline">Terms of Service</span>{" "}
              and acknowledge Yelp’s{" "}
              <span className="text-[#EEB609] underline">Privacy Policy</span>.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(onSubmit)();
                }
              }}
              className="mt-6"
            >
              <div className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <h5 className="text-[14px] text-[#F8F8FF] font-medium pb-[6px]">
                    Name*
                  </h5>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                    className="py-2.5 px-4 outline-none border border-[#DBA514]/30 rounded-[8px] bg-[#232323] text-[#7A7A7A] text-sm w-full"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <h5 className="text-[14px] text-[#F8F8FF] font-medium pb-[6px]">
                    Email*
                  </h5>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: "Email is required" })}
                    className="py-2.5 px-4 outline-none border border-[#DBA514]/30 rounded-[8px] bg-[#232323] text-[#7A7A7A] text-sm w-full"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Role */}
                <div>
                  <h5 className="text-[14px] text-[#F8F8FF] font-medium pb-[6px]">
                    Role*
                  </h5>
                  <select
                    {...register("role", { required: "Role is required" })}
                    defaultValue=""
                    className="py-2.5 px-4 outline-none border border-[#DBA514]/30 rounded-[8px] bg-[#232323] text-[#7A7A7A] text-sm w-full"
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    <option value="bar_owner">bar_owner</option>
                    <option value="user">user</option>
                  </select>
                  {errors.role && (
                    <span className="text-red-500 text-sm">
                      {errors.role.message}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <h5 className="text-[14px] text-[#F8F8FF] font-medium pb-[6px]">
                    Password*
                  </h5>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="py-2.5 px-4 outline-none border border-[#DBA514]/30 rounded-[8px] bg-[#232323] text-[#7A7A7A] text-sm w-full"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                  <div
                    className="absolute top-9 right-4 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoEyeSharp className="text-white" />
                    ) : (
                      <FaEyeSlash className="text-white" />
                    )}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <h5 className="text-[14px] text-[#F8F8FF] font-medium pb-[6px]">
                    Confirm Password*
                  </h5>
                  <input
                    type={showPasswordconfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register("password_confirmation", {
                      required: "Password confirmation is required",
                    })}
                    className="py-2.5 px-4 outline-none border border-[#DBA514]/30 rounded-[8px] bg-[#232323] text-[#7A7A7A] text-sm w-full"
                  />
                  {errors.password_confirmation && (
                    <span className="text-red-500 text-sm">
                      {errors.password_confirmation.message}
                    </span>
                  )}
                  <div
                    className="absolute top-9 right-4 cursor-pointer"
                    onClick={() => setShowPasswordconfirm(!showPasswordconfirm)}
                  >
                    {showPasswordconfirm ? (
                      <IoEyeSharp className="text-white" />
                    ) : (
                      <FaEyeSlash className="text-white" />
                    )}
                  </div>
                </div>

                {/* Birthday */}
                <div>
                  <h5 className="text-[14px] text-[#F8F8FF] font-medium pb-[6px]">
                    Birthday (Optional)
                  </h5>
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    {...register("date")}
                    className="py-2.5 px-4 outline-none border border-[#DBA514]/30 rounded-[8px] bg-[#232323] text-[#7A7A7A] text-sm w-full"
                  />
                  {errors.date && (
                    <span className="text-red-500 text-sm">
                      {errors.date.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex cursor-pointer justify-center items-center gap-2 py-4 px-6 mt-10 rounded-lg bg-gradient-to-r from-[#DBA514] via-[#EEB609] to-[#FCC201] text-[#0E0E0E] font-semibold text-base tracking-wide w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <PiSpinnerBold className="animate-spin size-5 fill-white" />
                ) : (
                  "Create account"
                )}
              </button>

              <p className="text-[14px] md:text-[16px] text-[#F8F8FF] text-center pt-4 font-popins">
                Already have an account?{" "}
                <span className="text-[#EEB609] underline">
                  <Link to="/login">Log in</Link>
                </span>
              </p>
            </form>
          </div>

          {/* Image Section */}
          <div className="flex-1 w-full max-w-[800px]">
            <img
              src={Signupbg}
              alt="Signup"
              className="w-full h-full object-cover rounded-[8px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Signup;
