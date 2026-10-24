import { registrationSteps, defaultRegStep } from '../data/data';
import { validateDetails, validateTicketForm } from '../utils/validators';

export const initialEventDetails = {
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
};

export function eventReducer(state, action) {
  switch (action.type) {
    case 'currentStep_increment': {
      const currentIndex = registrationSteps.findIndex(
        (step) => step.name === state.currentStep
      );
      const nextStep = registrationSteps[currentIndex + 1];
      return {
        ...state,
        currentStep: nextStep ? nextStep.name : state.currentStep,
      };
    }
    case 'currentStep_decrement': {
      const currentIndex = registrationSteps.findIndex(
        (step) => step.name === state.currentStep
      );
      const previousStep = registrationSteps[currentIndex - 1];
      return {
        ...state,
        currentStep: previousStep ? previousStep.name : state.currentStep,
      };
    }
    case 'validate_user_details': {
      const errors = validateDetails(action.payload);
      return {
        ...state,
        userDetailsErrors: {
          fullName: errors.fullName || '',
          email: errors.email || '',
        },
      };
    }
    case 'set_user_details': {
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          fullName: action.payload.fullName,
          email: action.payload.email,
        },
      };
    }
    case 'validate_ticket_type': {
      const errors = validateTicketForm(action.payload.ticketType);
      return {
        ...state,
        validateEventTicket: {
          ...state.validateEventTicket,
          ticketTypeError: errors.ticketType || '',
        },
      };
    }
    case 'set_ticket_type': {
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
    case 'validate_promo_code': {
      return {
        ...state,
        validateEventTicket: {
          ...state.validateEventTicket,
          promoCodeError: action.payload.promoCodeError,
        },
      };
    }
    case 'clear_prev_promocode_value': {
      return {
        ...state,
        appliedPromoCode: '',
      };
    }
    case 'store_valid_promocode': {
      return {
        ...state,
        appliedPromoCode: action.payload.appliedPromoCode,
      };
    }
    case 'store_all_ticket_info': {
      return {
        ...state,
        ticketInfo: action.payload.ticketInfo,
      };
    }
    case 'reset_all': {
      return {
        ...initialEventDetails,
      };
    }
    default:
      return state;
  }
}