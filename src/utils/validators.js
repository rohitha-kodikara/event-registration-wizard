import { promoCodes } from '../data/data';

//------------------validateDetails------------------------------
export function validateDetails(userDetails) {
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

//------------------validateTicketForm------------------------------
export function validateTicketForm(ticketType) {
  const errors = {};

  if (!ticketType) {
    errors.ticketType = 'Please select a ticket type.';
  }

  return errors;
}

//------------------validatePromocode------------------------------
// validate promo code separately because there is an apply button and it has its own errors.
export function validatePromocode(promoCode) {
  const normalizedPromoCode = promoCode.trim().toUpperCase();
  const promoCodePattern = /^[A-Z0-9]{1,10}$/;

  if (!normalizedPromoCode) {
    return 'Please enter a promo code.';
  }

  if (!promoCodePattern.test(normalizedPromoCode)) {
    return 'Promo code must contain only letters and numbers and cannot exceed 10 characters.';
  }

  if (!promoCodes.some((promo) => promo.code === normalizedPromoCode)) {
    return 'Invalid promo code. Please try again.';
  }

  return '';
}