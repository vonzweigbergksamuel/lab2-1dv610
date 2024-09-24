// Defines a Cart Item.
export default class CartItem {
  productId: number;
  quantity: number;

  constructor(productId: number, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }

  toJSON() {

  }

  fromJSON() {

  }
};