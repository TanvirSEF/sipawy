import { motion } from "framer-motion";
import Conatctherobg from "../../assets/images/Contact/contactherobg.png";
import Container from "../../Shared/Container";

const Hero = () => {
  return (
    <section className="relative pt-[140px] sm:pt-[180px] md:pt-[220px] lg:pt-[272px] pb-[100px] sm:pb-[140px] md:pb-[180px] lg:pb-[208px]">
      <Container className="relative z-20">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] text-white font-normal font-instrument pb-3 text-center capitalize tracking-wide">
          Let’s Raise a Glass to Connection!
        </h3>

        {/* Animated Line */}
        <motion.div
          className="bg-[#EEB608] h-[2px] mx-auto mt-2"
          initial={{ width: 0 }}
          animate={{ width: "257px" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </Container>

      <figure>
        <img
          src={Conatctherobg}
          alt="Conatctherobg"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      </figure>
    </section>
  );
};

export default Hero;
