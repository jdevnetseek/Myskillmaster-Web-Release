import IMAGE from '@/utils/Image'

/**
 * Mock component methods & API calls
 * ==================================================================================
 */

// Mock FileReader.readAsDataURL() to succeed
const fileReaderSpy = jest
  .spyOn(FileReader.prototype, 'readAsDataURL')
  .mockImplementation(function() {
    this.onload({
      target: {
        result: 'result'
      }
    })
  })

/**
 * Functions
 * ==================================================================================
 */

const mockFile = (data = {}) => {
  const { mb = 1, type = 'image/png' } = data
  return {
    name: 'sample-image.png',
    size: mb * 1024 * 1024,
    type
  }
}

/**
 * Tests
 * ==================================================================================
 */

describe('url()', () => {
  test('should check for null', (done) => {
    expect(IMAGE.url(null)).toBe('')
    done()
  })

  test('should return simple URL string', (done) => {
    const urlString = 'https://image.com/sample-image.png'
    expect(IMAGE.url(urlString)).toBe(urlString)
    done()
  })

  test('should return URL or thumbnail URL value for objects', (done) => {
    const urlString = 'https://image.com/sample-image.png'
    const urlThumbString = 'https://image.com/sample-thumb-image.png'
    const imageObj = {
      url: urlString,
      thumb_url: urlThumbString
    }

    expect(IMAGE.url(imageObj)).toBe(imageObj.url)
    delete imageObj.url
    expect(IMAGE.url(imageObj)).toBe(imageObj.thumb_url)

    done()
  })

  test('should return thumbnail URL value if specified', (done) => {
    const urlString = 'https://image.com/sample-image.png'
    const urlThumbString = 'https://image.com/sample-thumb-image.png'
    const imageObj = {
      url: urlString,
      thumb_url: urlThumbString
    }

    expect(IMAGE.url(imageObj, true)).toBe(imageObj.thumb_url)

    done()
  })
})

describe('toBase64()', () => {
  test('should not allow empty file', async(done) => {
    expect(IMAGE.toBase64(null)).rejects.toThrow()
    done()
  })

  test('should not exceed max file limit', async(done) => {
    const maxSize = Math.floor(Math.random() * 10) + 1
    expect(
      IMAGE.toBase64(mockFile({ mb: maxSize + 1 }), maxSize)
    ).rejects.toThrow()
    done()
  })

  test('should only allow specified image types', async(done) => {
    for (const type of IMAGE.validImageTypes) {
      expect(
        IMAGE.toBase64(mockFile({ type: `image/${type}` }))
      ).resolves.toBeTruthy()
    }

    expect(IMAGE.toBase64(mockFile({ type: 'image/fake' }))).rejects.toThrow()

    done()
  })
})
