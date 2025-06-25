import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import useFetchData from "../Hooks/Api/UseFetchData";
import { MainContext } from "../Context/ChartInfoContext";
import useAxios from "../Hooks/Api/UseAxios";

const ProductSellCard = ({ className, onSelect, ...props }) => {
  const axiosinstance = useAxios();
  const { setChartInfo, selectdate } = useContext(MainContext);
  const [selectedid, setSelectedid] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 16;

  const tokenData = JSON.parse(localStorage.getItem("usertoken"));
  const token = tokenData?.token;

  const { data: most_selling, isLoading } = useFetchData(
    "/api/dashboard/bar/products/most-selling",
    token
  );
  const { data: under_selling } = useFetchData(
    "/api/dashboard/bar/products/under-performing",
    token
  );

  const combinedData = most_selling?.data || under_selling?.data;

  useEffect(() => {
    const handleChartInfo = async (id) => {
      if (!selectdate || !id) return;

      try {
        const response = await axiosinstance.get(
          `/api/dashboard/bar/products/sales-statistics-chart?date=${selectdate}&product_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const customizedData = response.data.data.map((item) => ({
          date: item.date.split("-")[2],
          sales: item.sales,
        }));
        setChartInfo(customizedData);
      } catch (error) {
        console.error("Error fetching chartinfo data:", error);
      }
    };

    if (selectedid) handleChartInfo(selectedid);
  }, [selectdate, selectedid]);

  const offset = currentPage * itemsPerPage;
  const currentPageData = combinedData?.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(combinedData?.length / itemsPerPage);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-wrap gap-4 justify-between w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-md w-[380px]  h-[160px]"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[22px]">
          {currentPageData?.map((mostselling, index) => (
            <div
              key={index}
              className={cn(
                "p-[18px] rounded-[6px] border border-[#DBA514] bg-[#FAFAFA] grid grid-cols-3 gap-5 xl:gap-3 cursor-pointer items-center",
                className
              )}
              {...props}
              onClick={() => {
                onSelect(index + offset);
                setSelectedid(mostselling?.id);
              }}
            >
              <div className="left p-3 border border-[#C8C8C8] rounded-[6px]">
                <figure className="w-full h-full overflow-hidden">
                  <img
                    src={
                      mostselling?.image
                        ? `${import.meta.env.VITE_BASE_URL}/${
                            mostselling.image
                          }`
                        : "/fallback.jpg"
                    }
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                </figure>
              </div>
              <div className="right col-span-2">
                <h4 className="text-[22px] tracking-[0.668px] font-instrument mb-1 capitalize">
                  {mostselling?.name}
                </h4>
                <p>Id: #{mostselling?.product_id}</p>
                <p className="text-2xl font-semibold tracking-[0.668px]">
                  ${mostselling?.selling_price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={
            "flex justify-center gap-2 mt-6 cursor-pointer w-full"
          }
          pageClassName={"px-3 py-1 border rounded hidden sm:flex"}
          activeClassName={"bg-[#DBA514] text-white"}
          previousClassName={"px-3 py-1 border rounded"}
          nextClassName={"px-3 py-1 border rounded"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
    </>
  );
};

export default ProductSellCard;
