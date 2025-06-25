import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/CustomComponents/CutomDialog";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const DialogReceipt = ({ receipt, setReceipt }) => {
  const [popup3, setPopup3] = useState(false);
  const orderDetails = useSelector((state) => state.order.orderDetails);

  const contentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({ contentRef });

  const handledownload = () => {
    setPopup3(true);
    setReceipt(false);
  };

  return (
    <>
      <Dialog open={receipt} onOpenChange={setReceipt}>
        <DialogContent className="w-full max-w-[90vw] max-h-[90vh] overflow-y-auto p-4">
          <DialogHeader>
            <DialogTitle className="text-[28px] md:text-[32px] text-center font-medium tracking-[0.96px] mt-10">
              Receipt
            </DialogTitle>
            <DialogDescription>
              <div
                ref={contentRef}
                className="flex flex-col md:flex-row gap-6 mb-10 pt-4 mx-3"
              >
                <div className="w-[250px] md:w-[270px] md:h-[150px] p-4 border border-[#DBA514] flex items-center justify-center shrink-0 rounded-[6px] max-w-full max-h-full">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${
                      orderDetails?.image
                    }`}
                    alt=""
                    className="rounded-md h-full"
                  />
                </div>
                <div className="text-[#0E0E0E] space-y-3 flex-1">
                  <h3 className="text-xl md:text-2xl font-instrument tracking-[0.72px]">
                    {orderDetails?.description}
                  </h3>
                  <p className="tracking-[0.48px]">{orderDetails?.title}</p>
                  <p className="text-xl md:text-2xl font-semibold">
                    ${orderDetails?.totalPrice}
                  </p>
                  <p>Table no : 1</p>
                  <p>Date : {orderDetails?.shots_date}</p>
                </div>
              </div>

              <div className="flex flex-col items-center pb-2">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/${
                    orderDetails?.qrcode
                  }`}
                  alt=""
                  className="mb-2 w-[220px] md:w-[260px] h-auto max-w-full"
                />
                <p className="mb-7 text-center">
                  Provide this QR code to the Bar
                </p>
                <button
                  onClick={() => {
                    handledownload();
                    reactToPrintFn();
                  }}
                  type="submit"
                  className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-6 py-4 leading-none rounded-md hover:shadow-xl cursor-pointer w-full max-w-[260px] mb-[18px]"
                >
                  Download
                </button>
                <button
                  onClick={() => {
                    handledownload();
                    reactToPrintFn();
                  }}
                  type="button"
                  className="bg-[#1F1F1F] text-lg font-medium text-white w-full max-w-[260px] px-6 py-4 leading-none rounded-md hover:shadow-xl cursor-pointer"
                >
                  Print
                </button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {popup3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white pt-12 pb-20 px-6 md:pt-[67px] md:pb-[111px] md:px-[53px] rounded-lg relative w-full sm:max-w-[550px]  max-w-[90vw] z-50">
            <button
              className="absolute top-4 right-4 cursor-pointer font-bold text-2xl"
              onClick={() => setPopup3(false)}
            >
              ×
            </button>
            <div className="flex justify-center">
              <Popupsvg />
            </div>
            <h3 className="text-[20px] md:text-[24px] text-[#000] font-medium text-center pt-8">
              Your file has been downloaded
            </h3>
            <div className="flex justify-center">
              <Link to="/bar">
                <button
                  onClick={() => setPopup3(false)}
                  className="flex justify-center items-center leading-none py-4 px-10 md:py-[18px] md:px-[90px] mt-20 capitalize font-semibold text-[16px] md:text-[18px] rounded-lg bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#C69320_66.76%,#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer tracking-[0.72px]"
                >
                  Confirm
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DialogReceipt;

const Popupsvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="195"
    height="195"
    viewBox="0 0 195 195"
    fill="none"
  >
    <path
      d="M81.6563 25.5937C90.7969 17.875 104.203 17.875 113.344 25.5937L117.609 29.25C121.469 32.5 126.344 34.5313 131.422 34.9375L137.109 35.3437C149.094 36.3594 158.438 45.7031 159.453 57.6875L159.859 63.375C160.266 68.4531 162.297 73.3281 165.547 77.1875L169.203 81.4531C176.922 90.5937 176.922 104 169.203 113.141L165.547 117.406C162.297 121.266 160.266 126.141 159.859 131.219L159.453 136.906C158.438 148.891 149.094 158.234 137.109 159.25L131.422 159.656C126.344 160.062 121.469 162.094 117.609 165.344L113.344 169C104.203 176.719 90.7969 176.719 81.6563 169L77.3906 165.344C73.5312 162.094 68.6562 160.062 63.5781 159.656L57.8906 159.25C45.9062 158.234 36.5625 148.891 35.5469 136.906L35.1406 131.219C34.7344 126.141 32.7031 121.266 29.4531 117.406L25.7969 113.141C18.0781 104 18.0781 90.5937 25.7969 81.4531L29.4531 77.1875C32.7031 73.3281 34.7344 68.4531 35.1406 63.375L35.5469 57.6875C36.5625 45.7031 45.9062 36.3594 57.8906 35.3437L63.5781 34.9375C68.6562 34.5313 73.5312 32.5 77.3906 29.25L81.6563 25.5937Z"
      stroke="url(#paint0_linear_20133_4741)"
      strokeWidth="5"
    />
    <path
      d="M72.1094 101.359L82.4687 111.719C86.5312 115.781 92.8281 115.781 96.8906 111.719L126.953 81.6562"
      stroke="url(#paint1_linear_20133_4741)"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_20133_4741"
        x1="23.6979"
        y1="19.8047"
        x2="176.495"
        y2="24.945"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBA514" />
        <stop offset="0.345" stopColor="#EEB609" />
        <stop offset="1" stopColor="#FCC201" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_20133_4741"
        x1="73.4152"
        y1="81.6563"
        x2="127.378"
        y2="84.6633"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBA514" />
        <stop offset="0.345" stopColor="#EEB609" />
        <stop offset="1" stopColor="#FCC201" />
      </linearGradient>
    </defs>
  </svg>
);
