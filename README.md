# Event Registration
<img width="937" height="702" alt="image" src="https://github.com/user-attachments/assets/ccb752bc-2057-49ce-99ea-1128ef82890c" />
<img width="880" height="767" alt="image" src="https://github.com/user-attachments/assets/e23eca67-cc3a-4592-9631-a5451d70730d" />
<img width="852" height="841" alt="image" src="https://github.com/user-attachments/assets/3f366312-ff76-4ffd-ac3a-a0add6a0b4ae" />


A multi-step event registration form built with React. Users enter their details, pick a ticket and apply a promo code, then review everything before submitting. Built with React (hooks and useReducer), Tailwind CSS, SweetAlert2, and Lucide icons.

## Tech Stack

- React (functional components, hooks, useReducer, useMemo)
- Tailwind CSS
- SweetAlert2 (submit confirmation dialog)
- Lucide icons

## 1. Features I Developed

- 3-step flow: Details, Ticket, Review, with a progress bar on top
- Step circles turn green once that step is completed
- Details form with validation for full name and email
- Ticket form with ticket type (Standard / VIP / Student), quantity buttons (1 to 10) and a promo code field
- Promo codes that work in two ways: percentage off (SAVE10, STUDENT20) or a fixed amount per ticket (WELCOME5)
- Total price that updates when the ticket type, quantity or applied promo code changes
- Specific error messages for empty fields and invalid promo codes
- Review page showing user details, ticket info, subtotal, discount and final total
- Submit with a SweetAlert2 confirmation, and a Reset button to start over at any step
- Validation logic, price calculation and reducer separated into their own files (`utils` and `reducers`)

## 2. How I Built It

I started by designing three UIs: `EventDetails`, `EventTicket` and `EventReview`. While doing that I noticed the three components had a lot of the same code (the card, the header, the buttons). So I pulled that code out and made two reusable components, `EventCard` and `EventButton`, and used them inside all three.

The step indicator was also shared by every page, so I made a separate `ProgressFlow` component for it. It receives the `registrationSteps` array, loops over it and shows each step. It also gets the current step, finds its index, and colors the number circles of all the earlier steps green.

For the state, I first used separate `useState` hooks for the inputs and the errors. It worked, but it got messy as more fields were added. So I moved everything into one `useReducer` in `App.jsx`, with the logic inside `eventReducer.js`. Now every change to the form goes through a named action like `set_ticket_type` or `currentStep_increment`, which is much easier to read and debug.

The flow works like this:

1. On the Details step, if the user presses Next with empty or invalid fields, error messages appear. If everything is valid, the details are saved and the user moves to the next step.
2. The Ticket step has its own validation. The total price is calculated with or without a promo code, and if there is one it is calculated either as a percentage or as a fixed amount.
3. When the ticket step is valid, I store all the collected data in one object called `ticketInfo`, and the Review step reads from it.

## 3. Challenges I Faced and How I Solved Them

### 3.1 Triggering the right errors in two different situations

**Problem:** On the Ticket step, error messages have to appear in two different situations:

1. When the user clicks **Next** with empty fields, the errors for the empty fields should show up.
2. When the user types an invalid promo code and clicks **Apply**, an invalid promo code error should show up, without having to press Next.

I was stuck on how to make the same kind of error work for both buttons.

**Solution:** I wrote the validation as small separate functions in `validators.js`:

- `validateTicketForm` checks that a ticket type is selected.
- `validatePromocode` returns a different message depending on the problem: nothing entered, wrong characters or too long, or a code that doesn't exist in my `promoCodes` list.

Then I used the same validator and the same reducer action from both buttons.

**Next button:** In `handleTicketSubmission`, I created a variable called `promoCodeError` and saved the result of `validatePromocode` in it. After that I send it to the reducer with the `validate_promo_code` action. The ticket type is checked the same way with `validate_ticket_type`.

```js
function handleTicketSubmission(event) {
  event.preventDefault();
  const ticketErrors = validateTicketForm(state.ticketType);
  const promoCodeError = validatePromocode(state.promoCode);

  dispatch({ type: 'validate_ticket_type', payload: { ticketType: state.ticketType } });
  dispatch({ type: 'validate_promo_code', payload: { promoCodeError } });
  ...
}
```

**Apply button:** I created a separate function called `handleApplyPromoCode`. Inside it I do the same thing: call `validatePromocode(promoCode)`, save the result in `promoCodeError`, and dispatch `validate_promo_code`. The Apply button passes the current promo code into it:

```jsx
<EventButton onClick={() => handleApplyPromoCode(promoCode)}>Apply</EventButton>
```

```js
function handleApplyPromoCode(promoCode) {
  const promoCodeError = validatePromocode(promoCode);
  dispatch({ type: 'validate_promo_code', payload: { promoCodeError } });
  ...
}
```

Both handlers send the error through the same action, so the reducer saves it in the same place, `validateEventTicket` (`ticketTypeError` and `promoCodeError`). `EventTicket` reads from there and shows the message in red under each field. So the user sees the same promo error whether they click Apply or Next, and the user only moves to the next step when there are no errors.


### 3.2 Recalculating the total price when the inputs change

**Problem:** The total price depends on three things: the ticket type, the quantity and the promo code. Whenever any of these changes, the total should be recalculated using the new values. My first attempt did not do this correctly, so the total sometimes didn't match what the user had selected.

**Solution:** I moved all the price logic into one function, `calculatePriceSummary` in `priceCalculator.js`, so there is only one place that decides the price. It works like this:

1. Finds the ticket price from the selected ticket type.
2. Multiplies it by the quantity to get the subtotal.
3. Looks for the applied promo code. If there isn't one, the total is just the subtotal.
4. If there is one, it calculates the discount, either a percentage of the subtotal or a fixed amount multiplied by the quantity.

In `App.jsx` I call this function inside `useMemo`, with the ticket type, quantity and applied promo code as dependencies. This way the total is recalculated every time one of them changes.

```js
const priceSummary = useMemo(
  () => calculatePriceSummary(state.ticketType, state.ticketQuantity, state.appliedPromoCode),
  [state.ticketType, state.ticketQuantity, state.appliedPromoCode]
);
```

For the promo code I keep two separate values in state: `promoCode` (what the user is typing) and `appliedPromoCode` (a code that has passed validation). `handleApplyPromoCode` only saves the code into `appliedPromoCode` when it is valid, and clears it when it is not. So the discount is added only after a valid Apply, and removed again if the user applies a wrong code.

### 3.3 Passing dispatch to child components, with and without values

**Problem:** The child components needed to trigger reducer actions, but some actions need a value (like the selected ticket type) and some don't (like the minus button).

**Solution:** I didn't pass `dispatch` itself down. In `App.jsx` I wrap it inside small functions and pass those functions as props, so the child components don't need to know anything about the reducer.

Without a value:

```jsx
decrementTicketQuantity={() => dispatch({ type: 'decrement_ticket_quantity' })}
```

With a value, the function takes a parameter and puts it into the `payload`:

```jsx
setTicketType={(ticketType) =>
  dispatch({ type: 'set_ticket_type', payload: { ticketType } })
}
```

Then the child just calls it normally, for example `setTicketType(e.target.value)`.

For the Apply button I had to write `onClick={() => handleApplyPromoCode(promoCode)}`. If I wrote `onClick={handleApplyPromoCode(promoCode)}` the function would run during render instead of on click.

## 4. Project Structure

```
src
├── components
│   ├── event
│   │   ├── details/EventDetails.jsx
│   │   ├── ticket/EventTicket.jsx
│   │   ├── review/EventReview.jsx
│   │   └── ProgressFlow.jsx
│   └── ui
│       ├── EventButton.jsx
│       └── EventCard.jsx
├── data/data.js
├── reducers/eventReducer.js
├── utils
│   ├── priceCalculator.js
│   └── validators.js
└── App.jsx
```
