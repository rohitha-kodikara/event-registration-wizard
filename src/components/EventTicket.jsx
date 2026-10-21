import React from 'react'
import EventCard from './EventCard'
import EventButton from './EventButton'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const EventTicket = () => {
  return (
      <EventCard>

        <form className="mt-7 space-y-4">
          <div>
            <label
              htmlFor="ticket-type"
              className="mb-1.5 block text-[15px] font-medium text-[#d8ddda]"
            >
              Ticket type
            </label>
            <select
              id="ticket-type"
              defaultValue="standard"
              className="h-11 w-full rounded-[9px] border border-white/15 bg-[#0b1a2c]/55 px-4 text-[16px] font-semibold text-[#f1f4f2] outline-none transition-colors focus:border-[#4b9bea] focus:ring-1 focus:ring-[#4b9bea]"
            >
              <option value="standard">Standard</option>
            </select>
          </div>

          <div>
            <span className="mb-1.5 block text-[15px] font-medium text-[#d8ddda]">
              Number of tickets
            </span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex h-6 w-9 items-center justify-center rounded-[8px] border border-white/25 text-[18px] text-[#dce5ed]"
              >
                −
              </button>
              <span className="text-[16px] font-semibold text-[#f1f4f2]">2</span>
              <button
                type="button"
                className="flex h-6 w-9 items-center justify-center rounded-[8px] border border-white/25 text-[18px] text-[#dce5ed]"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="promo-code"
              className="mb-1.5 block text-[15px] font-medium text-[#d8ddda]"
            >
              Promo code
            </label>
            <div className="flex gap-2">
              <input
                id="promo-code"
                type="text"
                placeholder="SAVE10"
                className="h-11 min-w-0 flex-1 rounded-[9px] border border-white/15 bg-[#0b1a2c]/55 px-4 text-[16px] text-[#f1f4f2] placeholder:text-[#8291a3] outline-none transition-colors focus:border-[#4b9bea] focus:ring-1 focus:ring-[#4b9bea]"
              />
              <button
                type="button"
                className="h-11 rounded-[9px] border border-white/25 px-4 text-[15px] font-semibold text-[#f1f4f2] transition-colors hover:bg-white/10"
              >
                Apply
              </button>
            </div>
            <p className="mt-1.5 text-[14px] font-medium text-[#ff6a6a]">
              That code isn’t valid. Try another.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-[9px] bg-[#0b0f16]/65 px-4 py-3 text-[14px]">
            <span className="font-medium text-[#d8ddda]">Total</span>
            <span className="text-[17px] font-semibold text-[#f1f4f2]">$40</span>
          </div>

          <div className="flex justify-between pt-1">
           <EventButton bgColor="bg-gray-700/70" icon={<ArrowLeft />} iconPosition="before">
            Back
           </EventButton>
            <EventButton icon={<ArrowRight />} bgColor="bg-[#3285df]">
              Next
            </EventButton>
          </div>
        </form>
      </EventCard>
  )
}

export default EventTicket
