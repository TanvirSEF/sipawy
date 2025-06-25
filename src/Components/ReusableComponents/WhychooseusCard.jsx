import React from 'react'

const WhychooseusCard = ({Icon, title,subtitle}) => {
  return (
    <div className='bg-[#0F0F0F] p-6 border border-[#EEB609] rounded-[8px] cursor-pointer'>
      {Icon && <Icon className="h-12" />}
      <h4 className="text-[24px] text-[#fff] font-normal pt-[26px] pb-2 font-instrument capitalize">
        {title}
      </h4>
      <h5 className="text-[16px] text-[#fff] font-normal capitalize">
        {subtitle}
      </h5>
    </div>
  )
}

export default WhychooseusCard
