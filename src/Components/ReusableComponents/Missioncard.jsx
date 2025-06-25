import React from "react";

const Missioncard = ({imgSrc, imgAlt,title,para}) => {
  return (
    <div className="w-[356px]">
      <img src={imgSrc} alt={imgAlt} className="mx-auto" />
        <h5 className="text-[#000] text-[24px] font-normal font-instrument pt-10 text-center">
          {title}
        </h5>
        <p className="text-[#000] text-[16px] font-normal text-center">
          {para}
        </p>
    </div>
  );
};

export default Missioncard;
