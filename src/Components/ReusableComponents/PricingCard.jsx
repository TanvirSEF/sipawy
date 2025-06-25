import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const PricingCard = ({ customBG, title }) => {
  return (
    <div
      className={`px-7 py-6 sm:p-5 border border-[#E6AF0D] rounded-[8px] ${customBG} h-[337px] hover:scale-105 cursor-pointer duration-300 ease-in-out`}
    >
      <h3 className="text-[24px] text-[#FFF] font-instrument font-normal capitalize">
        {title}
      </h3>
      <h4 className="text-[16px] font-normal capitalize text-[#FFF] pb-3">
        Best for personal team
      </h4>
      <h4 className="text-[16px] font-normal capitalize text-[#FFF]">
        $25 /month
      </h4>
      <div className="bg-white h-[1px] mt-4 mb-[14px]"></div>
      <h5 className="text-[14px] font-normal capitalize text-[#FFF] flex gap-x-3 items-center">
        <IoIosCheckmarkCircleOutline className="fill-white w-4 h-4" /> 25 Free
        monthly ordewrs
      </h5>
      <h5 className="text-[14px] font-normal capitalize text-[#FFF] flex gap-x-3 items-center mt-1">
        {" "}
        <IoIosCheckmarkCircleOutline className="fill-white w-4 h-4" /> 1.90% +
        $0.35 each additional order
      </h5>
      <button className="w-full p-[10px] text-[16px] font-normal capitalize flex justify-center items-center bg-[#EEB609] rounded-[8px] mt-[46px] h-[56px] cursor-pointer">
        start Now
      </button>
    </div>
  );
};

export default PricingCard;
