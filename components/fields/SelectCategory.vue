<template>
  <v-select
    class="select-category"
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
 * Select Category
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
      default: 'Category'
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
      default: 'label'
    }
  },

  computed: {
    ...mapState({
      form: state => state.category.listing,
      categories: state => state.category.categories
    }),

    validItems() {
      const items = [
        ...(this.categories && this.categories.length ? this.categories : [])
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
        await this.$store.dispatch('category/getCategories').then(() => {
          if (this.form.$hasErrors()) {
            this.showSnackbar(this.form.$errorMessage, false)
          }
        })
      }
    }
  }
}
</script>
