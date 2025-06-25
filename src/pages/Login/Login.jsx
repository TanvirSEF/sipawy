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

const Login = () => {
  const Axios = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const tokenData = response?.data?.data;
  
      if (!tokenData?.token) {
        throw new Error(response?.data?.message || "Invalid credentials");
      }
  
      localStorage.setItem("usertoken", JSON.stringify(tokenData));
      localStorage.setItem("role", tokenData.userData.role);
      toast.success("Logged in successfully");
  
      const redirectPath = localStorage.getItem("redirectPath");
      if (redirectPath) {
        localStorage.removeItem("redirectPath");
        navigate(redirectPath, { replace: true });
      } else {
        const role = tokenData.userData.role;
        switch (role) {
          case "user":
            navigate("/user-dashboard");
            break;
          case "bar_owner":
            navigate("/bar-dashboard/order");
            break;
          default:
            navigate("/");
            break;
        }
      }
  
      reset();
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        "Something went wrong"
      );
    }
  };
  

  return (
    <section className="bg-[#000] min-h-screen flex items-center py-10 px-3 sm:py-16">
      <Container className="w-full font-poppins">
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-y-10 lg:gap-x-20">
          {/* Left - Form */}
          <div className="w-full lg:w-[45%]">
            <h3 className="text-[24px] sm:text-[28px] lg:text-[30px] text-[#FFF] font-normal font-instrument text-center lg:text-left">
              Login for <span className="text-[#EEB609]">OrderUp</span>
            </h3>

            <form
              action=""
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
                {/* Email Field */}
                <div>
                  <h5 className="text-[14px] text-[#F8F8FF] font-medium pb-[6px]">
                    Email*
                  </h5>
                  <input
                    type="text"
                    placeholder="Enter your Email"
                    {...register("email", { required: "email is required" })}
                    className="py-[10px] px-[14px] w-full outline-none border border-[#DBA514]/30 rounded-[8px] bg-[#232323] text-[#7A7A7A] text-[14px]"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <h5 className="text-[14px] text-[#F8F8FF] font-medium pb-[6px]">
                    Password*
                  </h5>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "password is required",
                    })}
                    className="py-[10px] px-[14px] w-full outline-none border border-[#DBA514]/30 rounded-[8px] bg-[#232323] text-[#7A7A7A] text-[14px]"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}

                  <div className="text-right mt-1">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#EEB609] hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-10 right-5 cursor-pointer"
                  >
                    {showPassword ? (
                      <IoEyeSharp className="text-white" />
                    ) : (
                      <FaEyeSlash className="text-white" />
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex justify-center items-center cursor-pointer leading-none py-[16px] px-[32px] mt-8 font-semibold text-[16px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] tracking-[0.72px] w-full"
              >
                {isSubmitting ? (
                  <PiSpinnerBold className="animate-spin size-[20px] fill-white" />
                ) : (
                  "Login"
                )}
              </button>

              {/* Signup Prompt */}
              <p className="text-[14px] sm:text-[16px] text-[#F8F8FF] font-normal text-center pt-4">
                You don’t have an account?{" "}
                <span className="text-[#EEB609] underline">
                  <Link to="/sign-up">Signup</Link>
                </span>
              </p>
            </form>
          </div>

          {/* Right - Image */}
          <div className="w-full lg:w-[50%] px-4">
            <img
              src={Signupbg}
              alt="Signup background"
              className="w-full max-h-[500px] object-cover rounded-md"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Login;
