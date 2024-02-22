<template>
  <v-form class="lesson-form" @submit.prevent="submit">
    <div class="lesson-form__header">
      <slot name="header-before" />
      <h4 class="mb-6">
        {{ header }}
      </h4>
      <slot name="header-after" />
    </div>

    <div class="lesson-form__fields">
      <v-row>
        <v-col cols="12">
          <label>Lesson title</label>
          <p>A quick tagline for your lesson.</p>
          <v-text-field
            v-model="form.title"
            type="text"
            flat
            filled
            hide-details="auto"
            label="Title"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('title') || hasError('form.title', 'Title')
            "
          />
        </v-col>

        <v-col cols="12">
          <label>Lesson category</label>
          <p>Choose a category for your lesson.</p>
          <SelectCategory
            v-model="form.category_id"
            flat
            filled
            hide-details="auto"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('category_id') ||
                hasError('form.category_id', 'Category')
            "
          />
        </v-col>

        <v-col cols="12">
          <label>Lesson tags</label>
          <p>Add tags for your lesson.</p>
          <v-combobox
            v-model="form.tags"
            flat
            filled
            multiple
            hide-details="auto"
            label="Tag(s)"
            append-icon=""
            :disabled="form.$busy"
            :error-messages="
              form.$getError('tags') || hasError('form.tags', 'Tag(s)')
            "
          />
        </v-col>

        <v-col cols="12">
          <label>Lesson description</label>
          <p>
            Write down all details about this lesson and what you can offer.
          </p>
          <v-textarea
            v-model="form.description"
            type="text"
            flat
            filled
            hide-details="auto"
            placeholder="Description"
            :no-resize="true"
            :maxlength="500"
            :counter="500"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('description') ||
                hasError('form.description', 'Description')
            "
          />
        </v-col>

        <v-col cols="12">
          <label>Lesson cover photo</label>
          <p>Attach images or illustrations to illustrate the lesson</p>
          <LessonFileUpload />
        </v-col>

        <v-col cols="12">
          <label>Lesson duration & price (A$ per hour)</label>
          <p>
            This won’t be shown on your public profile, it will only been shown
            to a student that is enquiring your class.
          </p>
          <v-text-field
            v-model="form.duration_in_hours"
            class="mt-4"
            type="number"
            flat
            filled
            hide-details="auto"
            label="Lesson duration (in hours)"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('duration_in_hours') ||
                hasError('form.duration_in_hours', 'Duration in hours')
            "
          />
          <v-text-field
            v-model="form.lesson_price"
            class="mt-4"
            type="text"
            flat
            filled
            hide-details="auto"
            label="Lesson price"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('lesson_price') ||
                hasError('form.lesson_price', 'Lesson price')
            "
          />
        </v-col>

        <v-col cols="12">
          <label>Lesson available dates</label>
          <p>
            Enter the dates in the week that you are MOST LIKELY to be available
            for the lesson. This helps your students to request the specific
            date and time.
          </p>
          <LessonScheduleList
            :duration-hours="parseInt(form.duration_in_hours)"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('lesson_schedules') ||
                hasError('form.lesson_schedules', 'Lesson schedules')
            "
            class="mb-4"
          />
        </v-col>

        <v-col cols="12" class="mb-4">
          <label>Location</label>
          <v-text-field
            v-model="form.suburb"
            class="mt-4"
            type="text"
            flat
            filled
            hide-details="auto"
            label="Suburb"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('suburb') || hasError('form.suburb', 'Suburb')
            "
          />
          <v-text-field
            v-model="form.postcode"
            class="mt-4"
            type="text"
            flat
            filled
            hide-details="auto"
            label="Postcode"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('postcode') ||
                hasError('form.postcode', 'Postcode')
            "
          />
          <v-text-field
            v-model="form.state"
            class="mt-4"
            type="text"
            flat
            filled
            hide-details="auto"
            label="State"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('state') || hasError('form.state', 'State')
            "
          />
        </v-col>

        <v-col cols="12">
          <label>Remote option</label>
          <p>
            If your class can be done online, you can give your students an
            option here.
          </p>
          <v-radio-group
            v-model="form.is_remote_supported"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('is_remote_supported') ||
                hasError('form.is_remote_supported', 'Remote option')
            "
          >
            <v-radio
              v-for="(choice, n) in remoteOptions"
              :key="n"
              :label="choice.label"
              :value="choice.value"
              color="#000000"
            />
          </v-radio-group>
        </v-col>

        <v-col cols="12">
          <label>Exact address/Online meeting link</label>
          <p />
          <v-text-field
            v-model="form.address_or_link"
            type="text"
            flat
            filled
            hide-details="auto"
            label="Exact address/Online meeting link"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('address_or_link') ||
                hasError(
                  'form.address_or_link',
                  'Exact address/Online meeting link'
                )
            "
          />
        </v-col>
      </v-row>
    </div>

    <div class="lesson-form__actions">
      <v-btn
        v-if="forUpdate"
        class="lesson-profile-form__actions__submit"
        color="error"
        depressed
        align="left"
        outlined
        :disabled="form.$busy"
        :loading="form.$busy"
        @click="toggleDelete()"
      >
        Delete lesson
      </v-btn>
      <v-btn
        class="lesson-profile-form__actions__submit"
        color="primary"
        depressed
        type="submit"
        align="right"
        :disabled="form.$busy"
        :loading="form.$busy"
        @click="submit()"
      >
        Publish lesson
      </v-btn>
    </div>

    <ConfirmationModal
      v-model="showDelete"
      title="Delete a lesson"
      content="Are you sure you want to delete this lesson?"
      :loading="form.$busy"
      @confirm="archive"
    />
  </v-form>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Form
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { get } from 'lodash'
import { parseToFormData } from '@/utils/Helpers'
import { lessonForm } from '@/validations/lesson/lesson'
import { REMOTE_OPTIONS } from '@/utils/enums/RemoteOption'
import DATE from '@/utils/Date'
import SelectCategory from '@/components/fields/SelectCategory'
import LessonFileUpload from '@/components/lessons/forms/LessonFileUpload'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import LessonScheduleList from './fields/LessonScheduleList'

export default {
  components: {
    LessonScheduleList,
    SelectCategory,
    LessonFileUpload,
    ConfirmationModal
  },
  mixins: [validationMixin, SnackbarMixin],
  props: {
    redirectToPage: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showDelete: false
    }
  },

  computed: {
    hasError,
    ...mapState({
      form: state => state.lesson.lesson,
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      forUpdate: 'lesson/hasLessonDetails'
    }),

    header() {
      return this.forUpdate ? 'Edit Lesson' : 'Now, let’s create your lesson.'
    },

    remoteOptions() {
      return REMOTE_OPTIONS
    },

    submitAction() {
      return this.forUpdate ? 'lesson/updateLesson' : 'lesson/createLesson'
    }
  },

  watch: {
    lesson() {
      this.initForm()
    }
  },

  mounted() {
    this.initForm()
  },

  methods: {
    async initForm() {
      if (this.forUpdate) {
        if (!this.lesson.address_or_link) {
          await this.fetchAddress()
        }

        this.form.title = this.lesson.title
        this.form.lesson_price = this.lesson.lesson_price
        this.form.description = this.lesson.description
        this.form.category_id = get(
          this.lesson,
          'category.id',
          this.lesson.category_id
        )
        this.form.is_remote_supported = this.lesson.is_remote_supported
        this.form.cover_photo = this.lesson.cover_photo
        this.form.tags = this.lesson.tags || []
        this.form.suburb = this.lesson.suburb
        this.form.postcode = this.lesson.postcode
        this.form.state = this.lesson.state
        this.form.address_or_link = this.lesson.address_or_link
      } else {
        this.reset()
      }
    },

    reset() {
      this.$v.$reset()
      this.form.$reset()
    },

    toggleDelete() {
      this.showDelete = !this.showDelete
    },

    async submit() {
      this.$v.$touch()
      this.form.$clearErrors()
      if (!this.form.$busy && !this.$v.$invalid) {
        await this.$store
          .dispatch(this.submitAction, this.getFormData())
          .then(async(lesson) => {
            if (this.form.$hasErrors()) {
              this.showSnackbar(this.form.$errorMessage, false)
            } else {
              this.reset()

              if (this.forUpdate) {
                this.showSnackbar('Lesson updated successfully!')

                let redirect = 'my-lessons'
                let redirectParams = null
                if (this.redirectToPage) {
                  /**
                   * NOTE: The master's data isn't included on the update response.
                   * We are clearing it so that the Lesson page details will re-fetch the data
                   */
                  await this.$store.commit('lesson/clearLessonDetails')

                  redirect = 'lessons-slug'
                  redirectParams = {
                    slug: lesson.slug
                  }
                }

                this.$router.push({
                  name: redirect,
                  params: redirectParams
                })
              } else {
                this.$router.push({
                  name: 'add-a-lesson-success'
                })
              }
            }
          })
      }
    },

    async archive() {
      this.$v.$touch()
      this.form.$clearErrors()

      if (this.forUpdate && !this.form.$busy) {
        await this.$store
          .dispatch('lesson/deleteLesson', {
            id: this.lesson.id
          })
          .then(() => {
            if (this.form.$hasErrors()) {
              this.showSnackbar(this.form.$errorMessage, false)
            } else {
              this.reset()
              this.showSnackbar('Deleted lesson successfully!')

              this.$router.push({
                name: 'my-lessons'
              })
            }
          })
      }
    },

    async fetchAddress() {
      this.form.$clearErrors()

      if (this.forUpdate && !this.form.$busy) {
        await this.$store
          .dispatch('lesson/getAddress', this.lesson.id)
          .then(() => {
            if (this.form.$hasErrors()) {
              this.showSnackbar(this.form.$errorMessage, false)
            }
          })
      }
    },

    getFormData() {
      const parsedData = this.form.$data()
      if (this.forUpdate) {
        parsedData.id = this.lesson.id
        /**
         * Don't include the ff. variables as they have their own
         * update flow
         * - Images
         * - Schedules/Slot
         */
        delete parsedData.cover_photo
        delete parsedData.lesson_schedules
        return parsedData
      } else {
        const formData = new FormData()
        formData.append('timezone', DATE.timezone())
        parseToFormData(formData, parsedData)
        return formData
      }
    }
  },

  validations() {
    return {
      form: lessonForm
    }
  }
}
</script>

<style lang="scss" scoped>
.lesson-form {
  max-width: 600px;
  margin: 0 auto;

  &__fields {
    margin-bottom: 50px;

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
    margin-top: 30px;

    .v-btn {
      width: 100%;
      max-width: 150px;
      flex-grow: 1;
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .lesson-form {
    &__header {
      text-align: left;

      > * {
        font-size: 22px;
      }
    }

    &__actions {
      .v-btn {
        max-width: unset;

        &:first-child {
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>
