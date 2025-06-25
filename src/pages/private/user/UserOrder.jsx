import { CiLocationOn } from "react-icons/ci";
import "swiper/css";
import "swiper/css/pagination";
import Pagination from "@/Components/CustomComponents/Pagination";
import DialogReceipt from "@/Components/CustomSection/DialogReceipt";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetchData from "@/Components/Hooks/Api/UseFetchData";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const UserOrder = () => {
  const [receipt, setReceipt] = useState(false);

  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;

  const { data: userorder, isLoading: isOrderLoading } = useFetchData(
    "/api/dashboard/user/order/index",
    token
  );
  console.log(userorder);

  const { data: advertise, isLoading: isAdvertiseLoading } = useFetchData(
    "/api/dashboard/bars/advertise",
    token
  );

  // Order pagination logic
  const orderItemsPerPage = 16;
  const orderAllItems = userorder?.data || [];
  const [orderOffset, setOrderOffset] = useState(0);
  const orderEndOffset = orderOffset + orderItemsPerPage;
  const currentOrderItems = orderAllItems.slice(orderOffset, orderEndOffset);
  const orderPageCount = Math.ceil(orderAllItems.length / orderItemsPerPage);
  const handleOrderPageChange = (event) => {
    const newOffset =
      (event.selected * orderItemsPerPage) % orderAllItems.length;
    setOrderOffset(newOffset);
  };

  // Nearby Bars pagination logic
  const barItemsPerPage = 16;
  const barAllItems = advertise?.data || [];
  const [barOffset, setBarOffset] = useState(0);
  const barEndOffset = barOffset + barItemsPerPage;
  const currentBarItems = barAllItems.slice(barOffset, barEndOffset);
  const barPageCount = Math.ceil(barAllItems.length / barItemsPerPage);
  const handleBarPageChange = (event) => {
    const newOffset = (event.selected * barItemsPerPage) % barAllItems.length;
    setBarOffset(newOffset);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex gap-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 lg:pb-0">
      {/* Order History */}
      <section className="px-4 sm:px-6 md:px-10 overflow-hidden pb-2.5 border-b">
        <h2 className="text-xl font-semibold mb-7">Order history</h2>

        {isOrderLoading ? (
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 rounded-md w-[420px] h-[160px]"
              ></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentOrderItems?.length > 0 ? (
                currentOrderItems.map((useritems, index) => (
                  <div
                    key={index}
                    className="bg-[#fafafa] flex gap-2.5 text-[#181818] p-[18px] rounded-[6px] border border-[#C8C8C8]"
                  >
                    <div className="left shrink-0">
                      <figure className="w-[135px] h-full rounded-[6px] border border-[#C8C8C8] flex justify-center items-center">
                        <img
                          src={
                            useritems?.product?.image
                              ? `${import.meta.env.VITE_BASE_URL}/${
                                  useritems?.product?.image
                                }`
                              : "/fallback.jpg"
                          }
                          alt=""
                        />
                      </figure>
                    </div>
                    <div className="right text-sm grow space-y-[14px]">
                      <div>
                        <h3 className="text-xl tracking-[0.6px] font-instrument mb-1 line-clamp-1">
                          {useritems?.product?.name}
                        </h3>
                        <h3 className="text-xl font-semibold">
                          ${useritems?.product?.price}
                        </h3>
                      </div>
                      <p className="line-clamp-3 tracking-[0.42px] text-sm text-[#4E4E4E]">
                        {useritems?.product?.description}
                      </p>
                      <div className="flex flex-col justify-between">
                        <p>Time : {useritems?.shots_time}</p>
                        <p>Date : {useritems?.shots_date}</p>
                        <p>Quantity : {useritems?.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-[#000] text-lg font-medium">
                  No product found.
                </div>
              )}
            </div>

            <Pagination
              itemsLength={orderAllItems.length}
              itemsPerPage={orderItemsPerPage}
              pageCount={orderPageCount}
              onPageChange={handleOrderPageChange}
            />
          </>
        )}
      </section>

      {/* Nearby Bars */}
      <section className="px-4 sm:px-6 md:px-10 overflow-hidden pb-9 border-b">
        <h2 className="text-xl font-semibold mb-7 mt-10">Nearby Bars</h2>

        {isAdvertiseLoading ? (
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 rounded-md w-[393px] h-[250px]"
              ></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
              {currentBarItems?.length > 0 ? (
                currentBarItems.map((item, index) => (
                  <Link key={index} to="/bar">
                    <div className="group rounded-[4px] border-2 border-[#DBA514] flex flex-col group cursor-pointer">
                      <img
                        src={
                          item?.cover_photo
                            ? `${import.meta.env.VITE_BASE_URL}/${
                                item.cover_photo
                              }`
                            : "/fallback.jpg"
                        }
                        alt={item.name}
                        className="w-full"
                      />
                      <div className="px-3 pt-3 pb-[19px] group-hover:bg-black duration-300 ease-in-out cursor-pointer rounded-b-[4px]">
                        <div className="flex gap-x-1">
                          <CiLocationOn className="fill-black h-5 w-5 group-hover:fill-white" />
                          <h3 className="text-[14px] group-hover:text-[#FFF] text-black font-normal">
                            {item.address}
                          </h3>
                        </div>
                        <h2 className="text-[24px] group-hover:text-[#FFF] text-black font-normal pt-2 pb-1 font-instrument">
                          {item.bar_name}
                        </h2>
                        <p className="group-hover:text-[#FFF] text-black text-[16px] font-normal">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Distinctio, laborum!
                        </p>
                        <div className="flex justify-between pt-[14px]">
                          <h4 className="text-[16px] group-hover:text-[#FFF] text-black font-normal font-instrument flex gap-x-1 items-center">
                            {renderStars(item.rating)}
                          </h4>
                          <p className="text-[16px] group-hover:text-[#FFF] text-black font-normal">
                            {item.opening_time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-[#000] text-lg font-medium">
                  No bars found.
                </div>
              )}
            </div>

            <Pagination
              itemsLength={barAllItems.length}
              itemsPerPage={barItemsPerPage}
              pageCount={barPageCount}
              onPageChange={handleBarPageChange}
            />
          </>
        )}
      </section>

      {/* Receipt Dialog */}
      <DialogReceipt receipt={receipt} setReceipt={setReceipt} />
    </section>
  );
};

export default UserOrder;
