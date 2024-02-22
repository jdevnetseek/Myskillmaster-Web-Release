<template>
  <ul class="lesson-bulleted-details d-flex flex-column">
    <li>
      <div class="lesson-bulleted-details__list__icon">
        <v-icon color="primary" size="20">
          $tagprice
        </v-icon>
      </div>
      <div class="lesson-bulleted-details__list__content">
        <p>
          <b>{{ lessonObj.tagsLabel }}</b>
        </p>
      </div>
    </li>
    <li v-if="hasSchedule">
      <div class="lesson-bulleted-details__list__icon">
        <v-icon color="primary" size="20">
          $clock
        </v-icon>
      </div>
      <div class="lesson-bulleted-details__list__content">
        <p>
          <b>{{ lessonObj.durationLabel(true) }} </b>
        </p>
        <p
          class="lesson-bulleted-details__list__content__subheader text-body-2"
        >
          Please check with the master for more accurate availabilities.
        </p>
      </div>
    </li>
    <li>
      <div class="lesson-bulleted-details__list__icon">
        <v-icon color="primary" size="20">
          $globe
        </v-icon>
      </div>
      <div class="lesson-bulleted-details__list__content">
        <p>
          <b>Lesson location</b>
        </p>
        <p
          class="lesson-bulleted-details__list__content__subheader text-body-2"
        >
          {{ lessonObj.addressLabel }}
        </p>
      </div>
    </li>
    <li>
      <div class="lesson-bulleted-details__list__icon">
        <v-icon color="primary" size="20">
          $globe
        </v-icon>
      </div>
      <div class="lesson-bulleted-details__list__content">
        <p>
          <b>Exact Address/Online meeting link</b>
        </p>
        <LessonExactAddress
          class="lesson-bulleted-details__list__content__subheader text-body-2"
          :lesson="lesson"
          :is-always-visible="hasExactAddress"
        />
      </div>
    </li>
    <li>
      <div class="lesson-bulleted-details__list__icon">
        <v-icon color="primary" size="20">
          $paper
        </v-icon>
      </div>
      <div class="lesson-bulleted-details__list__content">
        <p>
          <b>{{ masterProfileObj.languagesLabel }}</b>
        </p>
      </div>
    </li>
    <li>
      <div class="lesson-bulleted-details__list__icon">
        <v-icon color="primary" size="20">
          $wifi
        </v-icon>
      </div>
      <div class="lesson-bulleted-details__list__content">
        <p>
          <b>{{ lessonObj.removeOptionLabel }}</b>
        </p>
        <p
          class="lesson-bulleted-details__list__content__subheader text-body-2"
        >
          {{ remoteOptionLabel }}
        </p>
      </div>
    </li>
  </ul>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Bulleted Details
 * ==================================================================================
 **/

import Lesson from '@/models/Lesson'
import Master from '@/models/Master'
import LessonExactAddress from '@/components/lessons/common/LessonExactAddress'

export default {
  components: {
    LessonExactAddress
  },
  props: {
    lesson: {
      type: [Lesson, Object],
      required: true
    },

    masterProfile: {
      type: [Master, Object],
      required: true
    },

    hasSchedule: {
      type: Boolean,
      default: true
    },

    hasExactAddress: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    lessonObj() {
      return this.lesson instanceof Lesson
        ? this.lesson
        : new Lesson(this.lesson)
    },

    masterProfileObj() {
      return this.masterProfile instanceof Master
        ? this.masterProfile
        : new Master(this.masterProfile)
    },

    remoteOptionLabel() {
      const remoteSupported = this.lessonObj.is_remote_supported
      return `This master does
            ${!remoteSupported ? 'not' : ''} provide remote
            learning${
              remoteSupported
                ? ', please check in with the master for more details'
                : ''
            }.`
    }
  }
}
</script>
<style scoped lang="scss">
.lesson-bulleted-details {
  list-style: none;
  padding-left: 0;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0;

    &:not(:last-child) {
      margin-bottom: 15px;
    }

    .lesson-bulleted-details__list__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 39px;
      height: 39px;
      border-radius: 50%;
      background: #f3f5f5;
      margin-right: 15px;
    }

    .lesson-bulleted-details__list__content {
      width: 80%;

      p {
        margin-bottom: 0;
      }

      &__subheader {
        color: $secondary-text;
      }
    }
  }
}
</style>
