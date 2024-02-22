<template>
  <v-select
    class="Choose reasoning for cancelling"
    :value="value"
    :items="validItems"
    :label="placeholder"
    :loading="loading"
    :disabled="disabled"
    append-icon="mdi-chevron-down"
    v-bind="$attrs"
    @input="onChange"
  />
</template>
<script>
/**
 * ==================================================================================
 * Select Cancellation Reason
 * ==================================================================================
 **/

import CANCELLATION_REASONS from '@/utils/enums/CancelReasons'

export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    },

    placeholder: {
      type: String,
      default: 'Choose reason for cancelling'
    },

    loading: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    validItems() {
      const items =
        this.categories && this.categories.length ? this.categories : []

      return items
    },

    categories() {
      return CANCELLATION_REASONS
    }
  },

  methods: {
    onChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
