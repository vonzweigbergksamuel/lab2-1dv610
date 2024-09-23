// Defines a product and what it should and might include.
export default class Product {
  private id: number;
  private name: string;
  private price: number;
  private description?: string;
  private media?: File[];

  constructor(id: number, name: string, price: number, description?: string, media?: File[]) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.media = media;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description: string) {
    this.description = description
  }

  getMedia() {
    return this.media;
  }

  setMedia(media: File[]) {
    this.media = media;
  }
};