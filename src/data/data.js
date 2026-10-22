
const ticketTypes = [
  { id: 1, name: 'Standard', price: 30 },
  { id: 2, name: 'VIP', price: 45 },
  { id: 3, name: 'Student', price: 20 },
]

 const promoCodes = [
  { code: 'SAVE10', type: 'percent', value: 10 },
  { code: 'STUDENT20', type: 'percent', value: 20 },
  { code: 'WELCOME5', type: 'fixed', value: 5 },
]

 const registrationSteps = [
  { id: 1, name: 'details', label: 'Details' },
  { id: 2, name: 'ticket', label: 'Ticket' },
  { id: 3, name: 'review', label: 'Review'},
]

const defaultRegStep = 'details'

export { ticketTypes, promoCodes, registrationSteps, defaultRegStep }
