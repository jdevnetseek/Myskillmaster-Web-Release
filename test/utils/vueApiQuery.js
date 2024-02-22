/**
 * ==================================================================================
 * Mocking of `vue-api-query` Models
 * ==================================================================================
 **/

class Query {
  constructor(data) {
    for (const key in data) {
      this[key] = data[key]
    }
  }

  static page() {
    return this
  }

  static query() {
    return this
  }

  static where() {
    return this
  }

  static custom() {
    return this
  }

  static include() {
    return this
  }

  static limit() {
    return this
  }

  static params() {
    return this
  }

  static get() {
    return this
  }
}

/* Create a new class extending the Query class */
module.exports = function(name) {
  return { [name]: class extends Query {} }[name]
}
