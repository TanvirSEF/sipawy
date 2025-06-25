import Monthlysalescostcharts from "@/Components/CustomComponents/Monthlysalescostcharts";
import useFetchData from "@/Components/Hooks/Api/UseFetchData";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Dateformatter } from "@/Shared/Dateformatter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { MainContext } from "@/Components/Context/ChartInfoContext";

const PurchaseCost = () => {
  const [costTable, setCostTable] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const { data: purchasecost } = useFetchData(
    "/api/dashboard/bar/products/total-cost-today",
    token
  );
  const { data: purchaseitem } = useFetchData(
    "/api/dashboard/bar/products/total-added-today",
    token
  );

  const inventoryData = purchaseitem?.data;

  const { selectdate, setSelectdate } = useContext(MainContext);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const formatedate = Dateformatter(date);
    setSelectdate(formatedate);
  }, [date]);

  console.log(selectdate);

  return (
    <>
      <h2 className="text-xl font-semibold mt-10 mb-6">Purchase cost</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
          <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
            Total Purchase Cost today
          </h4>
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">
              ${purchasecost?.data?.total_cost}
            </p>
            <button
              type="button"
              onClick={() => setCostTable((prev) => !prev)}
              className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-4 py-1.5 leading-none rounded-md hover:shadow-xl cursor-pointer"
            >
              See details
            </button>
          </div>
        </div>
      </div>
      {costTable ? (
        <div className="container mx-auto mb-8 ">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">All Purchases today</h1>
            {/* <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search here"
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div> */}
          </div>

          <div className="border h-[500px] overflow-y-auto">
            <Table>
              <TableHeader className="bg-black text-white">
                <TableRow>
                  <TableHead className="font-medium py-4 text-nowrap w-[400px]">
                    Product
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Product Id
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Quantity
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Cost
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Selling price
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Date
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Time
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Assigned by
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center">
                    Categories
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Shelf Number
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData?.length > 0 ? (
                  inventoryData?.map((item, index) => (
                    <TableRow
                      key={index}
                      className="border-t border-gray-200 bg-[#FAFAFA]"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2 text-wrap">
                          <figure className="w-13 border py-1 overflow-hidden rounded-[3px] flex-shrink-0">
                            <img
                              src={
                                item?.image
                                  ? `${import.meta.env.VITE_BASE_URL}/${
                                      item.image
                                    }`
                                  : ""
                              }
                              alt="Wine bottle"
                              width={32}
                              height={48}
                              className="object-cover object-center w-full h-full"
                            />
                          </figure>
                          {item?.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        id: {item?.id}
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        Quantity: {item?.quantity}
                      </TableCell>
                      <TableCell className="text-center text-nowrap font-semibold">
                        ${item?.cost}
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        ${item?.selling_price}
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        {item?.date}
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        {item?.time}
                      </TableCell>
                      <TableCell className="text-center">
                        {item?.assigned_by}
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        {item?.category}
                      </TableCell>
                      <TableCell className="text-center text-nowrap font-semibold">
                        {item?.shelf_number}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <section className="bg-[#F8F8FF] border border-[#DBA514] rounded-md overflow-hidden py-8 px-6 sm:px-12">
          <div className="sm:flex justify-between relative z-50">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-poppins py-3 sm:py-0  sm:mb-8">
              Purchase cost
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
          <Monthlysalescostcharts className="bg-transparent" gold={true} />
          {/* <div className="w-fit mx-auto mt-5">
            <p className="text-[#606060] font-medium inline-flex gap-1 items-center mb-[22px] p-2.5 border border-[#C8C8C8] rounded-[8px]">
              <GrowthIcon />
              <span className="text-[#00B69B] ">8.5% </span> Up from yesterday
            </p>
          </div> */}
        </section>
      )}
    </>
  );
};

export default PurchaseCost;
