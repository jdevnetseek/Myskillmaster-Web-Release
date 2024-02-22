<template>
  <SignupForm :current-step="2" />
</template>
<script>
/**
 * ==================================================================================
 * Sign up: Details page
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import { validationMixin } from '@/validations'
import { signupCheckForm } from '@/validations/auth/signupCheck'
import SignupForm from '@/components/auth/forms/SignupForm'

export default {
  components: {
    SignupForm
  },
  mixins: [validationMixin],
  computed: {
    ...mapState({
      form: state => state.user.signup
    })
  },

  mounted() {
    this.validate()
  },

  methods: {
    validate() {
      if (this.$v.$invalid) {
        this.$router.replace({
          name: 'sign-up'
        })
      }
    }
  },

  validations() {
    return {
      form: signupCheckForm
    }
  }
}
</script>
