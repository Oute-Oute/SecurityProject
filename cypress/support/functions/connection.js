import { deconnection } from './deconnection.js';

/* eslint-disable no-undef */
const { urlHome, urlLogIn, isLogIn } = require('../variables.js')

export function connection(user, password) {
    // Click the Log in button
    cy.visit(urlLogIn)

    // Write the inputs in the form and log in
    cy.get("input[id='mail']").type(user)
    cy.get("input[id='password']").type(password)
    //connect to site
    cy.get("button[id='connect']").click();

    // Verify the redirection to the home page
    cy.url().should('eq', urlHome)
}