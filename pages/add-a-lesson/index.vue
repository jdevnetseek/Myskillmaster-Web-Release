<template>
  <MasterProfileForm
    header="First, let’s set up your master profile."
    redirect="add-a-lesson-create"
    :redirect-query="{ from: 'master-profile' }"
    button-label="Continue"
    :has-screen-margin="false"
  >
    <p slot="header-before" class="text-subtitle font-color-tertiary mb-0">
      Step 1 of 2
    </p>
  </MasterProfileForm>
</template>
<script>
/**
 * ==================================================================================
 * Add a lesson: Master profile form
 * ==================================================================================
 **/

import MasterProfileForm from '~/components/accounts/forms/MasterProfileForm.vue'

export default {
  components: {
    MasterProfileForm
  },
  head() {
    return {
      title: 'Add a lesson: Master Profile | '
    }
  }
}
</script>
