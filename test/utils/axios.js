/**
 * ==================================================================================
 * Mocking of `axios` library
 * ==================================================================================
 **/

const Axios = function () {
  const obj = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),

    mockClear () {
      this.get.mockClear()
      this.post.mockClear()
      this.put.mockClear()
      this.delete.mockClear()
    }
  }

  return obj
}

export default Axios
