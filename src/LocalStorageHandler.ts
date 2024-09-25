import CartItem from "./CartItem";
import StorageHandler from "./StorageHandler";

export default class LocalStorageHandler implements StorageHandler {
  private localStorage;

  constructor() {
    this.localStorage = window.localStorage;
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

  private sanitizeData(data: any): CartItem[] {
    if (!Array.isArray(data)) {
      console.warn("Invalid data format in LocalStorage. Expected an array.");
      return [];
    }

    const sanitizedCart = data
      .map((item) => {
        if (typeof item !== "object") {
          console.warn(
            "Invalid data format in LocalStorage. Expected an object."
          );
          return null;
        }

        if (
          typeof item.productId !== "number" ||
          typeof item.quantity !== "number" ||
          item.quantity <= 0 ||
          item.productId < 0
        ) {
          console.warn(
            "Invalid data format in LocalStorage. Expected a CartItem object."
          );
          return null;
        }

        return new CartItem(item.productId, item.quantity);
      })
      .filter((item) => item !== null);

    return sanitizedCart;
  }

  // Santize strings if I choose productIds are allowed to be strings
  private sanitizeStrings(input: string): string {
    if (typeof input !== "string") {
      console.warn("Invalid data format in LocalStorage. Expected a string.");
      return "";
    }

    return input.replace(/[^a-zA-Z0-9]/g, "");
  }
}
