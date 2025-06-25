import Enjoymentbg from "../../assets/images/Homepage/enjoyment.png";
import Container from "../../Shared/Container";
import { motion } from "framer-motion";

const Enjoyment = () => {
  return (
    <motion.section
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Container className="py-[100px] sm:py-[140px] md:py-[170px] relative z-20 mx-3">
        <h3 className="text-[30px] sm:text-[38px] md:text-[48px] text-[#fff] font-normal font-instrument pb-6 sm:pb-8 md:pb-10 capitalize text-center">
          Your Gateway to Effortless Enjoyment
        </h3>

        <p className="text-[16px] sm:text-[20px] md:text-[24px] font-normal text-[#fff] text-center max-w-[800px] mx-auto">
          Explore a world where convenience meets quality, and connections lead
          to unforgettable experiences.
        </p>

        <div className="flex justify-center">
          <button className="flex justify-center items-center leading-none py-[14.5px] px-[40px] sm:px-[55px] md:px-[67px] capitalize font-semibold text-[16px] sm:text-[17px] md:text-[18px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer mt-[40px] sm:mt-[50px] md:mt-[60px] tracking-[0.72px]">
            Get Started Today
          </button>
        </div>
      </Container>

      <figure>
        <img
          src={Enjoymentbg}
          alt="Enjoymentbg"
          className="absolute top-0 left-0 h-full w-full z-0 object-cover"
        />
      </figure>
    </motion.section>
  );
};

export default Enjoyment;
