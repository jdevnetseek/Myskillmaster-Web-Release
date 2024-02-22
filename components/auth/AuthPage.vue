<template>
  <div class="auth-page">
    <div class="auth-page__border">
      <slot />
      <div class="auth-page__form">
        <slot name="form" />
      </div>
      <div class="auth-page__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Auth page
 * ==================================================================================
 **/

export default {
  layout: 'guest'
}
</script>
<style lang="scss" scoped>
.auth-page {
  &__border {
    margin-top: 100px;
    margin-bottom: 100px;
  }

  &__footer {
    margin-top: 75px;
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .auth-page {
    &__border {
      margin-top: 0;
      margin-bottom: 0;
    }

    &__form {
      min-height: 500px;
      // Height of sign up footer component
      padding-bottom: 43px;
    }

    &__footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
