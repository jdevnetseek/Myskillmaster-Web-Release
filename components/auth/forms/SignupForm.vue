<template>
  <v-card class="signup-form" flat>
    <v-card-text>
      <v-form
        class="signup-form__form"
        aria-autocomplete="off"
        @submit.prevent="submit"
      >
        <div class="signup-form__header screen-border">
          <h4>Join {{ $store.getters['appName'] }}</h4>
        </div>

        <div class="signup-form__fields screen-border">
          <v-row>
            <template v-if="onChecking">
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
            </template>
            <template v-if="onRegister">
              <v-col cols="12">
                <image-cropper
                  v-model="showImageCropper"
                  @change="uploadPhoto"
                  @close="toggleImageCropper(false)"
                />
                <div class="image-container mb-5">
                  <div
                    v-cloak
                    class="image-avatar"
                    @drop.prevent="toggleImageCropper(true)"
                    @dragover.prevent
                    @dragenter.prevent
                  >
                    <Avatar
                      :avatar="form.avatar"
                      :default-avatar="
                        require('@/assets/images/auth/default-profile.png')
                      "
                    />
                    <div>
                      <v-btn
                        icon
                        class="image-btn"
                        @click="toggleImageCropper(true)"
                      >
                        <v-icon medium color="white">
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
                <ErrorMessage
                  class="image-error mt-2"
                  :error="
                    form.$getError('avatar') ||
                      hasError('form.avatar', 'Avatar')
                  "
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="form.username"
                  type="text"
                  required
                  flat
                  filled
                  hide-details="auto"
                  label="Enter your username"
                  autocomplete="off"
                  :disabled="form.$busy"
                  :error-messages="
                    form.$getError('username') ||
                      hasError('form.username', 'Username')
                  "
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.first_name"
                  type="text"
                  required
                  flat
                  filled
                  hide-details="auto"
                  label="First name"
                  autocomplete="off"
                  :disabled="form.$busy"
                  :error-messages="
                    form.$getError('first_name') ||
                      hasError('form.first_name', 'First name')
                  "
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.last_name"
                  type="text"
                  required
                  flat
                  filled
                  hide-details="auto"
                  label="Last name"
                  autocomplete="off"
                  :disabled="form.$busy"
                  :error-messages="
                    form.$getError('last_name') ||
                      hasError('form.last_name', 'Last name')
                  "
                />
              </v-col>
              <v-col cols="12">
                <SelectLocation
                  v-model="form.place_id"
                  required
                  flat
                  filled
                  hide-details="auto"
                  :disabled="form.$busy"
                  :error-messages="
                    form.$getError('place_id') ||
                      hasError('form.place_id', 'Location')
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
                  label="Password"
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
                  label="Confirm password"
                  autocomplete="off"
                  :on-enter="submit"
                  :disabled="form.$busy"
                  :error-messages="
                    form.$getError('password_confirmation') ||
                      hasError('form.password_confirmation', 'Confirm password')
                  "
                />
              </v-col>
            </template>
            <v-col cols="12" class="py-0">
              <ErrorMessage class="mt-2" :error="form.$errorMessage" />
            </v-col>
          </v-row>
        </div>
        <div v-if="onRegister" class="signup-form__menu screen-border">
          <p class="text-caption text-center mx-auto">
            By signing up, you agree to our
            <NuxtLink
              :to="{
                name: 'terms-and-conditions',
              }"
            >
              <b class="text-caption font-weight-bold">Terms and conditions</b>
            </NuxtLink>
          </p>
        </div>
        <div class="signup-form__actions screen-border">
          <v-btn
            class="signup-form__actions__submit"
            :disabled="form.$busy"
            :loading="form.$busy"
            color="primary"
            depressed
            @click="submit()"
          >
            {{ buttonLabel }}
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
/**
 * ==================================================================================
 * Signup Form
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { parseToFormData } from '@/utils/Helpers'
import { signupForm } from '@/validations/auth/signup'
import { signupCheckForm } from '@/validations/auth/signupCheck'
import ErrorMessage from '@/components/fields/ErrorMessage'
import PasswordField from '@/components/fields/PasswordField'
import SelectLocation from '@/components/fields/SelectLocation'
import ImageCropper from '@/components/common/ImageCropper'
import IMAGE from '@/utils/Image'
import Avatar from '@/components/common/Avatar'

const MAX_STEP = 2
const MIN_STEP = 1

export default {
  name: 'SignupForm',
  components: {
    ErrorMessage,
    PasswordField,
    SelectLocation,
    ImageCropper,
    Avatar
  },
  mixins: [validationMixin],

  props: {
    currentStep: {
      type: Number,
      required: true
    },

    maxAvatarSize: {
      type: Number,
      default: 3
    }
  },

  data() {
    return {
      showImageCropper: false
    }
  },

  computed: {
    hasError,
    ...mapState({
      form: state => state.user.signup,
      login: state => state.user.login
    }),

    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),

    buttonLabel() {
      switch (this.currentStep) {
        case MAX_STEP:
          return 'Sign up'
        default:
          return 'Continue'
      }
    },

    submitAction() {
      switch (this.currentStep) {
        case MAX_STEP:
          return 'user/signup'
        default:
          return 'user/checkEmail'
      }
    },

    submitValidation() {
      switch (this.currentStep) {
        case MAX_STEP:
          return signupForm
        default:
          return signupCheckForm
      }
    },

    onChecking() {
      return this.currentStep === MIN_STEP
    },

    onRegister() {
      return this.currentStep === MAX_STEP
    }
  },

  mounted() {
    this.$v.$reset()
  },

  methods: {
    reset() {
      this.form.$reset()
      this.$v.$reset()
    },

    toggleImageCropper(bool) {
      this.showImageCropper = bool !== null ? bool : !this.showImageCropper
    },

    async uploadPhoto(file) {
      this.$set(this.form.$errors, 'avatar', {})
      await IMAGE.toBase64(file, this.maxAvatarSize)
        .then((result) => {
          this.form.avatar = result
        })
        .catch((error) => {
          this.$set(this.form.$errors, 'avatar', [error.message])
        })
    },

    async submit() {
      this.$v.$touch()
      this.form.$clearErrors()

      if (!this.form.$busy && !this.isLoggedIn && !this.$v.$invalid) {
        await this.$store
          .dispatch(this.submitAction, this.getFormData())
          .then((result) => {
            if (!this.form.$hasErrors()) {
              if (this.onChecking) {
                if (result && result.is_available) {
                  this.$router.push({
                    name: 'sign-up-details'
                  })
                } else {
                  this.form.$errorMessage = 'Email already taken'
                }
              } else {
                this.reset()
                this.login.$reset()
                this.$router.push({
                  name: 'verify'
                })
              }
            }
          })
      }
    },

    getFormData() {
      const formData = new FormData()
      switch (this.currentStep) {
        case MAX_STEP:
          parseToFormData(formData, this.form.$data())
          return formData
        default:
          return {
            email: this.form.email
          }
      }
    }
  },

  validations() {
    return {
      form: this.submitValidation
    }
  }
}
</script>
<style lang="scss" scoped>
.signup-form {
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
    margin-bottom: 30px;

    .col {
      padding-bottom: 0;
    }

    .image-container {
      width: 97px;
      height: 97px;
      display: block;
      margin: 0 auto;
    }

    .image-avatar {
      margin: auto;
      position: relative;
    }

    .image-btn {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50px !important;
      right: -10.5px;
      bottom: -15px;
      background: $primary !important;
      border: 2px solid #ffffff;
    }

    .image-error {
      text-align: center;
    }
  }

  &__menu {
    margin: 0 auto;
    p {
      text-transform: none !important;
    }
  }

  &__actions {
    margin-top: 30px;
    text-align: center;

    &__submit {
      width: 100%;
      max-height: 56px;
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .signup-form {
    min-height: 500px;
    // Height of sign up footer component
    padding-bottom: 43px;
    background: transparent;

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
