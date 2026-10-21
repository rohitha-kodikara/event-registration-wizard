import React from 'react'

const EventReview = () => {
  return (
    <section className="relative w-full max-w-[650px] rounded-2xl border border-white/15 bg-[#142235]/60 px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-7 sm:py-7">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[21px] font-semibold tracking-[-0.02em] text-[#f4f6f5] sm:text-[23px]">
          Event registration
        </h1>

        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-[9px] border border-white/20 bg-white/5 px-3 py-1.5 text-[14px] font-semibold text-[#f0f2f1] transition-colors hover:border-white/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#4b9bea] focus:ring-offset-2 focus:ring-offset-[#142235]"
        >
          <span aria-hidden="true">⟳</span>
          Reset
        </button>
      </div>

      <nav aria-label="Registration progress" className="mt-5">
        <ol className="flex items-center">
          <li className="flex min-w-0 flex-1 items-center">
            <div className="flex shrink-0 items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#075b1c] text-sm text-[#74e99a] ring-1 ring-[#087b26]">
                ✓
              </span>
              <span className="text-[14px] text-[#f0f2f1]">Details</span>
            </div>
            <span className="mx-2 h-[2px] min-w-4 flex-1 bg-[#087b26] sm:mx-3" />
          </li>

          <li className="flex min-w-0 flex-1 items-center">
            <div className="flex shrink-0 items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#075b1c] text-sm text-[#74e99a] ring-1 ring-[#087b26]">
                ✓
              </span>
              <span className="text-[14px] text-[#f0f2f1]">Ticket</span>
            </div>
            <span className="mx-2 h-[2px] min-w-4 flex-1 bg-[#087b26] sm:mx-3" />
          </li>

          <li className="flex items-center">
            <div className="flex shrink-0 items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0c438a] text-sm text-[#d9ebff] ring-1 ring-[#1164bd]">
                3
              </span>
              <span className="text-[14px] font-semibold text-[#f0f2f1]">Review</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="mt-5 space-y-3">
        <div>
          <h2 className="mb-1.5 text-[14px] font-medium text-[#d8ddda]">Your details</h2>
          <div className="rounded-[9px] border border-white/15 bg-[#0b1a2c]/35 px-3.5">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5 text-[14px]">
              <span className="text-[#d8ddda]">Name</span>
              <span className="font-semibold text-[#f1f4f2]">Kasun Perera</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5 text-[14px]">
              <span className="text-[#d8ddda]">Email</span>
              <span className="font-semibold text-[#f1f4f2]">kasun@email.com</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-1.5 text-[14px] font-medium text-[#d8ddda]">Your tickets</h2>
          <div className="rounded-[9px] border border-white/15 bg-[#0b1a2c]/35 px-3.5">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5 text-[14px]">
              <span className="text-[#d8ddda]">Ticket type</span>
              <span className="font-semibold text-[#f1f4f2]">VIP</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5 text-[14px]">
              <span className="text-[#d8ddda]">Quantity</span>
              <span className="font-semibold text-[#f1f4f2]">2 x $45</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5 text-[14px]">
              <span className="text-[#d8ddda]">Promo code</span>
              <span className="font-semibold text-[#16c94a]">SAVE10 (10% off)</span>
            </div>
          </div>
        </div>

        <div className="rounded-[9px] bg-[#0b0f16]/65 px-3.5 py-2.5 text-[14px]">
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[#d8ddda]">Subtotal</span>
            <span className="font-semibold text-[#f1f4f2]">$90</span>
          </div>
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[#d8ddda]">Discount</span>
            <span className="font-semibold text-[#16c94a]">-$9</span>
          </div>
          <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-2">
            <span className="font-semibold text-[#f1f4f2]">Total</span>
            <span className="font-semibold text-[#d9ebff]">$81</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-between gap-3">
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-[9px] border border-white/25 px-4 text-[14px] font-semibold text-[#f1f4f2] transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#4b9bea]"
        >
          <span aria-hidden="true">←</span>
          Back
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-[9px] bg-[#3285df] px-4 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(50,133,223,0.25)] transition-colors hover:bg-[#4395ed] focus:outline-none focus:ring-2 focus:ring-[#75b8f5] focus:ring-offset-2 focus:ring-offset-[#142235]"
        >
          Submit registration
        </button>
      </div>
    </section>
  )
}

export default EventReview
