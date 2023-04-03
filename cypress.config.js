const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'n8nphk',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
