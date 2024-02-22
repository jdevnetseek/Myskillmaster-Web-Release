<template>
  <v-card class="forgot-password-form" flat>
    <v-card-text>
      <div class="forgot-password-form__form">
        <div class="forgot-password-form__header">
          <h2 class="mb-3">
            {{ content.header }}
          </h2>
          <p>
            {{ content.subheader }}
          </p>
        </div>
        <div class="forgot-password-form__fields">
          <v-row>
            <template v-if="onEmail">
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  type="text"
                  required
                  flat
                  filled
                  hide-details="auto"
                  label="Email"
                  :disabled="form.$busy"
                  :error-messages="
                    form.$getError('email') || hasError('form.email', 'Email')
                  "
                  @keydown.enter.prevent="submit"
                />
              </v-col>
            </template>
            <template v-if="onReset">
              <v-col cols="12">
                <v-text-field
                  v-model="form.token"
                  type="text"
                  required
                  flat
                  filled
                  hide-details="auto"
                  label="Verification Code"
                  :disabled="form.$busy"
                  :error-messages="
                    form.$getError('token') ||
                      hasError('form.token', 'Verification Code')
                  "
                />
              </v-col>
              <v-col cols="12">
                <PasswordField
                  v-model="form.password"
                  required
                  flat
                  filled
                  hide-details="auto"
                  label="Enter your new password"
                  autocomplete="off"
                  :on-enter="submit"
                  :disabled="form.$busy"
                  :error-messages="
                    form.$getError('password') ||
                      hasError('form.password', 'Password')
                  "
                />
              </v-col>
              <v-col cols="12">
                <PasswordField
                  v-model="form.password_confirmation"
                  required
                  flat
                  filled
                  hide-details="auto"
                  label="Confirm your new password"
                  autocomplete="off"
                  :on-enter="submit"
                  :disabled="form.$busy"
                  :error-messages="
                    form.$getError('password_confirmation') ||
                      hasError('form.password_confirmation', 'Password')
                  "
                />
              </v-col>
            </template>
            <v-col cols="12">
              <ErrorMessage class="mt-2" :error="form.$errorMessage" />
            </v-col>
          </v-row>
        </div>
        <div v-if="onReset" class="forgot-password-form__menu">
          <ResendForgotPasswordCode :email="form.email" />
        </div>
        <div class="forgot-password-form__actions">
          <v-btn
            class="forgot-password-form__actions__submit"
            :disabled="form.$busy"
            :loading="form.$busy"
            color="primary"
            depressed
            rounded
            @click="submit()"
          >
            {{ content.action }}
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
/**
 * ==================================================================================
 * Forgot Password form
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { forgotPasswordEmail } from '@/validations/auth/forgotPasswordEmail'
import { forgotPasswordReset } from '@/validations/auth/forgotPasswordReset'
import ErrorMessage from '@/components/fields/ErrorMessage'
import ResendForgotPasswordCode from '@/components/auth/forms/ResendForgotPasswordCode'
import PasswordField from '@/components/fields/PasswordField'
import SnackbarMixin from '@/utils/mixins/Snackbar'

const MAX_STEP = 2
const MIN_STEP = 1
const CONTENT = [
  {
    header: 'Reset Password',
    subheader:
      'Enter the email address associated with your account and we’ll send you a code to reset your password.',
    action: 'Continue'
  },
  {
    header: 'Reset Password',
    subheader:
      'Enter the code we have sent to your new email address and your new password',
    action: 'Reset'
  }
]

export default {
  components: {
    ErrorMessage,
    ResendForgotPasswordCode,
    PasswordField
  },
  mixins: [validationMixin, SnackbarMixin],
  data() {
    return {
      currentStep: 1
    }
  },

  computed: {
    hasError,
    ...mapState({
      form: state => state.user.forgotPassword
    }),

    content() {
      return CONTENT[this.currentStep - 1]
    },

    next() {
      if (this.onEmail) {
        return 'user/forgotPasswordCode'
      } else if (this.onReset) {
        return 'user/forgotPasswordChange'
      }

      return null
    },

    onEmail() {
      return this.currentStep === MIN_STEP
    },
    onReset() {
      return this.currentStep === MAX_STEP
    }
  },

  mounted() {
    this.reset()
  },

  methods: {
    reset() {
      this.currentStep = MIN_STEP
      this.form.$reset()
    },

    nextStep() {
      this.currentStep = Math.min(this.currentStep + 1, MAX_STEP)
    },

    async submit() {
      this.$v.$touch()
      this.form.$clearErrors()

      if (this.next && !this.form.$busy && !this.$v.$invalid) {
        await this.$store.dispatch(this.next, this.form.$data()).then(() => {
          if (!this.form.$hasErrors()) {
            if (this.onReset) {
              this.$emit('success')
              this.$router.replace({ name: 'login' })

              this.showSnackbar('Password has been changed successfully!')
            } else {
              this.nextStep()
            }
          }
        })
      }
    }
  },

  validations() {
    let form = null
    if (this.onEmail) {
      form = forgotPasswordEmail
    } else if (this.onReset) {
      form = forgotPasswordReset
    }

    return {
      form
    }
  }
}
</script>
<style scoped lang="scss">
.forgot-password-form {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 16px;

  &__header {
    margin-bottom: 25px;
  }

  &__fields {
    margin-bottom: 20px;
  }

  &__menu {
    margin-bottom: 20px;
  }

  &__actions {
    text-align: center;

    &__submit {
      width: 100%;
    }
  }
}
</style>
