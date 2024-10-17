import StorageHandler from "./StorageHandler";
import CartItem from "./CartItem";

export default class SessionStorageHandler implements StorageHandler {
  private sessionStorage;
  private regex = /[^a-zA-Z0-9_-]/g;

  constructor() {
    this.sessionStorage = window.sessionStorage;
  }

  save(cart: CartItem[]): void {
    this.sessionStorage.setItem("data", JSON.stringify(cart));
  }

  remove(): void {
    this.sessionStorage.removeItem("data");
  }

  load(): CartItem[] {
    const data = this.sessionStorage.getItem("data");

    if (!data) {
      return [];
    }

    return this.sanitizeData(JSON.parse(data));
  }

  /**
   * Sanitizes the data stored in sessionStorage before loading it into the shopping cart.
   * This is done to prevent attacks like XSS and to ensure the data is in the correct format.
   * If the data is invalid, it will return an empty array.
   */
  private sanitizeData(data: any): CartItem[] {
    if (!Array.isArray(data)) {
      console.warn("Invalid data format in sessionStorage. Expected an array.");
      return [];
    }

    const sanitizedCart = data
      .map((item) => {
        if (!this.isCartItemValid(item)) {
          console.warn(
            "Invalid data format in sessionStorage. Expected a CartItem object."
          );
          return null;
        }

        const sanitizedProductId = item.productId.replace(this.regex, "");

        if (sanitizedProductId.length <= 0) {
          console.warn("Product ID cannot be empty after sanitization");
          return null;
        }

        return new CartItem(sanitizedProductId, item.quantity);
      })
      .filter((item) => item !== null);

    return sanitizedCart;
  }

  private isCartItemValid(item: any): boolean {
    if (typeof item !== "object") {
      return false;
    }

    if (
      typeof item.productId !== "string" &&
      typeof item.productId !== "number"
    ) {
      return false;
    }

    if (typeof item.quantity !== "number" || item.quantity <= 0) {
      return false;
    }

    if (
      (typeof item.productId === "string" && item.productId.length === 0) ||
      (typeof item.productId === "number" && item.productId < 0)
    ) {
      return false;
    }

    return true;
  }
}
