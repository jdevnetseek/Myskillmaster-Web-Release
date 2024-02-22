<template>
  <v-tooltip
    bottom
    class="tooltip"
    content-class="tooltip-content"
    :disabled="disabled"
  >
    <template #activator="{ on }">
      <v-icon :color="iconColor" size="20" v-on="on" v-text="icon" />
    </template>
    <slot />
  </v-tooltip>
</template>
<script>
/**
 * ==================================================================================
 * Tooltip
 * ==================================================================================
 **/

export default {
  props: {
    icon: {
      type: String,
      default: 'mdi-help-circle-outline'
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    iconColor() {
      return this.disabled ? 'grey' : 'primary'
    }
  }
}
</script>
<style scoped lang="scss">
.tooltip {
  cursor: pointer;
}

.tooltip-content {
  padding: 15px 20px;
  background: white;
  opacity: 1;
  box-shadow: 0px 2px 4px 2px rgb(0 0 0 / 5%);
}
</style>
