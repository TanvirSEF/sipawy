import About from "../../components/Home/About";
import Customer from "../../components/Home/Customer";
import Enjoyment from "../../components/Home/Enjoyment";
import Hero from "../../components/Home/Hero";
import Pricingplan from "../../components/Home/Pricingplan";
import Whychooseus from "../../components/Home/Whychooseus";

function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <About />
      <Customer />
      <Whychooseus />
      <Enjoyment />
      <Pricingplan />
    </div>
  );
}

export default Home;
