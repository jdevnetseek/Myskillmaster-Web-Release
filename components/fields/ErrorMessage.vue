<template>
  <div v-if="hasError" class="error-message v-messages" role="alert">
    <div class="v-messages__wrapper">
      <div class="error-message__message v-messages__message">
        <template v-if="isList">
          <ul>
            <li v-for="(e, index) in parsedError" :key="index">
              {{ e }}
            </li>
          </ul>
        </template>
        <template v-else>
          <span v-if="sign" class="error-message__sign">{{ sign }}</span>{{ parsedError }}
        </template>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Error Message
 * - Same design w/ the v-text-field's error label
 * - Copying the v-messages template
 * ==================================================================================
 **/

import { isEmpty } from 'lodash'
import { sentence } from '@/utils/Helpers'

export default {
  name: 'ErrorMessage',
  props: {
    error: {
      type: [String, Array, Object],
      default: null
    },

    /**
     * Error symbol before the message
     */
    sign: {
      type: String,
      default: null
    },

    /**
     * Handles how the error will be shown
     */
    display: {
      type: String,
      default: 'sentence',
      validator(value) {
        return ['single', 'sentence', 'list'].includes(value)
      }
    }
  },

  computed: {
    /**
     * Parse the error message depending on the `display`
     * settings specified
     * @return {Array|String}
     */
    parsedError() {
      if (!Array.isArray(this.error)) {
        return this.error
      }

      switch (this.display) {
        case 'single':
          return this.error[0]
        case 'sentence':
          return this.getSentence(this.error)
        case 'list':
          return this.error
        default:
          return null
      }
    },

    /**
     * Checker if UL/LI element should be used
     * @return {Boolean}
     */
    isList() {
      if (this.display !== 'list') {
        return false
      }
      return Array.isArray(this.parsedError)
    },

    hasError() {
      return !isEmpty(this.parsedError)
    }
  },

  methods: {
    /**
     * Join array to make a sentence with `,` and `and`
     * @return {String}
     */
    getSentence(arr) {
      return sentence(arr)
    }
  }
}
</script>
<style lang="scss" scoped>
.error-message {
  display: block;

  &__sign {
    margin-right: 5px;
  }

  &__message {
    color: $alert-error;
  }

  > ul,
  li {
    font-family: inherit;
    font-size: inherit;
  }

  > ul {
    margin: inherit;
    padding: inherit;
    color: inherit;
  }
}
</style>
