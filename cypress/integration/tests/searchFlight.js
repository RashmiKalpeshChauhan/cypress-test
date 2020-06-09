///<reference types="cypress" />
require('cypress-xpath')
describe('Login Test case', () => {
    beforeEach(() => {
        cy.fixture('testData.json').as('testdata')  
       // cy.visit("https://www.tajawal.ae/en")   
       cy.visit("https://ae.almosafer.com/ar")        
      })    

    xit("ticket value should less than 10000", () => {
        cy.get('@testdata').then((testdata) => {
            cy.searchFlight(testdata.origin, testdata.destination)
            cy.get('.jVxLcd + div').each($el => {
                const price = $el.text();
                const priceRegex = price.replace(/[$.,]+/g, '');
                const priceValue = parseInt(priceRegex)
                cy.log('priceValue: ', priceValue);
                expect(priceValue).to.be.lessThan(10000);
            })
        })
        
    })

  

    it("ticket value should less than 10000", (testData) => {        
        cy.searchFlight(origin,destination);    
        cy.selectDate();        
        cy.searchButton();
        cy.lowestPrice();        
    })
    it("validate the languge of page is english", () => {
        if(cy.title().should('not.have.value', 'tajawal')){
            cy.get('[data-testid="Header__LanguageSwitch"]').click() 
            cy.xpath("//font[text()='English']").click()
            cy.wait(10000)
           }
         cy.get('h2').contains("LET'S BOOK YOUR NEXT TRIP")
     })
})
