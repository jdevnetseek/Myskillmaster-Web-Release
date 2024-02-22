<template>
  <MasterProfileForm
    :redirect="redirect"
    :redirect-params="redirectParams"
    :has-screen-margin="false"
    :has-delete="true"
    class="master-profile-page__form"
  />
</template>

<script>
/**
 * ==================================================================================
 * Settings: Master Profile page
 * ==================================================================================
 **/

import MasterProfileForm from '~/components/accounts/forms/MasterProfileForm.vue'

export default {
  components: { MasterProfileForm },
  head() {
    return {
      title: 'Master Profile | '
    }
  },

  computed: {
    redirect() {
      return this.hasRedirect ? 'lessons-slug' : null
    },

    redirectParams() {
      return this.hasRedirect ? { slug: this.$route.query.from } : null
    },

    hasRedirect() {
      return !!this.$route.query.from
    }
  }
}
</script>
<style scoped lang="scss">
.master-profile-page {
  &__form {
    width: 100%;
  }
}
</style>
