<template>
  <v-skeleton-loader
    type="card"
    transition="fade-transition"
    class="lesson-category-card-skeleton"
    :boilerplate="true"
  />
</template>

<script>
/**
 * ==================================================================================
 * Lesson Category Card Skeleton
 * ==================================================================================
 **/

export default {}
</script>
<style scoped lang="scss">
$cardRadius: 8px;
.lesson-category-card-skeleton {
  border-radius: $cardRadius;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(10, 33, 39, 0.08);

  ::v-deep .v-skeleton-loader__image {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
