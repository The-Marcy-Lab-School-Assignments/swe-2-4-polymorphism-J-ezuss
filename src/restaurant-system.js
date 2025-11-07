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

class Entree {
  constructor(name, price, protein) {
    this.name = name;
    this.price = price;
    this.protein = protein;
  }

  getEntreeDescription() {
    return `$${this.price} - ${this.name} (${this.protein})`;
  }
}

class Dessert {
  constructor(name, price, isGlutenFree) {
    this.name = name;
    this.price = price;
    this.isGlutenFree = isGlutenFree;
  }

  getDessertDescription() {
    if (this.isGlutenFree) {
      return `$${this.price} - ${this.name} [GF]`;
    }
    return `$${this.price} - ${this.name}`;
  }
}

class Beverage {

}

const printDescriptions = (menu) => {
  menu.forEach((item) => {
    if (item instanceof Entree) {
      console.log(item.getEntreeDescription());
    } else if (item instanceof Dessert) {
      console.log(item.getDessertDescription());
    } else {
      console.log(item.getDescription());
    }
  });
};

module.exports = {
  MenuItem,
  Entree,
  Dessert,
  Beverage,
  printDescriptions,
};
