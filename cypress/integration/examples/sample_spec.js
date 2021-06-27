/*
describe('Cotrack First Test', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })
  })
*/

/*
describe('Cotrack First Test', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(false)
    })
  })
*/

describe('My First Test', () => {
    it('Visits the Kitchen Sink', () => {
      cy.visit('https://example.cypress.io')
      cy.contains('type')
    })
    it('clicks the link "type"', () => {
        cy.visit('https://example.cypress.io')
    
        cy.contains('type').click()
      })
  })

