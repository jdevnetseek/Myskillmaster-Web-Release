<template>
  <div :class="onChecking ? 'onboarding-page' : 'become-master-page'">
    <div class="onboarding-page__form">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Onboarding page
 * ==================================================================================
 **/

export default {
  name: 'OnboardingPage',
  head() {
    return {
      title: 'Onboarding | '
    }
  },

  computed: {
    onChecking() {
      return this.$route.name === 'onboarding' || this.$route.path === '/onboarding/master-profile'
    }
  }
}
</script>

<style lang="scss" scoped>
.onboarding-page {
  background: #fff;
}
.become-master-page {
  background: linear-gradient(
    180deg,
    #cbecdb 0%,
    rgba(203, 236, 219, 0.73) 76.33%,
    rgba(203, 236, 219, 0) 100%
  );
}
</style>
