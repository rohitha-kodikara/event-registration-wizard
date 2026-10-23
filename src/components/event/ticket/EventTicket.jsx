
import EventCard from '../../ui/EventCard'
import EventButton from '../../ui/EventButton'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {ticketTypes} from '../../../data/data'

const EventTicket = ({ 
  handleTicketSubmission,
  validateEventTicket, 
  handlePrevStep,
  currentStep,
  setTicketType,
  ticketType,
  ticketQuantity,
  setTicketQuantity,
  maxNumOfTickets,
  promoCode,
  setPromoCode,
  validatePromocode,
  totalPrice,
  resetAll,
  incrementTicketQuantity,
  decrementTicketQuantity,
  handleApplyPromoCode
  }) => {
    
    function handleIncrement() {
      if (ticketQuantity < maxNumOfTickets) {
        incrementTicketQuantity();
      }
    }

    function handleDecrement() {
      decrementTicketQuantity();
    }

    

  return (
      <EventCard currentStep={currentStep} resetAll={resetAll}>

        <form onSubmit={handleTicketSubmission} className="mt-7 space-y-4">
          <div>
            <label
              htmlFor="ticket-type"
              className="mb-1.5 block text-[15px] font-medium text-[#d8ddda]"
            >
              Ticket type
            </label> 
            <select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              name="ticket-type"
              id="ticket-type"
              className="h-11 w-full rounded-[9px] border border-white/15 bg-[#0b1a2c]/55 px-4 text-[16px] font-semibold text-[#f1f4f2] outline-none transition-colors focus:border-[#4b9bea] focus:ring-1 focus:ring-[#4b9bea]"
            >
            <option value="" disabled>
            Select a ticket type
          </option>
              {
                ticketTypes.map((ticketType) => (
                  
                  <option
                    key={ticketType.id}
                    value={ticketType.name}
                    className="bg-[#25183d] text-white"
                  >
                    {ticketType.name}
                  </option>
                ))
              }
            </select>
            <p className="mt-1.5 text-[14px] font-medium text-[#f04d30]">
              {validateEventTicket.ticketTypeError}
            </p>
          </div>

          <div>
            <span className="mb-1.5 block text-[15px] font-medium text-[#d8ddda]">
              Number of tickets
            </span>
            <div className="flex items-center gap-4">
              <EventButton
                bgColor="bg-blue-700/50"
                type="button"
                onClick={handleDecrement}
              >
               <span className="text-[18px] font-extrabold"> −</span>
              </EventButton>
              <span className="text-[16px] font-semibold text-[#f1f4f2]">{ticketQuantity}</span>
              <EventButton
                type="button"
                bgColor="bg-blue-700/50"
               onClick={handleIncrement}
              >
                <span className="text-[18px] font-extrabold">+</span>
              </EventButton>
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
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                id="promo-code"
                type="text"
                placeholder="SAVE10"
                className="h-11 min-w-0 flex-1 rounded-[9px] border border-white/15 bg-[#0b1a2c]/55 px-4 text-[16px] text-[#f1f4f2] placeholder:text-[#8291a3] outline-none transition-colors focus:border-[#4b9bea] focus:ring-1 focus:ring-[#4b9bea]"
              />
              <EventButton
                onClick={() => handleApplyPromoCode(promoCode)}
                type="button"
                bgColor="bg-gray-700/70">
                Apply
              </EventButton>
            </div>
            <p className="mt-1.5 text-[14px] font-medium text-[#f04d30]">
              {validateEventTicket.promoCodeError}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-[9px] bg-[#0b0f16]/65 px-4 py-3 text-[14px]">
            <span className="font-medium text-[#d8ddda]">Total</span>
            <span className="text-[17px] font-semibold text-[#f1f4f2]">{totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between pt-1">
           <EventButton 
           onClick={handlePrevStep}
           bgColor="bg-gray-700/70" icon={<ArrowLeft />} iconPosition="before">
            Back
           </EventButton>
            <EventButton icon={<ArrowRight />} bgColor="bg-[#3285df]"
            onClick={handleTicketSubmission}
            >
              Next
            </EventButton>
          </div>
        </form>
      </EventCard>
  )
}

export default EventTicket
