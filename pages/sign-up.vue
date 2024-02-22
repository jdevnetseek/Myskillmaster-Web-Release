<template>
  <AuthPage class="sign-up-page">
    <v-img
      v-if="onChecking"
      class="sign-up-page__bg"
      :src="require('@/assets/images/auth/arrow-bg.svg')"
    />
    <template slot="form">
      <NuxtChild />
    </template>
    <SigninFooter slot="footer" />
  </AuthPage>
</template>
<script>
/**
 * ==================================================================================
 * Sign-up page
 * ==================================================================================
 **/

import AuthPage from '@/components/auth/AuthPage'
import SigninFooter from '@/components/auth/fields/SigninFooter'

export default {
  name: 'SignupPage',
  components: {
    AuthPage,
    SigninFooter
  },
  layout: 'guest',
  head() {
    return {
      title: 'Sign-up | '
    }
  },

  computed: {
    onChecking() {
      return this.$route.name === 'sign-up'
    }
  }
}
</script>
<style lang="scss" scoped>
.sign-up-page {
  &__bg {
    display: none;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .sign-up-page {
    &__bg {
      display: block;
    }
  }
}
</style>
