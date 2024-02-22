<template>
  <v-form
    class="change-password-form"
    aria-autocomplete="off"
    @submit.prevent="submit"
  >
    <div class="change-password-form__header screen-border">
      <h4>Change password</h4>
    </div>

    <div class="change-password-form__fields screen-border">
      <v-row>
        <v-col cols="12">
          <PasswordField
            v-model="form.old_password"
            required
            flat
            filled
            hide-details="auto"
            label="Current password"
            :on-enter="submit"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('old_password') ||
                hasError('form.old_password', 'Current password')
            "
          />
        </v-col>

        <v-col cols="12">
          <PasswordField
            v-model="form.new_password"
            required
            flat
            filled
            hide-details="auto"
            label="New password"
            :on-enter="submit"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('new_password') ||
                hasError('form.new_password', 'New password')
            "
          />
        </v-col>

        <v-col cols="12">
          <PasswordField
            v-model="form.new_password_confirmation"
            required
            flat
            filled
            hide-details="auto"
            label="Confirm new password"
            :on-enter="submit"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('new_password_confirmation') ||
                hasError('form.new_password_confirmation', 'Confirm new password')
            "
          />
          <ErrorMessage class="mt-2" :error="form.$errorMessage" />
        </v-col>
      </v-row>
    </div>

    <div class="change-password-form__actions screen-border">
      <v-btn
        class="change-password-form__actions__submit"
        :disabled="form.$busy"
        :loading="form.$busy"
        color="primary"
        depressed
        @click="submit()"
      >
        Save new password
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { changePasswordForm } from '@/validations/user/changePassword'
import ErrorMessage from '@/components/fields/ErrorMessage'
import PasswordField from '@/components/fields/PasswordField'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    ErrorMessage,
    PasswordField
  },
  mixins: [validationMixin, SnackbarMixin],
  computed: {
    hasError,
    ...mapState({
      form: state => state.user.changePassword
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

      if (!this.form.$busy && !this.$v.$invalid) {
        await this.$store
          .dispatch('user/changePassword', this.form.$data())
          .then(() => {
            if (!this.form.$hasErrors()) {
              this.reset()
              this.showSnackbar('Password has been changed successfully!')
            }
          })
      }
    }
  },

  validations() {
    return {
      form: changePasswordForm
    }
  }
}
</script>

<style lang="scss" scoped>
.change-password-form {
  max-width: 770px;
  margin-left: auto;
  margin-right: auto;

  &__header {
    margin-bottom: 30px;
  }

  &__fields {
    margin-bottom: 50px;

    .col {
      padding-bottom: 0;
    }
  }

  &__actions {
    text-align: center;

    &__submit {
      width: 100%;
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .change-password-form {
    &__header {
      > * {
        font-size: 22px;
      }
    }
  }
}
</style>
