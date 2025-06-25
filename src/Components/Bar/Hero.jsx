import Bar from "../../assets/images/Bar/barhero.png";
import Container from "../../Shared/Container";
import Barbottle from "../../assets/images/Bar/barbottle.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative pt-[120px] md:pt-[160px] lg:pt-[214px] pb-[80px] md:pb-[100px] lg:pb-[138px] px-3 w-full overflow-hidden">
      <Container className="relative z-20">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="text-center lg:text-left">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-[96px] font-normal text-[#FFF] font-instrument tracking-[3.84px] leading-none"
            >
              Best Bars In Your Area
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg lg:text-[24px] font-normal text-[#E9E9E9] max-w-[600px] p-1 mx-auto lg:mx-0"
            >
              Mauris et tortor sit amet ex sagittis feugiat praesent rutrum,
              lorem ipsum dolor sit amet.
            </motion.p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={Barbottle}
                alt="Barbottle"
                className="max-w-full h-auto md:max-w-[400px] lg:max-w-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </Container>

      <figure>
        <img
          src={Bar}
          alt="Bar"
          className="absolute top-0 left-0 h-full w-full z-0 object-cover"
        />
      </figure>
    </section>
  );
};

export default Hero;
