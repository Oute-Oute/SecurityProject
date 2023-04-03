/* eslint-disable no-undef */
import { urlHome, user, password } from "../../support/variables"
import { deconnection } from "../../support/functions/deconnection"
import { connection } from "../../support/functions/connection"

describe('template spec', () => {
  it('passes', () => {
    connection(user, password)
    cy.visit(urlHome)
    cy.get('table[class="table"]').should('be.visible')
    deconnection()
  })
})