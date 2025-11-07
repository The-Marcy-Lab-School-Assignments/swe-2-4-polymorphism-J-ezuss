const path = require('path');
const ScoreCounter = require('score-tests');
const {
  Payment,
  CreditCardPayment,
  PayPalPayment,
  processPayments,
} = require('../src/payment-system');

const testSuiteName = 'Payment System Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  describe('Payment', () => {
    it('creates a new Payment instance', () => {
      const payment = new Payment(100, 'Acme Corp');
      expect(payment.amount).toBe(100);
      expect(payment.recipient).toBe('Acme Corp');
      expect(payment.status).toBe('pending');

      const payment2 = new Payment(50, 'John Doe');
      expect(payment2.amount).toBe(50);
      expect(payment2.recipient).toBe('John Doe');
      expect(payment2.status).toBe('pending');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('getDetails() returns correct format', () => {
      const payment = new Payment(100, 'Acme Corp');
      expect(payment.getDetails()).toBe('$100 to Acme Corp - Status: pending');

      const payment2 = new Payment(250, 'Tech Store');
      expect(payment2.getDetails()).toBe('$250 to Tech Store - Status: pending');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('process() method updates status and returns message', () => {
      const payment = new Payment(100, 'Acme Corp');
      expect(payment.status).toBe('pending');

      const result = payment.process();
      expect(payment.status).toBe('completed');
      expect(result).toBe('Payment of $100 to Acme Corp completed');

      const payment2 = new Payment(50, 'John Doe');
      const result2 = payment2.process();
      expect(payment2.status).toBe('completed');
      expect(result2).toBe('Payment of $50 to John Doe completed');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  describe('CreditCardPayment', () => {
    it('creates a new CreditCardPayment instance', () => {
      const ccPayment = new CreditCardPayment(250, 'Tech Store', '1234-5678-9012-3456');
      expect(ccPayment.amount).toBe(250);
      expect(ccPayment.recipient).toBe('Tech Store');
      expect(ccPayment.cardNumber).toBe('1234-5678-9012-3456');
      expect(ccPayment.status).toBe('pending');

      const ccPayment2 = new CreditCardPayment(100, 'Shop', '9876-5432-1098-7654');
      expect(ccPayment2.amount).toBe(100);
      expect(ccPayment2.recipient).toBe('Shop');
      expect(ccPayment2.cardNumber).toBe('9876-5432-1098-7654');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('CreditCardPayment inherits from Payment', () => {
      const ccPayment = new CreditCardPayment(250, 'Tech Store', '1234-5678-9012-3456');
      const payment = new Payment(100, 'Acme Corp');
      expect(ccPayment instanceof Payment).toBe(true);
      expect(ccPayment.getDetails).not.toBe(payment.getDetails);
      expect(ccPayment.process).not.toBe(payment.process);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('CreditCardPayment uses inheritance properly', () => {
      const ccPayment = new CreditCardPayment(250, 'Tech Store', '1234-5678-9012-3456');

      // CreditCardPayment constructor should have 3 parameters
      expect(ccPayment.constructor.length).toBe(3);

      // CreditCardPayment constructor should use super
      expect(ccPayment.constructor.toString().includes('super')).toBeTruthy();

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('process() method includes masked card number', () => {
      const ccPayment = new CreditCardPayment(250, 'Tech Store', '1234-5678-9012-3456');
      const result = ccPayment.process();
      expect(ccPayment.status).toBe('completed');
      expect(result).toBe('Payment of $250 to Tech Store completed via Credit Card ****3456');

      const ccPayment2 = new CreditCardPayment(100, 'Shop', '9876-5432-1098-7654');
      const result2 = ccPayment2.process();
      expect(result2).toBe('Payment of $100 to Shop completed via Credit Card ****7654');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('getDetails() method includes masked card number', () => {
      const ccPayment = new CreditCardPayment(250, 'Tech Store', '1234-5678-9012-3456');
      expect(ccPayment.getDetails()).toBe('$250 to Tech Store - Status: pending (Card: ****3456)');

      ccPayment.process();
      expect(ccPayment.getDetails()).toBe('$250 to Tech Store - Status: completed (Card: ****3456)');

      const ccPayment2 = new CreditCardPayment(100, 'Shop', '9876-5432-1098-7654');
      expect(ccPayment2.getDetails()).toBe('$100 to Shop - Status: pending (Card: ****7654)');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('uses super.process() and super.getDetails()', () => {
      const ccPayment = new CreditCardPayment(250, 'Tech Store', '1234-5678-9012-3456');
      const processCode = ccPayment.process.toString();
      const getDetailsCode = ccPayment.getDetails.toString();

      // Should use super.process() and super.getDetails()
      expect(processCode.includes('super.process')).toBe(true);
      expect(getDetailsCode.includes('super.getDetails')).toBe(true);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  describe('PayPalPayment', () => {
    it('creates a new PayPalPayment instance', () => {
      const paypal = new PayPalPayment(75, 'Online Course', 'user@email.com');
      expect(paypal.amount).toBe(75);
      expect(paypal.recipient).toBe('Online Course');
      expect(paypal.email).toBe('user@email.com');
      expect(paypal.status).toBe('pending');

      const paypal2 = new PayPalPayment(200, 'Service', 'customer@example.com');
      expect(paypal2.amount).toBe(200);
      expect(paypal2.recipient).toBe('Service');
      expect(paypal2.email).toBe('customer@example.com');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('PayPalPayment inherits from Payment', () => {
      const paypal = new PayPalPayment(75, 'Online Course', 'user@email.com');
      const payment = new Payment(100, 'Acme Corp');
      expect(paypal instanceof Payment).toBe(true);
      expect(paypal.getDetails).not.toBe(payment.getDetails);
      expect(paypal.process).not.toBe(payment.process);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('PayPalPayment uses inheritance properly', () => {
      const paypal = new PayPalPayment(75, 'Online Course', 'user@email.com');

      // PayPalPayment constructor should have 3 parameters
      expect(paypal.constructor.length).toBe(3);

      // PayPalPayment constructor should use super
      expect(paypal.constructor.toString().includes('super')).toBeTruthy();

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('process() method includes PayPal email', () => {
      const paypal = new PayPalPayment(75, 'Online Course', 'user@email.com');
      const result = paypal.process();
      expect(paypal.status).toBe('completed');
      expect(result).toBe('Payment of $75 to Online Course completed via PayPal (user@email.com)');

      const paypal2 = new PayPalPayment(200, 'Service', 'customer@example.com');
      const result2 = paypal2.process();
      expect(result2).toBe('Payment of $200 to Service completed via PayPal (customer@example.com)');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('getDetails() method includes PayPal email', () => {
      const paypal = new PayPalPayment(75, 'Online Course', 'user@email.com');
      expect(paypal.getDetails()).toBe('$75 to Online Course - Status: pending (PayPal: user@email.com)');

      paypal.process();
      expect(paypal.getDetails()).toBe('$75 to Online Course - Status: completed (PayPal: user@email.com)');

      const paypal2 = new PayPalPayment(200, 'Service', 'customer@example.com');
      expect(paypal2.getDetails()).toBe('$200 to Service - Status: pending (PayPal: customer@example.com)');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('uses super.process() and super.getDetails()', () => {
      const paypal = new PayPalPayment(75, 'Online Course', 'user@email.com');
      const processCode = paypal.process.toString();
      const getDetailsCode = paypal.getDetails.toString();

      // Should use super.process() and super.getDetails()
      expect(processCode.includes('super.process')).toBe(true);
      expect(getDetailsCode.includes('super.getDetails')).toBe(true);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  describe('processPayments', () => {
    it('processes all payments and prints details', () => {
      const payments = [
        new CreditCardPayment(250, 'Tech Store', '1234-5678-9012-3456'),
        new PayPalPayment(75, 'Online Course', 'user@email.com'),
        new Payment(100, 'Acme Corp'),
      ];

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      processPayments(payments);

      // Should print getDetails() and process() for each payment
      expect(consoleSpy).toHaveBeenCalledTimes(6); // 3 getDetails + 3 process

      // Check first payment (CreditCardPayment)
      expect(consoleSpy).toHaveBeenNthCalledWith(1, '$250 to Tech Store - Status: pending (Card: ****3456)');
      expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Payment of $250 to Tech Store completed via Credit Card ****3456');

      // Check second payment (PayPalPayment)
      expect(consoleSpy).toHaveBeenNthCalledWith(3, '$75 to Online Course - Status: pending (PayPal: user@email.com)');
      expect(consoleSpy).toHaveBeenNthCalledWith(4, 'Payment of $75 to Online Course completed via PayPal (user@email.com)');

      // Check third payment (Payment)
      expect(consoleSpy).toHaveBeenNthCalledWith(5, '$100 to Acme Corp - Status: pending');
      expect(consoleSpy).toHaveBeenNthCalledWith(6, 'Payment of $100 to Acme Corp completed');

      consoleSpy.mockRestore();

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('calculates total amount correctly', () => {
      const payments = [
        new Payment(50, 'Store 1'),
        new Payment(25, 'Store 2'),
        new CreditCardPayment(100, 'Store 3', '1234-5678-9012-3456'),
        new PayPalPayment(75, 'Store 4', 'test@email.com'),
      ];

      const total = processPayments(payments);
      expect(total).toBe(250);

      expect(processPayments([])).toBe(0);

      expect(processPayments([
        new Payment(5, 'Store 1'),
        new Payment(5, 'Store 2'),
      ])).toBe(10);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
