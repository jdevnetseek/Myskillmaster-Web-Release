<template>
  <div class="read-more d-flex flex-row">
    <p class="mb-0">
      {{ text }} <b v-if="hasReadMore" @click="toggle">{{ buttonLabel }}</b>
    </p>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Read More
 * ==================================================================================
 **/

import { truncate } from '@/utils/Helpers'

export default {
  props: {
    content: {
      type: String,
      default: ''
    },

    maxLength: {
      type: Number,
      default: 225
    }
  },

  data() {
    return {
      readMore: false
    }
  },

  computed: {
    text() {
      if (!this.hasReadMore) {
        return this.content
      }

      return this.readMore
        ? this.content
        : truncate(this.content, this.maxLength)
    },

    buttonLabel() {
      return this.readMore ? 'Read Less' : 'Read More'
    },

    hasReadMore() {
      return this.content.length > this.maxLength
    }
  },

  methods: {
    toggle() {
      this.readMore = !this.readMore
    }
  }
}
</script>
<style scoped lang="scss">
.read-more {
  p {
    b {
      color: $primary;
      cursor: pointer;
    }
  }
}
</style>
