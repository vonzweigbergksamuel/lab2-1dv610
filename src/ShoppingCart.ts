import StorageHandler from "./StorageHandler";
import LocalStorageHandler from "./LocalStorageHandler";
import SessionStorageHandler from "./SessionStorageHandler";
import CartItem from "./CartItem";

/**
 * The public interface of the Shopping Cart Module.
 * Public methods of this class are used to interact with the shopping cart.
 */
export default class ShoppingCart {
  private storageHandler: StorageHandler;
  private cart: CartItem[];

  /**
   * The Shopping Cart needs a storage handler to save and load the cart.
   * Provide a storageType of "localStorage" or "sessionStorage" to choose the storage handler.
   * If no storageType is provided, it defaults to "localStorage".
   */
  constructor(storageType?: "localStorage" | "sessionStorage") {
    if (storageType === "sessionStorage") {
      this.storageHandler = new SessionStorageHandler();
    } else {
      this.storageHandler = new LocalStorageHandler();
    }

    this.cart = this.storageHandler.load() || [];
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
  getProductQuantity(productId: number | string): number {
    const item = this.findItem(productId);

    return item ? item.quantity : 0;
  }

  /**
   * Returns the total quantity of all products in the shopping cart.
   */
  getTotalQuantity(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Adds a product to the shopping cart with a quantity of 1.
   * If the product is already in the cart, it increments the quantity by 1.
   * The cart is then saved using the storage handler of choice.
   */
  addProductToCart(productId: number | string): void {
    const item = this.findItem(productId);

    if (item) {
      item.quantity++;
      this.saveToStorage();
      return;
    }

    this.cart.push(new CartItem(productId, 1));
    this.saveToStorage();
  }

  /**
   * Removes a product from the shopping cart.
   * If the product is not in the cart, it logs an error and returns nothing.
   * The cart is then saved using the storage handler of choice.
   */
  removeProductFromCart(productId: number | string): void {
    const itemIndex = this.cart.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      console.error("Product not found in cart.");
      return;
    }

    this.cart.splice(itemIndex, 1);
    this.saveToStorage();
  }

  /**
   * Increments the quantity of a product in the shopping cart.
   * If the product is not in the cart, it adds the product with a quantity of 1.
   * The cart is then saved using the storage handler of choice.
   */
  incrementProductQuantity(productId: number | string): void {
    const item = this.findItem(productId);

    if (!item) {
      this.addProductToCart(productId);
      return;
    }

    item.quantity++;
    this.saveToStorage();
  }

  /**
   * Decrements the quantity of a product in the shopping cart.
   * If the product is not in the cart, it logs an error and returns nothing.
   * If the quantity of the product is less than or equal to 1 when the method is called, it removes the product from the cart.
   * The cart is then saved using the storage handler of choice.
   */
  decrementProductQuantity(productId: number | string): void {
    const item = this.findItem(productId);

    if (!item) {
      console.error("Product not found in cart.");
      return;
    }

    if (item.quantity <= 1) {
      this.removeProductFromCart(productId);
      return;
    }

    item.quantity--;
    this.saveToStorage();
  }

  /**
   * Removes all items from the shopping cart and clears the storage handler of choice.
   */
  clearCart(): void {
    this.cart = [];
    this.storageHandler.remove();
  }

  private findItem(productId: number | string): CartItem | undefined {
    return this.cart.find((item) => item.productId === productId);
  }

  private saveToStorage(): void {
    this.storageHandler.save(this.cart);
  }
}
