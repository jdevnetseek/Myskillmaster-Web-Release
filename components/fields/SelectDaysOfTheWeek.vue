<template>
  <v-combobox
    class="select-day-of-the-week"
    :value="value"
    :items="validItems"
    :placeholder="placeholder"
    :loading="loading"
    :disabled="disabled"
    multiple
    append-icon="mdi-chevron-down"
    v-bind="$attrs"
    @input="onChange"
  />
</template>
<script>
/**
 * ==================================================================================
 * Select Days of the Week
 * ==================================================================================
 **/

import { DAYS_OF_THE_WEEK } from '@/utils/enums/DaysOfTheWeek'

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },

    placeholder: {
      type: String,
      default: 'Available dates'
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
      const items = [...(this.items && this.items.length ? this.items : [])]
      return items
    },

    items() {
      return DAYS_OF_THE_WEEK
    }
  },

  methods: {
    onChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
