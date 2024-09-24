import CartItem from "./CartItem";
import LocalStorageHandler from "./LocalStorageHandler";

export default class ShoppingCart {

  private cart: CartItem[] = [];
  private localStorage: LocalStorageHandler;

  constructor() {
    this.localStorage = new LocalStorageHandler();
  }

  getCart() {
    return this.cart;
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
    this.localStorage.remove();
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

    if (item.quantity === 0) {
      this.removeProductFromCart(productId);
      return;
    }

    item.quantity--;
    this.localStorage.save(this.cart);
  }

  private findItem(productId: number): CartItem | undefined {
    return this.cart.find((item) => item.productId === productId);
  }
}