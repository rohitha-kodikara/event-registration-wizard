import React, { useMemo } from 'react'
import EventDetails from './components/event/details/EventDetails'
import EventTicket from './components/event/ticket/EventTicket'
import EventReview from './components/event/review/EventReview'
import { useState } from 'react'
import {registrationSteps,defaultRegStep,ticketTypes,promoCodes} from './data/data'
import Swal from 'sweetalert2'


const App = () => {
  // State to manage the current registration step
  const [currentStep, setCurrentStep] = useState(defaultRegStep);

  //-------------------detailsSectionStates----------------------------------
  //name field state from the details section
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
  });

  //setting userDetails errors
  const [userDetailsErrors, setUserDetailsErrors] = useState({
    fullName: '',
    email: '',
  });

  //-------------------ticketSectionStates----------------------------------
  const [ticketType, setTicketType] = useState(''); // Default to the first ticket type
  const [ticketQuantity, setTicketQuantity] = useState(1); 
  const[promoCode, setPromoCode] = useState(''); // State to store the promo code 
  const[ticketInfo, setTicketInfo] = useState({});
const [appliedPromoCode, setAppliedPromoCode] = useState('');

  //event ticket validation
  const[validateEventTicket, setValidateEventTicket] = useState({
    ticketTypeError: '',
    promoCodeError: '',
  })
    
 // Function to handle moving to the next step
 function handleNextStep() {
  setCurrentStep((currentStep) => {
    const currentIndex = registrationSteps.findIndex(
      (step) => step.name === currentStep
    )
    const nextStep = registrationSteps[currentIndex + 1]
    return nextStep ? nextStep.name : currentStep
  })
}

 // Function to handle moving to the previous step
 function handlePrevStep() {
  setCurrentStep((currentStep) => {
    const currentIndex = registrationSteps.findIndex(
      (step) => step.name === currentStep
    )
    const previousStep = registrationSteps[currentIndex - 1]
    return previousStep ? previousStep.name : currentStep
  })
}

 //------------------validateDetailsSection------------------------------
//validating details section
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



 //------------------handleDetailsSubmission------------------------------
function handleDetailsSubmission(event) {
  event.preventDefault();
  const errors = validateDetails(userDetails);

  // errors state eka update karanawa (error nathi field ekata '' )
  setUserDetailsErrors({
    fullName: errors.fullName || '',
    email: errors.email || '',
  });

  // errors nathnam withrak userDetails save karala next step ekata yanawa
  if (Object.keys(errors).length === 0) {
    setUserDetails({
      fullName: userDetails.fullName.trim(),
      email: userDetails.email.trim(),
    });
    handleNextStep();
  }
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

//validate promo code separately because there is a apply button and it has its own errors.
function validatePromocode(promoCode) {
  const normalizedPromoCode = promoCode.trim().toUpperCase();
  const promoCodePattern = /^[A-Z0-9]{1,10}$/;
  let promoCodeError = '';

  if (!normalizedPromoCode) {
    promoCodeError = 'Please enter a promo code.';
  } else if (!promoCodePattern.test(normalizedPromoCode)) {
    promoCodeError =
      'Promo code must contain only letters and numbers and cannot exceed 10 characters.';
  } else if (
    !promoCodes.some((promo) => promo.code === normalizedPromoCode)
  ) {
    promoCodeError = 'Invalid promo code. Please try again.';
  }

  setValidateEventTicket((previousState) => ({
    ...previousState,
    promoCodeError,
  }));

  if (promoCodeError) {
    setAppliedPromoCode('');
    return false;
  }

  setAppliedPromoCode(normalizedPromoCode);
  return true;
}
function handleTicketSubmission(event) {
  event.preventDefault();
 const ticketErrors = validateTicketForm(ticketType);
  // errors state eka update karanawa (error nathi field ekata '' )
  setValidateEventTicket({
    ticketTypeError: ticketErrors.ticketType || '',
    promoCodeError: ticketErrors.promoCode || '',
  });

  if (Object.keys(ticketErrors).length === 0) {

    const ticketUnitPrice = ticketTypes.find((ticket) => ticket.name === ticketType)?.price || 0;
    const promoCodeValue = promoCodes.find((promo) => promo.code === appliedPromoCode)?.value || 0;
    const promoCodeType = promoCodes.find((promo) => promo.code === appliedPromoCode)?.type || null;

    setTicketInfo({
      name: userDetails.fullName,
      email: userDetails.email,
      ticketType: ticketType,
      ticketQuantity: ticketQuantity,
      promoCode: promoCode,
      ticketPrice: ticketUnitPrice,
      promoCodeValue: promoCodeValue,
      promoCodeType: promoCodeType,
    });
    handleNextStep();
  }

}
const maxNumOfTickets = 10; // Maximum number of tickets allowed

//get ticket price for calculating total price
 

const priceSummary = useMemo(() => {
  const ticketUnitPrice =
    ticketTypes.find((ticket) => ticket.name === ticketType)?.price || 0;

  const subtotal = ticketUnitPrice * ticketQuantity;

  const appliedPromo = promoCodes.find(
    (promo) => promo.code === appliedPromoCode
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
    discount = appliedPromo.value * ticketQuantity;
  }

  const totalPrice = Math.max(0, subtotal - discount);

  return {
    subtotal,
    discount,
    totalPrice,
  };
}, [ticketType, ticketQuantity, appliedPromoCode]);

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
     setTicketType('');
  setTicketQuantity(1);
  setPromoCode('');
  setAppliedPromoCode('');
  setUserDetails({
    fullName: '',
    email: '',
  });
  setCurrentStep(defaultRegStep);

   };
});
}

//------------------Reset function--------------------------------
function resetAll(){
   setUserDetails({
    fullName: '',
    email: '',
  });
  setTicketType('');
  setTicketQuantity(1);
  setPromoCode('');
  setAppliedPromoCode('');
  setCurrentStep(defaultRegStep);
}


  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07111f] px-4 py-8 font-sans text-[#f5f7f6]">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#1478d4]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#1b5fb2]/20 blur-3xl" />
     
    {currentStep === 'details' && (
  <EventDetails 
  handleNextStep={handleNextStep} 
  userDetails={userDetails}
  setUserDetails={setUserDetails}
  handleDetailsSubmission={handleDetailsSubmission}
  userDetailsErrors={userDetailsErrors}
  currentStep={currentStep}
  resetAll={resetAll}
  />
)}

{currentStep === 'ticket' && (
  <EventTicket
    handleNextStep={handleNextStep}
    handlePrevStep={handlePrevStep}
    currentStep={currentStep}
    handleTicketSubmission={handleTicketSubmission}
    setTicketType={setTicketType}
    ticketType={ticketType}
    ticketQuantity={ticketQuantity}
    setTicketQuantity={setTicketQuantity}
    maxNumOfTickets={maxNumOfTickets}
    promoCode={promoCode}
    setPromoCode={setPromoCode}
    validateEventTicket={validateEventTicket}
    validatePromocode={validatePromocode}
    totalPrice={totalPrice}
    resetAll={resetAll}
  />
)}

{currentStep === 'review' && (
  <EventReview 
  handlePrevStep={handlePrevStep}
  currentStep={currentStep}
   handleNextStep={handleNextStep}
  subtotal={subtotal}
  discount={discount}
  totalPrice={totalPrice}
  ticketInfo={ticketInfo}
  handleSubmitReview={handleSubmitReview}
  resetAll={resetAll}
  />
)}
    

    </main>
  )
}

export default App
