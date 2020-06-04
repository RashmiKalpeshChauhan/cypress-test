Cypress.Commands.add("searchFlight", (origin, desitnation) => { 
   cy.visit("https://www.tajawal.ae/en")   
   cy.seletAirport(origin,'Origin') 
   cy.seletAirport(desitnation,'Destination') 
 
    cy.get("[data-testid='FlightSearchBox__FromDateButton']").click()
    cy.contains('30').click();
    cy.contains('30').click();
    cy.get("[data-testid='FlightSearchBox__SearchButton']").first().click()    
   })

   Cypress.Commands.add("seletAirport", (origin, locator) => { 
   if(cy.title().contains('tajawal',{ matchCase: false })){
    cy.xpath("//font[contains(text(),'Flight')]").click();
   }   
    cy.get("[placeholder='"+locator+"']").type(origin);
    cy.get('li:nth-child(2) > div > div').should('be.visible')
    cy.get("span:contains("+origin+")").click({force: true})  
   })