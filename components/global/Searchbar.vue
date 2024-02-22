<template>
  <v-text-field
    v-model="form.search"
    class="searchbar"
    :class="{
      'searchbar--home': forHome,
      'searchbar--header': forHeader,
      'v-text-field--bg-primary': forHeader,
    }"
    filled
    flat
    :disabled="form.$busy"
    :hide-details="true"
    :placeholder="placeholder"
    @keydown.enter.prevent="submit"
  >
    <v-icon v-if="hasIcon" slot="prepend-inner" color="#0a2127">
      mdi-magnify
    </v-icon>
  </v-text-field>
</template>
<script>
/**
 * ==================================================================================
 * Searchbar
 * ==================================================================================
 **/

import { mapState } from 'vuex'

export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search for lessons...'
    },

    forHome: {
      type: Boolean,
      default: false
    },

    forHeader: {
      type: Boolean,
      default: false
    },

    hasIcon: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState({
      form: state => state.lesson.listing
    }),

    onSearchPage() {
      return ['search'].includes(this.$route.name)
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.form.search = decodeURIComponent(this.$route.query.q || '')
      this.emitSearch()
    },

    submit() {
      if (!this.onSearchPage) {
        return this.$router.push({
          name: 'search',
          query: {
            q: encodeURIComponent(this.form.search)
          }
        })
      }

      this.emitSearch()
    },

    emitSearch() {
      this.$root.$emit('search')
    }
  }
}
</script>
<style scoped lang="scss">
.searchbar {
  border-radius: 8px;

  ::v-deep .v-input__control {
    .v-input__slot {
      min-height: 60px;

      fieldset {
        background: #fff;
      }
    }
  }
}

.searchbar--home {
}

.searchbar--header {
  border-radius: 3px;
  max-width: 570px;

  ::v-deep .v-input__control {
    .v-input__slot {
      min-height: 38px;
      border: none !important;

      fieldset {
        border: none;
      }

      .v-input__prepend-inner {
        margin-top: 7px;
      }
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .searchbar {
    ::v-deep .v-input__control {
      .v-input__slot {
        min-height: 44px;

        .v-input__prepend-inner {
          margin-top: 10px;
        }
      }
    }
  }

  .searchbar--home {
  }

  .searchbar--header {
    display: none;
  }
}
</style>
