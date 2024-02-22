<template>
  <div class="subscription-plan-card-skeleton">
    <v-skeleton-loader
      type="list-item-three-line"
      transition="fade-transition"
    />
    <v-skeleton-loader
      type="list-item-three-line"
      transition="fade-transition"
    />
    <v-skeleton-loader type="chip" transition="fade-transition" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Subscription Plan Card skeleton
 * ==================================================================================
 **/

export default {}
</script>
<style scoped lang="scss">
.subscription-plan-card-skeleton {
  background: #fafafa;
  border: 1px solid #ececec;
  border-radius: 16px;
  padding: 20px 0;

  > ::v-deep * {
    width: 100%;

    .v-skeleton-loader__list-item-three-line {
      background: transparent;
    }

    &:last-child {
      display: flex;
      justify-content: center;

      > * {
        width: 50%;
      }
    }
  }
}
</style>
