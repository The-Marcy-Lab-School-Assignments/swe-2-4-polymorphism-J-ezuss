const { MenuItem, Entree, Dessert, printDescriptions } = require('./restaurant-system');
const { Payment, CreditCardPayment, PayPalPayment, processPayments } = require('./payment-system');

// ------------------------------------
// --------- Restaurant System --------
// ------------------------------------

const testRestaurant = () => {
  const menu = [
    new Entree('Grilled Salmon', 24, 'fish'),
    new Dessert('Chocolate Cake', 8, false),
    new MenuItem('House Salad', 12),
  ];
  printDescriptions(menu);
};

// Uncomment this line to test the function.
testRestaurant();

// ------------------------------------
// ---------- Payment System ----------
// ------------------------------------

const testPayment = () => {
  const payments = [
    new CreditCardPayment(250, 'Tech Store', '1234-5678-9012-3456'),
    new PayPalPayment(75, 'Online Course', 'user@email.com'),
    new Payment(100, 'Acme Corp'),
  ];

  const total = processPayments(payments);
  console.log(`Total amount processed: $${total}`);
};

// Uncomment this line to test the function.
testPayment();
