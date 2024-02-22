<template>
  <MyInterestForm class="my-interest-page__form" :has-screen-margin="false" />
</template>

<script>
/**
 * ==================================================================================
 * Settings: My interests page
 * ==================================================================================
 **/

import MyInterestForm from '~/components/accounts/forms/MyInterestForm.vue'

export default {
  components: { MyInterestForm },
  head() {
    return {
      title: 'My Interests | '
    }
  }
}
</script>
<style scoped lang="scss">
.my-interest-page {
}
</style>
