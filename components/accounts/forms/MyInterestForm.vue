<template>
  <v-form class="my-interests-form" @submit.prevent="submit">
    <div
      class="account-personal-profile-form__header"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    >
      <h5 class="mb-6">
        My interest(s)
      </h5>

      <p class="font-weight-bold mb-2">
        Add more interests
      </p>
      <p class="mb-4">
        This helps us recommend better lessons and masters for you.
      </p>
    </div>

    <div class="my-interests-form__fields">
      <v-row class="d-flex justify-content">
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
      </v-row>
    </div>

    <div
      class="my-interests-form__actions"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    >
      <v-row>
        <v-col cols="12">
          <v-btn
            class="my-interests-form__actions__submit"
            :disabled="form.$busy"
            :loading="form.$busy"
            color="primary"
            depressed
            type="submit"
          >
            Save
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { interestsForm } from '@/validations/user/interests'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  mixins: [validationMixin, SnackbarMixin],
  props: {
    hasScreenMargin: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {}
  },

  computed: {
    hasError,
    ...mapState({
      form: state => state.lessonPreference.lessonPreference,
      lessonPreferences: state =>
        state.lessonPreference.lessonPreferenceDetails,

      categories: state => state.category.categories
    }),

    ...mapGetters({
      hasLessonPreferenceDetails: 'lessonPreference/hasLessonPreferenceDetails'
    })
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

      if (!this.form.$busy && !this.$v.$invalid) {
        await this.$store
          .dispatch('lessonPreference/addLessonPreference', this.form.$data())
          .then(() => {
            if (!this.form.$hasErrors()) {
              this.showSnackbar(
                'Your Interests info has been saved successfully!'
              )
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
.my-interests-form {
  max-width: 770px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 16px;

  &__fields {
    margin-bottom: 50px;

    .col {
      padding-bottom: 0;
    }
  }

  &__actions {
    &__submit {
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
  .my-interests-form {
    border-radius: 0px;
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
