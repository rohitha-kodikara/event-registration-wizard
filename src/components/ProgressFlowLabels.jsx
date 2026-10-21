import React from 'react'

const ProgressFlowLabels = () => {
  return (
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
  )
}

export default ProgressFlowLabels
