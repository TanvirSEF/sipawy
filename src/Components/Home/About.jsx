import { motion } from "framer-motion";
import Container from "../../Shared/Container";
import Aboutbg from "../../assets/images/Homepage/aboutbg.png";

const About = () => {
  return (
    <motion.section
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Container className="py-[80px] md:py-[100px] lg:py-[144px] px-6 md:px-16 lg:pl-[250px] lg:pr-0 mx-2">
        <div className="relative z-20">
          <motion.a
            href="#"
            className="border-[0.2px] border-[#0E0E0E]/30 px-4 py-2 text-[18px] md:text-[20px] capitalize font-medium font-ITCKabelStd rounded-[32px] text-[#000] leading-none inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Welcome to Sipawayy
          </motion.a>

          <motion.h3
            className="text-[28px] md:text-[36px] lg:text-[48px] text-[#000] font-normal font-instrument pt-6 md:pt-7 pb-6 md:pb-10 capitalize"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Your Gateway to Effortless Enjoyment
          </motion.h3>

          <motion.p
            className="text-base md:text-lg lg:text-[24px] font-normal text-[#000] max-w-[900px] mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover a revolutionary platform designed to bring your favorite
            drinks, bars, and events closer to you. Whether you’re a customer
            looking for convenience, a bar staff member aiming to streamline
            orders, or a bar owner ready to boost your business, we’ve got you
            covered.
          </motion.p>

          <motion.button
            className="flex justify-center items-center leading-none py-[14.5px] px-10 md:px-[64px] lg:px-[104px] capitalize font-semibold text-[16px] md:text-[18px] rounded-lg bg-[#000] backdrop-blur-[6.5px] text-[#fff] cursor-pointer mt-8 md:mt-12 lg:mt-[60px] mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Try Today
          </motion.button>
        </div>
      </Container>

      <figure>
        <img
          src={Aboutbg}
          alt="About Background"
          className="absolute top-0 left-0 z-0 h-full w-full object-cover"
        />
      </figure>
    </motion.section>
  );
};

export default About;
