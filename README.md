# example-application

This is an example application that utilizes the `@packages/*` libraries.


## Installation

To link packages locally, run the following command:

```bash
yarn link /path/to/nodejs-universal-boilerplate-libs --all
```

This command updates package resolutions, allowing you to use these libraries locally. Ensure all libraries are built before usage by running in the libraries directory:

```bash
yarn run build:all
```

## Running Tests

### Unit Tests

You can run unit tests using Jest with the following command:

```bash
yarn run tests
```

### End-to-End Tests

For end-to-end tests, use Cypress with one of these commands:

```bash
yarn run test:e2e
yarn run test:e2e:open
```

**Note**: Currently, Cypress does not support PnP modules. Therefore, for Cypress, there is a separate project directory. You must install dependencies separately in the `./cypress` directory before running Cypress tests.

