<template>
  <div class="security-settings menu">
    <div class="mb-4">
      <p class="font-weight-bold">
        SECURITY SETTINGS
      </p>
      <hr class="mb-3">

      <NuxtLink
        :to="{
          path: '/change-password',
        }"
        class="mx-4"
      >
        Change password
      </NuxtLink>

      <hr class="mt-3">
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Security Settings
 * ==================================================================================
 **/

export default {}
</script>
<style scoped lang="scss">
.security-settings {
}
</style>
