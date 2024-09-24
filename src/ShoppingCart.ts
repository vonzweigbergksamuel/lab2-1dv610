import CartItem from "./CartItem";
import LocalStorageHandler from "./LocalStorageHandler";

export default class ShoppingCart {

  private cart: CartItem[];
  private localStorage: LocalStorageHandler;

  constructor() {
    this.cart = [];
    this.localStorage = new LocalStorageHandler(this.cart);
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

    this.localStorage.saveToLocalStorage();
  }

  removeProductFromCart(productId: number) {
    const itemIndex = this.cart.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      return;
    }

    this.cart.splice(itemIndex, 1);
  }

  incrementProductQuantity(productId: number) {
    const item = this.findItem(productId);

    if (item) {
      item.quantity++;
    }
  }
  
  decrementProductQuantity(productId: number) {
    const item = this.findItem(productId);

    if (item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.removeProductFromCart(productId);
      }
    }
  }

  private findItem(productId: number): CartItem | undefined {
    return this.cart.find((item) => item.productId === productId);
  }
}