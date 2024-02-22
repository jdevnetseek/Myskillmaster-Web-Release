<template>
  <v-card class="login-form" flat>
    <v-card-text>
      <v-form
        class="login-form__form"
        aria-autocomplete="off"
        @submit.prevent="submit"
      >
        <div class="login-form__header screen-border">
          <h4>Sign in {{ $store.getters['appName'] }}</h4>
        </div>

        <div class="login-form__fields screen-border">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                type="text"
                required
                flat
                filled
                hide-details="auto"
                label="Enter your email"
                autocomplete="off"
                :disabled="form.$busy"
                :error-messages="
                  form.$getError('email') || hasError('form.email', 'Email')
                "
                @keydown.enter.prevent="submit"
              />
            </v-col>
            <v-col cols="12">
              <PasswordField
                v-model="form.password"
                required
                flat
                filled
                hide-details="auto"
                label="Enter your password"
                autocomplete="off"
                :on-enter="submit"
                :disabled="form.$busy"
                :error-messages="
                  form.$getError('password') ||
                    hasError('form.password', 'Password')
                "
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <ErrorMessage class="mt-2" :error="form.$errorMessage" />
            </v-col>
          </v-row>
        </div>
        <div class="login-form__menu screen-border text-right">
          <!--         <v-col cols="6">
          <v-checkbox
            v-model="form.remember_me"
            label="Remember me"
            hide-details
            class="mt-0 pt-0"
          />
        </v-col> -->
          <NuxtLink :to="{ name: 'forgot-password' }">
            <b>Forgot Password?</b>
          </NuxtLink>
        </div>
        <div class="login-form__actions screen-border">
          <v-btn
            class="login-form__actions__submit"
            :disabled="form.$busy"
            :loading="form.$busy"
            color="primary"
            depressed
            @click="submit()"
          >
            Sign in
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
</template>
<script>
/**
 * ==================================================================================
 * Login Form
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { loginForm } from '@/validations/auth/login'
import ErrorMessage from '@/components/fields/ErrorMessage'
import PasswordField from '@/components/fields/PasswordField'

export default {
  name: 'LoginForm',
  components: {
    ErrorMessage,
    PasswordField
  },
  mixins: [validationMixin],
  computed: {
    hasError,
    ...mapState({
      form: state => state.user.login,
      signup: state => state.user.signup
    }),

    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    })
  },

  mounted() {
    this.reset()
  },

  methods: {
    reset() {
      this.form.$reset()
      this.$v.$reset()
    },

    async submit() {
      this.$v.$touch()
      this.form.$clearErrors()

      if (!this.form.$busy && !this.isLoggedIn && !this.$v.$invalid) {
        await this.$store.dispatch('user/login', this.form.$data())
          .then(() => {
            if (!this.form.$hasErrors()) {
              this.reset()
              this.signup.$reset()
            }
          })
      }
    }
  },

  validations() {
    return {
      form: loginForm
    }
  }
}
</script>
<style lang="scss" scoped>
.login-form {
  max-width: 770px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 16px;

  &__form {
    max-width: 600px;
    margin: 0 auto;
  }

  &__header {
    margin-bottom: 35px;
    text-align: center;
  }

  &__fields {
    margin-bottom: 10px;

    .col {
      padding-bottom: 0;
    }
  }

  &__menu {
    margin-top: 20px;
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
  .login-form {
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
