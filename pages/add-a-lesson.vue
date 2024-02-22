<template>
  <div
    class="add-lesson-page"
    :class="{
      'screen-border': hasMargin,
    }"
  >
    <div class="add-lesson-page__border">
      <NuxtChild />
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Add Lesson page
 * ==================================================================================
 **/

export default {
  head() {
    return {
      title: 'Add a lesson  | '
    }
  },

  computed: {
    hasMargin() {
      return this.$route.name !== 'add-a-lesson-success'
    }
  }
}
</script>
<style lang="scss" scoped>
.add-lesson-page {
  &__border {
    margin: 0 auto;
  }
}
</style>
