import { urlHome } from "../../support/variables"
import { password } from "../../support/variables"
import { deconnection } from "../../support/functions/deconnection"
/* eslint-disable no-undef */
describe('template spec', () => {
  it('passes', () => {
    cy.visit(urlHome)
    cy.get('a[id="register-menu"]').click()
    const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) => ('x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16))
    cy.get('input[id="mail"]').type(uuid() + '@gmail.com')
    cy.get('input[id="password"]').type(password)
    cy.get('input[id="confirm"]').type(password)
    cy.get('button[id="register"]').click()
    cy.url().should('eq', urlHome)
    deconnection()
  })
})