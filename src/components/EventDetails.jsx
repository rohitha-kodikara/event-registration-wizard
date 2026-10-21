import React from 'react'

const EventDetails = () => {
  return (


      <section className="relative w-full max-w-[650px] rounded-2xl border border-white/15 bg-[#142235]/60 px-7 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-8 sm:py-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[23px] font-semibold tracking-[-0.02em] text-[#f4f6f5]">
            Event registration
          </h1>

          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-2 rounded-[10px] border border-white/20 bg-white/5 px-3 py-2 text-[15px] font-semibold text-[#f0f2f1] transition-colors hover:border-white/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#4b9bea] focus:ring-offset-2 focus:ring-offset-[#142235]"
          >
            <svg
              aria-hidden="true"
              className="h-[17px] w-[17px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 11a8.1 8.1 0 0 0-14.7-4.7L3 8m0 0V3m0 5h5M4 13a8.1 8.1 0 0 0 14.7 4.7L21 16m0 0v5m0-5h-5" />
            </svg>
            Reset
          </button>
        </div>

        <nav aria-label="Registration progress" className="mt-7">
          <ol className="flex items-center">
            <li className="flex min-w-0 flex-1 items-center">
              <div className="flex shrink-0 items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0c438a] text-sm text-[#d9ebff] ring-1 ring-[#1164bd]">
                  1
                </span>
                <span className="text-[15px] font-semibold text-[#f0f2f1]">Details</span>
              </div>
              <span className="mx-3 h-[2px] min-w-5 flex-1 bg-white/15 sm:mx-4" />
            </li>

            <li className="flex min-w-0 flex-1 items-center">
              <div className="flex shrink-0 items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a1727]/80 text-sm text-[#8e9aaa]">
                  2
                </span>
                <span className="text-[15px] text-[#858b87]">Ticket</span>
              </div>
              <span className="mx-3 h-[2px] min-w-5 flex-1 bg-white/15 sm:mx-4" />
            </li>

            <li className="flex items-center">
              <div className="flex shrink-0 items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a1727]/80 text-sm text-[#8e9aaa]">
                  3
                </span>
                <span className="text-[15px] text-[#858b87]">Review</span>
              </div>
            </li>
          </ol>
        </nav>

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
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-[#3285df] px-5 text-[17px] font-semibold text-white shadow-[0_8px_20px_rgba(50,133,223,0.25)] transition-colors hover:bg-[#4395ed] focus:outline-none focus:ring-2 focus:ring-[#75b8f5] focus:ring-offset-2 focus:ring-offset-[#142235]"
            >
              Next
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </form>
      </section>
  
  )
}

export default EventDetails
