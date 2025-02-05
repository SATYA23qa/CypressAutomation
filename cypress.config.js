
const { defineConfig } =  require ("cypress");

module.exports = defineConfig({
  reporter :'cypress-mochawesome-reporter',
  e2e: {
    
    BaseUrl :"https://www.zoho.com/commerce/free-demo.html?src=loginpage",

    setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  
    env: {
     CYPRESS_RECORD_KEY: "0801d75e-32c1-4e04-9543-e62866f2152c",
      authToken: 'YOUR_API_TOKEN', // Example environment variable
    },
  },

 
});



