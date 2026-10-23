import React from 'react'
import EventCard from '../../ui/EventCard'
import EventButton from '../../ui/EventButton'
import { ArrowRight } from 'lucide-react'

const EventDetails = ({ 

  handleDetailsSubmission,
  userDetails,
  setUserDetails,
  userDetailsErrors,
  currentStep,
  resetAll }) => {
    
  return (
<EventCard currentStep={currentStep} resetAll={resetAll}
 >
        <form className="mt-7 space-y-4" onSubmit={handleDetailsSubmission}>
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
              className={`h-11 w-full rounded-[9px] border bg-[#0b1a2c]/55 px-4 text-[18px] text-[#f1f4f2] placeholder:text-[#8291a3] outline-none transition-colors ${
              userDetailsErrors.fullName
                ? 'border-[#bd4c5a] focus:border-[#f07883]'
                : 'border-white/15 focus:border-[#4b9bea]'
            }`}
              value={userDetails.fullName}
              onChange={(e) => setUserDetails({...userDetails, fullName: e.target.value})}
            />
            {userDetailsErrors.fullName && (
            <p className="mt-2 text-[16px] font-medium text-[#ff6a6a]">
              {userDetailsErrors.fullName}
            </p>
          )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[15px] font-medium text-[#d8ddda]"
            >
              Email
            </label>
            <input
              value={userDetails.email}
              onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
              id="email"
              type="email"
              placeholder="kasun@email"
               className={`h-11 w-full rounded-[9px] border bg-[#0b1a2c]/55 px-4 text-[18px] text-[#f2f4f3] placeholder:text-[#8291a3] outline-none transition-colors ${
              userDetailsErrors.email
                ? 'border-[#bd4c5a] focus:border-[#f07883]'
                : 'border-white/15 focus:border-[#4b9bea]'
            }`}
            />
             {userDetailsErrors.email && (
            <p className="mt-2 text-[16px] font-medium text-[#ff6a6a]">
              {userDetailsErrors.email}
            </p>
          )}
          </div>

          <div className="flex justify-end pt-2">
            <EventButton  bgColor="bg-[#3285df]" icon={<ArrowRight />} onClick={handleDetailsSubmission}>
              Next
            </EventButton>
          </div>
        </form>
     
  </EventCard>
  )
}

export default EventDetails
