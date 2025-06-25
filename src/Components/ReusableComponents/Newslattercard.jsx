import React from 'react'

const Newslattercard = ({imgSrc, imgAlt,title}) => {
  return (
    <div className='rounded-lg bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.14)] max-w-[392px]'>
      
      <img src={imgSrc} alt={imgAlt} className="w-full h-[245px]" />
      <div className="px-3 pt-3 pb-[18px]">
        <h4 className='text-[#000] text-[20px] font-normal'>March 26. 2021</h4>
        <h5 className='text-[#000] text-[24px] font-normal font-instrument'>{title}</h5>
        <p className='text-[#000] text-[16px] font-normal'>Lorem ipsum dolor sit amet.consectetur adipiscing elit. Etiam pharetra</p>
      </div>
    </div>
  )
}

export default Newslattercard
