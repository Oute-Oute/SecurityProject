/* eslint-disable no-undef */
const { urlHome, urlLogIn, isLogIn } = require('../variables.js')

export function deconnection(user, password) {
    // Click the Log in button
    //cy.visit(urlHome)

    // Write the inputs in the form and log in
    cy.get("button[id='logout-menu']").click()

    // Verify the redirection to the home page
    cy.get("a[id='login-menu']").should('be.visible')

}