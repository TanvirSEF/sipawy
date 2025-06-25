import Container from "@/Shared/Container";
import { useState } from "react";
import Signupbg from "../../assets/images/Signup/signupmainbg.png";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "@/Components/Hooks/Api/Useaxios";
import toast from "react-hot-toast";
import { PiSpinnerBold } from "react-icons/pi";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const ResetPass = () => {
  const Axios = useAxios();
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordconfirm, setShowPasswordconfirm] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({});

  const location = useLocation();
  const email = location.state?.email;

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("/api/reset-password", {
        email: email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      console.log(response);
      toast.success("Password reset successfully!");
      reset();
      Navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <section className="bg-[#000] min-h-screen overflow-y-auto flex items-center">
      <Container className="font-poppins w-full px-10 xl:px-0 py-10">
        <div className="flex flex-col-reverse lg:flex-row gap-y-10 lg:gap-x-20 items-center">
          {/* Left: Form */}
          <div className="w-full lg:flex-1 shrink-0">
            <h3 className="text-[30px] text-[#FFF] font-normal font-instrument text-center lg:text-left">
              Set A New <span className="text-[#EEB609]">Password</span>
            </h3>
            <p className="text-[16px] text-[#F8F8FF] font-normal font-itc text-center lg:text-left">
              Set a new password to regain access to your account. Make sure to
              choose a strong and secure password.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(onSubmit)();
                }
              }}
            >
              <div className="flex flex-col gap-5 mt-5">
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
                      pattern: {
                        value: passwordRegex,
                        message:
                          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.",
                      },
                    })}
                    className="py-[10px] px-[14px] outline-none border border-[#DBA514]/30 rounded-[8px] bg-[#232323] text-[#7A7A7A] text-[14px] font-normal w-full"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                  <div
                    className="absolute top-10 right-5 cursor-pointer"
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
                    className="py-[10px] px-[14px] outline-none border border-[#DBA514]/30 rounded-[8px] bg-[#232323] text-[#7A7A7A] text-[14px] font-normal w-full"
                  />
                  {errors.password_confirmation && (
                    <span className="text-red-500 text-sm">
                      {errors.password_confirmation.message}
                    </span>
                  )}
                  <div
                    className="absolute top-10 right-5 cursor-pointer"
                    onClick={() => setShowPasswordconfirm(!showPasswordconfirm)}
                  >
                    {showPasswordconfirm ? (
                      <IoEyeSharp className="text-white" />
                    ) : (
                      <FaEyeSlash className="text-white" />
                    )}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex justify-center items-center gap-2 leading-none py-[16px] px-[32px] capitalize font-semibold text-[16px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer tracking-[0.72px] w-full mt-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <PiSpinnerBold className="animate-spin size-[20px] fill-white" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:flex-1 shrink-0 rounded-[8px] overflow-hidden">
            <img
              src={Signupbg}
              alt="Signupbg"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ResetPass;
