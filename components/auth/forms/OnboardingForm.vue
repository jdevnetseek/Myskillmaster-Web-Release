<template>
  <v-card
    :class="onInterests ? 'onboarding-form' : 'onboarding-form--gradient'"
    flat
  >
    <v-card-text>
      <v-form
        class="onboarding-form__form"
        aria-autocomplete="off"
        @submit.prevent="submit"
      >
        <div class="onboarding-form__fields screen-border">
          <v-row>
            <template v-if="onInterests">
              <div class="onboarding-form__header screen-border">
                <h4>What do you want to learn?</h4>
                <p>
                  This helps us recommend better lessons and masters for you.
                </p>
              </div>

              <v-col cols="12">
                <v-chip-group
                  v-model="form.category_ids"
                  active-class="primary--text"
                  column
                  multiple
                  :disabled="form.$busy"
                  :error-messages="
                    form.$getError('category_ids') ||
                      hasError('form.category_ids', 'Category')
                  "
                >
                  <v-chip
                    v-for="(category, index) in categories"
                    :key="index"
                    :value="category.id"
                    class="ma-2"
                  >
                    {{ category.label }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </template>

            <template v-if="onBecomeMaster">
              <v-col cols="12">
                <div align="center" class="screen-border">
                  <v-img
                    height="220px"
                    width="241px"
                    :src="require('@/static/become-a-master.png')"
                  />
                </div>

                <div class="onboarding-form__header screen-border">
                  <h4>Interested in teaching?</h4>
                  <p>List your first lesson here and start earning.</p>
                </div>
              </v-col>
            </template>
          </v-row>
        </div>

        <div class="onboarding-form__actions screen-border">
          <v-row>
            <v-col cols="12">
              <v-btn
                v-if="categories"
                class="onboarding-form__actions__submit"
                :disabled="form.$busy"
                :loading="form.$busy"
                color="primary"
                depressed
                type="submit"
              >
                {{ buttonLabel }}
              </v-btn>
            </v-col>

            <v-col cols="12">
              <v-btn
                text
                class="text-primary"
                block
                @click="$router.push({ name: 'index' })"
              >
                Skip for now
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * ==================================================================================
 * Complete Profile: Onboarding Form
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { interestsForm } from '@/validations/user/interests'
import SnackbarMixin from '@/utils/mixins/Snackbar'

const MAX_STEP = 2
const MIN_STEP = 1

export default {
  name: 'OnboardingForm',

  mixins: [validationMixin, SnackbarMixin],
  props: {
    currentStep: {
      type: Number,
      required: true
    }
  },

  data() {
    return {}
  },

  computed: {
    hasError,
    ...mapState({
      form: state => state.lessonPreference.lessonPreference,
      onboardingForm: state => state.user.onboarding,

      lessonPreferences: state =>
        state.lessonPreference.lessonPreferenceDetails,
      categories: state => state.category.categories
    }),

    ...mapGetters({
      hasLessonPreferenceDetails: 'lessonPreference/hasLessonPreferenceDetails'
    }),

    buttonLabel() {
      switch (this.currentStep) {
        case MAX_STEP:
          return 'Become a Master'
        default:
          return 'Continue'
      }
    },

    submitAction() {
      switch (this.currentStep) {
        case MAX_STEP:
          return 'user/onboarding'
        default:
          return 'user/checkEmail'
      }
    },

    onInterests() {
      return this.currentStep === MIN_STEP
    },

    onBecomeMaster() {
      return this.currentStep === MAX_STEP
    }
  },

  mounted() {
    this.fetch()
  },

  methods: {
    initForm() {
      if (this.lessonPreferences.length > 0) {
        this.form.category_ids = this.categories
          .filter(category =>
            this.lessonPreferences.some(
              lesson => category.id === lesson.category_id
            )
          )
          .map(a => a.id)
      }
    },

    async fetch() {
      this.form.$clearErrors()

      if (!this.form.$busy) {
        await this.$store.dispatch('category/getCategories').then(() => {
          if (this.form.$hasErrors()) {
            this.showSnackbar(this.form.$errorMessage, false)
          }
        })

        await this.$store
          .dispatch('lessonPreference/getLessonPreference')
          .then(() => {
            if (!this.form.$hasErrors()) {
              this.initForm()
            } else {
              this.showSnackbar(this.form.$errorMessage, false)
            }
          })
      }
    },

    async submit() {
      this.$v.$touch()
      this.form.$clearErrors()

      if (this.onInterests) {
        if (!this.form.$busy && !this.$v.$invalid) {
          await this.$store
            .dispatch('lessonPreference/addLessonPreference', this.form.$data())
            .then(() => {
              if (!this.form.$hasErrors()) {
                this.onboard()
              } else {
                this.showSnackbar(this.form.$errorMessage, false)
              }
            })
        } else {
          this.showSnackbar(
            'Please select at least one (1) category from the list',
            false
          )
        }
      } else {
        this.$router.push({
          name: 'onboarding-master-profile'
        })
      }
    },

    async onboard() {
      this.onboardingForm.$clearErrors()

      if (!this.onboardingForm.$busy) {
        await this.$store.dispatch('user/onboard').then(() => {
          if (!this.onboardingForm.$hasErrors()) {
            this.showSnackbar(
              'Your Interests info has been saved successfully!'
            )
            this.$router.push({
              name: 'onboarding-become-a-master'
            })
          } else {
            this.showSnackbar(this.onboardingForm.$errorMessage, false)
          }
        })
      }
    }
  },

  validations() {
    return {
      form: interestsForm
    }
  }
}
</script>
<style lang="scss" scoped>
.onboarding-form {
  max-width: 770px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 16px;

  &--gradient {
    background: linear-gradient(
      180deg,
      #cbecdb 0%,
      rgba(203, 236, 219, 0.73) 76.33%,
      rgba(203, 236, 219, 0) 100%
    );
  }

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
.v-chip {
  height: 34px;
  padding: 6px 16px;
  margin-top: 10px;
  border-radius: 30px;
  background: #f2f8f8 !important;
  color: #4b6365 !important;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;

  &--active {
    background: $primary !important;
    color: white !important;
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .onboarding-form {
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

      > h4 {
        font-size: 22px;
      }
      > p {
        font-size: 14px;
      }
    }
  }
}
</style>
