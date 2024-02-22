import CONTENT from '@/utils/Content'

/**
 * Mock component methods & API calls
 * ==================================================================================
 */

//

/**
 * Functions
 * ==================================================================================
 */

//

/**
 * Tests
 * ==================================================================================
 */

describe('sanitize()', () => {
  test('should remove scripts on HTML string', (done) => {
    const test = (dom, result) => {
      expect(CONTENT.sanitize(dom)).toBe(result)
    }

    test('<img src="x" onerror=alert(1)>', '<img src="x">')
    test('<svg><g/onload=alert(2)//<p>', '<svg><g></g></svg>')
    test('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>', '<p>abc</p>')
    test(
      '<math><mi//xlink:href="data:x,<script>alert(4)</script>">',
      '<math><mi></mi></math>'
    )
    test(
      '<TABLE><tr><td>HELLO</tr></TABL>',
      '<table><tbody><tr><td>HELLO</td></tr></tbody></table>'
    )
    test(
      '<UL><li><A HREF=//google.com>click</UL>',
      '<ul><li><a href="//google.com">click</a></li></ul>'
    )

    done()
  })
})
