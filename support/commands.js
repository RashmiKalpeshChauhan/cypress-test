
require('cypress-xpath')
Cypress.Commands.add("searchFlight", (origin, desitnation) => { 
   cy.visit("https://www.tajawal.ae/en") 
   cy.seletAirport(origin,'Origin') 
   cy.seletAirport(desitnation,'Destination') 
  // cy.xpath("//input[@data-testid='FlightSearchBox__FareCalendarCheckbox']").click()
   // cy.get("[data-testid='FlightSearchBox__FromDateButton']").click()
    //cy.contains('30').click();
   // cy.contains('30').click();
   cy.wait(10000)
   cy.get('.form-check-label')
           .click({force: true});
   //cy.xpath("//input[@data-testid='FlightSearchBox__FareCalendarCheckbox']").click({force: true}).should('be.checked')
   cy.selectDate()
  // cy.wait(5000)
  // cy.plus2dayChcekbox();
   cy.wait(5000)
    cy.get(".form-check-label").click();
    cy.get("[data-testid='FlightSearchBox__SearchButton']").first().click()   
    cy.wait(10000) 
    cy.getCheapestTicket(); 
   })

   Cypress.Commands.add("seletAirport", (origin, locator) => { 
   if(cy.title().contains('tajawal',{ matchCase: false })){
    cy.xpath("//font[contains(text(),'Flight')]").click();   }   
    cy.get("[placeholder='"+locator+"']").type(origin);
    cy.get('li:nth-child(2) > div > div').should('be.visible')
    cy.get("span:contains("+origin+")").click({force: true})  
   })

   Cypress.Commands.add("selectDate",()=>{
     cy.get("[data-testid='FlightSearchBox__FromDateButton']").click()
        const date = Cypress.moment().get('date') + 5;
        if (date > 30) {
            date = 30;
        }
        cy.get('div[class="DayPicker-Months"]')
            .find('span', date)
            .contains(date)
            .click();
            cy.wait(10000)    
        cy.get('[data-testid=FlightSearchBox__RemoveReturnButton]').click({force: true})          
   })
  Cypress.Commands.add('plus2dayChcekbox',()=>{
   cy.xpath("//input[@data-testid='FlightSearchBox__FareCalendarCheckbox']").click({force: true})
   cy.xpath("//input[@data-testid='FlightSearchBox__FareCalendarCheckbox']").check({ force: true }).should('be.checked') 
  })
  Cypress.Commands.add('getCheapestTicket',()=>{
   cy.xpath("//td/div/span[2]").each($el => {
      const price = $el.text();
      const priceRegex = price.replace(/[$.,]+/g, '');
      const priceValue = parseInt(priceRegex)
      cy.log('priceValue: ', priceValue);
      expect(priceValue).to.be.lessThan(10000);
  })
  })