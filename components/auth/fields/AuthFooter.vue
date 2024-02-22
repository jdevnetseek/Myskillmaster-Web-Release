<template>
  <div class="auth-footer">
    <p class="text-center mx-auto">
      {{ label }}
      <NuxtLink
        :to="{
          name: to,
        }"
      >
        <b class="font-weight-bold">{{ buttonLabel }}</b>
      </NuxtLink>
    </p>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Signup Footer
 * ==================================================================================
 **/

export default {
  props: {
    label: {
      type: String,
      required: true
    },

    buttonLabel: {
      type: String,
      required: true
    },

    to: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped lang="scss">
.auth-footer {
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .auth-footer {
    padding: 10px 0;
    border-top: 1px solid $border-color;
    background: #fbfbfb;

    > * {
      margin: 0 auto;
    }
  }
}
</style>
