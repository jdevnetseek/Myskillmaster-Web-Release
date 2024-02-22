/**
 * ==================================================================================
 * Mocking of `vue-router` library
 * ==================================================================================
 **/

const Router = function() {
  const obj = {
    replace: jest.fn(),
    push: jest.fn(),

    mockClear() {
      this.replace.mockClear()
      this.push.mockClear()
    }
  }

  return obj
}

export default Router
