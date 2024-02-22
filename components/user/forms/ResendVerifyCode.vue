<template>
  <div
    class="resend-verify-code d-flex text-right"
    :class="{
      'resend-verify-code--delay': delay,
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
      :error="form.$getError('username') || form.$errorMessage"
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
    text: {
      type: String,
      default: "Haven't received the code?"
    }
  },

  computed: {
    ...mapState({
      form: state => state.user.verifyCode,
      currentTimer: state => state.user.verifyCodeTimer
    }),

    timerResetDispatch() {
      return 'user/resetVerifyCodeTimer'
    },

    timerCookieCode() {
      return SETTINGS.cookie.verifyCode
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
        await this.$store.dispatch('user/resendVerificationToken')
      }
    }
  }
}
</script>
<style scoped lang="scss">
.resend-verify-code {
  p {
    margin-bottom: 0;
  }
}
</style>
