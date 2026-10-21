import React from 'react'

const EventTicket = () => {
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
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#075b1c] text-sm text-[#74e99a] ring-1 ring-[#087b26]">
                  ✓
                </span>
                <span className="text-[15px] text-[#f0f2f1]">Details</span>
              </div>
              <span className="mx-3 h-[2px] min-w-5 flex-1 bg-[#087b26] sm:mx-4" />
            </li>

            <li className="flex min-w-0 flex-1 items-center">
              <div className="flex shrink-0 items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0c438a] text-sm text-[#d9ebff] ring-1 ring-[#1164bd]">
                  2
                </span>
                <span className="text-[15px] font-semibold text-[#f0f2f1]">Ticket</span>
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
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-[9px] border border-white/25 px-4 text-[14px] font-semibold text-[#f1f4f2] transition-colors hover:bg-white/10"
            >
              <span aria-hidden="true">←</span>
              Back
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-[9px] bg-[#3285df] px-4 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(50,133,223,0.25)] transition-colors hover:bg-[#4395ed] focus:outline-none focus:ring-2 focus:ring-[#75b8f5] focus:ring-offset-2 focus:ring-offset-[#142235]"
            >
              Next
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </section>
  )
}

export default EventTicket
