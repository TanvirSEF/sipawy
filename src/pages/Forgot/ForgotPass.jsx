import Container from "@/Shared/Container";
import Signupbg from "../../assets/images/Signup/signupmainbg.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "@/Components/Hooks/Api/Useaxios";
import toast from "react-hot-toast";
import { PiSpinnerBold } from "react-icons/pi";

const ForgotPass = () => {
  const Axios = useAxios();
  const Navigate = useNavigate();
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("/api/send-otp", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      toast.success("Password reset otp sent to your email");
      reset();
      Navigate("/verify-code", { state: { email: data.email } }); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="bg-[#000] min-h-screen flex items-center">
      <Container className="px-10 xl:px-0 py-[60px] rounded-[6px] font-poppins w-full">
        <div className="flex flex-col-reverse lg:flex-row gap-y-10 lg:gap-x-20 justify-between items-center">
          <div className="w-full lg:w-[40%]">
            <h3 className="text-[30px] text-[#FFF] font-normal font-instrument text-center lg:text-left">
              Forgot Your <span className="text-[#EEB609]">Password?</span>
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
            >
              <div className="mt-5">
                <h5 className="text-[14px] text-[#F8F8FF] font-medium pb-[6px]">
                  Email*
                </h5>
                <input
                  type="text"
                  placeholder="Enter your Email"
                  {...register("email", { required: "email is required" })}
                  className="py-[10px] px-[14px] outline-none border border-[#DBA514]/30 rounded-[8px] bg-[#232323] text-[#7A7A7A] text-[14px] font-normal w-full"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center items-center leading-none py-[16px] px-[32px] capitalize font-semibold text-[16px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer tracking-[0.72px] w-full mt-8"
                >
                  {isSubmitting ? (
                    <PiSpinnerBold className="animate-spin size-[16px] fill-white" />
                  ) : (
                    "Forgot Password"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => Navigate(-1)}
                  className="flex justify-center items-center leading-none py-[16px] px-[32px] capitalize font-medium text-[16px] rounded-lg border border-[#DBA514] backdrop-blur-[6.5px] text-white cursor-pointer tracking-[0.72px] w-full mt-4"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
          <div className="w-full lg:w-[60%]">
            <img src={Signupbg} alt="Signupbg" className="w-full h-auto" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ForgotPass;
