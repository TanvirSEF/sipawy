import ProductSellCard from "@/Components/CustomComponents/ProductSellCard";
import SalesChart from "@/Components/CustomComponents/SalesChart";
import { useContext, useState } from "react";
import useFetchData from "../Hooks/Api/UseFetchData";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dateformatter } from "@/Shared/Dateformatter";
import { MainContext } from "../Context/ChartInfoContext";

const MostSelling = () => {
  const [graph1, setGraph1] = useState(false);
  const { selectdate, setSelectdate } = useContext(MainContext);

  const tokenData = JSON.parse(localStorage.getItem("usertoken"));
  const token = tokenData?.token;

  const { data: most_selling } = useFetchData(
    "/api/dashboard/bar/products/most-selling",
    token
  );

  const [date, setDate] = useState(new Date());
  const formatedate = Dateformatter(date);
  console.log(formatedate);
  setSelectdate(formatedate);
  console.log(selectdate);

  return (
    <>
      <h2 className="text-xl font-semibold mt-10 mb-6">Most selling</h2>
      <section className="space-y-9">
        <div className="">
          <ProductSellCard
            onSelect={(index) => setGraph1(graph1 === index ? false : index)}
          />
        </div>
        {/* <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-6 py-4 leading-none rounded-md hover:shadow-xl cursor-pointer w-[204px]"
          >
            View all
          </button>
        </div> */}
        {graph1 !== false && (
          <section className="bg-[#F8F8FF] border border-[#DBA514] rounded-md overflow-hidden py-8 px-6 sm:px-12">
            <div className="sm:flex justify-between">
              <h3 className="text-2xl font-bold font-poppins py-3 sm:py-0 sm:mb-8 capitalize">
                {most_selling?.data?.[graph1]?.name}
              </h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[220px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <SalesChart className="bg-transparent" gold={true} />
          </section>
        )}
      </section>
    </>
  );
};

export default MostSelling;
