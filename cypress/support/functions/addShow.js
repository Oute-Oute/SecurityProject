/* eslint-disable no-undef */
export function add(title, description, type, director, cast, country, release_year, duration, genre, rating) {
    cy.get('button[id="addShow"]').click()
    cy.get('input[id="title"]').type(title)
    cy.get('textarea[id="description"]').type(description)
    if (type === 'movie') {
        cy.get('input[value="movie"]').check()
    } else {
        cy.get('input[value="series"]').check()
    }
    cy.get('input[id="director"]').type(director)
    cy.get('input[id="cast"]').type(cast)
    cy.get('input[id="country"]').type(country)
    cy.get('input[id="release_year"]').type(release_year)
    cy.get('input[id="duration"]').type(duration)
    cy.get('input[id="genre"]').type(genre)
    cy.get('input[id="rating"]').type(rating)
    cy.get('button[id="saveShow"]').click()
}