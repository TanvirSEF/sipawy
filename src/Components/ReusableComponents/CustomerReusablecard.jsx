const CustomerReusablecard = ({ Icon, title, subtitle }) => {
  return (
    <div className="w-full max-w-[277px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[277px] h-auto sm:h-[230px] md:h-[240px] lg:h-[210px] py-6 px-4 border border-[#DBA514]/30 rounded-[8px] flex flex-col items-center cursor-pointer transition-transform hover:scale-[1.02] duration-300">
      <div className="flex justify-center">
        {Icon && <Icon className="h-12 w-auto" />}
      </div>
      <h4 className="text-[16px] md:text-[18px] text-[#fff] font-normal text-center pt-4 pb-2 font-instrument">
        {title}
      </h4>
      <h5 className="text-[13px] md:text-[14px] text-[#fff] font-normal text-center max-w-[90%]">
        {subtitle}
      </h5>
    </div>
  );
};

export default CustomerReusablecard;
