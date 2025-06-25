import Container from "../../Shared/Container";
import Missioncard from "../ReusableComponents/Missioncard";
import Missioncard1 from "../../assets/images/Contact/missioncard1.png";
import Missioncard2 from "../../assets/images/Contact/missioncard2.png";
import Missioncard3 from "../../assets/images/Contact/missioncard3.png";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const OurMission = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#FFF] py-[60px] sm:py-[80px] lg:py-[90px]"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.3,
          },
        },
      }}
    >
      <Container>
        <motion.h4
          className="text-[28px] sm:text-[32px] lg:text-[36px] text-[#000] uppercase font-normal font-instrument text-center tracking-[1.44px]"
          variants={cardVariants}
        >
          Our Mission
        </motion.h4>

        <motion.p
          className="text-[#000] text-[16px] font-normal pt-4 sm:pt-5 pb-[40px] sm:pb-[50px] lg:pb-[60px] px-1.5 sm:px-0 text-center max-w-full sm:max-w-[650px] lg:max-w-[850px] mx-auto"
          variants={cardVariants}
        >
          At SipSavvy, our mission is to transform the way people experience the
          alcohol industry. We aim to bridge the gap between customers, bar
          staff, and owners by offering a seamless platform that fosters
          convenience, efficiency, and growth. Through innovative tools and
          real-time updates, we strive to
        </motion.p>

        <div className="flex flex-wrap justify-center gap-y-8 gap-x-[30px] md:gap-x-[50px] lg:gap-x-[70px]">
          {[
            {
              img: Missioncard1,
              title: "Empower customers",
              para: "To enjoy their favorite drinks and discover new experiences effortlessly.",
            },
            {
              img: Missioncard2,
              title: "Support bar staff",
              para: "With streamlined operations and communication tools.",
            },
            {
              img: Missioncard3,
              title: "Drive business success",
              para: "For bar owners with powerful management and marketing solutions.",
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full sm:w-[300px] md:w-[280px] xl:w-[310px] flex justify-center"
            >
              <Missioncard
                imgSrc={card.img}
                imgAlt={card.title}
                title={card.title}
                para={card.para}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
};

export default OurMission;
