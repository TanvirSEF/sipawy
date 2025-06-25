import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Mastercard from "../../assets/images/Checkout/card2.png";
import Visacard from "../../assets/images/Checkout/card1.png";
import Paypal from "../../assets/images/Checkout/paypal.png";
import useAxios from "../Hooks/Api/UseAxios";
import toast from "react-hot-toast";

const Checkout = ({ setPopUp2, setReceipt }) => {
  const [activeTab, setActiveTab] = useState("credit-card");
  const Axiosinstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const orderDetails = useSelector((state) => state.order.orderDetails);

  const handleBtn = async (data) => {
    const userToken = JSON.parse(localStorage.getItem("usertoken"));
    const token = userToken?.token;
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    if (!orderDetails) {
      toast.error("Order details are missing.");
      return;
    }

    const orderData = {
      table_id: orderDetails.table_id,
      product_id: orderDetails.id,
      quantity: orderDetails.quantity,
      price: orderDetails.selling_price,
      shots_date: orderDetails.shots_date,
      shots_time: orderDetails.shots_time,
      payment_method: activeTab === "credit-card" ? "credit_card" : "cash",
      ...(activeTab === "credit-card" && {
        cardholderName: data.cardholderName,
        cardNumber: data.cardNumber,
        expireDate: data.expireDate,
        ccv: data.ccv,
      }),
    };

    try {
      const response = await Axiosinstance.post("/api/order/store", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("responseData", response.data);
      toast.success("Order placed successfully.");
      setReceipt(true);
      setPopUp2(false);
    } catch (error) {
      console.error("Payment failed:", error?.response?.data || error.message);
      toast.error("Payment failed");
    }
  };

  return (
    <section>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50  px-4">
        <div className="bg-white pt-[30px] pb-[50px] px-[20px] md:px-[53px] rounded-lg relative w-full  max-w-[651px] max-h-[95vh] overflow-y-auto  z-50">
          <button
            className="absolute top-4 right-4 cursor-pointer font-bold text-2xl"
            onClick={() => setPopUp2(false)}
          >
            ×
          </button>
          <div>
            <h3 className="text-[26px] md:text-[32px] font-medium text-black text-center">
              Checkout
            </h3>
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-x-8 mt-[30px] md:mt-[45px]">
              <button
                className={`text-center w-full md:w-[260px] h-16 font-medium text-[18px] md:text-[20px] text-[#000] border border-[#222] rounded-[6px] cursor-pointer ${
                  activeTab === "credit-card"
                    ? "border-b-2 bg-black text-white font-medium"
                    : ""
                }`}
                onClick={() => setActiveTab("credit-card")}
              >
                Credit Card
              </button>
              <button
                className={`text-center w-full md:w-[260px] h-16 border border-[#222] rounded-[6px] cursor-pointer ${
                  activeTab === "hand-cash"
                    ? "border-b-2 bg-black text-white font-medium"
                    : ""
                }`}
                onClick={() => setActiveTab("hand-cash")}
              >
                Hand Cash
              </button>
            </div>

            <form onSubmit={handleSubmit(handleBtn)}>
              <div>
                {activeTab === "credit-card" ? (
                  <div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-x-8 mt-5">
                      <div className="border border-[#C8C8C8] rounded-[6px] flex justify-center items-center bg-[#FAFAFA] flex-1 py-5 cursor-pointer">
                        <img
                          src={Mastercard}
                          alt="Mastercard"
                          className="w-[80px] md:w-[100px]"
                        />
                      </div>
                      <div className="border border-[#C8C8C8] rounded-[6px] flex justify-center items-center bg-[#FAFAFA] flex-1 py-5 cursor-pointer">
                        <img
                          src={Visacard}
                          alt="Visacard"
                          className="w-[80px] md:w-[100px]"
                        />
                      </div>
                    </div>

                    <div className="border border-[#DBA514] rounded-[6px] p-4 mt-3 bg-[#FAFAFA]">
                      <div className="flex flex-wrap gap-4 justify-between">
                        <div className="flex flex-col gap-1 w-full md:w-[45%]">
                          <p className="text-[14px] md:text-[16px] font-medium text-[#353B48]">
                            Cardholder name
                          </p>
                          <input
                            {...register("cardholderName", { required: true })}
                            type="text"
                            className="border border-[#C8C8C8] rounded-[6px] outline-none p-3 bg-[#FFF] w-full"
                          />
                          {errors.cardholderName && (
                            <span className="text-red-500 text-sm">
                              Cardholder name is required.
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 w-full md:w-[45%]">
                          <p className="text-[14px] md:text-[16px] font-medium text-[#353B48]">
                            Card number
                          </p>
                          <input
                            {...register("cardNumber", { required: true })}
                            type="text"
                            className="border border-[#C8C8C8] rounded-[6px] outline-none p-3 bg-[#FFF] w-full"
                          />
                          {errors.cardNumber && (
                            <span className="text-red-500 text-sm">
                              Card number is required.
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 w-full md:w-[45%]">
                          <p className="text-[14px] md:text-[16px] font-medium text-[#353B48]">
                            Expiry date
                          </p>
                          <input
                            {...register("expireDate", { required: true })}
                            type="text"
                            className="border border-[#C8C8C8] rounded-[6px] outline-none p-3 bg-[#FFF] w-full"
                          />
                          {errors.expireDate && (
                            <span className="text-red-500 text-sm">
                              Expiry date is required.
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 w-full md:w-[45%]">
                          <p className="text-[14px] md:text-[16px] font-medium text-[#353B48]">
                            CCV
                          </p>
                          <input
                            {...register("ccv", { required: true })}
                            type="text"
                            className="border border-[#C8C8C8] rounded-[6px] outline-none p-3 bg-[#FFF] w-full"
                          />
                          {errors.ccv && (
                            <span className="text-red-500 text-sm">
                              CCV is required.
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-x-2 items-center mt-3">
                        <input
                          type="checkbox"
                          className="h-[18px] w-[18px] rounded-full border border-gray-400 appearance-none checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                        />
                        <img
                          src={Paypal}
                          alt="Paypal"
                          className="w-[80px] md:w-[100px]"
                        />{" "}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8">
                    <h3 className="text-[16px] md:text-[18px] font-normal text-[#000] text-start my-8">
                      Please complete your payment
                    </h3>
                    <div className="flex justify-center">
                      <CheckoutSvg />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="flex justify-center items-center leading-none py-[16px] md:py-[18px] px-[60px] md:px-[90px] mt-[40px] md:mt-[55px] capitalize font-semibold text-[16px] md:text-[18px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer tracking-[0.72px]"
                >
                  Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

const CheckoutSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="117"
    height="117"
    viewBox="0 0 117 117"
    fill="none"
  >
    <path
      d="M58.5 62.1562C42.3723 62.1562 29.25 49.034 29.25 32.9062C29.25 16.7785 42.3723 3.65625 58.5 3.65625C74.6277 3.65625 87.75 16.7785 87.75 32.9062C87.75 49.034 74.6277 62.1562 58.5 62.1562ZM58.5 10.9688C46.4015 10.9688 36.5625 20.8077 36.5625 32.9062C36.5625 45.0048 46.4015 54.8438 58.5 54.8438C70.5985 54.8438 80.4375 45.0048 80.4375 32.9062C80.4375 20.8077 70.5985 10.9688 58.5 10.9688Z"
      fill="url(#paint0_linear_20147_5204)"
    />
    <path
      d="M59.9625 48.2623H57.0375C54.9881 48.2542 52.9957 47.5873 51.3544 46.3601C49.7131 45.1329 48.5099 43.4104 47.9225 41.4471C47.7743 40.983 47.7203 40.4941 47.7637 40.0089C47.8071 39.5237 47.9471 39.0521 48.1753 38.6218C48.4035 38.1914 48.7154 37.811 49.0927 37.5029C49.47 37.1948 49.905 36.9651 50.3723 36.8275C50.8395 36.6899 51.3296 36.647 51.8136 36.7014C52.2977 36.7557 52.766 36.9063 53.1911 37.1442C53.6162 37.3821 53.9894 37.7026 54.2889 38.0867C54.5884 38.4709 54.8081 38.911 54.9352 39.3813C55.2094 40.3063 56.0759 40.9535 57.0375 40.9535H59.9625C60.5448 40.9535 61.1033 40.7221 61.515 40.3104C61.9268 39.8986 62.1581 39.3402 62.1581 38.7579C62.1581 38.1756 61.9268 37.6171 61.515 37.2054C61.1033 36.7936 60.5448 36.5623 59.9625 36.5623H57.0375C51.7944 36.5623 47.5312 32.2955 47.5312 27.0561C47.5312 21.8166 51.7944 17.5498 57.0375 17.5498H59.9625C64.0612 17.5498 67.6808 20.1604 68.9788 24.0506C69.1382 24.5079 69.2051 24.9922 69.1757 25.4756C69.1463 25.9589 69.0212 26.4316 68.8077 26.8662C68.5942 27.3007 68.2964 27.6886 67.9318 28.0072C67.5671 28.3258 67.1428 28.5688 66.6835 28.722C66.2242 28.8753 65.739 28.9358 65.2561 28.9C64.7732 28.8643 64.3022 28.7329 63.8705 28.5136C63.4387 28.2944 63.0549 27.9915 62.7411 27.6227C62.4274 27.2538 62.1901 26.8263 62.0429 26.365C61.8988 25.9272 61.62 25.5462 61.2464 25.2763C60.8727 25.0064 60.4234 24.8615 59.9625 24.8623H57.0375C56.4557 24.8623 55.8977 25.0934 55.4863 25.5048C55.0749 25.9162 54.8438 26.4742 54.8438 27.0561C54.8438 27.6379 55.0749 28.1959 55.4863 28.6073C55.8977 29.0187 56.4557 29.2498 57.0375 29.2498H59.9625C65.2056 29.2498 69.4688 33.5167 69.4688 38.7561C69.4688 43.9955 65.2056 48.2623 59.9625 48.2623Z"
      fill="url(#paint1_linear_20147_5204)"
    />
    <path
      d="M58.5 21.9377C57.5092 21.9377 56.5951 21.5355 55.9041 20.8774C55.7578 20.6946 55.575 20.5118 55.4653 20.2924C55.3204 20.1059 55.209 19.8956 55.1363 19.6708C55.0311 19.4631 54.956 19.2415 54.9132 19.0127C54.8803 18.7568 54.8438 18.5374 54.8438 18.2814C54.8438 17.3308 55.2423 16.3802 55.9041 15.6855C57.2569 14.3327 59.7066 14.3327 61.0959 15.6855C61.7541 16.3802 62.1563 17.3308 62.1563 18.2814C62.1563 18.5374 62.1197 18.7568 62.0795 19.0127C62.0414 19.2422 61.9673 19.4643 61.8601 19.6708C61.7859 19.8949 61.6747 20.105 61.531 20.2924C61.3848 20.5118 61.2385 20.6946 61.0923 20.8774C60.4013 21.5355 59.4506 21.9377 58.5 21.9377ZM58.5 51.1877C57.5092 51.1877 56.5951 50.7855 55.9041 50.1274C55.7578 49.9446 55.575 49.7618 55.4653 49.5424C55.3204 49.3559 55.209 49.1456 55.1363 48.9208C55.0311 48.7131 54.956 48.4915 54.9132 48.2627C54.8803 48.0068 54.8438 47.7874 54.8438 47.5314C54.8438 46.5808 55.2423 45.6302 55.9041 44.9355C57.2569 43.5827 59.7066 43.5827 61.0959 44.9355C61.7541 45.6302 62.1563 46.5808 62.1563 47.5314C62.1563 47.7874 62.1197 48.0068 62.0795 48.2627C62.0414 48.4922 61.9673 48.7143 61.8601 48.9208C61.7859 49.1449 61.6747 49.355 61.531 49.5424C61.3848 49.7618 61.2385 49.9446 61.0923 50.1274C60.4013 50.7855 59.4506 51.1877 58.5 51.1877ZM65.8125 113.344H7.3125C6.3428 113.344 5.41282 112.959 4.72714 112.273C4.04146 111.587 3.65625 110.657 3.65625 109.688V76.7814C3.65625 75.8125 4.04016 74.8802 4.72753 74.1965C5.58309 73.3373 13.3563 65.8127 21.9375 65.8127C29.0453 65.8127 38.2151 71.1837 41.2973 73.1252H58.5C60.1004 73.1276 61.6809 73.4797 63.1309 74.1569C64.5809 74.834 65.8655 75.8199 66.8946 77.0455C67.9238 78.2711 68.6726 79.7067 69.0889 81.252C69.5051 82.7973 69.5786 84.4149 69.3042 85.9915L98.1557 73.9698C99.8222 73.2736 101.635 73.0004 103.433 73.1745C105.23 73.3487 106.957 73.9648 108.459 74.9679C109.963 75.9679 111.196 77.3245 112.049 78.9169C112.901 80.5092 113.346 82.2878 113.344 84.0939C113.344 84.7331 113.177 85.3611 112.858 85.9154C112.54 86.4696 112.082 86.9308 111.53 87.2529L67.6553 112.847C67.0957 113.172 66.4599 113.344 65.8125 113.344ZM10.9688 106.031H64.8217L105.552 82.2731C105.268 81.7835 104.875 81.3656 104.404 81.0519C103.906 80.7134 103.33 80.5055 102.73 80.4473C102.13 80.3892 101.525 80.4827 100.971 80.7192L67.2238 94.7812C66.7765 94.9669 66.2969 95.0626 65.8125 95.0627H36.5625C35.5928 95.0627 34.6628 94.6775 33.9771 93.9918C33.2915 93.3061 32.9063 92.3761 32.9063 91.4064C32.9063 90.4367 33.2915 89.5068 33.9771 88.8211C34.6628 88.1354 35.5928 87.7502 36.5625 87.7502H58.5C59.4414 87.7081 60.3303 87.3045 60.9816 86.6234C61.6329 85.9423 61.9964 85.0363 61.9964 84.0939C61.9964 83.1516 61.6329 82.2456 60.9816 81.5645C60.3303 80.8834 59.4414 80.4798 58.5 80.4377H40.2188C39.4985 80.4377 38.7892 80.222 38.1895 79.8271C35.3925 77.9624 27.0087 73.1252 21.9375 73.1252C17.9522 73.1252 13.3563 76.3427 10.9688 78.3865V106.031Z"
      fill="url(#paint2_linear_20147_5204)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_20147_5204"
        x1="30.6429"
        y1="3.65625"
        x2="88.3171"
        y2="5.59649"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBA514" />
        <stop offset="0.345" stopColor="#EEB609" />
        <stop offset="1" stopColor="#FCC201" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_20147_5204"
        x1="48.0536"
        y1="17.5498"
        x2="69.6934"
        y2="18.0698"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBA514" />
        <stop offset="0.345" stopColor="#EEB609" />
        <stop offset="1" stopColor="#FCC201" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_20147_5204"
        x1="6.26786"
        y1="14.6709"
        x2="114.378"
        y2="18.7139"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBA514" />
        <stop offset="0.345" stopColor="#EEB609" />
        <stop offset="1" stopColor="#FCC201" />
      </linearGradient>
    </defs>
  </svg>
);
