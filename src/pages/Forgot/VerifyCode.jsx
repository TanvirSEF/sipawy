import Container from "@/Shared/Container";
import { useState } from "react";
import Signupbg from "../../assets/images/Signup/signupmainbg.png";
import useAxios from "@/Components/Hooks/Api/Useaxios";
import toast from "react-hot-toast";
import { PiSpinnerBold } from "react-icons/pi";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const Axios = useAxios();
  const Navigate = useNavigate();
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(value);
  const location = useLocation();
  const email = location.state?.email;
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  console.log(email);

  const onSubmit = async () => {
    if (!value || value.length < 4) {
      toast.error("Please enter the full 4-digit OTP");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await Axios.post(
        "/api/verify-otp",
        {
          email: email,
          otp: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Verified successfully");
      Navigate("/reset-password", { state: { email } });
    } catch (error) {
      console.error("Verification failed:", error.message);
      toast.error("Wrong OTP or verification failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#000] min-h-screen flex items-center">
      <Container className="px-10 xl:px-0 py-[60px] font-poppins w-full">
        <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-x-20 justify-between items-center">
          {/* Left Content */}
          <div className="w-full md:w-[50%]">
            <h3 className="text-[24px] md:text-[30px] text-[#FFF] font-normal font-instrument">
              Verify your <span className="text-[#EEB609]">Email Address</span>
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#F8F8FF] font-normal font-itc mt-2">
              Enter the verification code we sent to
            </p>
            <p className="text-[14px] md:text-[16px] text-[#EEB609] font-normal font-itc mt-4 break-words">
              {email}
            </p>

            {/* OTP Input */}
            <div className="text-white mt-8 text-2xl">
              <InputOTP
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS}
                value={value}
                onChange={(value) => setValue(value)}
              >
                {[0, 1, 2, 3].map((index) => (
                  <InputOTPGroup key={index}>
                    <InputOTPSlot index={index} />
                  </InputOTPGroup>
                ))}
              </InputOTP>
            </div>

            {/* Message & Resend */}
            <p className="text-white font-itc mt-6 text-[14px] md:text-[16px]">
              Your verification code may take a few moments to arrive.
              Didn&apos;t receive a code?{" "}
              <span
                onClick={async () => {
                  try {
                    await Axios.post("/api/resend-otp", { email });
                    toast.success("OTP resent successfully");
                  } catch (error) {
                    console.log(error);
                    toast.error("Failed to resend OTP");
                  }
                }}
                className="hover:underline text-[#FCC201] cursor-pointer"
              >
                Re-send
              </span>
            </p>

            {/* Buttons */}
            <div className="mt-8 space-y-4">
              <button
                onClick={onSubmit}
                type="submit"
                disabled={isSubmitting}
                className="flex justify-center items-center leading-none py-[14px] px-[32px] capitalize font-semibold text-[16px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer tracking-[0.72px] w-full"
              >
                {isSubmitting ? (
                  <PiSpinnerBold className="animate-spin size-[16px] fill-white" />
                ) : (
                  "Verify"
                )}
              </button>

              <button
                type="button"
                onClick={() => Navigate(-1)}
                className="flex justify-center items-center leading-none py-[14px] px-[32px] capitalize font-medium text-[16px] rounded-lg border border-[#DBA514] backdrop-blur-[6.5px] text-white cursor-pointer tracking-[0.72px] w-full"
              >
                Back
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-[50%] mb-10 md:mb-0">
            <img
              src={Signupbg}
              alt="Signupbg"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VerifyCode;
