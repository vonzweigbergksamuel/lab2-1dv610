import Product from "./Product";

// Defines a Cart Item.
export default class CartItem {
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  toJSON() {

  }

  fromJSON() {

  }
};