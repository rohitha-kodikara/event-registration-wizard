import React from 'react'

const EventButton = ({children, icon,bgColor, iconPosition = 'after',}) => {
  return (
    <button
              type="button"
              className={`cursor-pointer inline-flex h-11 items-center gap-2 rounded-[10px] ${bgColor} px-5 text-[17px] font-semibold text-white  transition-colors hover:bg-[#4395ed] focus:outline-none focus:ring-2 focus:ring-[#75b8f5] focus:ring-offset-2 focus:ring-offset-[#142235]`}
            >
               {iconPosition === 'before' && icon}
              {children}
              {iconPosition === 'after' && icon}
            </button>
  )
}

export default EventButton
