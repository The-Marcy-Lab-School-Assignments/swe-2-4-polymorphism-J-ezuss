# Polymorphism

- [Reminders](#reminders)
  - [Asking ChatGPT for Help](#asking-chatgpt-for-help)
  - [Be Okay With Being "Provisionally Complete"](#be-okay-with-being-provisionally-complete)
- [Setup](#setup)
- [Short Response Questions](#short-response-questions)
  - [Prompt 1](#prompt-1)
  - [Prompt 2](#prompt-2)
- [From Scratch](#from-scratch)
  - [Problem Set 1: Restaurant Menu System (Polymorphism Practice)](#problem-set-1-restaurant-menu-system-polymorphism-practice)
    - [Part A: Refactoring for Polymorphism](#part-a-refactoring-for-polymorphism)
    - [Part B: Extending the System](#part-b-extending-the-system)
  - [Problem Set 2: Payment Processing System](#problem-set-2-payment-processing-system)
    - [Part A: Building a Polymorphic System](#part-a-building-a-polymorphic-system)
      - [Payment (Base Class)](#payment-base-class)
      - [CreditCardPayment](#creditcardpayment)
      - [PayPalPayment](#paypalpayment)
    - [Part B: Demonstrating Polymorphism](#part-b-demonstrating-polymorphism)


## Reminders

### Asking ChatGPT for Help

If you’re stuck, you may use ChatGPT to clarify the assignment — but not to solve it for you. To do this, copy the meta-prompt below into ChatGPT along with the assignment question.

> You are acting as a tutor. Your job is to explain what this coding question is asking, clarify confusing wording, and highlight the relevant concepts students need to know — but do not provide the full solution or code that directly answers the question. Instead, focus on rephrasing the problem in simpler terms, identifying what’s being tested, and suggesting what steps or thought processes might help. Ask guiding questions to ensure the student is thinking critically. Do not write the final function, algorithm, or code implementation.

Be mindful of your AI usage on assignments. AI can be a great tool to help your learning but it can also be detrimental if you let it do too much of the thinking for you.

### Be Okay With Being "Provisionally Complete"

At Marcy, we will deem an assignment as "complete" if the solution passes at least **75%** of the automated tests. 

However, we know many of you will feel the urge to hold off on submitting until your assignment feels 100% perfect. That drive for excellence is an asset!

But perfectionism can also get in the way of learning — especially when we need to cover a lot in a short amount of time.

That’s why we encourage you to be comfortable with being **“provisionally complete.”** This means:

- Submitting your work even if it isn’t perfect yet
- Treating submission as a checkpoint, not a finish line
- Committing to return, revise, and improve later

Learning to move forward with provisional completeness will help you make steady progress while still building the habit of continuous improvement.

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/how-tos/working-with-assignments#how-to-work-on-assignments).

Here are some useful commands to remember.

```sh
npm i                   # install dependencies
git checkout -b draft   # switch to the draft branch before starting

npm test # run the automated tests
npm run test:w # run the automated tests and rerun them each time you save a change

git add -A              # add a changed file to the staging area
git commit -m 'message' # create a commit with the changes
git push                # push the new commit to the remote repo
```

## Short Response Questions

Short response questions can be found in the `src/short-response.md` file. Write your responses directly in that file! Do not forget to complete this part of the assignment.

### Prompt 1

Examine this code:

```js
class Shape {
  constructor(type) {
    this.type = type;
  }
  getArea() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super('circle');
    this.radius = radius;
  }
  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(side) {
    super('square');
    this.side = side;
  }
  getArea() {
    return this.side ** 2;
  }
}

const shapes = [new Circle(5), new Square(4), new Circle(3)];
const totalArea = shapes.reduce((sum, shape) => sum + shape.getArea(), 0);
```

Explain how this code demonstrates **polymorphism**. Why can we call `getArea()` on each shape without checking what type of shape it is?

### Prompt 2

Look at this code:

```js
class Media {
  constructor(title) {
    this.title = title;
  }
  play() { 
    return `Playing media: ${this.title}`; 
  }
}

class Song {
  constructor(title, artist) {
    this.title = title;
    this.artist = artist;
  }
  playSong() {
    return `♪ Playing "${this.title}" by ${this.artist}`;
  }
}

class Podcast {
  constructor(title, host) {
    this.title = title;
    this.host = host;
  }
  playPodcast() {
    return `🎙️ Playing podcast "${this.title}" hosted by ${this.host}`;
  }
}

const playlist = [
  new Song("Thriller", "Michael Jackson"),
  new Podcast("CodeNewbie", "Saron Yitbarek"),
  new Media("voice-memo.mp3")
];

playlist.forEach(item => {
  if (item instanceof Song) {
    console.log(item.playSong());
  } else if (item instanceof Podcast) {
    console.log(item.playPodcast());
  } else {
    console.log(item.play());
  }
});
```

This code works, but it has some problems. Answer the following:

1. Rewrite the `Song` and `Podcast` classes to use inheritance and polymorphism. What changes would you make?
2. After your changes, rewrite the `playlist.forEach()` loop. How does polymorphism simplify this code?
3. Explain what would happen if you wanted to add a new `Video` class. Compare how much work it would take with the original code versus your improved version.

## From Scratch

In these problem sets, you'll build a hierarchy of classes with inheritance that demonstrate polymorphism. This will help you practice:
- Using `extends` to create subclasses
- Using `super()` to call parent constructors
- Overriding methods to provide specific implementations
- Demonstrating polymorphism through shared interfaces

### Problem Set 1: Restaurant Menu System (Polymorphism Practice)

#### Part A: Refactoring for Polymorphism

Look at the code in `restaurant-system.js`. It is functional but does not demonstrate polymorphism. As a result, the `printDescription` function requires us to check the type of each item to determine which method to use.

**Your Task:**

1. Rewrite the `Entree` and `Dessert` classes so they:
   - Extend from `MenuItem`
   - Override the `getDescription()` method (replace `getEntreeDescription()` and `getDessertDescription()`)

2. After making these changes, rewrite the `printDescriptions` function to use polymorphism. It should be much simpler!

You can test out the functionality of your code in the `src/playground.js` file where we've set up some manual test code.

**Expected Output (should remain the same):**
```
$24 - Grilled Salmon (fish)
$8 - Chocolate Cake
$12 - House Salad
```

#### Part B: Extending the System

Now add a `Beverage` class that extends `MenuItem`. Looking at the example usage below, implement the class:

```js
const beverage = new Beverage("Fresh Lemonade", 5, "16oz");
console.log(beverage.name); // Fresh Lemonade
console.log(beverage.price); // 5
console.log(beverage.size); // 16oz
console.log(beverage.getDescription()); // $5 - Fresh Lemonade (16oz)
```

Test your work by going to `src/playground.js` and adding your beverage to the menu.

---

### Problem Set 2: Payment Processing System

#### Part A: Building a Polymorphic System

Build a payment processing system where different payment methods can be treated uniformly. Complete this problem set in the `src/payment-system.js` file.

##### Payment (Base Class)

Create a `Payment` class with:
- A constructor that accepts `amount` and `recipient` parameters
- A public field `status` with a default value of `'pending'`
- A `process()` method that:
  - Sets `status` to `'completed'`
  - Returns the string `"Payment of $<amount> to <recipient> completed"`
- A `getDetails()` method that returns `"$<amount> to <recipient> - Status: <status>"`

```js
const payment = new Payment(100, "Acme Corp");
console.log(payment.amount); // 100
console.log(payment.recipient); // Acme Corp
console.log(payment.status); // pending
console.log(payment.getDetails()); // $100 to Acme Corp - Status: pending
console.log(payment.process()); // Payment of $100 to Acme Corp completed
console.log(payment.status); // completed
```

##### CreditCardPayment

Create a `CreditCardPayment` class that extends `Payment`. Looking at the example usage, implement the class:

```js
const ccPayment = new CreditCardPayment(250, "Tech Store", "1234-5678-9012-3456");
console.log(ccPayment.cardNumber); // 1234-5678-9012-3456
console.log(ccPayment.process()); // Payment of $250 to Tech Store completed via Credit Card ****3456
console.log(ccPayment.getDetails()); // $250 to Tech Store - Status: completed (Card: ****3456)
```

**Hints:**
- You can assume that the given credit card will be a string that is 19 characters long in the format `####-####-####-####`
- Override the `process()` method to include credit card info but only show the last 4 digits like this: `****3456`
- Override the `getDetails()` method to also include the "masked" card number `****3456`
- Use `super.process()` and `super.getDetails()` to reuse parent functionality

##### PayPalPayment

Create a `PayPalPayment` class that extends `Payment`. Looking at the example usage, implement the class:

```js
const paypal = new PayPalPayment(75, "Online Course", "user@email.com");
console.log(paypal.email); // user@email.com
console.log(paypal.process()); // Payment of $75 to Online Course completed via PayPal (user@email.com)
console.log(paypal.getDetails()); // $75 to Online Course - Status: completed (PayPal: user@email.com)
```

#### Part B: Demonstrating Polymorphism

Create a function called `processPayments` that takes in an array of `payments`. 

Complete the function such that it:
1. Prints `payment.getDetail()` and `payment.process()` for each payment.
2. Calculates and returns the total amount processed across all payments.

Example Usage (see `src/playground.js`):

```js
const testPayment = () => {
  const payments = [
    new CreditCardPayment(250, 'Tech Store', '1234-5678-9012-3456'),
    new PayPalPayment(75, 'Online Course', 'user@email.com'),
    new Payment(100, 'Acme Corp'),
  ];

  const total = processPayments(payments);
  console.log(total);
};

// Uncomment this line to test the function.
testPayment();

/* 
Sample Output:
$250 to Tech Store - Status: pending (Card: ****3456)
Payment of $250 to Tech Store completed via Credit Card ****3456
$75 to Online Course - Status: pending (PayPal: user@email.com)
Payment of $75 to Online Course completed via PayPal (user@email.com)
$100 to Acme Corp - Status: pending
Payment of $100 to Acme Corp completed
425
*/
```
