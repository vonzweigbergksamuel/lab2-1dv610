import CartItem from "./CartItem";
import Product from "./Product";

export default class ShoppingCart {

  private cart: CartItem[] = [];

  constructor() {}

  getCart() {
    return this.cart;
  }

  addProductToCart(product: Product) {
    const item = this.findItem(product);
    
    if (item) {
      item.quantity++;
      return;
    }

    this.cart.push(new CartItem(product, 1));
  }

  removeProductFromCart(product: Product) {
    const itemIndex = this.cart.findIndex((item) => item.product.getId() === product.getId());

    if (itemIndex === -1) {
      return;
    }

    this.cart.splice(itemIndex, 1);
  }

  incrementProductQuantity(product: Product) {
    const item = this.findItem(product);

    if (item) {
      item.quantity++;
    }
  }
  
  decrementProductQuantity(product: Product) {
    const item = this.findItem(product);

    if (item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.removeProductFromCart(product);
      }
    }
  }

  private findItem(product: Product): CartItem | undefined {
    return this.cart.find((item) => item.product.getId() === product.getId());
  }
}