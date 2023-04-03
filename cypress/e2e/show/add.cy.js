/* eslint-disable no-undef */
import { connection } from '../../support/functions/connection'
import { deconnection } from '../../support/functions/deconnection'
import { user, password } from '../../support/variables'
import { add } from '../../support/functions/addShow'

describe('template spec', () => {
  it('passes', () => {
    connection(user, password)
    add('titleTest', 'descriptionTest', 'movie', 'directorTest', 'castTest', 'countryTest', 2000, 'durationTest', 'genreTest', 3)

    deconnection()
  })
})