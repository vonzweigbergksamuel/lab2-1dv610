# Test Report

All tests are written in the `test` directory using **ts-jest** (jest with typescript support). To simulate a browser environment for the local- and session storage, the **jest-environment-jsdom** library is used.

Run the tests using the `npm run test` command.

<br>

## Test Coverage

All methods in the public interface of the `ShoppingCart` class are tested. The test coverage is 100% for the `ShoppingCart` class.

Because the module is written in TypeScript utilizing types, the methods in the public interface are inherently type safe. This means that the methods will only accept the correct types of arguments and return the correct types of values. Thus, there is no need to test for type safety in the tests of the public interface.

Tests for other parts of the module that are not part of the public interface are not included in the test coverage. This is because these parts are not meant to be used by the consumer of the module. Some parts of the StorageHandlers would benefit from tests because they pull data from the local- and session storage which could potentially be corrupted. However, these tests are not included in the test coverage as of now.

<br>

## Test Results

The tests are run using the `npm run test` command. The test results are outputted to the console.

![Printscreen of test results](/test/testResults.png)
