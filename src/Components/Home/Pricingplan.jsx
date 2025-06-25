import Planbg from "../../assets/images/Homepage/Pricingplan.png";
import Container from "../../Shared/Container";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PricingCard from "../ReusableComponents/PricingCard";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Pricingplan = () => {
  return (
    <motion.section
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Container className="py-[80px] md:pt-[112px] ] lg:pb-[159px] relative z-20 px-3">
        <div className="flex justify-center">
          <a
            href="#"
            className="border-[0.2px] border-[#DBA514]/30 px-4 py-2 text-[16px] sm:text-[18px] md:text-[20px] capitalize font-medium font-ITCKabelStd rounded-[32px] text-[#E9B20C] leading-none"
          >
            Subscription
          </a>
        </div>

        <h3 className="text-[30px] sm:text-[36px] md:text-[48px] text-[#FFF] font-normal font-instrument pt-6 sm:pt-7 pb-4 sm:pb-5 text-center capitalize">
          Our Pricing Plan
        </h3>

        <Tabs>
          <TabList className="w-fit mx-auto border-b-[1px] border-[rgba(251,251,255,0.23)] flex justify-center flex-wrap gap-y-2 pb-[10px]">
            <Tab className="text-white rounded-md cursor-pointer px-4">
              For User
            </Tab>
            <Tab className="text-white rounded-md cursor-pointer px-4">
              For Staff
            </Tab>
          </TabList>

          <TabPanel className="mt-10">
            <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-y-0 sm:gap-x-[27px] justify-center items-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`user-${i}`}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariants}
                  viewport={{ once: true }}
                >
                  <PricingCard
                    customBG={
                      i === 0
                        ? "bg-[#444]"
                        : i === 1
                        ? "bg-[#232323]"
                        : "bg-[#0F0F0F]"
                    }
                    title={i === 0 ? "Basic" : i === 1 ? "Monthly" : "Annual"}
                  />
                </motion.div>
              ))}
            </div>
          </TabPanel>

          <TabPanel className="mt-10">
            <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-y-0 sm:gap-x-[27px] justify-center items-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`staff-${i}`}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariants}
                  viewport={{ once: true }}
                >
                  <PricingCard
                    customBG={
                      i === 0
                        ? "bg-[#444]"
                        : i === 1
                        ? "bg-[#232323]"
                        : "bg-[#0F0F0F]"
                    }
                    title={i === 0 ? "Basic" : i === 1 ? "Monthly" : "Annual"}
                  />
                </motion.div>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </Container>

      <figure>
        <img
          src={Planbg}
          alt="Planbg"
          className="absolute top-0 left-0 h-full w-full z-0 object-cover"
        />
      </figure>
    </motion.section>
  );
};

export default Pricingplan;
