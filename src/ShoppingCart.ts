type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

export default class ShoppingCart {

  private cart: CartItem[] = [];

  constructor() {}

  addProductToCart(product: Product) {
    const item = this.cart.find((item) => item.product.id === product.id);
    
    if (item) {
      item.quantity++;
      return;
    }

    this.cart.push({ product, quantity: 1 });
  }

  removeProductFromCart(product: Product) {
    const itemIndex = this.cart.findIndex((item) => item.product.id === product.id);

    if (itemIndex === -1) {
      return;
    }

    this.cart.splice(itemIndex, 1);
  }
}