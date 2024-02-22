<template>
  <v-card v-if="isLoggedIn" class="verify-form" flat>
    <v-card-text>
      <v-form
        class="verify-form__form"
        aria-autocomplete="off"
        @submit.prevent="submit"
      >
        <div class="verify-form__header screen-border">
          <h4>We sent you a code</h4>
          <p>Enter it below to verify your account</p>
        </div>

        <div class="verify-form__fields screen-border">
          <v-row>
            <v-col cols="12">
              <TokenField v-model="form.token" :error-messages="getCodeError" />
            </v-col>
            <v-col cols="12" class="py-0">
              <ErrorMessage class="mt-2" :error="form.$errorMessage" />
            </v-col>
          </v-row>
        </div>
        <div class="verify-form__menu screen-border text-right">
          <ResendVerifyCode />
        </div>
        <div class="verify-form__actions screen-border">
          <v-btn
            class="verify-form__actions__submit"
            :disabled="form.$busy"
            :loading="form.$busy"
            color="primary"
            depressed
            @click="submit"
          >
            Verify
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
/**
 * ==================================================================================
 * Login Form
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { verifyForm } from '@/validations/user/verify'
import ResendVerifyCode from '@/components/user/forms/ResendVerifyCode'
import TokenField from '@/components/fields/TokenField'
import ErrorMessage from '@/components/fields/ErrorMessage'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  name: 'LoginForm',
  components: {
    ResendVerifyCode,
    TokenField,
    ErrorMessage
  },
  mixins: [validationMixin, SnackbarMixin],
  computed: {
    hasError,
    ...mapState({
      form: state => state.user.verify
    }),

    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),

    getCodeError() {
      return (
        this.form.$getError('token') ||
        this.hasError('form.token', 'Verification Code') ||
        this.form.$errorMessage
      )
    }
  },

  mounted() {
    this.form.$reset()
  },

  methods: {
    async submit() {
      this.$v.$touch()
      this.form.$clearErrors()

      if (!this.form.$busy && !this.$v.$invalid) {
        await this.$store
          .dispatch('user/verifyEmail', this.form.$data())
          .then(() => {
            if (!this.form.$hasErrors()) {
              this.$router.replace({
                name: 'index'
              })

              this.showSnackbar('Account verified successfully!')
            }
          })
      }
    }
  },

  validations() {
    return {
      form: verifyForm
    }
  }
}
</script>
<style lang="scss" scoped>
.verify-form {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 16px;

  &__form {
    max-width: 600px;
    margin: 0 auto;
  }

  &__header {
    margin-bottom: 35px;
  }

  &__fields {
    margin-bottom: 30px;

    .col {
      padding-bottom: 0;
    }
  }

  &__menu {
    margin-bottom: 20px;
  }

  &__actions {
    text-align: center;

    &__submit {
      width: 100%;
      max-height: 56px;
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .verify-form {
    ::v-deep .v-card__text {
      padding: 0;
    }

    &__header {
      text-align: left;
      margin-bottom: 10px;

      > * {
        font-size: 22px;
      }
    }
  }
}
</style>
