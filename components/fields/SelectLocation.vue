<template>
  <v-select
    class="select-location"
    :value="value"
    :items="validItems"
    :item-text="textColumn"
    :item-value="valueColumn"
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
 * Select Location
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  mixins: [SnackbarMixin],
  props: {
    value: {
      type: [String, Number],
      default: null
    },

    placeholder: {
      type: String,
      default: 'Location'
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
      default: 'id'
    },

    textColumn: {
      type: String,
      default: 'formatted_address'
    }
  },

  computed: {
    ...mapState({
      form: state => state.location.listing,
      locations: state => state.location.list
    }),

    validItems() {
      const items = [
        ...(this.locations && this.locations.length ? this.locations : [])
      ]

      return items
    }
  },

  async mounted() {
    await this.fetch()
  },

  methods: {
    onChange(value) {
      this.$emit('input', value)
    },

    async fetch() {
      this.form.$clearErrors()

      if (!this.form.$busy) {
        await this.$store.dispatch('location/getList').then(() => {
          if (this.form.$hasErrors()) {
            this.showSnackbar(this.form.$errorMessage, false)
          }
        })
      }
    }
  }
}
</script>
