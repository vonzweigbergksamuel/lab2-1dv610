# Shopping Cart Module

> This module is responsible for creating and managing a shopping cart object. As of now it supports storing the cart in the local- or session storage of the browser. It provides the following functionalities:

<br>

- Add a product to the cart
- Remove a product from the cart
- Increment/decrement the quantity of a product in the cart
- Clear the cart

<br>

- Get the cart object, containing all products in the cart with their respective quantities
- Get the total quantity of products in the cart
- Get the quantity of a specific product in the cart

<br>

---

<br>

### Important

If other storage options are wanted, they can be added by implementing the `StorageHandler` interface. The `LocalStorageHandler` and `SessionStorageHandler` classes are already implemented and can be used as examples.

No visual representation of the cart is provided by this module. It is up to the user to implement the visual representation of the cart in their application.

A product template is not provided by this module. The user is responsible for creating a product template that fits their needs. The only thing the module requires is a product id to store in the cart. The product id can then be used to fetch the product from a database or similar.

<br>

## Installation

```bash
  npm install @svz1234/shopping-cart
```

<br>

## Usage

1. Install the module as described above
2. Import the `ShoppingCart` class into your project
3. Create a new instance of the `ShoppingCart` class
4. Pass the string "localStorage" or "sessionStorage" to the constructor of the `ShoppingCart` to use the respective storage handler. Local storage is used by default if no argument is provided
5. Use the methods provided by the `ShoppingCart` class to manage the cart

<br>

```typescript
import { ShoppingCart } from "@svz1234/shopping-cart";

// Pass the string "localStorage" or "sessionStorage" to the constructor
const cart = new ShoppingCart("localStorage");

/**
 * The following methods take a product id as argument.
 * The product id can, as of now, only be a number.
 * This can potentially be changed in the future to support other types, like strings.
 */
cart.addProduct(123); // Returns void
cart.removeProduct(123); // Returns void
cart.incrementProductQuantity(123); // Returns void
cart.decrementProductQuantity(123); // Returns void

cart.getProductQuantity(123); // Returns number
console.log(cart.getProductQuantity(123)); // Example output: 4

/**
 * The following methods do not take any arguments.
 */
cart.getCart(); // Returns CartItem[]
console.log(cart.getCart());
/*
  Example output: [
    CartItem { productId: 1, quantity: 1 },
    CartItem { productId: 2, quantity: 3 },
    CartItem { productId: 3, quantity: 5 }
  ]
 */

cart.getTotalQuantity(); // Returns number
console.log(cart.getTotalQuantity()); // Example output: 3

cart.clearCart(); // Returns void
```

<br>

## Requirements

> The module must be used client side in a browser environment. This is because the module needs access to the local- and session storage of the browser.

<br>

## License

MIT ©

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<br>

## GitHub

[GitHub Repository](https://github.com/vonzweigbergksamuel/lab2-1dv610)

Testing is done using ts-jest (jest with typescript support). The tests can be found in the GitHub repository under the `test` directory. The tests are run using the `npm run test` command.
