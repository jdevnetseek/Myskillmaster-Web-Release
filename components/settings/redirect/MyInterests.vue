<template>
  <div class="my-interests menu">
    <div class="mb-4">
      <hr class="mb-3">

      <NuxtLink
        :to="{
          name: 'settings-my-interests',
        }"
        class="mx-4"
      >
        My Interests
      </NuxtLink>

      <hr class="mt-3">
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * My Interests
 * ==================================================================================
 **/

export default {}
</script>
<style scoped lang="scss">
.my-interests {
}
</style>
