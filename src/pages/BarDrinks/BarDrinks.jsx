import Hero from "@/components/Bar/Hero";
import Drinks from "@/components/Bardrinks/Drinks";
import FeaturedDrinks from "@/components/Bardrinks/FeaturedDrinks";
import Premiumdrinks from "@/components/Bardrinks/Premiumdrinks";
import DialogReceipt from "@/components/CustomSection/DialogReceipt";
import { useState } from "react";
import { useParams } from "react-router-dom";

const BarDrinks = () => {
  const barId = useParams();
  const [receipt, setReceipt] = useState(false);
  const tokenData = JSON.parse(localStorage.getItem("usertoken"));
  const token = tokenData?.token;

  return (
    <>
      {}
      <Hero />
      <Drinks barId={barId} receipt={receipt} setReceipt={setReceipt} />
      {token && (
        <>
          <FeaturedDrinks
            barId={barId}
            receipt={receipt}
            setReceipt={setReceipt}
          />
          <Premiumdrinks
            barId={barId}
            receipt={receipt}
            setReceipt={setReceipt}
          />
        </>
      )}
      <DialogReceipt receipt={receipt} setReceipt={setReceipt} />
    </>
  );
};

export default BarDrinks;
