import React, { useMemo, useReducer } from 'react'
import Swal from 'sweetalert2'

import EventDetails from './components/event/details/EventDetails'
import EventTicket from './components/event/ticket/EventTicket'
import EventReview from './components/event/review/EventReview'

import { ticketTypes, promoCodes } from './data/data'
import { eventReducer, initialEventDetails } from './reducers/eventReducer'
import {
  validateDetails,
  validateTicketForm,
  validatePromocode,
} from './utils/validators'
import { calculatePriceSummary } from './utils/priceCalculator'

const App = () => {
  const [state, dispatch] = useReducer(eventReducer, initialEventDetails)

  // Function to handle moving to the next step
  function handleNextStep() {
    dispatch({ type: 'currentStep_increment' });
  }

  // Function to handle moving to the previous step
  function handlePrevStep() {
    dispatch({ type: 'currentStep_decrement' });
  }

  //------------------handleDetailsSubmission------------------------------
  function handleDetailsSubmission(event) {
    event.preventDefault();
    const errors = validateDetails(state.userDetails);

    dispatch({ type: 'validate_user_details', payload: state.userDetails });

    // errors nathnam withrak userDetails save karala next step ekata yanawa
    if (Object.keys(errors).length === 0) {
      dispatch({
        type: 'set_user_details',
        payload: {
          fullName: state.userDetails.fullName.trim(),
          email: state.userDetails.email.trim(),
        },
      });
      handleNextStep();
    }
  }

  //-----------------handleApplyPromoCode----------------------------------
  function handleApplyPromoCode(promoCode) {
    const normalizedPromoCode = promoCode.trim().toUpperCase();
    const promoCodeError = validatePromocode(promoCode);

    dispatch({
      type: 'validate_promo_code',
      payload: { promoCodeError },
    });

    if (promoCodeError) {
      dispatch({ type: 'clear_prev_promocode_value' });
      return;
    }

    dispatch({
      type: 'store_valid_promocode',
      payload: { appliedPromoCode: normalizedPromoCode },
    });
  }

  //------------------handleTicketSubmission-----------------------
  function handleTicketSubmission(event) {
    event.preventDefault();
    const ticketErrors = validateTicketForm(state.ticketType);
    const promoCodeError = validatePromocode(state.promoCode);

    dispatch({ type: 'validate_ticket_type', payload: { ticketType: state.ticketType } });
    dispatch({
      type: 'validate_promo_code',
      payload: { promoCodeError },
    });

    if (promoCodeError) {
      dispatch({ type: 'clear_prev_promocode_value' });
      return;
    }

    dispatch({
      type: 'store_valid_promocode',
      payload: { appliedPromoCode: state.promoCode.trim().toUpperCase() },
    });

    if (Object.keys(ticketErrors).length === 0) {
      const ticketUnitPrice = ticketTypes.find((ticket) => ticket.name === state.ticketType)?.price || 0;
      const promoCodeValue = promoCodes.find((promo) => promo.code === state.appliedPromoCode)?.value || 0;
      const promoCodeType = promoCodes.find((promo) => promo.code === state.appliedPromoCode)?.type || null;

      dispatch({
        type: 'store_all_ticket_info',
        payload: {
          ticketInfo: {
            name: state.userDetails.fullName,
            email: state.userDetails.email,
            ticketType: state.ticketType,
            ticketQuantity: state.ticketQuantity,
            promoCode: state.promoCode,
            ticketPrice: ticketUnitPrice,
            promoCodeValue: promoCodeValue,
            promoCodeType: promoCodeType,
          },
        },
      });
      handleNextStep();
    }
  }

  const maxNumOfTickets = 10; // Maximum number of tickets allowed

  // Calculate price summary using useMemo to optimize performance
  const priceSummary = useMemo(
    () =>
      calculatePriceSummary(
        state.ticketType,
        state.ticketQuantity,
        state.appliedPromoCode
      ),
    [state.ticketType, state.ticketQuantity, state.appliedPromoCode]
  )

  const { subtotal, discount, totalPrice } = priceSummary;

  //------------------handleSubmitReview-----------------------
  function handleSubmitReview() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit !',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'reset_all' });
      }
    });
  }

  //------------------Reset function--------------------------------
  function resetAll() {
    dispatch({ type: 'reset_all' });
  }


  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07111f] px-4 py-8 font-sans text-[#f5f7f6]">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#1478d4]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#1b5fb2]/20 blur-3xl" />
     
    {state.currentStep === 'details' && (
  <EventDetails 
  handleNextStep={handleNextStep} 
  userDetails={state.userDetails}
   setUserDetails={(updatedUserDetails) =>
    dispatch({
      type: 'set_user_details',
      payload: {
        fullName: updatedUserDetails.fullName,
        email: updatedUserDetails.email,
      },
    })
  }
  handleDetailsSubmission={handleDetailsSubmission}
  userDetailsErrors={state.userDetailsErrors}
  currentStep={state.currentStep}
  resetAll={resetAll}
  />
)}

{state.currentStep === 'ticket' && (
  <EventTicket
    handleNextStep={handleNextStep}
    handlePrevStep={handlePrevStep}
    currentStep={state.currentStep}
    handleTicketSubmission={handleTicketSubmission}
    setTicketType={(ticketType) => {
      dispatch({
        type: 'set_ticket_type',
        payload: { ticketType },
      });
    }}
    ticketType={state.ticketType}
    ticketQuantity={state.ticketQuantity}
    incrementTicketQuantity={() =>
      dispatch({ type: 'increment_ticket_quantity', 
        payload: { max: maxNumOfTickets } })
    }
    decrementTicketQuantity={() =>
        dispatch({ type: 'decrement_ticket_quantity' })
      }
    maxNumOfTickets={maxNumOfTickets}
    promoCode={state.promoCode}
    setPromoCode={(promoCode) =>
        dispatch({
          type: 'set_promo_code',
          payload: { promoCode },
        })
      }
    validateEventTicket={state.validateEventTicket}
    validatePromocode={validatePromocode}
    totalPrice={totalPrice}
    resetAll={resetAll}
    handleApplyPromoCode={handleApplyPromoCode}
  />
)}

{ state.currentStep === 'review' && (
  <EventReview 
  handlePrevStep={handlePrevStep}
  currentStep={state.currentStep}
   handleNextStep={handleNextStep}
  subtotal={subtotal}
  discount={discount}
  totalPrice={totalPrice}
  ticketInfo={ state.ticketInfo}
  handleSubmitReview={handleSubmitReview}
  resetAll={resetAll}
  />
)}
    

    </main>
  )
}

export default App
