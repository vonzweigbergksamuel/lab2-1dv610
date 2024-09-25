/**
 * The public interface of the Shopping Cart Module.
 * Public methods of this class are used to interact with the shopping cart.
 */

import CartItem from "./CartItem";
import LocalStorageHandler from "./LocalStorageHandler";

export default class ShoppingCart {
  private localStorage: LocalStorageHandler;
  private cart: CartItem[];

  constructor() {
    this.localStorage = new LocalStorageHandler();
    this.cart = this.localStorage.load() || [];
  }

  /**
   * Returns an array of the items in the shopping cart.
   * Each item is an object with a productId and a quantity.
   */
  getCart(): CartItem[] {
    return this.cart;
  }

  /**
   * Returns the quantity of a single product in the shopping cart.
   */
  getProductQuantity(productId: number): number {
    const item = this.findItem(productId);

    return item ? item.quantity : 0;
  }

  /**
   * Returns the total quantity of all products in the shopping cart.
   */
  getTotalQuantity(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  addProductToCart(productId: number): void {
    const item = this.findItem(productId);

    if (item) {
      item.quantity++;
      return;
    }

    this.cart.push(new CartItem(productId, 1));
    this.localStorage.save(this.cart);
  }

  removeProductFromCart(productId: number): void {
    const itemIndex = this.cart.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      return;
    }

    this.cart.splice(itemIndex, 1);
    this.localStorage.save(this.cart);
  }

  incrementProductQuantity(productId: number): void {
    const item = this.findItem(productId);

    if (!item) {
      this.addProductToCart(productId);
      return;
    }

    item.quantity++;
    this.localStorage.save(this.cart);
  }

  decrementProductQuantity(productId: number): void {
    const item = this.findItem(productId);

    if (!item) {
      return;
    }

    if (item.quantity <= 1) {
      this.removeProductFromCart(productId);
      return;
    }

    item.quantity--;
    this.localStorage.save(this.cart);
  }

  /**
   * Removes all items from the shopping cart and clears the local storage.
   */
  clearCart(): void {
    this.cart = [];
    this.localStorage.remove();
  }

  private findItem(productId: number): CartItem | undefined {
    return this.cart.find((item) => item.productId === productId);
  }
}
