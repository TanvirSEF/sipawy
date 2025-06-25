import Homeherobg from "../../assets/images/Homepage/Homebanner.png";
import Container from "../../Shared/Container";
import Herobottle from "../../assets/images/Homepage/Homebannerright.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-x-[104px] relative z-10 pb-[100px] md:pb-[120px] lg:pb-[265px] mx-3">
          <motion.div
            className="pt-[120px] md:pt-[180px] lg:pt-[329px] text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.a
              href=""
              className="border-[0.2px] border-[#DBA514]/30 px-4 py-2 text-[24px] capitalize font-medium font-ITCKabelStd rounded-[32px] text-[#E9B20C] leading-none inline-block"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              Welcome to Sipawayy
            </motion.a>

            <motion.h3
              className="text-[32px] md:text-[36px] lg:text-[48px] text-[#FFF] font-normal font-instrument pt-6 md:pt-7 pb-6 md:pb-10"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              Revolutionizing the Way You Enjoy and Manage Drinks.
            </motion.h3>

            <motion.p
              className="text-base md:text-lg lg:text-[24px] font-normal text-[#FFF] max-w-[600px] mx-auto lg:mx-0"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              Seamless ordering, smart management tools, and real-time updates
              all in one platform built to elevate the alcohol industry.
            </motion.p>

            <motion.button
              className="flex justify-center items-center leading-none py-[14.5px] px-10 md:px-[64px] lg:px-[104px] capitalize font-semibold text-[16px] md:text-[18px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer mt-8 md:mt-12 lg:mt-[60px] mx-auto lg:mx-0"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              Try Today
            </motion.button>
          </motion.div>

          <motion.div
            className="pt-[60px] md:pt-[80px] lg:pt-[245px]  translate-x-0 xl:translate-x-[150px]"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src={Herobottle} alt="Herobottle" />
          </motion.div>
        </div>
      </Container>

      <figure>
        <img
          src={Homeherobg}
          alt="Homeherobg"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>
    </section>
  );
};

export default Hero;
