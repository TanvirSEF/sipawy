import MostSelling from "@/Components/CustomComponents/MostSelling";
import Revenue from "@/Components/CustomComponents/Revenue";
import UnderSelling from "@/Components/CustomComponents/UnderSelling";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PurchaseCost from "./PurchaseCost";
import { useState } from "react";

const BarStatistics = () => {
  const [tabValue, setTabValue] = useState("section1");
  return (
    <section className="bg-[#F8F8FF] pt-8 sm:pt-12 px-4 sm:px-6 md:px-10 pb-12 sm:pb-16 min-h-screen">
      <Tabs defaultValue="mostSelling">
        {/* Tabs List */}
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-[30px] w-full">
          <TabsTrigger value="mostSelling">Most Selling</TabsTrigger>
          <TabsTrigger value="underSelling">Under Selling</TabsTrigger>
          <TabsTrigger value="revenue">
            <div
              onClick={() => setTabValue("section1")}
              className="w-full h-full"
            >
              Revenue
            </div>
          </TabsTrigger>
          <TabsTrigger value="purchaseCost">Purchase Cost</TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="mostSelling">
          <MostSelling />
        </TabsContent>
        <TabsContent value="underSelling">
          <UnderSelling />
        </TabsContent>
        <TabsContent value="revenue">
          <Revenue tabValue={tabValue} setTabValue={setTabValue} />
        </TabsContent>
        <TabsContent value="purchaseCost">
          <PurchaseCost />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default BarStatistics;
