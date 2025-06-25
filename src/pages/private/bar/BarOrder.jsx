import { useMemo, useState } from "react";
import useFetchData from "@/Components/Hooks/Api/UseFetchData";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "@/Components/Hooks/Api/UseAxios";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BarOrder = () => {
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const { data: orderdata, isLoading } = useFetchData(
    "/api/dashboard/bar/order/pending",
    token
  );

  const { data: orderreadydata } = useFetchData(
    "/api/dashboard/bar/order/ready",
    token
  );

  const { data: servedata } = useFetchData(
    "/api/dashboard/bar/order/served",
    token
  );

  const itemsPerPage = 16;
  const Axiosinstance = useAxios();

  const [currentPageordered, setCurrentPageordered] = useState(1);
  const [currentPageorderready, setCurrentPageorderready] = useState(1);
  const [currentPageorderreadyserved, setCurrentPageorderreadyserved] =
    useState(1);
  const [
    currentPageorderreadyservedreceipt,
    setCurrentPageorderreadyservedreceipt,
  ] = useState(1);

  const [directionordered, setDirectionordered] = useState(0);
  const [directionorderedready, setDirectionorderedready] = useState(0);
  const [directionorderedreadyserved, setDirectionorderedreadyserved] =
    useState(0);

  const [
    directionorderedreadyservedreceipt,
    setDirectionorderedreadyservedreceipt,
  ] = useState(0);

  const totalPagesordered = Math.ceil(
    (orderdata?.data?.length || 0) / itemsPerPage
  );

  const totalPagesorderready = Math.ceil(
    (orderreadydata?.data?.length || 0) / itemsPerPage
  );

  const totalPagesorderreadyserved = Math.ceil(
    (servedata?.data?.length || 0) / itemsPerPage
  );

  const totalPagesorderreadyservedreceipt = Math.ceil(
    (servedata?.data?.length || 0) / itemsPerPage
  );

  const paginatedDataordered = useMemo(() => {
    const start = (currentPageordered - 1) * itemsPerPage;
    return orderdata?.data?.slice(start, start + itemsPerPage);
  }, [orderdata, currentPageordered]);

  const paginatedDataorderready = useMemo(() => {
    const start = (currentPageorderready - 1) * itemsPerPage;
    return orderreadydata?.data?.slice(start, start + itemsPerPage);
  }, [orderreadydata, currentPageorderready]);

  const paginatedDataorderreadyserved = useMemo(() => {
    const start = (currentPageorderreadyserved - 1) * itemsPerPage;
    return servedata?.data?.slice(start, start + itemsPerPage);
  }, [servedata, currentPageorderreadyserved]);

  const paginatedDataorderreadyservedreceipt = useMemo(() => {
    const start = (currentPageorderreadyservedreceipt - 1) * itemsPerPage;
    return servedata?.data?.slice(start, start + itemsPerPage);
  }, [servedata, currentPageorderreadyservedreceipt]);

  const getPaginationGroupOrdered = () => {
    const start = Math.floor((currentPageordered - 1) / 5) * 5;
    return new Array(Math.min(5, totalPagesordered - start))
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  const getPaginationGroupReady = () => {
    const start = Math.floor((currentPageorderready - 1) / 5) * 5;
    return new Array(Math.min(5, totalPagesorderready - start))
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  const getPaginationGroupReadyserved = () => {
    const start = Math.floor((currentPageorderreadyserved - 1) / 5) * 5;
    return new Array(Math.min(5, totalPagesorderreadyserved - start))
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  const getPaginationGroupReadyservedreceipt = () => {
    const start = Math.floor((currentPageorderreadyservedreceipt - 1) / 5) * 5;
    return new Array(Math.min(5, totalPagesorderreadyservedreceipt - start))
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  const queryClient = useQueryClient();

  const updateOrderStatus = useMutation({
    mutationFn: (id) =>
      Axiosinstance.post(
        `/api/dashboard/bar/order/${id}/set-ready`,
        { status: "ready" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Product Ready");
    },
    onError: (error) => {
      console.error("Error while updating order status:", error);
      toast.error("Failed to update product status");
    },
  });

  const handlereadypost = (id) => {
    updateOrderStatus.mutate(id);
  };

  const updatereadyproducts = useMutation({
    mutationFn: (id) =>
      Axiosinstance.post(
        `/api/dashboard/bar/order/${id}/set-served`,
        { status: "served" },
        {
          headers: {
            Authorization: `Bearer${token}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["served"]);
      toast.success("Product Served");
    },
    onError: (error) => {
      toast.error("Failed to update product status", error);
    },
  });

  const handleservedpost = async (id) => {
    updatereadyproducts.mutate(id);
  };

  const handlePrintPDF = (item) => {
    const doc = new jsPDF();
    const product = item?.product;
    let y = 20;

    doc.setFontSize(18);
    doc.text("Receipt", 20, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Product: ${product?.name || "N/A"}`, 20, y);
    y += 10;
    doc.text(`Product ID: #${product?.id || "N/A"}`, 20, y);
    y += 10;
    doc.text(`Payment Method: ${item?.payment_method || "N/A"}`, 20, y);
    y += 10;
    doc.text(`Table: ${item?.table?.table_name || "N/A"}`, 20, y);
    y += 10;
    doc.text(`Date: ${product?.date || "N/A"}`, 20, y);
    y += 10;
    doc.text(`Time: ${product?.time || "N/A"}`, 20, y);
    y += 10;
    doc.text(`Quantity: ${item?.quantity || "N/A"}`, 20, y);
    y += 10;
    doc.text(`Price: $${product?.selling_price || "N/A"}`, 20, y);
    y += 10;

    doc.text("Thank you for your order!", 20, y + 10);
    doc.save(`receipt-${product?.name || "product"}.pdf`);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <PuffLoader
            color="#DBA514"
            size={100}
            className="absolute top-1/2 -translate-x-1/2"
          />
        </div>
      ) : (
        <section className="pt-12  pb-5">
          <section className="px-5 xl:px-8 overflow-hidden pb-2.5">
            <h2 className="text-xl font-semibold mb-6">Ordered</h2>
            <AnimatePresence mode="wait">
              {paginatedDataordered?.length > 0 ? (
                <motion.div
                  key={currentPageordered}
                  initial={{ x: directionordered > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: directionordered > 0 ? -300 : 300, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-between mb-6"
                >
                  {paginatedDataordered.map((orderitems, index) => (
                    <div
                      key={index}
                      className="bg-[#1f1f1f] sm:flex gap-6 xl:gap-2.5 text-white p-[22px] xl:p-[18px] rounded-[6px] border border-[#C8C8C8]"
                    >
                      <div className="left shrink-0">
                        <figure className="w-[238px] sm:w-[135px] h-[190px] sm:h-full mb-1.5 sm:mb-0 p-4 sm:p-0 rounded-[6px] border border-[#DBA514] flex justify-center items-center">
                          <img
                            src={
                              orderitems?.product?.image
                                ? `${import.meta.env.VITE_BASE_URL}/${
                                    orderitems?.product?.image
                                  }`
                                : "/fallback.jpg"
                            }
                            alt=""
                            className="object-cover w-full h-full rounded-[6px]"
                          />
                        </figure>
                      </div>
                      <div className="right text-sm grow">
                        <h3 className="text-xl tracking-[0.6px] font-instrument mb-2 line-clamp-1 capitalize">
                          {orderitems?.product?.name}
                        </h3>
                        <div className="flex items-center justify-between gap-4">
                          <h4>Id: #{orderitems?.product?.id}</h4>
                          <div className="px-2 rounded-[4px] leading-none border border-[#DBA514]">
                            <p className="text-xs">
                              {orderitems?.payment_method}
                            </p>
                          </div>
                        </div>
                        <h4>Table: {orderitems?.table?.table_name}</h4>
                        <div className="flex sm:block 2xl:flex items-center justify-between">
                          <h4>Date: {orderitems?.product?.date}</h4>
                          <h4>Time: {orderitems?.product?.time}</h4>
                        </div>
                        <h4 className="mb-3">
                          Quantity: {orderitems?.quantity}
                        </h4>
                        <div className="flex sm:block 2xl:flex items-center justify-between">
                          <h3 className="text-xl font-semibold flex items-center">
                            ${orderitems?.product?.selling_price}
                          </h3>
                          <button
                            onClick={() => handlereadypost(orderitems.id)}
                            type="button"
                            className="hover:bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] border cursor-pointer border-[#F1B906] block py-1.5 px-6 rounded-[6px] text-center text-lg font-medium leading-none tracking-[0.54px] text-white hover:text-[#0E0E0E] transition-all duration-300 group"
                          >
                            {orderitems?.status}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-data"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-black text-center py-10 w-full col-span-full"
                >
                  No product found.
                </motion.div>
              )}
            </AnimatePresence>

            {paginatedDataordered?.length > 0 && (
              <div className="flex justify-center items-center gap-2 flex-wrap my-2">
                <button
                  disabled={currentPageordered === 1}
                  onClick={() => {
                    setDirectionordered(-1);
                    setCurrentPageordered((prev) => Math.max(prev - 1, 1));
                  }}
                  className="px-3 py-1 text-black cursor-pointer border border-[#DBA514] rounded disabled:opacity-30 hover:bg-black hover:text-white duration-300"
                >
                  Prev
                </button>

                {getPaginationGroupOrdered().map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setDirectionordered(page > currentPageordered ? 1 : -1);
                      setCurrentPageordered(page);
                    }}
                    className={`hidden sm:flex px-3 py-1 rounded border cursor-pointer ${
                      currentPageordered === page
                        ? "bg-[#DBA514] text-black"
                        : "text-black border-[#DBA514]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPageordered === totalPagesordered}
                  onClick={() => {
                    setDirectionordered(1);
                    setCurrentPageordered((prev) =>
                      Math.min(prev + 1, totalPagesordered)
                    );
                  }}
                  className="px-3 py-1 text-black border border-[#DBA514] rounded disabled:opacity-30 cursor-pointer hover:bg-black hover:text-white duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </section>

          <section className="px-5 xl:px-8 overflow-hidden pb-2.5">
            <h2 className="text-xl font-semibold mb-6">Ready</h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPageorderready}
                initial={{
                  x: directionorderedready > 0 ? 300 : -300,
                  opacity: 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: directionorderedready > 0 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-between mb-6"
              >
                {paginatedDataorderready?.length > 0 ? (
                  paginatedDataorderready.map((readyitems, index) => (
                    <div
                      key={index}
                      className="bg-[#1f1f1f] sm:flex gap-6 xl:gap-2.5 text-white p-[22px] xl:p-[18px] rounded-[6px] border border-[#C8C8C8]"
                    >
                      <div className="left shrink-0">
                        <figure className="w-[238px] sm:w-[135px] h-[190px] sm:h-full mb-1.5 sm:mb-0 p-4 sm:p-0 rounded-[6px] border border-[#DBA514] flex justify-center items-center">
                          <img
                            src={
                              readyitems?.product?.image
                                ? `${import.meta.env.VITE_BASE_URL}/${
                                    readyitems?.product?.image
                                  }`
                                : "/fallback.jpg"
                            }
                            alt=""
                            className="object-cover w-full h-full rounded-[6px]"
                          />
                        </figure>
                      </div>
                      <div className="right text-sm grow">
                        <h3 className="text-xl tracking-[0.6px] font-instrument mb-2 line-clamp-1 capitalize">
                          {readyitems?.product?.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <h4>Id: #{readyitems?.product?.id}</h4>
                          <div className="px-2 rounded-[4px] leading-none border border-[#DBA514]">
                            <p className="text-xs">
                              {readyitems?.payment_method}
                            </p>
                          </div>
                        </div>
                        <h4>Table: {readyitems?.table?.table_name}</h4>
                        <div className="flex sm:block 2xl:flex items-center justify-between">
                          <h4>Date: {readyitems?.product?.date}</h4>
                          <h4>Time: {readyitems?.product?.time}</h4>
                        </div>
                        <h4 className="mb-3">
                          Quantity: {readyitems?.quantity}
                        </h4>
                        <div className="flex sm:block 2xl:flex items-center justify-between">
                          <h3 className="text-xl font-semibold flex items-center">
                            ${readyitems?.product?.selling_price}
                          </h3>
                          <button
                            onClick={() => handleservedpost(readyitems.id)}
                            type="button"
                            className={`hover:bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] capitalize cursor-pointer border border-[#F1B906] block py-1.5 px-6 rounded-[6px] text-center text-lg font-medium leading-none tracking-[0.54px] text-white hover:text-[#0E0E0E] transition-all duration-300 group`}
                          >
                            {readyitems?.status}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <motion.div
                    key="no-data"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-black text-center py-10 w-full col-span-full"
                  >
                    No product found.
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {paginatedDataorderready?.length > 0 && (
              <div className="flex justify-center items-center gap-2 flex-wrap my-2">
                <button
                  disabled={currentPageorderready === 1}
                  onClick={() => {
                    setDirectionorderedready(-1);
                    setCurrentPageorderready((prev) => Math.max(prev - 1, 1));
                  }}
                  className="px-3 py-1 text-black cursor-pointer border border-[#DBA514] rounded disabled:opacity-30 hover:bg-black hover:text-white duration-300"
                >
                  Prev
                </button>

                {getPaginationGroupReady().map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setDirectionorderedready(
                        page > currentPageorderready ? 1 : -1
                      );
                      setCurrentPageorderready(page);
                    }}
                    className={`px-3 py-1 rounded border cursor-pointer hidden sm:flex ${
                      currentPageorderready === page
                        ? "bg-[#DBA514] text-black"
                        : "text-black border-[#DBA514]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPageorderready === totalPagesorderready}
                  onClick={() => {
                    setDirectionorderedready(1);
                    setCurrentPageorderready((prev) =>
                      Math.min(prev + 1, totalPagesorderready)
                    );
                  }}
                  className="px-3 py-1 text-black border border-[#DBA514] rounded disabled:opacity-30 cursor-pointer hover:bg-black hover:text-white duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </section>

          <section className="px-5 xl:px-8 overflow-hidden pb-2.5">
            <h2 className="text-xl font-semibold mb-6">Served</h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPageorderreadyserved}
                initial={{
                  x: directionorderedreadyserved > 0 ? 300 : -300,
                  opacity: 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: directionorderedreadyserved > 0 ? -300 : 300,
                  opacity: 0,
                }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-between mb-6"
              >
                {paginatedDataorderreadyserved?.length > 0 ? (
                  paginatedDataorderreadyserved.map((serveitems, index) => (
                    <div
                      key={index}
                      className="bg-[#1f1f1f] sm:flex gap-6 xl:gap-2.5 text-white p-[22px] xl:p-[18px] rounded-[6px] border border-[#C8C8C8]"
                    >
                      <div className="left shrink-0">
                        <figure className="w-[238px] sm:w-[135px] h-[190px] sm:h-full mb-1.5 sm:mb-0 p-4 sm:p-0 rounded-[6px] border border-[#DBA514] flex justify-center items-center">
                          <img
                            src={
                              serveitems?.product?.image
                                ? `${import.meta.env.VITE_BASE_URL}/${
                                    serveitems?.product?.image
                                  }`
                                : "/fallback.jpg"
                            }
                            alt=""
                            className="object-cover w-full h-full rounded-[6px]"
                          />
                        </figure>
                      </div>
                      <div className="right text-sm grow">
                        <h3 className="text-xl tracking-[0.6px] font-instrument mb-2 line-clamp-1 capitalize">
                          {serveitems?.product?.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <h4>Id: #{serveitems?.product?.id}</h4>
                          <div className="px-2 rounded-[4px] leading-none border border-[#DBA514]">
                            <p className="text-xs">
                              {serveitems?.payment_method}
                            </p>
                          </div>
                        </div>
                        <h4>Table: {serveitems?.table?.table_name}</h4>
                        <div className="flex sm:block 2xl:flex items-center justify-between">
                          <h4>Date: {serveitems?.product?.date}</h4>
                          <h4>Time: {serveitems?.product?.time}</h4>
                        </div>
                        <h4 className="mb-3">
                          Quantity: {serveitems?.quantity}
                        </h4>
                        <div className="flex sm:block 2xl:flex items-center justify-between">
                          <h3 className="text-xl font-semibold flex items-center">
                            ${serveitems?.product?.selling_price}
                          </h3>
                          <button
                            onClick={() => handleservedpost(serveitems.id)}
                            type="button"
                            className={`hover:bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] capitalize cursor-pointer border border-[#F1B906] block py-1.5 px-6 rounded-[6px] text-center text-lg font-medium leading-none tracking-[0.54px] text-white hover:text-[#0E0E0E] transition-all duration-300 group`}
                          >
                            {serveitems?.status}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <motion.div
                    key="no-data"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-black text-center py-10 w-full col-span-full"
                  >
                    No product found.
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
            {paginatedDataorderreadyserved?.length > 0 && (
              <div className="flex justify-center items-center gap-2 flex-wrap my-2">
                <button
                  disabled={currentPageorderreadyserved === 1}
                  onClick={() => {
                    setDirectionorderedreadyserved(-1);
                    setCurrentPageorderreadyserved((prev) =>
                      Math.max(prev - 1, 1)
                    );
                  }}
                  className="px-3 py-1 text-black cursor-pointer border border-[#DBA514] rounded disabled:opacity-30 hover:bg-black hover:text-white duration-300"
                >
                  Prev
                </button>

                {getPaginationGroupReadyserved().map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setDirectionorderedreadyserved(
                        page > currentPageorderreadyserved ? 1 : -1
                      );
                      setCurrentPageorderreadyserved(page);
                    }}
                    className={`px-3 py-1 rounded border cursor-pointer hidden sm:flex ${
                      currentPageorderreadyserved === page
                        ? "bg-[#DBA514] text-black"
                        : "text-black border-[#DBA514]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={
                    currentPageorderready === totalPagesorderreadyserved
                  }
                  onClick={() => {
                    setDirectionorderedreadyserved(1);
                    setCurrentPageorderreadyserved((prev) =>
                      Math.min(prev + 1, totalPagesorderreadyserved)
                    );
                  }}
                  className="px-3 py-1 text-black border border-[#DBA514] rounded disabled:opacity-30 cursor-pointer hover:bg-black hover:text-white duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </section>

          <section className="px-5 xl:px-8 overflow-hidden pb-2.5">
            <h2 className="text-xl font-semibold mb-6">Receipt</h2>
            <AnimatePresence mode="wait">
              {paginatedDataorderreadyservedreceipt?.length > 0 ? (
                <motion.div
                  key={currentPageorderreadyservedreceipt}
                  initial={{
                    x: directionorderedreadyservedreceipt > 0 ? 300 : -300,
                    opacity: 0,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    x: directionorderedreadyservedreceipt > 0 ? -300 : 300,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-between mb-6"
                >
                  {paginatedDataorderreadyservedreceipt.map(
                    (serveitems, index) => (
                      <div
                        key={index}
                        className="bg-[#1f1f1f] sm:flex gap-6 xl:gap-2.5 text-white p-[22px] xl:p-[18px] rounded-[6px] border border-[#C8C8C8]"
                      >
                        <div className="left shrink-0">
                          <figure className="w-[238px] sm:w-[135px] h-[190px] sm:h-full mb-1.5 sm:mb-0 p-4 sm:p-0 rounded-[6px] border border-[#DBA514] flex justify-center items-center">
                            <img
                              src={
                                serveitems?.product?.image
                                  ? `${import.meta.env.VITE_BASE_URL}/${
                                      serveitems.product.image
                                    }`
                                  : "/fallback.jpg"
                              }
                              alt=""
                              className="object-cover w-full h-full rounded-[6px]"
                            />
                          </figure>
                        </div>
                        <div className="right text-sm grow">
                          <h3 className="text-xl tracking-[0.6px] font-instrument mb-2 line-clamp-1 capitalize">
                            {serveitems?.product?.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <h4>Id: #{serveitems?.product?.id}</h4>
                            <div className="px-2 rounded-[4px] leading-none border border-[#DBA514]">
                              <p className="text-xs">
                                {serveitems?.payment_method}
                              </p>
                            </div>
                          </div>
                          <h4>Table: {serveitems?.table?.table_name}</h4>
                          <div className="flex sm:block 2xl:flex items-center justify-between">
                            <h4>Date: {serveitems?.product?.date}</h4>
                            <h4>Time: {serveitems?.product?.time}</h4>
                          </div>
                          <h4 className="mb-3">
                            Quantity: {serveitems?.quantity}
                          </h4>
                          <div className="flex sm:block 2xl:flex items-center justify-between">
                            <h3 className="text-xl font-semibold flex items-center">
                              ${serveitems?.product?.selling_price}
                            </h3>
                            <button
                              onClick={() => handlePrintPDF(serveitems)}
                              type="button"
                              className="hover:bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] capitalize cursor-pointer border border-[#F1B906] block py-1.5 px-6 rounded-[6px] text-center text-lg font-medium leading-none tracking-[0.54px] text-white hover:text-[#0E0E0E] transition-all duration-300 group"
                            >
                              print
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="no-data"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-black text-center py-10 w-full col-span-full"
                >
                  No product found.
                </motion.div>
              )}
            </AnimatePresence>

            {paginatedDataorderreadyservedreceipt?.length > 0 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  disabled={currentPageorderreadyservedreceipt === 1}
                  onClick={() => {
                    setDirectionorderedreadyservedreceipt(-1);
                    setCurrentPageorderreadyservedreceipt((prev) =>
                      Math.max(prev - 1, 1)
                    );
                  }}
                  className="px-3 py-1 text-black cursor-pointer border border-[#DBA514] rounded disabled:opacity-30 hover:bg-black hover:text-white duration-300"
                >
                  Prev
                </button>

                {getPaginationGroupReadyservedreceipt().map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setDirectionorderedreadyservedreceipt(
                        page > currentPageorderreadyservedreceipt ? 1 : -1
                      );
                      setCurrentPageorderreadyservedreceipt(page);
                    }}
                    className={`px-3 py-1 rounded border cursor-pointer hidden sm:flex ${
                      currentPageorderreadyservedreceipt === page
                        ? "bg-[#DBA514] text-black"
                        : "text-black border-[#DBA514]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={
                    currentPageorderreadyservedreceipt ===
                    totalPagesorderreadyservedreceipt
                  }
                  onClick={() => {
                    setDirectionorderedreadyservedreceipt(1);
                    setCurrentPageorderreadyservedreceipt((prev) =>
                      Math.min(prev + 1, totalPagesorderreadyservedreceipt)
                    );
                  }}
                  className="px-3 py-1 text-black border border-[#DBA514] rounded disabled:opacity-30 cursor-pointer hover:bg-black hover:text-white duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </section>
      )}
    </>
  );
};

export default BarOrder;
