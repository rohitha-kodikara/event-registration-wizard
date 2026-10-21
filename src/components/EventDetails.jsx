import React from 'react'
import EventCard from './EventCard'
import EventButton from './EventButton'
import { ArrowRight } from 'lucide-react'

const EventDetails = () => {
  return (
<EventCard 
 >
        <form className="mt-7 space-y-4">
          <div>
            <label
              htmlFor="full-name"
              className="mb-1.5 block text-[15px] font-medium text-[#d8ddda]"
            >
              Full name
            </label>
            <input
              id="full-name"
              type="text"
              placeholder="Kasun Perera"
              className="h-11 w-full rounded-[9px] border border-white/15 bg-[#0b1a2c]/55 px-4 text-[18px] text-[#f1f4f2] placeholder:text-[#8291a3] outline-none transition-colors focus:border-[#4b9bea] focus:ring-1 focus:ring-[#4b9bea]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[15px] font-medium text-[#d8ddda]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue="kasun@email"
              aria-invalid="true"
              className="h-11 w-full rounded-[9px] border border-[#bd4c5a] bg-[#0b1a2c]/55 px-4 text-[18px] font-semibold text-[#f2f4f3] outline-none transition-colors focus:border-[#f07883] focus:ring-1 focus:ring-[#bd4c5a]"
            />
            <p className="mt-2 text-[16px] font-medium text-[#ff6a6a]">
              Please enter a valid email address.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <EventButton bgColor="bg-[#3285df]" icon={<ArrowRight />}>
              Next
            </EventButton>
          </div>
        </form>
     
  </EventCard>
  )
}

export default EventDetails
