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
  constructor(name, price, type) {
    super(name, price);
    this.type = type;
  }

  getDescription() {
    return `$${this.price} - ${this.name} (${this.type})`;
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

function printDescriptions(menuItems) {
  menuItems.forEach((item) => {
    console.log(item.getDescription());
  });
}

module.exports = {
  MenuItem,
  Entree,
  Dessert,
  Beverage,
  printDescriptions,
};
