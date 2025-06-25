import { useForm } from "react-hook-form";
import Container from "../../Shared/Container";
import useAxios from "../Hooks/Api/UseAxios";
import toast from "react-hot-toast";
import { PiSpinnerBold } from "react-icons/pi";

const GetinTouch = () => {
  const {register,reset,handleSubmit,formState: { errors,isSubmitting }} = useForm();
  const Axiosinstance = useAxios();

  const onSubmit = async (data) => {
    try{
      let response = await Axiosinstance.post("/api/get-in-touch/store",data,{
        headers : {
         "Content-Type": "application/json",
        }
      });
      console.log(response);
      reset();
      toast.success("successfully send message")
    }catch(error){
      console.log(error.message);
      toast.error("Something went wrong")
    }
  };


  return (
    <section className="bg-[#131313] pb-[80px] lg:pb-[126px]">
      <Container>
        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-x-[127px] justify-between mx-3">
          <div className="pt-[100px] lg:pt-[165px]">
            <h4 className="text-[28px] sm:text-[32px] lg:text-[36px] text-[#FFF] uppercase font-normal font-instrument tracking-[1.44px]">
              Get in touch
            </h4>
            <p className="text-[#FFF] text-[16px] font-normal max-w-full lg:max-w-[460px] py-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip.
            </p>
            <ul className="flex flex-col gap-1">
              <li className="flex gap-x-3 items-center text-[#FFF] text-[16px] font-normal">
                <Getinsvg /> Mon-Sun: 09am - 09pm
              </li>
              <li className="flex gap-x-3 items-center text-[#FFF] text-[16px] font-normal">
                <Getinsvg1 /> 1611 Linden Avenue, London
              </li>
              <li className="flex gap-x-3 items-center text-[#FFF] text-[16px] font-normal">
                <Getinsvg2 /> 301-3824311, 301-461-9671
              </li>
            </ul>
          </div>

          <form
            className="pt-[60px] lg:pt-[131px] flex flex-col gap-6 w-full lg:w-[603px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
              className="px-[18px] text-[#E9E9E9] py-[10px] rounded-[8px] border-[0.5px] border-[#DCA613]/30 bg-[#232323] outline-0 text-[16px] capitalize font-semibold placeholder:text-[#E9E9E9] w-full"
            />
              {errors.name && <span className="text-red-500">This field is required</span>}
            <input
            {...register("email", { required: true })}
              type="text"
              placeholder="Email"
              className="px-[18px] text-[#E9E9E9] py-[10px] rounded-[8px] border-[0.5px] border-[#DCA613]/30 bg-[#232323] outline-0 text-[16px] capitalize font-semibold placeholder:text-[#E9E9E9] w-full"
            />
              {errors.email && <span className="text-red-500">This field is required</span>}
            <textarea
            {...register("message", { required: true })}
              placeholder="Message"
              className="px-[18px] text-[#E9E9E9] py-[10px] rounded-[8px] border-[0.5px] border-[#DCA613]/30 bg-[#232323] outline-0 text-[16px] capitalize font-semibold placeholder:text-[#E9E9E9] w-full h-[149px]"
            />
              {errors.message && <span className="text-red-500">This field is required</span>}
            <button disabled={isSubmitting} className="w-full p-[10px] text-[16px] font-semibold h-[56px] capitalize flex justify-center items-center bg-[#EEB609] rounded-[8px] cursor-pointer">
              {isSubmitting ?<PiSpinnerBold className="animate-spin size-[20px] fill-white" /> : "Send"}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default GetinTouch;

const Getinsvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M10.2007 11.1335L11.134 10.2002L8.66732 7.7335V4.66683H7.33398V8.26683L10.2007 11.1335ZM8.00065 14.6668C7.07843 14.6668 6.21176 14.4918 5.40065 14.1418C4.58954 13.7918 3.88398 13.3168 3.28398 12.7168C2.68398 12.1168 2.20898 11.4113 1.85898 10.6002C1.50898 9.78905 1.33398 8.92238 1.33398 8.00016C1.33398 7.07794 1.50898 6.21127 1.85898 5.40016C2.20898 4.58905 2.68398 3.8835 3.28398 3.2835C3.88398 2.6835 4.58954 2.2085 5.40065 1.8585C6.21176 1.5085 7.07843 1.3335 8.00065 1.3335C8.92287 1.3335 9.78954 1.5085 10.6007 1.8585C11.4118 2.2085 12.1173 2.6835 12.7173 3.2835C13.3173 3.8835 13.7923 4.58905 14.1423 5.40016C14.4923 6.21127 14.6673 7.07794 14.6673 8.00016C14.6673 8.92238 14.4923 9.78905 14.1423 10.6002C13.7923 11.4113 13.3173 12.1168 12.7173 12.7168C12.1173 13.3168 11.4118 13.7918 10.6007 14.1418C9.78954 14.4918 8.92287 14.6668 8.00065 14.6668ZM8.00065 13.3335C9.47843 13.3335 10.7368 12.8141 11.7757 11.7752C12.8145 10.7363 13.334 9.47794 13.334 8.00016C13.334 6.52238 12.8145 5.26405 11.7757 4.22516C10.7368 3.18627 9.47843 2.66683 8.00065 2.66683C6.52287 2.66683 5.26454 3.18627 4.22565 4.22516C3.18676 5.26405 2.66732 6.52238 2.66732 8.00016C2.66732 9.47794 3.18676 10.7363 4.22565 11.7752C5.26454 12.8141 6.52287 13.3335 8.00065 13.3335Z"
      fill="#E8EAED"
    />
  </svg>
);
const Getinsvg1 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M7.99935 8.00016C8.36602 8.00016 8.6799 7.86961 8.94102 7.6085C9.20213 7.34738 9.33268 7.0335 9.33268 6.66683C9.33268 6.30016 9.20213 5.98627 8.94102 5.72516C8.6799 5.46405 8.36602 5.3335 7.99935 5.3335C7.63268 5.3335 7.31879 5.46405 7.05768 5.72516C6.79657 5.98627 6.66602 6.30016 6.66602 6.66683C6.66602 7.0335 6.79657 7.34738 7.05768 7.6085C7.31879 7.86961 7.63268 8.00016 7.99935 8.00016ZM7.99935 12.9002C9.35491 11.6557 10.3605 10.5252 11.016 9.5085C11.6716 8.49183 11.9993 7.58905 11.9993 6.80016C11.9993 5.58905 11.6132 4.59738 10.841 3.82516C10.0688 3.05294 9.12157 2.66683 7.99935 2.66683C6.87713 2.66683 5.9299 3.05294 5.15768 3.82516C4.38546 4.59738 3.99935 5.58905 3.99935 6.80016C3.99935 7.58905 4.32713 8.49183 4.98268 9.5085C5.63824 10.5252 6.64379 11.6557 7.99935 12.9002ZM7.99935 14.6668C6.21046 13.1446 4.87435 11.7307 3.99102 10.4252C3.10768 9.11961 2.66602 7.91127 2.66602 6.80016C2.66602 5.1335 3.20213 3.80572 4.27435 2.81683C5.34657 1.82794 6.58824 1.3335 7.99935 1.3335C9.41046 1.3335 10.6521 1.82794 11.7243 2.81683C12.7966 3.80572 13.3327 5.1335 13.3327 6.80016C13.3327 7.91127 12.891 9.11961 12.0077 10.4252C11.1243 11.7307 9.78824 13.1446 7.99935 14.6668Z"
      fill="#E8EAED"
    />
  </svg>
);
const Getinsvg2 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M2.66732 13.3332C2.30065 13.3332 1.98676 13.2026 1.72565 12.9415C1.46454 12.6804 1.33398 12.3665 1.33398 11.9998V3.99984C1.33398 3.63317 1.46454 3.31928 1.72565 3.05817C1.98676 2.79706 2.30065 2.6665 2.66732 2.6665H13.334C13.7007 2.6665 14.0145 2.79706 14.2757 3.05817C14.5368 3.31928 14.6673 3.63317 14.6673 3.99984V11.9998C14.6673 12.3665 14.5368 12.6804 14.2757 12.9415C14.0145 13.2026 13.7007 13.3332 13.334 13.3332H2.66732ZM2.66732 7.33317H5.33398V3.99984H2.66732V7.33317ZM6.66732 7.33317H9.33398V3.99984H6.66732V7.33317ZM10.6673 7.33317H13.334V3.99984H10.6673V7.33317ZM5.33398 11.9998V8.6665H2.66732V11.9998H5.33398ZM6.66732 11.9998H9.33398V8.6665H6.66732V11.9998ZM10.6673 11.9998H13.334V8.6665H10.6673V11.9998Z"
      fill="#E8EAED"
    />
  </svg>
);
