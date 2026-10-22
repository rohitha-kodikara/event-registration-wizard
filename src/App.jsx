import React from 'react'
import EventDetails from './components/event/details/EventDetails'
import EventTicket from './components/event/ticket/EventTicket'
import EventReview from './components/event/review/EventReview'
import { useState } from 'react'
import {registrationSteps,defaultRegStep} from './data/data'


const App = () => {
  // State to manage the current registration step
  const [currentStep, setCurrentStep] = useState(defaultRegStep)
  
 
 function handleNextStep() {
  setCurrentStep((currentStep) => {
    const currentIndex = registrationSteps.findIndex(
      (step) => step.name === currentStep
    )

    const nextStep = registrationSteps[currentIndex + 1]

    return nextStep ? nextStep.name : currentStep
  })
}


 function handlePrevStep() {
  setCurrentStep((currentStep) => {
    const currentIndex = registrationSteps.findIndex(
      (step) => step.name === currentStep
    )

    const previousStep = registrationSteps[currentIndex - 1]

    return previousStep ? previousStep.name : currentStep
  })
}


  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07111f] px-4 py-8 font-sans text-[#f5f7f6]">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#1478d4]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#1b5fb2]/20 blur-3xl" />
     
    {currentStep === 'details' && (
  <EventDetails handleNextStep={handleNextStep} />
)}

{currentStep === 'ticket' && (
  <EventTicket
    handleNextStep={handleNextStep}
    handlePrevStep={handlePrevStep}
  />
)}

{currentStep === 'review' && (
  <EventReview handlePrevStep={handlePrevStep} />
)}
    

    </main>
  )
}

export default App
