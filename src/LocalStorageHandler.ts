import CartItem from "./CartItem";

export default class LocalStorageHandler {
  private localStorage;
  private cart: CartItem[];

  constructor(cart: CartItem[]) {
    this.localStorage = window.localStorage;
    this.cart = cart;
  }

  saveToLocalStorage() {
    this.localStorage.setItem("data", JSON.stringify(this.cart));
  }

  removeFromLocalStorage() {
    this.localStorage.removeItem("data");
  }

  updateLocalStorage() {
    
  }
}