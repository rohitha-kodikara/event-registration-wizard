import React, { useMemo, useReducer } from 'react'
import EventDetails from './components/event/details/EventDetails'
import EventTicket from './components/event/ticket/EventTicket'
import EventReview from './components/event/review/EventReview'
import { useState } from 'react'
import {registrationSteps,defaultRegStep,ticketTypes,promoCodes} from './data/data'
import Swal from 'sweetalert2'

const initialEventDetails = {
  //------Initial state for user details and errors-------------
  userDetails: {
    fullName: '',
    email: '',
  },
  currentStep: defaultRegStep,
  userDetailsErrors: {
    fullName: '',
    email: '',
  },  
 //-------------------------------------------------------------
 ticketType: '',
  ticketQuantity: 1,
  promoCode: '',
  ticketInfo: {},
  validateEventTicket: {
    ticketTypeError: '',
    promoCodeError: '',
  },
  appliedPromoCode: '',
}


 //------------------validateDetailsSection------------------------------
function validateDetails(userDetails) {
  const errors = {};
  const fullName = userDetails.fullName.trim();
  const email = userDetails.email.trim();
  const namePattern = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!fullName) {
    errors.fullName = 'Full name is required.';
  } else if (!namePattern.test(fullName)) {
    errors.fullName =
      'Name can contain only letters, spaces, hyphens, and apostrophes.';
  }

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  return errors;
}

//------------------handleTicketSubmission-----------------------
//validate event ticket section
function validateTicketForm(ticketType) {
  const errors = {};

  if (!ticketType) {
    errors.ticketType = 'Please select a ticket type.';
  }

  return errors;
}

  

//---------------------------------------------------------------


function eventReducer(state, action) {
  switch(action.type){
        case "currentStep_increment":
            { const currentIndex = registrationSteps.findIndex(
              (step) => step.name === state.currentStep
            )
            const nextStep = registrationSteps[currentIndex + 1];
            return {
              ...state,
              currentStep: nextStep ? nextStep.name : state.currentStep
            }
        }
        case "currentStep_decrement":
            { const currentIndex = registrationSteps.findIndex(
              (step) => step.name === state.currentStep
            )
            const previousStep = registrationSteps[currentIndex - 1];
            return {
              ...state,
              currentStep: previousStep ? previousStep.name : state.currentStep
            }
        }
        case "validate_user_details":
          {
            const errors = validateDetails(action.payload);
            return {
              ...state,
              userDetailsErrors: {
                fullName: errors.fullName || '',
                email: errors.email || '',
              },
            };
          }
        case "set_user_details":
          {
            return {
              ...state,
              userDetails: {
                ...state.userDetails,
                fullName: action.payload.fullName,
                email: action.payload.email,
              },
            };
          }
        case "validate_ticket_type":
          {
            const errors = validateTicketForm(action.payload.ticketType);
            return {
              ...state,
              validateEventTicket: {
                ...state.validateEventTicket,
                ticketTypeError: errors.ticketType || '',
              },
            };
          }
        case "set_ticket_type":
          {
            return {
              ...state,
              ticketType: action.payload.ticketType,
            };
          }
        case 'increment_ticket_quantity':
          return {
            ...state,
            ticketQuantity: Math.min(state.ticketQuantity + 1, action.payload.max),
          };

        case 'decrement_ticket_quantity':
          return {
            ...state,
            ticketQuantity: Math.max(1, state.ticketQuantity - 1),
          };
        case 'set_promo_code':
          return {
            ...state,
            promoCode: action.payload.promoCode,
          };
          
        case "validate_promo_code":
          {
           
            return {
              ...state,
              validateEventTicket: {
                ...state.validateEventTicket,
                promoCodeError:action.payload.promoCodeError,
              },
            };
          }
        case "clear_prev_promocode_value":
          {
            return {
              ...state,
              appliedPromoCode: '',
            };
          }
        case "store_valid_promocode":
          {
            return {
              ...state,
              appliedPromoCode: action.payload.appliedPromoCode,
            };
          }    
        case "store_all_ticket_info":
          {
            return {
              ...state,
              ticketInfo: action.payload.ticketInfo,
            };
          }
        case "reset_all":
          {
            return {
              ...initialEventDetails,
            };
          }
        default:
        return state;

      }

}

const App = () => {

  const[state,dispatch] = useReducer(eventReducer,initialEventDetails)
 
    
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

  dispatch({ type: 'validate_user_details',payload: state.userDetails });

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



//validate promo code separately because there is a apply button and it has its own errors.
function validatePromocode(promoCode) {
  const normalizedPromoCode = promoCode.trim().toUpperCase();
  const promoCodePattern = /^[A-Z0-9]{1,10}$/;

  if (!normalizedPromoCode) {
    return 'Please enter a promo code.';
  }

  if (!promoCodePattern.test(normalizedPromoCode)) {
    return 'Promo code must contain only letters and numbers and cannot exceed 10 characters.';
  }

  if (!promoCodes.some((promo) => promo.code === normalizedPromoCode)) {
    return 'Invalid promo code. Please try again.';
  }

  return '';
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
    payload: {
      appliedPromoCode: normalizedPromoCode,
    },
  });
}
//------------------handleTicketSubmission-----------------------
function handleTicketSubmission(event) {
  event.preventDefault();
 const ticketErrors = validateTicketForm(state.ticketType);
 const promoCodeError = validatePromocode(state.promoCode);
  dispatch({type:"validate_ticket_type",payload:{ticketType:state.ticketType}});
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


    dispatch({type:"store_all_ticket_info",payload:{ticketInfo:{
      name: state.userDetails.fullName,
      email: state.userDetails.email,
      ticketType: state.ticketType,
      ticketQuantity: state.ticketQuantity,
      promoCode: state.promoCode,
      ticketPrice: ticketUnitPrice,
      promoCodeValue: promoCodeValue,
      promoCodeType: promoCodeType,
    }}});
    handleNextStep();
  }

}
const maxNumOfTickets = 10; // Maximum number of tickets allowed

//get ticket price for calculating total price
 

const priceSummary = useMemo(() => {
  const ticketUnitPrice =
    ticketTypes.find((ticket) => ticket.name === state.ticketType)?.price || 0;

  const subtotal = ticketUnitPrice * state.ticketQuantity;

  const appliedPromo = promoCodes.find(
    (promo) => promo.code === state.appliedPromoCode
  );

  if (!appliedPromo) {
    return {
      subtotal,
      discount: 0,
      totalPrice: subtotal,
    };
  }

  let discount = 0;

  if (appliedPromo.type === 'percent') {
    discount = subtotal * (appliedPromo.value / 100);
  } else if (appliedPromo.type === 'fixed') {
    discount = appliedPromo.value * state.ticketQuantity;
  }

  const totalPrice = Math.max(0, subtotal - discount);

  return {
    subtotal,
    discount,
    totalPrice,
  };
}, [state.ticketType, state.ticketQuantity, state.appliedPromoCode]);

const { subtotal, discount, totalPrice } = priceSummary;


//------------------handleSubmitReview-----------------------
function handleSubmitReview(){
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Submit !"
}).then((result) => {
  if (result.isConfirmed){
     dispatch({type:"reset_all"});
     

   };
});
}

//------------------Reset function--------------------------------
function resetAll(){
  dispatch({type:"reset_all"});
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
      dispatch({ type: 'increment_ticket_quantity', payload: { max: maxNumOfTickets } })
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
