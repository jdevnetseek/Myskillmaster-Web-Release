<template>
  <div class="lesson-card" :class="rootClasses">
    <div class="lesson-card__border d-flex">
      <div
        :class="
          hasBannerImage ? activeLessonClass : 'lesson-card__header--no-banner'
        "
        :style="{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: hasBannerImage ? 'cover' : 'auto',
        }"
      />
      <div class="lesson-card__content">
        <h6>{{ lessonObj.title }}</h6>
        <div class="lesson-card__content__price d-flex flex-row">
          <p class="text-subtitle-2 mr-1 mb-0">
            {{ header }}
          </p>
          <caption class="mb-0">
            {{
              subheader
            }}
          </caption>
        </div>
        <div class="lesson-card__content__master d-flex flex-row">
          <div class="lesson-card__content__master__name d-flex flex-column">
            <p class="text-body-2 mb-0">
              {{ userObj.name }}
            </p>
            <caption>
              {{
                userObj.addressLabel
              }}
            </caption>
          </div>
          <Avatar
            :avatar="userObj.avatarUrl"
            :size="avatarSize"
            class="lesson-card__content__master__avatar"
          />
        </div>
        <Rating
          v-if="hasRating"
          :total="userObj.no_of_reviews"
          :average="userObj.average_rating"
        />
      </div>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Card
 * ==================================================================================
 **/

import { ORIENTATIONS, PORTRAIT } from '@/utils/enums/Orientation'
import {
  LESSON,
  SCHEDULE,
  ENROLLMENT,
  TYPES
} from '@/utils/enums/LessonCardType'
import SETTINGS from '@/utils/enums/Settings'
import IMAGE from '@/utils/Image'
import Lesson from '@/models/Lesson'
import LessonSchedule from '@/models/LessonSchedule'
import LessonEnrollment from '@/models/LessonEnrollment'
import Student from '@/models/Student'
import Avatar from '@/components/common/Avatar'
import DragOrClickMixin from '@/utils/mixins/DragOrClick'
import Rating from '@/components/common/Rating'

export default {
  components: {
    Avatar,
    Rating
  },
  mixins: [DragOrClickMixin],
  props: {
    lesson: {
      type: [Lesson, LessonEnrollment, LessonSchedule, Object],
      required: true
    },

    currency: {
      type: String,
      default: SETTINGS.currency.sign
    },

    orientation: {
      type: String,
      default: PORTRAIT,
      validator(value) {
        return ORIENTATIONS.includes(value)
      }
    },

    type: {
      type: String,
      default: LESSON,
      validator(value) {
        return TYPES.includes(value)
      }
    },

    hasRating: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    lessonObj() {
      let obj = this.lesson
      if (this.isSchedule || this.isEnrollment) {
        obj = this.lesson.lesson
      }

      return obj instanceof Lesson ? obj : new Lesson(obj)
    },

    scheduleObj() {
      return this.lesson instanceof LessonSchedule
        ? this.lesson
        : new LessonSchedule(this.lesson)
    },

    enrollmentObj() {
      return this.lesson instanceof LessonEnrollment
        ? this.lesson
        : new LessonEnrollment(this.lesson)
    },

    userObj() {
      if (this.isSchedule) {
        return this.lesson.students_enrolled.length > 0
          ? new Student(this.lesson.students_enrolled[0])
          : {}
      } else if (this.isEnrollment) {
        return this.enrollmentObj.master_profile
      }

      return this.lessonObj.master_profile
    },

    rootClasses() {
      const classes = []
      classes.push(`lesson-card--${this.orientation}`)

      return classes.join(' ')
    },

    banner() {
      return this.hasBannerImage
        ? IMAGE.url(this.lessonObj.cover_photo[0], true)
        : require('@/assets/logo-text-white.svg')
    },

    hasBannerImage() {
      return this.lessonObj.cover_photo && this.lessonObj.cover_photo.length > 0
    },

    header() {
      if (this.isSchedule) {
        return this.scheduleObj.scheduleDate
      } else if (this.isEnrollment) {
        return this.enrollmentObj.schedule.scheduleDate
      }

      return this.lessonObj.priceLabel
    },

    subheader() {
      let subheader = ''
      if (this.isSchedule) {
        subheader = this.scheduleObj.scheduleHour
      } else if (this.isEnrollment) {
        subheader = this.enrollmentObj.schedule.scheduleHour
      } else {
        subheader = this.lessonObj.durationLabel(true)
      }

      return `(${subheader})`
    },

    avatarSize() {
      return this.orientation === PORTRAIT ? '32' : '20'
    },

    activeLessonClass() {
      let active = true
      if (this.isSchedule) {
        //
      } else if (this.isEnrollment) {
        active = !(
          this.lessonObj.is_cancelled_by_master ||
          this.lessonObj.is_cancelled_by_student
        )
      }

      return active ? 'lesson-card__header' : 'lesson-card__header__inactive'
    },

    isLesson() {
      return this.type === LESSON
    },

    isSchedule() {
      return this.type === SCHEDULE
    },

    isEnrollment() {
      return this.type === ENROLLMENT
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    /**
     * Bind click event on carousel, we are manually checking the drag OR click
     * event as the carousel library doesn't provide `is dragging` checker
     */
    init() {
      this.dragOrClick(this.$el)
    }
  }
}
</script>
<style scoped lang="scss">
$cardRadius: 8px;
.lesson-card {
  border-radius: $cardRadius;
  background: #ffffff;
  box-shadow: $card-box-shadow;

  &__border {
    flex-direction: column;
    padding: 5px;
  }

  &__header {
    height: 150px;
    border-top-right-radius: $cardRadius;
    border-top-left-radius: $cardRadius;
    background: #fafafa;
    overflow: hidden;

    &--no-banner {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $primary;
    }
  }

  &__content {
    padding: 10px 5px;

    > h6 {
      @include wrap-text-ellipsis(1);
    }

    &__price {
      margin-bottom: 5px;

      > p {
        color: $primary;
        font-weight: 700;
      }
    }

    &__master {
      &__name {
        max-width: 88%;
        flex-grow: 1;

        > p {
          max-width: 95%;
          width: 100%;
          font-weight: 500;
          @include wrap-text-ellipsis(1, 20px);
        }

        > caption {
          display: flex;
          text-align: left;
          color: #46676a;

          @include wrap-text-ellipsis(1, 18px);
        }
      }
    }
  }
}

.lesson-card--landscape {
  .lesson-card__border {
    flex-direction: row;
  }

  .lesson-card {
    &__header {
      width: 89px;
      height: auto;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      border-top-left-radius: $cardRadius;
      border-bottom-left-radius: $cardRadius;

      &__inactive {
        width: 89px;
        height: auto;
        filter: grayscale(1);
      }

      &__price {
        margin-bottom: 10px;
      }
    }
  }

  .lesson-card__content {
    padding: 5px 10px;
    flex-grow: 1;

    &__price {
      margin-bottom: 10px;
    }

    &__master {
      &__name {
        order: 1;
      }

      &__avatar {
        width: 20px;
        margin-right: 5px;
      }
    }
  }

  @media (max-width: map-get($grid-breakpoints, 'md')) {
    .lesson-card__content {
      &__master {
        &__name {
          order: unset;
        }

        &__avatar {
          width: auto;
          margin-right: auto;
        }
      }
    }
  }
}
</style>
