// Defines a Cart Item.
export default class CartItem {
  productId: string | number;
  quantity: number;

  constructor(productId: string | number, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }

  toJSON() {
    return {
      productId: this.productId,
      quantity: this.quantity,
    };
  }
}
