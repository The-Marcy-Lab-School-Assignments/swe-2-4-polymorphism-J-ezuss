/* eslint-disable max-classes-per-file */

class MenuItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getDescription() {
    return `$${this.price} - ${this.name}`;
  }
}

class Entree extends MenuItem {
  constructor(name, price, protein) {
    super(name, price);
    this.protein = protein;
  }

  getDescription() {
    return `$${this.price} - ${this.name} (${this.protein})`;
  }
}

class Dessert extends MenuItem {
  constructor(name, price) {
    super(name, price);
  }

  getDescription() {
    return `$${this.price} - ${this.name}`;
  }
}

class Beverage extends MenuItem {
  constructor(name, price, size) {
    super(name, price);
    this.size = size;
  }

  getDescription() {
    return `$${this.price} - ${this.name} (${this.size})`;
  }
}

const printDescriptions = (menuItems) => {
  menuItems.forEach((item) => {
    console.log(item.getDescription());
  });
};

module.exports = {
  MenuItem,
  Entree,
  Dessert,
  Beverage,
  printDescriptions,
};
