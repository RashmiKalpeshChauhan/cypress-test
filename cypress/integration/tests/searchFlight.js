///<reference types="cypress" />
require('cypress-xpath')
describe('Login Test case', () => {
    beforeEach(() => {
       // cy.fixture('testData.json').as('testdata')  
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

  

    it("ticket value should less than 10000", () => {
        cy.get("[data-testid=Header__FlightsNavigationTab]").click();
        cy.get("[data-testid='FlightSearchBox__FromAirportInput']").type("DXB");
        cy.get("span:contains('DXB')").click({ force: true })
        cy.get("[data-testid='FlightSearchBox__ToAirportInput']").type("DEL");
        cy.get("span:contains('DEL')").click({ force: true })
        cy.wait(50)
         cy.xpath("//input[@data-testid='FlightSearchBox__FareCalendarCheckbox']").click({force: true})
        cy.get("[data-testid='FlightSearchBox__FromDateButton']").click()
        const date = Cypress.moment().get('date') + 5;
        if (date > 30) {
            date = 30;
        }
        cy.get('div[class="DayPicker-Months"]')
            .find('span', date)
            .contains(date)
            .click();
        cy.get('[data-testid=FlightSearchBox__RemoveReturnButton]').click()
        cy.wait(50)
        cy.get("[data-testid='FlightSearchBox__SearchButton']").first().click()
        cy.xpath("//td/div/span[2]").each($el => {
            const price = $el.text();
            const priceRegex = price.replace(/[$.,]+/g, '');
            const priceValue = parseInt(priceRegex)
            cy.log('priceValue: ', priceValue);
            expect(priceValue).to.be.lessThan(10000);
        })
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