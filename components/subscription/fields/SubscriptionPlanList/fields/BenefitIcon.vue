<template>
  <div
    class="benefit-icon d-flex justify-center align-center"
    :class="{
      'benefit-icon--selected': isSelected,
    }"
    :style="{
      backgroundColor: background,
    }"
  >
    <v-icon size="18">
      {{ icon }}
    </v-icon>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Benefit Icon
 * ==================================================================================
 **/

export default {
  props: {
    isSelected: {
      type: Boolean,
      default: true
    },

    isBenefit: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    icon() {
      return this.isBenefit ? 'mdi-check' : 'mdi-close'
    },

    background() {
      if (this.isSelected) {
        return '#ffffff'
      }

      return this.isBenefit ? '#CFF4DE' : '#EDF4F9'
    }
  }
}
</script>
<style scoped lang="scss">
.benefit-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;

  .v-icon {
  }
}

.benefit-icon--selected {
}
</style>
