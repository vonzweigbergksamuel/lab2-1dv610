import CartItem from "./CartItem";
import LocalStorageHandler from "./LocalStorageHandler";

export default class ShoppingCart {

  private localStorage: LocalStorageHandler;
  private cart: CartItem[];

  constructor() {
    this.localStorage = new LocalStorageHandler();
    this.cart = this.localStorage.load() || [];
  }

  getCart() {
    return this.cart;
  }

  getProductQuantity(productId: number) {
    const item = this.findItem(productId);

    return item ? item.quantity : 0;
  }

  addProductToCart(productId: number) {
    const item = this.findItem(productId);
    
    if (item) {
      item.quantity++;
      return;
    }

    this.cart.push(new CartItem(productId, 1));
    this.localStorage.save(this.cart);
  }

  removeProductFromCart(productId: number) {
    const itemIndex = this.cart.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      return;
    }

    this.cart.splice(itemIndex, 1);
    this.localStorage.save(this.cart);
  }

  incrementProductQuantity(productId: number) {
    const item = this.findItem(productId);

    if (!item) {
      this.addProductToCart(productId);
      return;
    }

    item.quantity++;
    this.localStorage.save(this.cart);
  }
  
  decrementProductQuantity(productId: number) {
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

  clearCart() {
    this.cart = [];
    this.localStorage.remove();
  }

  private findItem(productId: number): CartItem | undefined {
    return this.cart.find((item) => item.productId === productId);
  }
}