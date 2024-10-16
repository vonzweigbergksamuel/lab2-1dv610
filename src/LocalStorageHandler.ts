import StorageHandler from "./StorageHandler";
import CartItem from "./CartItem";

export default class LocalStorageHandler implements StorageHandler {
  private localStorage;
  private regex = /[^a-zA-Z0-9]/g;

  constructor(regexType?: "uuid" | "alphanumeric") {
    this.localStorage = window.localStorage;

    if (regexType === "uuid") {
      this.regex =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/g;
    }
  }

  save(cart: CartItem[]): void {
    this.localStorage.setItem("data", JSON.stringify(cart));
  }

  remove(): void {
    this.localStorage.removeItem("data");
  }

  load(): CartItem[] {
    const data = this.localStorage.getItem("data");

    if (!data) {
      return [];
    }

    return this.sanitizeData(JSON.parse(data));
  }

  /**
   * Sanitizes the data stored in localStorage before loading it into the shopping cart.
   * This is done to prevent attacks like XSS and to ensure the data is in the correct format.
   * If the data is invalid, it will return an empty array.
   */
  private sanitizeData(data: any): CartItem[] {
    if (!Array.isArray(data)) {
      console.warn("Invalid data format in localStorage. Expected an array.");
      return [];
    }

    const sanitizedCart = data
      .map((item) => {
        if (!this.isCartItemValid(item)) {
          console.warn(
            "Invalid data format in localStorage. Expected a CartItem object."
          );
          return null;
        }

        if (typeof item.productId === "string") {
          item.productId = this.sanitizeStrings(item.productId);
        }

        return new CartItem(item.productId, item.quantity);
      })
      .filter((item) => item !== null);

    return sanitizedCart;
  }

  /**
   * If productIds are stored as strings, this method sanitizes them.
   * It's main purpose is to prevent XSS attacks.
   * Accepted characters are: a-z, A-Z, 0-9.
   * REGEX can be modified to accept other characters if needed.
   */
  private sanitizeStrings(input: string): string {
    if (typeof input !== "string") {
      console.warn("Invalid data format in localStorage. Expected a string.");
      return "";
    }

    return input.replace(this.regex, "");
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
