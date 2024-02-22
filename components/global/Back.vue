<template>
  <h6
    class="back"
    :style="{
      color: color,
    }"
    @click="goTo"
  >
    <v-icon :color="color" size="18" class="mr-1">
      mdi-arrow-left
    </v-icon>
    {{ label }}
  </h6>
</template>
<script>
/**
 * ==================================================================================
 * Back
 * ==================================================================================
 **/

export default {
  props: {
    redirect: {
      type: String,
      default: null
    },

    label: {
      type: String,
      default: 'Back'
    },

    color: {
      type: String,
      default: '#007675'
    }
  },

  methods: {
    goTo() {
      if (this.redirect) {
        this.$router.push({
          name: this.redirect
        })
      } else {
        this.$router.back()
      }
    }
  }
}
</script>
<style scoped lang="scss">
.back {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
