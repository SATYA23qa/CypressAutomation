// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
     // this is for cypress commands
///<reference types ="cypress" />   

const cypress = require("cypress");

       // this is for xpath commands
///<reference types ="cypress-xpath" /> 

// create custom commands get the getIframe
cypress.Commands.add('getIframe',(iframe)=>{
     return cy.get(iframe)                   
     .its('0.contentDocument.body')
     .should('be.visible')
     .then(cy.wrap);s
          

})
//custom command for clicking  on link  using label  
Cypress.Commands.add('clicklink',(label)=>{
     cy.get('a').contains(label).click();
})   

// over write contains method for case sensivite
Cypress.Commands.overwrite('contains',(originalFn,subject,filter,text,options={})=>{
     // determine if a filter argument was passed
     if(typeof text ==='object'){
          options=text
          text =filter
          filter = undefined
     }
     options.matchCase = false

     return originalFn(subject,filter,text, options)
})

//custom command for login
Cypress.Commands.add("loginapp",(email,password)=>{
     cy.get('#email').type(email);
     cy.get('#password').type(password);
     cy.get("button[class='button-1 login-button']").click();
})


//We are creating a custom command named GETrequest which has URL and userDataLink as argument 
Cypress.Commands.add('GETrequest', (url,userDataLink) =>{
     //Usual GET request command
     cy.request('GET',`${Cypress.env(url)+userDataLink}`)
     })

Cypress.Commands.add('login',(email,passowrd)=>{
     cy.visit('') // so it will pick up the baseurl from config file
     cy.get('#input-email').type(email)
     cy.get('#input-password').type(password)
     cy.get('input.btn.btn-primary').click()
})
