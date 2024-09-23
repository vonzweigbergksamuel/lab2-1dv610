export default class Product {
  private id: number;
  private name: string;
  private price: number;
  private description?: string;

  constructor(id: number, name: string, price: number, description?: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
  }

  getId() {
    return this.id;
  }
};