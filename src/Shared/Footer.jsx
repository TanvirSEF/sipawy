import Container from "./Container";
import Logo from "../assets/images/Logo/Sipawayy.png";

const Footer = () => {
  return (
    <footer className="bg-[#181818] pt-[90px] lg:pt-[141px] pb-[66px] lg:pb-[96px] px-4 xl:px-3">
      <Container>
        <div className="flex flex-wrap justify-between sm:w-[95%] mx-auto lg:w-full gap-y-12 pb-[87px] border-b border-[#B5B5B5]">
          <div className="w-full md:w-[45%] lg:w-auto">
            <figure>
              <img src={Logo} alt="Logo" />
            </figure>
            <p className="text-[16px] font-normal text-[#FFF] pt-[10px] pb-5 max-w-[310px]">
              Sed sit amet nisl in velit viverra bibendum in ac nisi. Etia
              efficitur dui vitae sem rutrum, id pretium nunc varius. Vestibulum 
              hendrerit malesuada .
            </p>
            <div className="flex gap-x-5">
              <div className="w-[47px] h-[47px] rounded-full border border-[#DBA514] flex justify-center items-center hover:bg-[#000] cursor-pointer group">
                <Facebook />
              </div>
              <div className="w-[47px] h-[47px] rounded-full border border-[#DBA514] flex justify-center items-center hover:bg-[#000] cursor-pointer group">
                <Linkedin />
              </div>
              <div className="w-[47px] h-[47px] rounded-full border border-[#DBA514] flex justify-center items-center hover:bg-[#000] cursor-pointer group">
                <Twiter />
              </div>
            </div>
          </div>

          <ul className="flex flex-col gap-[21px] cursor-pointer w-full sm:w-auto">
            <li className="text-[20px] font-medium text-[#FFF]">Our service</li>
            <li className="text-[16px] font-normal text-[#FFF]">About</li>
            <li className="text-[16px] font-normal text-[#FFF]">
              Customer service
            </li>
            <li className="text-[16px] font-normal text-[#FFF]">
              Privacy policy
            </li>
            <li className="text-[16px] font-normal text-[#FFF]">Blog</li>
            <li className="text-[16px] font-normal text-[#FFF]">Contact us</li>
          </ul>

          <ul className="flex flex-col gap-[21px] cursor-pointer w-full sm:w-auto">
            <li className="text-[20px] font-medium text-[#FFF]">Get help</li>
            <li className="text-[16px] font-normal text-[#FFF]">About</li>
            <li className="text-[16px] font-normal text-[#FFF]">
              Customer service
            </li>
            <li className="text-[16px] font-normal text-[#FFF]">
              Privacy policy
            </li>
            <li className="text-[16px] font-normal text-[#FFF]">Blog</li>
            <li className="text-[16px] font-normal text-[#FFF]">Contact us</li>
          </ul>

          <div className="flex flex-col gap-[21px] max-w-[394px] w-full md:w-[90%] lg:w-auto">
            <h5 className="text-[20px] font-medium text-[#FFF]">Subscribe</h5>
            <p className="text-[16px] font-normal text-[#FFF]">
              Sed sit amet nisl in velit viverra bibendum in ac nisi. Etiam
              efficitur dui vitae sem
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your mail address"
                className="outline-none border border-[#DBA514] rounded-[8px] py-[14.5px] pl-6 text-[#888] text-[16px] font-normal w-full pr-[140px]"
              />
              <button className="py-[15px] px-[22px] text-[16px] font-normal capitalize flex justify-center items-center bg-[#EEB609] rounded-[8px] cursor-pointer absolute top-0 right-0 w-[136px]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[16px] font-normal text-[#FFF] capitalize pt-[30px]">
          © 2024 SipSavvy.com, LLC. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

const Facebook = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17.9865 0.160714V3.69643H15.8838C15.1159 3.69643 14.5981 3.85714 14.3302 4.17857C14.0624 4.5 13.9284 4.98214 13.9284 5.625V8.15625H17.8525L17.3302 12.1205H13.9284V22.2857H9.83022V12.1205H6.41504V8.15625H9.83022V5.23661C9.83022 3.57589 10.2945 2.28795 11.2231 1.37277C12.1516 0.457589 13.3883 0 14.9329 0C16.2454 0 17.2633 0.0535714 17.9865 0.160714Z"
      fill="url(#paint0_linear_20015_100)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_20015_100"
        x1="6.69055"
        y1="2.89987e-07"
        x2="18.1081"
        y2="0.199437"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBA514" />
        <stop offset="0.345" stopColor="#EEB609" />
        <stop offset="0.675" stopColor="#C69320" />
        <stop offset="1" stopColor="#FCC201" />
      </linearGradient>
    </defs>
  </svg>
);
const Linkedin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M18.3265 1.90527H21.7L14.33 10.3278L23 21.7908H16.2115L10.894 14.8388L4.81 21.7908H1.4345L9.3175 12.7808L1 1.90527H7.961L12.7675 8.25977L18.3265 1.90527ZM17.1425 19.7718H19.0115L6.9455 3.81777H4.9395L17.1425 19.7718Z"
      fill="url(#paint0_linear_20015_113)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_20015_113"
        x1="1.52381"
        y1="1.90527"
        x2="23.2078"
        y2="2.71232"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBA514" />
        <stop offset="0.345" stopColor="#EEB609" />
        <stop offset="0.675" stopColor="#C69320" />
        <stop offset="1" stopColor="#FCC201" />
      </linearGradient>
    </defs>
  </svg>
);
const Twiter = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M22 5.80021C21.2483 6.1263 20.4534 6.34187 19.64 6.44021C20.4982 5.92753 21.1413 5.12099 21.45 4.17021C20.6436 4.65027 19.7608 4.98851 18.84 5.17021C18.2245 4.50278 17.405 4.05851 16.5098 3.90706C15.6147 3.75562 14.6945 3.90557 13.8938 4.3334C13.093 4.76123 12.4569 5.44274 12.0852 6.27105C11.7135 7.09935 11.6273 8.0276 11.84 8.91021C10.2094 8.82774 8.61444 8.40316 7.15865 7.66407C5.70287 6.92498 4.41885 5.8879 3.39 4.62021C3.02914 5.25038 2.83952 5.96403 2.84 6.69021C2.83872 7.36459 3.00422 8.02883 3.32176 8.62377C3.63929 9.21872 4.09902 9.72592 4.66 10.1002C4.00798 10.0825 3.36989 9.90751 2.8 9.59021V9.64021C2.80489 10.5851 3.13599 11.4993 3.73731 12.2282C4.33864 12.957 5.17326 13.4559 6.1 13.6402C5.74326 13.7488 5.37287 13.806 5 13.8102C4.74189 13.8072 4.48442 13.7838 4.23 13.7402C4.49391 14.553 5.00462 15.2634 5.69107 15.7724C6.37753 16.2814 7.20558 16.5638 8.06 16.5802C6.6172 17.7155 4.83588 18.3351 3 18.3402C2.66574 18.3413 2.33174 18.3213 2 18.2802C3.87443 19.4905 6.05881 20.1329 8.29 20.1302C9.82969 20.1462 11.3571 19.8552 12.7831 19.2743C14.2091 18.6934 15.505 17.8341 16.5952 16.7467C17.6854 15.6593 18.548 14.3656 19.1326 12.9411C19.7172 11.5166 20.012 9.98994 20 8.45021C20 8.28021 20 8.10021 20 7.92021C20.7847 7.33502 21.4615 6.61763 22 5.80021Z"
      fill="url(#paint0_linear_20015_116)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_20015_116"
        x1="2.47619"
        y1="3.84961"
        x2="22.1825"
        y2="4.66398"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBA514" />
        <stop offset="0.345" stopColor="#EEB609" />
        <stop offset="0.675" stopColor="#C69320" />
        <stop offset="1" stopColor="#FCC201" />
      </linearGradient>
    </defs>
  </svg>
);
