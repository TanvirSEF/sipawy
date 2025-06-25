import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import useFetchData from "../Hooks/Api/UseFetchData";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover"; // or correct path
import { Button } from "@/components/ui/button"; // ensure this path matches your button import

import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { MainContext } from "../Context/ChartInfoContext";
import { Dateformatter } from "@/Shared/Dateformatter";
import RevenueChart from "./Revenuechart";
import Pagination from "./Pagination";

const Revenue = ({ tabValue, setTabValue }) => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.tips.value);
  // };

  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const { data: solditem } = useFetchData(
    "/api/dashboard/bar/products/total-item-sold-today",
    token
  );

  const { data: earnings } = useFetchData(
    "/api/dashboard/bar/products/total-earnings-today",
    token
  );
  const { data: paidorders } = useFetchData(
    "/api/dashboard/bar/orders/total-paid-today",
    token
  );
  const { data: handcash } = useFetchData(
    "/api/dashboard/bar/orders/total-cash-today",
    token
  );

  const { data: servedata } = useFetchData(
    "/api/dashboard/bar/order/served",
    token
  );

  const { data: paidorderlist } = useFetchData(
    "/api/dashboard/bar/orders/today-paid-order-list",
    token
  );
  const { data: handcashorderlist } = useFetchData(
    "/api/dashboard/bar/orders/today-handcash-order-list",
    token
  );

  const { selectdate, setSelectdate } = useContext(MainContext);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const formatedate = Dateformatter(date);
    setSelectdate(formatedate);
  }, [date]);

  console.log(selectdate);

  const itemsPerPage = 6;
  const allItems = servedata?.data || [];
  const paidItems = paidorderlist?.data || [];
  const cashItems = handcashorderlist?.data || [];

  const [offsetAll, setOffsetAll] = useState(0);
  const [offsetPaid, setOffsetPaid] = useState(0);
  const [offsetCash, setOffsetCash] = useState(0);

  const endOffsetAll = offsetAll + itemsPerPage;
  const endOffsetPaid = offsetPaid + itemsPerPage;
  const endOffsetCash = offsetCash + itemsPerPage;

  const currentAllItems = allItems.slice(offsetAll, endOffsetAll);
  const currentPaidItems = paidItems.slice(offsetPaid, endOffsetPaid);
  const currentCashItems = cashItems.slice(offsetCash, endOffsetCash);

  const pageCountAll = Math.ceil(allItems.length / itemsPerPage);
  const pageCountPaid = Math.ceil(paidItems.length / itemsPerPage);
  const pageCountCash = Math.ceil(cashItems.length / itemsPerPage);

  const handlePageChangeAll = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allItems.length;
    setOffsetAll(newOffset);
  };

  const handlePageChangePaid = (event) => {
    const newOffset = (event.selected * itemsPerPage) % paidItems.length;
    setOffsetPaid(newOffset);
  };

  const handlePageChangeCash = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cashItems.length;
    setOffsetCash(newOffset);
  };

  return (
    <>
      <Tabs value={tabValue} className="">
        <TabsContent value="section1">
          <h2 className="text-xl font-semibold mt-10 mb-6">Revenue</h2>
          <section className="space-y-7">
            <section className="bg-[#F8F8FF] border border-[#DBA514] rounded-md overflow-hidden py-6 px-2 sm:py-8 sm:px-10 lg:py-10 lg:px-16 xl:px-20">
              <div className="sm:flex justify-between relative z-50 mb-3 mx-2 sm:mx-0 sm:mb-0">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-poppins mb-2 sm:mb-8">
                  Total Revenue
                </h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-[220px] justify-start text-left font-normal ${
                        !date && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      className="bg-white"
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <RevenueChart className="bg-transparent" gold={true} />
              <div className="w-fit mx-auto mt-4 sm:mt-5">
                {/* <p className="text-[#606060] font-medium inline-flex gap-1 items-center mb-5 sm:mb-[22px] p-2 sm:p-2.5 border border-[#C8C8C8] rounded-[8px] text-sm sm:text-base">
                  <GrowthIcon />
                  <span className="text-[#00B69B]">8.5%</span> Up from yesterday
                </p> */}
              </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
              <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
                <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
                  Total Item sold today
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">
                    {solditem?.data?.total_items_sold}
                  </p>
                  <button
                    onClick={() => setTabValue("section2")}
                    className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-4 py-1.5 leading-none rounded-md hover:shadow-xl cursor-pointer"
                  >
                    See details
                  </button>
                </div>
              </div>
              <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
                <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
                  Total Earnings today
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">
                    ${earnings?.data?.total_earnings}
                  </p>
                  <button
                    onClick={() => setTabValue("section2")}
                    className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-4 py-1.5 leading-none rounded-md hover:shadow-xl cursor-pointer"
                  >
                    See details
                  </button>
                </div>
              </div>
              <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
                <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
                  Total paid orders today
                </h4>
                <div className="flex justify-between items-end">
                  <div className="xl:flex items-center text-xl gap-4">
                    <p className="">
                      orders:{" "}
                      <span className="font-semibold">
                        {paidorders?.data?.total_orders}
                      </span>
                    </p>
                    <p className="">
                      Earning:{" "}
                      <span className="font-semibold">
                        ${paidorders?.data?.total_earnings}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => setTabValue("section2")}
                    className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-4 py-1.5 leading-none rounded-md hover:shadow-xl cursor-pointer"
                  >
                    See details
                  </button>
                </div>
              </div>
              <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
                <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
                  Total Hand cash orders today
                </h4>
                <div className="flex justify-between items-end gap-1 sm:gap-0">
                  <div className="xl:flex items-center text-xl gap-4">
                    <p className="">
                      orders:{" "}
                      <span className="font-semibold">
                        {handcash?.data?.total_orders}
                      </span>
                    </p>
                    <p className="">
                      Earning:{" "}
                      <span className="font-semibold">
                        ${handcash?.data?.total_earnings}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => setTabValue("section2")}
                    className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-4 py-1.5 leading-none rounded-md hover:shadow-xl cursor-pointer"
                  >
                    See details
                  </button>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
        <TabsContent value="section2">
          <div className="my-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
                <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
                  Total Earnings today
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">
                    ${earnings?.data?.total_earnings}
                  </p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="mt-12">
              <div className="sm:flex justify-between items-center">
                <h3 className="text-xl font-medium mb-2 sm:mb-0">Served</h3>
                <TabsList className="flex items-center gap-2">
                  <TabsTrigger
                    value="all"
                    className="py-1 w-24 font-itc text-base text-[#0E0E0E] bg-[#E0E0E0] border-0"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="paid"
                    className="py-1 w-24 font-itc text-base text-[#0E0E0E] bg-[#E0E0E0] border-0"
                  >
                    Paid
                  </TabsTrigger>
                  <TabsTrigger
                    value="hand-cash"
                    className="py-1 w-24 font-itc text-base text-[#0E0E0E] bg-[#E0E0E0] border-0"
                  >
                    Hand cash
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-8">
                  {currentAllItems.map((item) => (
                    <div key={item.id}>
                      <div className="bg-[#fafafa] sm:flex gap-2.5 text-[#181818] p-[18px] rounded-[6px] border border-[#C8C8C8]">
                        <div className="left shrink-0">
                          <figure className="w-full sm:w-[135px]  h-[180px] sm:h-full mb-1.5 sm:mb-0 rounded-[6px] border border-[#C8C8C8] flex justify-center items-center overflow-hidden">
                            <img
                              src={
                                item?.product?.image
                                  ? `${import.meta.env.VITE_BASE_URL}/${
                                      item?.product?.image
                                    }`
                                  : "/fallback.jpg"
                              }
                              alt={item.product?.name || "Product Image"}
                              className="object-contain w-full  h-[180px] sm:h-full"
                            />
                          </figure>
                        </div>
                        <div className="right text-sm grow">
                          <h3 className="text-xl tracking-[0.6px] font-instrument mb-2 line-clamp-1 capitalize">
                            {item.product?.name || "Product Name"}
                          </h3>
                          <div className="flex items-center justify-between">
                            <h4>
                              Id: #{item.product?.product_id || item.product_id}
                            </h4>
                            <div className="px-2 rounded-[4px] leading-none border border-[#DBA514]">
                              <p className="text-xs">
                                {item.status === "served" ? "Paid" : "Pending"}
                              </p>
                            </div>
                          </div>
                          <h4>Table: {item.table?.table_name || "N/A"}</h4>
                          <div className="flex sm:block 2xl:flex items-center justify-between">
                            <h4>
                              Date:{" "}
                              {new Date(item.shots_date).toLocaleDateString(
                                "en-GB"
                              )}
                            </h4>
                            <h4>
                              Time:{" "}
                              {new Date(
                                `2025-01-01T${item.shots_time}`
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </h4>
                          </div>
                          <h4 className="mb-3">Quantity: {item.quantity}</h4>
                          <div className="flex sm:block  2xl:flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                              ${item.price?.toLocaleString() || "0"}
                            </h3>
                            <button
                              type="button"
                              className={cn(
                                `border border-transparent block py-1.5 px-6 rounded-[6px] text-center text-base 2xl:text-lg font-medium leading-none tracking-[0.54px] text-[#181818]`,
                                {
                                  "bg-[#C8C8C8] border-[#C8C8C8] text-[#181818]":
                                    item.payment_method !== "cash",
                                  "bg-[#1F1F1F] border-[#1F1F1F] text-white":
                                    item.payment_method === "cash",
                                }
                              )}
                            >
                              {item.payment_method === "cash"
                                ? "Hand Cash"
                                : "Paid"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Pagination
                    itemsLength={allItems.length}
                    itemsPerPage={itemsPerPage}
                    pageCount={pageCountAll}
                    onPageChange={handlePageChangeAll}
                  />
                </div>
              </TabsContent>
              <TabsContent value="paid">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-8">
                  {currentPaidItems.map((item) => (
                    <div key={item.id}>
                      <div className="bg-[#fafafa] sm:flex gap-2.5 text-[#181818] p-[18px] rounded-[6px] border border-[#C8C8C8]">
                        <div className="left shrink-0">
                          <figure className="w-full sm:w-[135px]  h-[180px] sm:h-full mb-1.5 sm:mb-0 rounded-[6px] border border-[#C8C8C8] flex justify-center items-center overflow-hidden">
                            <img
                              src={
                                item?.product?.image
                                  ? `${import.meta.env.VITE_BASE_URL}/${
                                      item?.product?.image
                                    }`
                                  : "/fallback.jpg"
                              }
                              alt={item.product?.name || "Product Image"}
                              className="object-contain w-full  h-[180px] sm:h-full"
                            />
                          </figure>
                        </div>
                        <div className="right text-sm grow">
                          <h3 className="text-xl tracking-[0.6px] font-instrument mb-2 line-clamp-1 capitalize">
                            {item.product?.name || "Product Name"}
                          </h3>
                          <div className="flex items-center justify-between">
                            <h4>
                              Id: #{item.product?.product_id || item.product_id}
                            </h4>
                            <div className="px-2 rounded-[4px] leading-none border border-[#DBA514]">
                              <p className="text-xs">
                                {item.status === "served" ? "Paid" : "Pending"}
                              </p>
                            </div>
                          </div>
                          <h4>Table: {item.table?.table_name || "N/A"}</h4>
                          <div className="flex sm:block  2xl:flex items-center justify-between">
                            <h4>
                              Date:{" "}
                              {new Date(item.shots_date).toLocaleDateString(
                                "en-GB"
                              )}
                            </h4>
                            <h4>
                              Time:{" "}
                              {new Date(
                                `2025-01-01T${item.shots_time}`
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </h4>
                          </div>
                          <h4 className="mb-3">Quantity: {item.quantity}</h4>
                          <div className="flex sm:block  2xl:flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                              ${item.price?.toLocaleString() || "0"}
                            </h3>
                            <button
                              type="button"
                              className={cn(
                                `border border-transparent block py-1.5 px-6 rounded-[6px] text-center text-base 2xl:text-lg font-medium leading-none tracking-[0.54px] text-[#181818]`,
                                {
                                  "bg-[#C8C8C8] border-[#C8C8C8] text-[#181818]":
                                    item.payment_method !== "cash",
                                  "bg-[#1F1F1F] border-[#1F1F1F] text-white":
                                    item.payment_method === "cash",
                                }
                              )}
                            >
                              {item.payment_method === "cash"
                                ? "Hand Cash"
                                : "Paid"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Pagination
                    itemsLength={paidItems.length}
                    itemsPerPage={itemsPerPage}
                    pageCount={pageCountPaid}
                    onPageChange={handlePageChangePaid}
                  />
                </div>
              </TabsContent>
              <TabsContent value="hand-cash">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-8">
                  {currentCashItems.map((item) => (
                    <div key={item.id}>
                      <div className="bg-[#fafafa] sm:flex gap-2.5 text-[#181818] p-[18px] rounded-[6px] border border-[#C8C8C8]">
                        <div className="left shrink-0">
                          <figure className="w-full sm:w-[135px]  h-[180px] sm:h-full mb-1.5 sm:mb-0 rounded-[6px] border border-[#C8C8C8] flex justify-center items-center overflow-hidden">
                            <img
                              src={
                                item?.product?.image
                                  ? `${import.meta.env.VITE_BASE_URL}/${
                                      item?.product?.image
                                    }`
                                  : "/fallback.jpg"
                              }
                              alt={item.product?.name || "Product Image"}
                              className="object-contain w-full  h-[180px] sm:h-full"
                            />
                          </figure>
                        </div>
                        <div className="right text-sm grow">
                          <h3 className="text-xl tracking-[0.6px] font-instrument mb-2 line-clamp-1 capitalize">
                            {item.product?.name || "Product Name"}
                          </h3>
                          <div className="flex items-center justify-between">
                            <h4>
                              Id: #{item.product?.product_id || item.product_id}
                            </h4>
                            <div className="px-2 rounded-[4px] leading-none border border-[#DBA514]">
                              <p className="text-xs">
                                {item.status === "served" ? "Paid" : "Pending"}
                              </p>
                            </div>
                          </div>
                          <h4>Table: {item.table?.table_name || "N/A"}</h4>
                          <div className="flex sm:block  2xl:flex items-center justify-between">
                            <h4>
                              Date:{" "}
                              {new Date(item.shots_date).toLocaleDateString(
                                "en-GB"
                              )}
                            </h4>
                            <h4>
                              Time:{" "}
                              {new Date(
                                `2025-01-01T${item.shots_time}`
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </h4>
                          </div>
                          <h4 className="mb-3">Quantity: {item.quantity}</h4>
                          <div className="flex sm:block  2xl:flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                              ${item.price?.toLocaleString() || "0"}
                            </h3>
                            <button
                              type="button"
                              className={cn(
                                `border border-transparent block py-1.5 px-6 rounded-[6px] text-center text-base 2xl:text-lg font-medium leading-none tracking-[0.54px] text-[#181818]`,
                                {
                                  "bg-[#C8C8C8] border-[#C8C8C8] text-[#181818]":
                                    item.payment_method !== "cash",
                                  "bg-[#1F1F1F] border-[#1F1F1F] text-white":
                                    item.payment_method === "cash",
                                }
                              )}
                            >
                              {item.payment_method === "cash"
                                ? "Hand Cash"
                                : "Paid"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Pagination
                    itemsLength={cashItems.length}
                    itemsPerPage={itemsPerPage}
                    pageCount={pageCountCash}
                    onPageChange={handlePageChangeCash}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Revenue;
