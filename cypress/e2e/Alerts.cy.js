describe("js alert", ()=>{

    it("alert",()=>{

        cy.visit("https://the-internet.herokuapp.com/javascript_alerts")
        cy,get("button[onlick='jsAlert()']").click()
    
        cy.on('window:alert',(t)=>{
         // we are validating text which is present in the alert window
            expect(t).to.contains('im a JS alert');
    
        })
           // after closing alert window we are validating this text  
          // get this element and sholud have succussfully clicked msg present
        cy.get("#result").should('have.text', 'you successfully clicked  an alert')
    }) 
   
    
})