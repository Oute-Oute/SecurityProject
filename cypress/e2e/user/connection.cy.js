/* eslint-disable no-undef */
const { home } = require("../../support/functions/home");
const { connection } = require("../../support/functions/connection");
const { deconnection } = require("../../support/functions/deconnection");
const { user, password } = require("../../support/variables");

describe('connection', () => {
  it('passes', () => {
    home()
    connection(user, password)
    deconnection()
  })
})

