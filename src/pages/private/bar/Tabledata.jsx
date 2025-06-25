import useFetchData from "@/Components/Hooks/Api/UseFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Tabledata = () => {
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const { data } = useFetchData("/api/dashboard/bar/table/index", token);
  console.log(data, "tabledata");

  return (
    <div>
      <section className="px-10 overflow-hidden pb-4 pt-8 border-t">
        <div className="sm:flex items-center justify-between mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2 sm:mb-0">
            Recently added Table
          </h2>
          <button
            type="button"
            className="text-lg font-medium text-[#0E0E0E] bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] py-3.5 px-7 rounded-[6px]"
          >
            View all products
          </button>
        </div>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={false}
          spaceBetween={20}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          modules={[Pagination]}
          className="!overflow-visible"
        >
          {data?.data?.map((product, idx) => (
            <SwiperSlide key={idx} className="!w-fit mb-12">
              <div className="bg-[#fafafa] sm:flex gap-4 items-center text-[#181818] p-[18px] rounded-[6px] w-[250px] sm:w-[450px] border border-[#C8C8C8]">
                <div className="left shrink-0">
                  <figure className="w-full sm:w-[135px] h-full rounded-[6px] sm:border border-[#C8C8C8] flex justify-center items-center mb-2 sm:mb-0">
                    <img
                      src={
                        product?.qr_code
                          ? `${import.meta.env.VITE_BASE_URL}/${
                              product.qr_code
                            }`
                          : ""
                      }
                      alt={product?.table_name}
                      className="px-4 h-[150px] w-[150px]"
                    />
                  </figure>
                </div>
                <div className="right text-sm grow">
                  <h3 className="text-xl font-instrument mb-1 line-clamp-1 tracking-[0.6px]">
                    {product?.name}
                  </h3>
                  <h4>Table: {product?.id}</h4>
                  <h4>
                    Date: {new Date(product?.date).toISOString().split("T")[0]}
                  </h4>
                  <h4>Added by : {product?.added_by}</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Tabledata;
