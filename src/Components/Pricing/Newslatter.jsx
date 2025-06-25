import Newslatterbg from "../../assets/images/Pricing/newslatter.png";
import Container from "../../Shared/Container";
import Newslattercard from "../ReusableComponents/Newslattercard";
import Newscardimage from "../../assets/images/Pricing/newscardimage.png";
import Newscardimage1 from "../../assets/images/Pricing/newscardimage1.png";
import Newscardimage2 from "../../assets/images/Pricing/newscardimage2.png";
import Newscardimage3 from "../../assets/images/Pricing/newscardimage3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Newslatter = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      className="relative py-[50px] lg:pt-[102px] lg:pb-[89px]"
    >
      <div className="mt-6 md:mt-10 overflow-hidden">
        <Container className="relative z-20">
          <motion.h4
            variants={cardVariants}
            transition={{ duration: 0.6 }}
            className="text-[20px] text-[#000] font-normal text-center"
          >
            All News
          </motion.h4>

          <motion.h3
            variants={cardVariants}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[32px] md:text-[48px] text-[#000] font-normal font-instrument pb-10 text-center capitalize pt-2"
          >
            Stay informed via our newsletters
          </motion.h3>

          <Swiper
            slidesPerView={"auto"}
            centeredSlides={false}
            spaceBetween={20}
            pagination={{
              clickable: true,
              renderBullet: function (index, className) {
                return `<span class="${className} custom-bullet"></span>`;
              },
            }}
            modules={[Pagination]}
            className="newslatter !overflow-visible"
          >
            {[
              Newscardimage,
              Newscardimage1,
              Newscardimage2,
              Newscardimage3,
              Newscardimage1,
              Newscardimage,
              Newscardimage1,
              Newscardimage2,
              Newscardimage3,
            ].map((img, i) => (
              <SwiperSlide key={i} className="w-fit pl-3 xl:pl-0">
                <motion.div
                  variants={cardVariants}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Newslattercard
                    imgSrc={img}
                    title={
                      i % 3 === 0
                        ? "Smoke Porter"
                        : i % 3 === 1
                        ? "Craft Beer"
                        : "Irish Red Beer"
                    }
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>

      <figure>
        <img
          src={Newslatterbg}
          alt="Newslatterbg"
          className="absolute top-0 left-0 h-full w-full z-0"
        />
      </figure>
    </motion.section>
  );
};

export default Newslatter;
