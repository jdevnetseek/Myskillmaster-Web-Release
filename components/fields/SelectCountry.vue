<template>
  <v-select
    class="select-country"
    :value="value"
    :items="validItems"
    :item-text="textColumn"
    :item-value="valueColumn"
    :placeholder="placeholder"
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
 * Select Country
 * ==================================================================================
 **/

import COUNTRIES from '@/utils/enums/Countries'

export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    },

    placeholder: {
      type: String,
      default: 'Select a country'
    },

    loading: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    valueColumn: {
      type: String,
      default: 'name'
    },

    textColumn: {
      type: String,
      default: 'name'
    }
  },

  computed: {
    validItems() {
      const items = [
        ...(this.categories && this.categories.length ? this.categories : [])
      ]

      return items
    },

    categories() {
      return COUNTRIES
    }
  },

  methods: {
    onChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
