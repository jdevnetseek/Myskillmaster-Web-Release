<template>
  <v-form class="master-profile-form" @submit.prevent="submit">
    <div
      class="master-profile-form__header"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    >
      <slot name="header-before" />
      <h5>
        {{ header }}
      </h5>
      <slot name="header-after" />
    </div>

    <div
      class="master-profile-form__fields"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    >
      <v-row>
        <v-col cols="12">
          <label>About yourself as a master</label>
          <p>
            Write down any details about you that you want your students to
            know.
          </p>
          <v-textarea
            v-model="form.about"
            type="text"
            required
            flat
            filled
            hide-details="auto"
            autocomplete="off"
            placeholder="I'm a..."
            :no-resize="true"
            :maxlength="500"
            :counter="500"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('about') ||
                hasError('form.about', 'About yourself')
            "
          />
        </v-col>
        <v-col cols="12">
          <label>Your skills & experiences</label>
          <p>Write down your skills and experience for this field.</p>
          <v-textarea
            v-model="form.work_experiences"
            type="text"
            required
            flat
            filled
            hide-details="auto"
            autocomplete="off"
            placeholder="I'm a..."
            :no-resize="true"
            :maxlength="500"
            :counter="500"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('work_experiences') ||
                hasError('form.work_experiences', 'Work experience')
            "
          />
        </v-col>
        <v-col cols="12">
          <label>Which language(s) do you speak?</label>
          <p>
            This is to help you communicate with your potential students better.
          </p>
          <v-combobox
            ref="comboBox"
            v-model="form.languages"
            type="text"
            flat
            filled
            multiple
            hide-details="auto"
            autocomplete="off"
            label="Language(s)"
            append-icon=""
            :disabled="form.$busy"
            :error-messages="
              form.$getError('languages') ||
                hasError('form.languages', 'Language')
            "
          />
          <caption class="font-color-secondary d-block text-left">
            (Press enter to add language)
          </caption>
        </v-col>

        <v-col cols="12" class="mt-4">
          <label>Portfolio (if you have any)</label>
          <p>Attach images or illustrations to show your past work.</p>
          <PortfolioFileUpload />
        </v-col>
      </v-row>
    </div>

    <div
      class="master-profile-form__actions"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    >
      <div class="master-profile-form__actions__border">
        <v-btn
          class="master-profile-profile-form__actions__submit"
          :disabled="form.$busy"
          :loading="form.$busy"
          color="primary"
          depressed
          type="submit"
        >
          {{ buttonLabel }}
        </v-btn>
        <v-btn
          v-if="hasDelete && hasMasterProfileDetails"
          color="error"
          depressed
          align="left"
          outlined
          :disabled="form.$busy"
          :loading="form.$busy"
          @click="toggleDelete()"
        >
          Delete master profile
        </v-btn>
      </div>
    </div>

    <ConfirmationModal
      v-model="showDelete"
      title="Delete master profile"
      content="Are you sure you want to delete your master profile?"
      :loading="form.$busy"
      @confirm="archive"
    >
      <template #additional-content>
        <p class="red--text">
          This would also delete all your lessons.
        </p>
      </template>
    </ConfirmationModal>
  </v-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { parseToFormData } from '@/utils/Helpers'
import { hasError, validationMixin } from '@/validations'
import { masterProfileForm } from '@/validations/auth/masterProfile'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import PortfolioFileUpload from '../components/PortfolioFileUpload.vue'

export default {
  components: { PortfolioFileUpload, ConfirmationModal },
  mixins: [validationMixin, SnackbarMixin],

  props: {
    header: {
      type: String,
      default: 'Master profile'
    },

    buttonLabel: {
      type: String,
      default: 'Save changes'
    },

    redirect: {
      type: String,
      default: null
    },

    redirectQuery: {
      type: Object,
      default: () => null
    },

    redirectParams: {
      type: Object,
      default: () => null
    },

    hasScreenMargin: {
      type: Boolean,
      default: true
    },

    hasDelete: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: false,
      disabled: false,

      showDelete: false
    }
  },

  computed: {
    hasError,
    ...mapState({
      form: state => state.masterProfile.masterProfile,
      masterProfile: state => state.masterProfile.masterProfileDetails
    }),

    ...mapGetters({
      hasMasterProfileDetails: 'masterProfile/hasMasterProfileDetails'
    })
  },

  mounted() {
    this.fetch()
  },

  methods: {
    initForm() {
      if (this.masterProfile) {
        this.form.about = this.masterProfile.about
        this.form.languages = this.masterProfile.languages.slice()
        this.form.portfolio = this.masterProfile.portfolio.slice()
        this.form.work_experiences = this.masterProfile.work_experiences
      }
    },

    toggleDelete() {
      this.showDelete = !this.showDelete
    },

    async fetch() {
      this.form.$clearErrors()

      if (!this.form.$busy) {
        await this.$store
          .dispatch('masterProfile/getMasterProfile')
          .then(() => {
            if (!this.form.$hasErrors()) {
              this.initForm()
            } else {
              this.showSnackbar(this.form.$errorMessage, false)
            }
          })
      }
    },

    submit() {
      this.$v.$touch()
      this.form.$clearErrors()
      this.$refs.comboBox.blur()

      this.$nextTick(async() => {
        if (!this.form.$busy && !this.$v.$invalid) {
          await this.$store
            .dispatch('masterProfile/updateMasterProfile', this.getFormData())
            .then(() => {
              if (!this.form.$hasErrors()) {
                this.initForm()
                this.showSnackbar(
                  'Your Master Profile info has been saved successfully!'
                )

                if (this.redirect) {
                  this.$router.push({
                    name: this.redirect,
                    params: this.redirectParams,
                    query: this.redirectQuery
                  })
                }
              } else {
                this.showSnackbar(this.form.$errorMessage, false)
              }
            })
        }
      })
    },

    async archive() {
      this.$v.$touch()
      this.form.$clearErrors()

      if (this.hasMasterProfileDetails && !this.form.$busy) {
        await this.$store
          .dispatch('masterProfile/deleteMasterProfile')
          .then(() => {
            if (this.form.$hasErrors()) {
              this.showSnackbar(this.form.$errorMessage, false)
            } else {
              this.showSnackbar('Master profile deleted successfully!')

              this.$router.push({
                name: 'index'
              })
            }
          })
      }
    },

    getFormData() {
      const images = this.form.portfolio.filter(
        image => image.delete || image.file
      )
      const parsedData = JSON.parse(JSON.stringify(this.form.$data()))
      const formData = new FormData()

      parsedData.portfolio = images
      parseToFormData(formData, parsedData)

      return formData
    }
  },

  validations() {
    return {
      form: masterProfileForm
    }
  }
}
</script>

<style lang="scss" scoped>
.master-profile-form {
  max-width: 600px;
  margin: 0 auto;

  &__header {
    margin-bottom: 20px;
  }

  &__fields {
    margin-bottom: 25px;

    & label {
      font-weight: 700;
    }

    & p {
      font-size: 14px;
      font-weight: 400;
    }

    .col {
      padding-bottom: 0;
    }
  }

  &__actions {
    .v-btn {
      width: 100%;
      max-width: 180px;
      max-height: 56px;
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .master-profile-form {
    &__header {
      text-align: left;

      > * {
        font-size: 22px;
      }
    }

    &__actions {
      &__border {
        display: flex;
      }

      .v-btn {
        max-width: unset;
        width: auto;
        flex-grow: 1;
      }
    }
  }
}
</style>
