<template>
  <v-form
    class="account-personal-profile-form"
    aria-autocomplete="off"
    @submit.prevent="submit"
  >
    <div
      class="account-personal-profile-form__header"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    >
      <h5>Account & personal profile</h5>

      <p class="font-weight-bold my-4">
        GENERAL
      </p>
    </div>

    <div
      class="account-personal-profile-form__fields"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    >
      <v-row>
        <v-col cols="12" md="3">
          <image-cropper
            v-model="isCropperOpen"
            @change="uploadPhoto"
            @close="isCropperOpen = false"
          />
          <div class="image-container mb-5">
            <div
              v-cloak
              class="image-avatar"
              @drop.prevent="isCropperOpen = true"
              @dragover.prevent
              @dragenter.prevent
            >
              <ProfileAvatar />
              <div>
                <v-btn icon class="image-btn" @click="isCropperOpen = true">
                  <v-icon medium color="white">
                    mdi-plus
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.first_name"
            type="text"
            required
            flat
            filled
            hide-details="auto"
            autocomplete="off"
            label="First Name"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('first_name') ||
                hasError('form.first_name', 'First Name')
            "
            @keydown.enter.prevent="submit"
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
            autocomplete="off"
            label="Last Name"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('last_name') ||
                hasError('form.last_name', 'Last Name')
            "
            @keydown.enter.prevent="submit"
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
          <DatetimePicker
            v-model="form.birthdate"
            type="date"
            flat
            filled
            hide-details="auto"
            label="Birthdate"
            :disabled="form.$busy"
            :error-messages="hasError('form.birthdate', 'Birthdate')"
          />
        </v-col>
      </v-row>
    </div>

    <ErrorMessage :error="errors" class="mt-2" />

    <div
      class="account-personal-profile-form__actions"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    >
      <v-btn
        class="account-personal-profile-form__actions__submit"
        :disabled="form.$busy"
        :loading="form.$busy"
        color="primary"
        depressed
        type="submit"
      >
        Save
      </v-btn>
    </div>

    <SecuritySettings
      class="account-personal-profile-form__footer"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    />
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { accountProfileForm } from '@/validations/auth/accountProfile'
import ImageCropper from '@/components/common/ImageCropper'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import IMAGE from '@/utils/Image'
import ErrorMessage from '@/components/fields/ErrorMessage'
import ProfileAvatar from '@/components/user/common/ProfileAvatar'
import SelectLocation from '@/components/fields/SelectLocation'
import DatetimePicker from '@/components/fields/DatetimePicker'
import DATE from '@/utils/Date'
import FORMAT from '@/utils/enums/Format'
import SecuritySettings from '../fields/SecuritySettings.vue'

export default {
  components: {
    ImageCropper,
    ProfileAvatar,
    SecuritySettings,
    SelectLocation,
    ErrorMessage,
    DatetimePicker
  },
  mixins: [validationMixin, SnackbarMixin],
  props: {
    hasScreenMargin: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      isCropperOpen: false,
      imageError: null
    }
  },

  computed: {
    hasError,
    ...mapState({
      form: state => state.user.accountProfile,
      user: state => state.auth.user
    }),

    errors() {
      const formError = Array.isArray(this.error) ? this.error : [this.error]
      return [...formError, this.imageError].filter(e => e)
    }
  },

  async mounted() {
    await this.initForm()
  },

  methods: {
    initForm() {
      this.form.first_name = this.user.first_name
      this.form.last_name = this.user.last_name
      this.form.place_id = this.user.place_id
      this.form.birthdate = this.user.birthdate
    },

    ...mapActions({
      updateProfile: 'user/updateProfile'
    }),

    async submit() {
      this.$v.$touch()
      this.form.$clearErrors()

      if (this.form.$busy) {
        return
      }

      if (!this.form.$busy && !this.$v.$invalid) {
        await this.updateProfile(this.getFormData()).then(() => {
          if (!this.form.$hasErrors()) {
            this.reset()
            this.showSnackbar('Personal info has been changed successfully!')
          }
        })
      }
    },

    async uploadPhoto(image) {
      this.reset()
      await IMAGE.toBase64(image, this.maxSize)
        .then(() => {
          const form = new FormData()
          form.append('avatar', image)
          this.$store.dispatch('user/uploadPhoto', form)
          this.showSnackbar('Profile photo successfully uploaded')
        })
        .catch((error) => {
          this.imageError = error.message
        })
    },

    reset() {
      this.imageError = null
    },

    getFormData() {
      const form = this.form.$data()
      form.birthdate = DATE.format(form.birthdate, FORMAT.laravelDateFormat)
      return form
    }
  },

  validations() {
    return {
      form: accountProfileForm
    }
  }
}
</script>

<style lang="scss" scoped>
.account-personal-profile-form {
  max-width: 770px;
  margin-left: auto;
  margin-right: auto;

  &__form {
    max-width: 600px;
    margin: 0 auto;
  }

  &__header {
    text-align: left;
    margin-bottom: 35px;
  }

  &__fields {
    margin-bottom: 25px;

    .col {
      padding-bottom: 0;
    }

    .image-container {
      width: 97px;
      height: 97px;
      display: block;
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
  }

  &__actions {
    margin-top: 30px;

    &__submit {
    }
  }

  &__footer {
    margin: 75px auto 20px auto;
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .account-personal-profile-form {
    &__header {
      > * {
        font-size: 22px;
      }
    }
  }
}
</style>
