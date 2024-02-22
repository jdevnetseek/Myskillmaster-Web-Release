/**
 * ==================================================================================
 * Image helper
 * ==================================================================================
 **/

import { sentence } from '@/utils/Helpers'

export default (() => {
  const obj = {
    validImageTypes: ['png', 'jpg', 'jpeg'],

    /**
     * Finds the image URL
     * @param  {String|Object} image
     * @param  {Boolean}       thumbnail
     * @return {String}
     */
    url(image, thumbnail = false) {
      if (!image) {
        return ''
      }
      if (typeof image === 'string' || image instanceof String) {
        return image
      }
      return typeof image === 'object'
        ? thumbnail
          ? image.thumb_url || image.url
          : image.url || image.thumb_url
        : false
    },

    /**
     * Validates and convert file result to blob
     * @param  {File}   file
     * @param  {Number} maxSize
     * @return {Promise}
     */
    toBase64(file, maxSize = null) {
      return new Promise((resolve, reject) => {
        /**
         * Check file size and type
         */
        if (!file) {
          reject(new Error('Photo is required'))
        }

        if (maxSize && this.toMb(file.size) > maxSize) {
          reject(
            new Error(`Photo size must be equal or less than ${maxSize}MB`)
          )
        }

        if (!this.isImage(file)) {
          reject(new Error('Photo must be an image'))
        }

        if (!this.isValidType(file)) {
          reject(
            new Error(`Image must be ${sentence(this.validImageTypes, 'or')}`)
          )
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          resolve({
            file,
            name: file.name,
            url: e.target.result
          })
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    },

    /**
     * Convert Bytes to MB
     * @param  {Number} size
     * @return {Number}
     */
    toMb(size) {
      return size ? size / 1024 / 1024 : 0
    },

    isImage(file) {
      const type = this.getFileType(file)[0]
      return type === 'image'
    },

    isValidType(file) {
      const type = this.getFileType(file)[1]
      return this.validImageTypes.includes(type)
    },

    getFileType(file) {
      return file && file.type ? file.type.split('/') : [null, null]
    }
  }

  return obj
})()
