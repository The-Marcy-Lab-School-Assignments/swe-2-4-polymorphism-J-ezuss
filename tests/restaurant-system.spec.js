const path = require('path');
const ScoreCounter = require('score-tests');
const {
  MenuItem,
  Entree,
  Dessert,
  Beverage,
  printDescriptions,
} = require('../src/restaurant-system');

const testSuiteName = 'Restaurant System Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  describe('MenuItem', () => {
    it('creates a new MenuItem instance', () => {
      const item = new MenuItem('House Salad', 12);
      expect(item.name).toBe('House Salad');
      expect(item.price).toBe(12);
      expect(item.getDescription()).toBe('$12 - House Salad');

      const item2 = new MenuItem('Soup', 8);
      expect(item2.name).toBe('Soup');
      expect(item2.price).toBe(8);
      expect(item2.getDescription()).toBe('$8 - Soup');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  describe('Entree', () => {
    it('creates a new Entree instance', () => {
      const entree = new Entree('Grilled Salmon', 24, 'fish');
      expect(entree.name).toBe('Grilled Salmon');
      expect(entree.price).toBe(24);
      expect(entree.protein).toBe('fish');

      const entree2 = new Entree('Steak', 32, 'beef');
      expect(entree2.name).toBe('Steak');
      expect(entree2.price).toBe(32);
      expect(entree2.protein).toBe('beef');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('Entree inherits from MenuItem', () => {
      const entree = new Entree('Grilled Salmon', 24, 'fish');
      const menuItem = new MenuItem('House Salad', 12);
      expect(entree instanceof MenuItem).toBe(true);

      // should override getDescription
      expect(entree.getDescription).not.toBe(menuItem.getDescription);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('Entree uses inheritance properly', () => {
      const entree = new Entree('Grilled Salmon', 24, 'fish');

      // Entree constructor should have 3 parameters
      expect(entree.constructor.length).toBe(3);

      // Entree constructor should use super
      expect(entree.constructor.toString().includes('super')).toBeTruthy();

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('Entree overrides getDescription() method', () => {
      const entree = new Entree('Grilled Salmon', 24, 'fish');
      expect(entree.getDescription()).toBe('$24 - Grilled Salmon (fish)');

      const entree2 = new Entree('Steak', 32, 'beef');
      expect(entree2.getDescription()).toBe('$32 - Steak (beef)');

      // Should not have getEntreeDescription method
      expect(entree.getEntreeDescription).toBeUndefined();

      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  describe('Dessert', () => {
    it('creates a new Dessert instance', () => {
      const dessert = new Dessert('Chocolate Cake', 8, false);
      expect(dessert.name).toBe('Chocolate Cake');
      expect(dessert.price).toBe(8);
      expect(dessert.isGlutenFree).toBe(false);

      const dessert2 = new Dessert('Fruit Tart', 10, true);
      expect(dessert2.name).toBe('Fruit Tart');
      expect(dessert2.price).toBe(10);
      expect(dessert2.isGlutenFree).toBe(true);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('Dessert inherits from MenuItem', () => {
      const dessert = new Dessert('Chocolate Cake', 8, false);
      const menuItem = new MenuItem('House Salad', 12);
      expect(dessert instanceof MenuItem).toBe(true);

      // should override getDescription
      expect(dessert.getDescription).not.toBe(menuItem.getDescription);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('Dessert uses inheritance properly', () => {
      const dessert = new Dessert('Chocolate Cake', 8, false);

      // Dessert constructor should have 3 parameters
      expect(dessert.constructor.length).toBe(3);

      // Dessert constructor should use super
      expect(dessert.constructor.toString().includes('super')).toBeTruthy();

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('Dessert overrides getDescription() method', () => {
      const dessert1 = new Dessert('Chocolate Cake', 8, false);
      expect(dessert1.getDescription()).toBe('$8 - Chocolate Cake');

      const dessert2 = new Dessert('Fruit Tart', 10, true);
      expect(dessert2.getDescription()).toBe('$10 - Fruit Tart [GF]');

      // Should not have getDessertDescription method
      expect(dessert1.getDessertDescription).toBeUndefined();

      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  describe('Beverage', () => {
    it('creates a new Beverage instance', () => {
      const beverage = new Beverage('Fresh Lemonade', 5, '16oz');
      expect(beverage.name).toBe('Fresh Lemonade');
      expect(beverage.price).toBe(5);
      expect(beverage.size).toBe('16oz');

      const beverage2 = new Beverage('Coffee', 4, '12oz');
      expect(beverage2.name).toBe('Coffee');
      expect(beverage2.price).toBe(4);
      expect(beverage2.size).toBe('12oz');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('Beverage inherits from MenuItem', () => {
      const beverage = new Beverage('Fresh Lemonade', 5, '16oz');
      const menuItem = new MenuItem('House Salad', 12);
      expect(beverage instanceof MenuItem).toBe(true);

      // should override getDescription
      expect(beverage.getDescription).not.toBe(menuItem.getDescription);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('Beverage uses inheritance properly', () => {
      const beverage = new Beverage('Fresh Lemonade', 5, '16oz');

      // Beverage constructor should have 3 parameters
      expect(beverage.constructor.length).toBe(3);

      // Beverage constructor should use super
      expect(beverage.constructor.toString().includes('super')).toBeTruthy();

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('Beverage overrides getDescription() method', () => {
      const beverage = new Beverage('Fresh Lemonade', 5, '16oz');
      expect(beverage.getDescription()).toBe('$5 - Fresh Lemonade (16oz)');

      const beverage2 = new Beverage('Coffee', 4, '12oz');
      expect(beverage2.getDescription()).toBe('$4 - Coffee (12oz)');

      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  describe('printDescriptions', () => {
    it('uses polymorphism to print descriptions', () => {
      const menu = [
        new Entree('Grilled Salmon', 24, 'fish'),
        new Dessert('Chocolate Cake', 8, false),
        new MenuItem('House Salad', 12),
        new Beverage('Fresh Lemonade', 5, '16oz'),
      ];

      // Capture console.log output
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      printDescriptions(menu);

      expect(consoleSpy).toHaveBeenCalledTimes(4);
      expect(consoleSpy).toHaveBeenNthCalledWith(1, '$24 - Grilled Salmon (fish)');
      expect(consoleSpy).toHaveBeenNthCalledWith(2, '$8 - Chocolate Cake');
      expect(consoleSpy).toHaveBeenNthCalledWith(3, '$12 - House Salad');
      expect(consoleSpy).toHaveBeenNthCalledWith(4, '$5 - Fresh Lemonade (16oz)');

      consoleSpy.mockRestore();

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('does not use instanceof checks', () => {
      const printDescriptionsCode = printDescriptions.toString();

      // Should not contain instanceof checks
      expect(printDescriptionsCode.includes('instanceof Entree')).toBe(false);
      expect(printDescriptionsCode.includes('instanceof Dessert')).toBe(false);
      expect(printDescriptionsCode.includes('instanceof Beverage')).toBe(false);

      // Should call getDescription on all items
      expect(printDescriptionsCode.includes('getDescription')).toBe(true);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
