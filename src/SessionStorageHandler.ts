import StorageHandler from "./StorageHandler";
import CartItem from "./CartItem";

export default class SessionStorageHandler implements StorageHandler {
  private sessionStorage;
  private regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/g;

  constructor(regexType?: "uuid" | "alphanumeric") {
    this.sessionStorage = window.sessionStorage;

    if (regexType === "alphanumeric") {
      this.regex = /[^a-zA-Z0-9]/g;
    }
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
