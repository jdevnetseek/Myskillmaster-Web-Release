import { isEmpty } from 'lodash'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

function generateUniqueId() {
  return uuidv4()
}

function validateUniqueId(id) {
  return uuidValidate(id)
}

function truncate(str, n = 75, ellipsis = '...') {
  return str.length > n ? `${str.substr(0, n - 1)}${ellipsis}` : str
}

function capitalize(str) {
  return str ? str.toString().charAt(0).toUpperCase() + str.slice(1) : ''
}

function capitalizeSentence(str) {
  const sentence = str.split(' ')

  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = capitalize(sentence[i])
  }

  return sentence.join(' ')
}

function sentence(arr, conjunction = 'and') {
  if (Array.isArray(arr)) {
    const tmpSentence = [...arr]
    if (tmpSentence.length <= 2) {
      return tmpSentence.join(` ${conjunction} `)
    }

    const last = tmpSentence.pop()
    return tmpSentence.join(', ') + ` ${conjunction} ` + last
  }

  return arr
}

function parseToSnakeCase(str) {
  return str ? str.replace(/\s+/g, '_').toLowerCase() : ''
}

function parseToFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    /**
     * NOTE: Special case scenario for `File upload` objects
     * where we want to pass the file
     *
     * TODO: Better checker for it? Not just `file` var
     */
    if (data.file) {
      formData.append(parentKey, data.file)
    } else {
      Object.keys(data).forEach((key) => {
        parseToFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        )
      })
    }
  } else {
    const value = data == null ? '' : data
    formData.append(parentKey, value)
  }
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

function isObject(value) {
  return typeof value === 'object' && !Array.isArray(value) && value !== null
}

function getFullPath(path) {
  return new URL(path, window.location.origin).href
}

function getErrorResponse(error, alwaysIncludeMessage = false) {
  let errors = {}
  let message = null

  if (!error.response) {
    //
  } else if (error.response.status === 422) {
    errors = error.response.data.errors
    message = error.response.data.message

    /**
     * Check if main message is already included on the
     * errors list
     */
    if (!alwaysIncludeMessage && isObject(errors)) {
      for (const field in errors) {
        if (Array.isArray(errors[field]) && errors[field].includes(message)) {
          message = ''
          break
        }
      }
    }
  } else {
    message = error.response.data.message
  }

  /**
   * Add in default error message if nothing was fetched
   */
  if (isEmpty(errors) && !message) {
    message = "Something went wrong and we couldn't complete your request"
  }

  return {
    errors,
    status: error.response ? error.response.status : null,
    message
  }
}

function convertToSlug(string) {
  return string
    .toLowerCase() // LowerCase
    .replace(/\s+/g, '-') // space to -
    .replace(/&/g, '-and-') // & to and
    .replace(/--/g, '-') // -- to -
}

export {
  generateUniqueId,
  validateUniqueId,
  capitalize,
  capitalizeSentence,
  truncate,
  sentence,
  parseToSnakeCase,
  parseToFormData,
  hasOwnProperty,
  isObject,
  getFullPath,
  getErrorResponse,
  convertToSlug
}
