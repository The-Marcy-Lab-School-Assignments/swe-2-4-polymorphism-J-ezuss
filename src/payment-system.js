/* eslint-disable max-classes-per-file */

class Payment {
  constructor(amount, recipient) {
    this.amount = amount;
    this.recipient = recipient;
    this.status = "pending";
  }

  process() {
    this.status = "completed";
    return `Payment of $${this.amount} to ${this.recipient} completed`;
  }

  getDetails() {
    return `$${this.amount} to ${this.recipient} - Status: ${this.status}`;
  }
}

class CreditCardPayment extends Payment {
  constructor(amount, recipient, cardNumber) {
    super(amount, recipient);
    this.cardNumber = cardNumber;
  }

  #maskCard() {
    return "****" + this.cardNumber.slice(-4);
  }

  process() {
    super.process(); // sets status to completed
    return `Payment of $${this.amount} to ${
      this.recipient
    } completed via Credit Card ${this.#maskCard()}`;
  }

  getDetails() {
    return `${super.getDetails()} (Card: ${this.#maskCard()})`;
  }
}

class PayPalPayment extends Payment {
  constructor(amount, recipient, email) {
    super(amount, recipient);
    this.email = email;
  }

  process() {
    super.process();
    return `Payment of $${this.amount} to ${this.recipient} completed via PayPal (${this.email})`;
  }

  getDetails() {
    return `${super.getDetails()} (PayPal: ${this.email})`;
  }
}

function processPayments(payments) {
  let total = 0;

  payments.forEach((payment) => {
    console.log(payment.getDetails());
    console.log(payment.process());
    total += payment.amount;
  });

  return total;
}

module.exports = {
  Payment,
  CreditCardPayment,
  PayPalPayment,
  processPayments,
};
