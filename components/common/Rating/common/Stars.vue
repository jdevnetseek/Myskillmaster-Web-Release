<template>
  <div class="stars">
    <div class="stars__border d-flex flex-row" :style="starsContainerStyle">
      <v-icon
        v-for="index in 5"
        :key="index"
        :size="size"
        :color="getColor(index)"
        class="stars__icon"
        :class="{ 'stars__icon--static': !interactive }"
        @click="interactive ? handleClick(index) : null"
      >
        {{ getStarIcon(index) }}
      </v-icon>
    </div>
    <slot name="bottom-label" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Rating: Stars
 * ==================================================================================
 **/
export default {
  props: {
    interactive: {
      type: Boolean,
      default: false
    },
    gap: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 13
    },
    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    starsContainerStyle() {
      return {
        gap: `${this.gap}px`
      }
    }
  },

  methods: {
    handleClick(index) {
      this.$emit('clicked', index)
    },
    getColor(index) {
      if (this.value >= index) {
        return '#ffd20c'
      }
      if (this.interactive) {
        return '#0a2127'
      }
      return '#c0c0c0'
    },
    getStarIcon(index) {
      if (!this.interactive) {
        return 'mdi-star'
      }
      return this.value >= index ? 'mdi-star' : 'mdi-star-outline'
    }
  }
}
</script>
<style scoped lang="scss">
.stars {
  max-width: 255px;

  &__icon {
    &--static {
      cursor: default !important;
    }
  }
}
</style>
