/**
 * ==================================================================================
 * Content helper
 * ==================================================================================
 **/

import * as DOMPurify from 'dompurify'

export default (() => {
  const obj = {
    sanitize(html) {
      return DOMPurify.sanitize(html)
    }
  }

  return obj
})()
