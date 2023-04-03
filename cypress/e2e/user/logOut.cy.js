/* eslint-disable no-undef */
import { deconnection } from '../../support/functions/deconnection'
import { connection } from '../../support/functions/connection'
import { home } from '../../support/functions/home'
import { user, password } from '../../support/variables'
describe('deconnection', () => {
  it('passes', () => {
    home()
    connection(user, password)
    deconnection()
  })
})