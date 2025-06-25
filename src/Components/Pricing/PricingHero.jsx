import Planbg from "../../assets/images/Homepage/Pricingplan.png";
import Container from "../../Shared/Container";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PricingCard from "../ReusableComponents/PricingCard";
import { motion, AnimatePresence } from "framer-motion";

const PricingHero = () => {
  return (
    <section className="relative pb-[50px] pt-[150px] sm:pt-[207px] lg:pb-[138px] px-3">
      <Container className="relative z-20">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-[48px] text-white font-normal font-instrument md:pt-4 pb-4 md:pb-5 text-center capitalize leading-snug"
        >
          Flexible <span className="text-[#EEB609]"> Pricing Packages</span> to
          Suit Your Needs
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base md:text-lg lg:text-[24px] font-normal text-white text-center pt-4 md:pt-6 pb-10 md:pb-[50px] px-4 md:px-20 lg:px-[120px]"
        >
          Choose the right package for responding to Alcohol orders. Whether you
          need a set number of responses or unlimited access, we have options
          that fit your workflow.
        </motion.p>

        <Tabs>
          <TabList className="w-fit mx-auto border-b-[1px] border-[rgba(251,251,255,0.23)] flex justify-center pb-[10px]">
            <Tab className="text-white rounded-md cursor-pointer px-4 py-1 text-sm md:text-base">
              For User
            </Tab>
            <Tab className="text-white rounded-md cursor-pointer px-4 py-1 text-sm md:text-base">
              For Staff
            </Tab>
          </TabList>

          <TabPanel className="mt-8 md:mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key="user-panel"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4 md:gap-x-6"
              >
                <PricingCard customBG="bg-[#444]" title="Basic" />
                <PricingCard customBG="bg-[#232323]" title="Monthly" />
                <PricingCard customBG="bg-[#0F0F0F]" title="Annual" />
              </motion.div>
            </AnimatePresence>
          </TabPanel>

          <TabPanel className="mt-8 md:mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key="staff-panel"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4 md:gap-x-6"
              >
                <PricingCard customBG="bg-[#444]" title="Basic" />
                <PricingCard customBG="bg-[#232323]" title="Monthly" />
                <PricingCard customBG="bg-[#0F0F0F]" title="Annual" />
              </motion.div>
            </AnimatePresence>
          </TabPanel>
        </Tabs>
      </Container>

      <figure>
        <img
          src={Planbg}
          alt="Planbg"
          className="absolute top-0 left-0 h-full w-full z-0"
        />
      </figure>
    </section>
  );
};

export default PricingHero;
