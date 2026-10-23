
import EventButton from './EventButton'
import ProgressFlow from '../event/ProgressFlow'

const EventCard = ({children,currentStep,resetAll}) => {
  return (
    <section className="relative w-full max-w-[650px] overflow-hidden rounded-2xl border border-[#9a82c5]/35 bg-gradient-to-br from-[#120d21]/75 via-[#25183d]/70 to-[#3b2761]/65 px-7 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-8 sm:py-8 ">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.55'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative z-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[23px] font-semibold tracking-[-0.02em] text-[#f4f6f5]">
            Event registration
          </h1>
          <EventButton bgColor="bg-[#bd4c5a]" onClick={resetAll}>
        Reset
        </EventButton>
        </div>
        <ProgressFlow currentStep={currentStep} /> 
            {children}
        </div>
      </section>
  )
}

export default EventCard
