import {registrationSteps} from "../../data/data";

const ProgressFlow = ({currentStep}) => {

  const currentStepIndex = registrationSteps.findIndex((step) => step.name === currentStep);
 
  
  return (
    <nav aria-label="Registration progress" className="mt-7">
          <ol className="flex items-center">
           
        {
          registrationSteps.map((step, index) => (
            <li key={step.name} className="flex min-w-0 flex-1 items-center">
              <div className="flex shrink-0 items-center gap-3">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${index < currentStepIndex ? 'bg-[#06910f]' : 'bg-blue-900/80 text-sm text-[#8e9aaa] ring-1 ring-[#1164bd]'}`}>
                  {index + 1}
                </span>
                <span className="text-[15px] font-semibold text-[#f0f2f1]">{step.label}</span>
              </div>
             {index !== registrationSteps.length - 1 && (
              <span className="mx-3 h-[2px] min-w-5 flex-1 bg-white/15 sm:mx-4" />
            )}
              {/* <span className="mx-3 h-[2px] min-w-5 flex-1 bg-white/15 sm:mx-4" /> */}
            </li>
          ))
        }

          </ol>
        </nav>
  )
}

export default ProgressFlow
