<template>
  <div
    class="resend-forgot-password-code d-flex justify-center"
    :class="{
      'resend-forgot-password-code--delay': delay,
    }"
  >
    <template v-if="!delay">
      <p>
        {{ text }}
      </p>
      <a :disabled="form.$busy" class="ml-2" @click="submit()"><b>Resend</b></a>
    </template>
    <template v-else>
      <p>
        Resend code again in <b>{{ delay }} second{{ delay > 1 ? 's' : '' }}</b>
      </p>
    </template>
    <ErrorMessage
      class="mt-2"
      :error="form.$getError('email') || form.$errorMessage"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Resend Forgot Password Code
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import SETTINGS from '@/utils/enums/Settings'
import ErrorMessage from '@/components/fields/ErrorMessage'
import RateLimitTimer from '@/utils/mixins/RateLimitTimer'

export default {
  components: {
    ErrorMessage
  },
  mixins: [RateLimitTimer],

  props: {
    email: {
      type: String,
      required: true
    },

    text: {
      type: String,
      default: "Haven't received the code?"
    }
  },

  computed: {
    ...mapState({
      form: state => state.user.forgotPasswordCode,
      currentTimer: state => state.user.forgotPasswordCodeTimer
    }),

    timerResetDispatch() {
      return 'user/resetForgotPasswordCodeTimer'
    },

    timerCookieCode() {
      return SETTINGS.cookie.forgotPasswordCode
    }
  },

  watch: {
    currentTimer(value) {
      if (value) {
        this.startTimer()
      }
    }
  },

  methods: {
    async submit() {
      this.form.$clearErrors()

      if (!this.form.$busy) {
        await this.$store.dispatch('user/forgotPasswordCode', {
          email: this.email
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.resend-forgot-password-code {
  p {
    margin-bottom: 0;
  }
}
</style>
