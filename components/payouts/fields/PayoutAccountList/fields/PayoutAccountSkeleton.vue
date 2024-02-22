<template>
  <div class="payout-account-skeleton">
    <v-skeleton-loader type="list-item" transition="fade-transition" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Payout Account skeleton
 * ==================================================================================
 **/

export default {}
</script>
<style scoped lang="scss">
.payout-account-skeleton {
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 8px 15px;

  > ::v-deep * {
    width: 100%;

    .v-skeleton-loader__list-item {
      background: transparent;
    }
  }
}
</style>
