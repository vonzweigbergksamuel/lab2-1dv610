/**
 * @jest-environment jsdom
 */

import { ShoppingCart } from "../src/index";

test("ShoppingCart can be instantiated with LocalStorageHandler", () => {
  const cart = new ShoppingCart("localStorage");
  expect(cart).toBeInstanceOf(ShoppingCart);
});

test("ShoppingCart can be instantiated with SessionStorageHandler", () => {
  const cart = new ShoppingCart("sessionStorage");
  expect(cart).toBeInstanceOf(ShoppingCart);
});

test("Items can be added to the cart", () => {
  const cart = new ShoppingCart("localStorage");
  cart.addProductToCart(1);
  cart.addProductToCart(2);
  cart.addProductToCart(3);

  expect(cart.getTotalQuantity()).toBe(3);

  cart.clearCart();
});

test("Items can be removed from the cart", () => {
  const cart = new ShoppingCart("localStorage");
  cart.addProductToCart(1);
  cart.addProductToCart(2);
  cart.addProductToCart(3);

  cart.removeProductFromCart(2);

  expect(cart.getTotalQuantity()).toBe(2);

  cart.clearCart();
});

test("Items can be incremented in the cart", () => {
  const cart = new ShoppingCart("localStorage");
  cart.addProductToCart(1);

  for (let i = 0; i < 10; i++) {
    cart.incrementProductQuantity(1);
  }

  expect(cart.getProductQuantity(1)).toBe(11);

  cart.clearCart();
});

test("Items can be decremented in the cart", () => {
  const cart = new ShoppingCart("localStorage");
  cart.addProductToCart(1);

  for (let i = 0; i < 10; i++) {
    cart.incrementProductQuantity(1);
  }

  for (let i = 0; i < 5; i++) {
    cart.decrementProductQuantity(1);
  }

  expect(cart.getProductQuantity(1)).toBe(6);

  cart.clearCart();
});

test("Items decremented to 0 are removed from the cart", () => {
  const cart = new ShoppingCart("localStorage");
  cart.addProductToCart(1);

  for (let i = 0; i < 5; i++) {
    cart.incrementProductQuantity(1);
  }

  const itemQuantity = cart.getProductQuantity(1);

  for (let i = 0; i < itemQuantity; i++) {
    cart.decrementProductQuantity(1);
  }

  expect(cart.getTotalQuantity()).toBe(0);

  cart.clearCart();
});

test("Cart can be cleared", () => {
  const cart = new ShoppingCart("localStorage");
  cart.addProductToCart(1);
  cart.addProductToCart(2);
  cart.addProductToCart(3);

  cart.clearCart();

  expect(cart.getTotalQuantity()).toBe(0);
});

test("Cart can be saved and loaded from LocalStorage", () => {
  const cart = new ShoppingCart("localStorage");
  cart.addProductToCart(1);
  cart.addProductToCart(2);
  cart.addProductToCart(3);

  const newCart = new ShoppingCart("localStorage");

  expect(newCart.getTotalQuantity()).toBe(3);

  cart.clearCart();
});

test("Cart can be saved and loaded from SessionStorage", () => {
  const cart = new ShoppingCart("sessionStorage");
  cart.addProductToCart(1);
  cart.addProductToCart(2);
  cart.addProductToCart(3);

  const newCart = new ShoppingCart("sessionStorage");

  expect(newCart.getTotalQuantity()).toBe(3);

  cart.clearCart();
});

test("getCart returns an array of CartItems", () => {
  const cart = new ShoppingCart("localStorage");
  cart.addProductToCart(1);
  cart.addProductToCart(2);
  cart.addProductToCart(3);

  const cartItems = cart.getCart();

  expect(cartItems).toBeInstanceOf(Array);
  expect(cartItems[0]).toHaveProperty("productId");
  expect(cartItems[0]).toHaveProperty("quantity");

  cart.clearCart();
});
