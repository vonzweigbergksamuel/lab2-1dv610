import CartItem from "./CartItem";

export default class LocalStorageHandler {
  private localStorage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  save(cart: CartItem[]) {
    this.localStorage.setItem("data", JSON.stringify(cart));
  }

  remove() {
    this.localStorage.removeItem("data");
  }
}