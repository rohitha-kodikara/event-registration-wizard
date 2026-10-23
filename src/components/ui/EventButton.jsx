import React from 'react'

const EventButton = ({children, icon,bgColor, iconPosition = 'after',onClick}) => {
  return (
    <button
            onClick={onClick}
              type="button"
              className={`cursor-pointer inline-flex h-11 items-center gap-2 rounded-[10px] ${bgColor} px-5 text-[17px] font-semibold text-white  transition-colors hover:bg-[#4395ed] focus:outline-none `}
            >
               {iconPosition === 'before' && icon}
              {children}
              {iconPosition === 'after' && icon}
            </button>
  )
}

export default EventButton
