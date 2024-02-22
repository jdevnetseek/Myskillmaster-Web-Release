import { assignIn, cloneDeep, each, isEmpty } from 'lodash'

const State = (vars) => {
  const rawVars = Object.assign({}, vars)
  const obj = {
    ...vars,
    $errors: {},
    $errorStatus: null,
    $errorMessage: '',
    $busy: false,

    /**
     * Methods
     * ==================================================================================
     **/
    $data() {
      const data = cloneDeep(rawVars)
      each(rawVars, (_, key) => {
        data[key] = this[key]
      })

      return data
    },

    $clearErrors() {
      this.$errors = {}
      this.$errorStatus = null
      this.$errorMessage = ''
    },

    $reset() {
      assignIn(this, rawVars)
      this.$clearErrors()
    },

    $getError(field) {
      return this.$errors ? this.$errors[field] : null
    },

    $hasError(field) {
      return !!(this.$errors && this.$errors[field])
    },

    $hasErrors() {
      if (this.$errorMessage || !isEmpty(this.$errors)) {
        return true
      }

      return false
    }
  }

  return obj
}

export default State
