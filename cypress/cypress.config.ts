import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: 'http://localhost:5000',
    supportFile: false,
    env: {},
    specPattern: './e2e/**/*.cy.ts',
  },
});
