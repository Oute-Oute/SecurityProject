/* eslint-disable no-undef */
import { urlHome } from "../variables";

export function home() {
    cy.viewport(1920, 1080)
    cy.visit(urlHome)
}