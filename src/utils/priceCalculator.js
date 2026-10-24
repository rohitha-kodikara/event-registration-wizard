import { ticketTypes, promoCodes } from '../data/data';

export function calculatePriceSummary(ticketType, ticketQuantity, appliedPromoCode) {
  const ticketUnitPrice =
    ticketTypes.find((ticket) => ticket.name === ticketType)?.price || 0;

  const subtotal = ticketUnitPrice * ticketQuantity;

  const appliedPromo = promoCodes.find(
    (promo) => promo.code === appliedPromoCode
  );

  if (!appliedPromo) {
    return {
      subtotal,
      discount: 0,
      totalPrice: subtotal,
    };
  }

  let discount = 0;

  if (appliedPromo.type === 'percent') {
    discount = subtotal * (appliedPromo.value / 100);
  } else if (appliedPromo.type === 'fixed') {
    discount = appliedPromo.value * ticketQuantity;
  }

  const totalPrice = Math.max(0, subtotal - discount);

  return {
    subtotal,
    discount,
    totalPrice,
  };
}