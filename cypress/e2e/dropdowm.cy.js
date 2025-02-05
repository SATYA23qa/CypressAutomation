describe("handle dropdown",()=>{
    it("dropdown with select",()=>{
        cy.visit("https://www.zoho.com/commerce/free-demo.html?src=homepage")
       
        cy.get("#zcf_address_country").select('Italy')
        .select('Italy')
            .should('have.value','Italy')

            cy.wait(3000)

    })
})