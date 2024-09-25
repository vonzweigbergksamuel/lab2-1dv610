import CartItem from "./CartItem";

export default interface StorageHandler {
  save(cart: any[]): void;
  remove(): void;
  load(): CartItem[];
}
