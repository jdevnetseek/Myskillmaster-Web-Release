<template>
  <v-skeleton-loader
    type="card"
    transition="fade-transition"
    class="master-card-skeleton"
    :boilerplate="true"
  />
</template>
<script>
/**
 * ==================================================================================
 * Msater Card Skeleton
 * ==================================================================================
 **/

export default {}
</script>
<style scoped lang="scss">
$cardRadius: 8px;
.master-card-skeleton {
  border-radius: $cardRadius;
  background: #ffffff;
  box-shadow: $card-box-shadow;

  ::v-deep .v-skeleton-loader__image {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
