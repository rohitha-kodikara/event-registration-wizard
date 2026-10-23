import React from 'react'
import EventCard from '../../ui/EventCard'
import EventButton from '../../ui/EventButton'
import { ArrowLeft, SendHorizontal } from 'lucide-react'

const EventReview = ({  handlePrevStep,currentStep,totalPrice,discount }) => {
  return (
    <EventCard currentStep={currentStep}>

      <div className="mt-5 space-y-3">
        <div>
          <h2 className="mb-1.5 text-[14px] font-medium text-[#d8ddda]">Your details</h2>
          <div className="rounded-[9px] border border-white/15 bg-[#0b1a2c]/35 px-3.5">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5 text-[14px]">
              <span className="text-[#d8ddda]">Name</span>
              <span className="font-semibold text-[#f1f4f2]">Kasun Perera</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5 text-[14px]">
              <span className="text-[#d8ddda]">Email</span>
              <span className="font-semibold text-[#f1f4f2]">kasun@email.com</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-1.5 text-[14px] font-medium text-[#d8ddda]">Your tickets</h2>
          <div className="rounded-[9px] border border-white/15 bg-[#0b1a2c]/35 px-3.5">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5 text-[14px]">
              <span className="text-[#d8ddda]">Ticket type</span>
              <span className="font-semibold text-[#f1f4f2]">VIP</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5 text-[14px]">
              <span className="text-[#d8ddda]">Quantity</span>
              <span className="font-semibold text-[#f1f4f2]">2 x $45</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5 text-[14px]">
              <span className="text-[#d8ddda]">Promo code</span>
              <span className="font-semibold text-[#16c94a]">SAVE10 (10% off)</span>
            </div>
          </div>
        </div>

        <div className="rounded-[9px] bg-[#0b0f16]/65 px-3.5 py-2.5 text-[14px]">
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[#d8ddda]">Subtotal</span>
            <span className="font-semibold text-[#f1f4f2]">$90</span>
          </div>
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[#d8ddda]">Discount</span>
            <span className="font-semibold text-[#16c94a]">-{discount.toFixed(2)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-2">
            <span className="font-semibold text-[#f1f4f2]">Total</span>
            <span className="font-semibold text-[#d9ebff]">{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-between gap-3">
       <EventButton
        onClick={handlePrevStep} 
        bgColor="bg-gray-700/70" icon={<ArrowLeft />} iconPosition="before">
            Back
       </EventButton>
       <EventButton icon={<SendHorizontal />} bgColor="bg-[#3285df]">
       Submit registration
       </EventButton>
      </div>
   </EventCard>
  )
}

export default EventReview
