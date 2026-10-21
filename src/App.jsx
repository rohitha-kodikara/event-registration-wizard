import React from 'react'
import EventDetails from './components/EventDetails'
import EventTicket from './components/EventTicket'
import EventReview from './components/EventReview'
import EventCard from './components/EventCard'

const App = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07111f] px-4 py-8 font-sans text-[#f5f7f6]">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#1478d4]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#1b5fb2]/20 blur-3xl" />

      <EventDetails />
      <EventTicket />
      <EventReview />

    </main>
  )
}

export default App
