<template>
  <div class="success-page">
    <div class="success-page__banner">
      <div
        class="success-page__banner__border d-flex flex-column justify-center align-center"
      >
        <div class="success-page__banner__card text-center">
          <div class="success-page__banner__card__border text-center">
            <v-img :src="icon" />
            <h6 class="mb-3">
              {{ header }}
            </h6>
            <p class="mb-0">
              {{ message }}
            </p>
          </div>
          <div class="success-page__banner__card__bg" />
        </div>
        <v-btn
          class="success-page__banner__action"
          color="primary"
          depressed
          :to="{
            name: redirect,
          }"
        >
          Back to Home
        </v-btn>
      </div>

      <v-img
        :src="require('@/assets/images/arrow-down-left.svg')"
        class="success-page__banner__bg success-page__banner__bg--down"
      />
      <v-img
        :src="require('@/assets/images/arrow-up-right.svg')"
        class="success-page__banner__bg success-page__banner__bg--up"
      />
      <v-img
        :src="require('@/assets/images/glow-yellow.svg')"
        class="success-page__banner__bg success-page__banner__bg--yellow"
      />
      <v-img
        :src="require('@/assets/images/glow-green.svg')"
        class="success-page__banner__bg success-page__banner__bg--green"
      />
      <v-img
        :src="require('@/assets/images/glow-blue.svg')"
        class="success-page__banner__bg success-page__banner__bg--blue"
      />
    </div>
    <div v-if="showCarousels" class="success-page__footer">
      <LessonCarousel header="Checkout some lessons" />
      <MasterCarousel header="...Or take lessons from these masters" />
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Success Page
 * ==================================================================================
 **/

import LessonCarousel from '@/components/lessons/fields/LessonCarousel'
import MasterCarousel from '@/components/masters/fields/MasterCarousel'

export default {
  components: {
    LessonCarousel,
    MasterCarousel
  },
  props: {
    redirect: {
      type: String,
      default: 'index'
    },

    icon: {
      type: String,
      default: require('@/assets/icons/download.svg')
    },

    header: {
      type: String,
      default: 'Header'
    },

    message: {
      type: String,
      default: ''
    },

    showCarousels: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped lang="scss">
.success-page {
  &__banner {
    position: relative;
    background-image: linear-gradient(180deg, #cbecdb 75%, white);

    .v-btn {
      width: 240px;
      z-index: 2;
    }

    &__bg {
      position: absolute;
      width: 100%;
      height: 100%;

      &--down {
        top: 0;
        left: 0;
        width: 243px;
      }

      &--up {
        bottom: -50px;
        right: 0;
        width: 311px;
      }

      &--yellow {
        left: 36%;
        bottom: 28%;
        width: 70px;
        height: 70px;
      }

      &--green {
        top: 9%;
        left: 39%;
        width: 90px;
        height: 90px;
      }

      &--blue {
        top: 3%;
        right: 38%;
        width: 70px;
        height: 70px;
      }
    }

    &__border {
      padding: 100px 0;
    }

    &__card {
      position: relative;
      padding: 30px 20px 40px 20px;
      margin-bottom: 40px;
      border-radius: 10px;
      overflow: hidden;
      z-index: 2;

      &__border {
        > * {
          position: relative;
          z-index: 2;
        }

        .v-image {
          width: 100px;
          margin: 0 auto 10px auto;
        }

        h6,
        p {
          max-width: 300px;
        }
      }

      &__bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #ffffff;
        opacity: 0.7;
        z-index: 1;
      }
    }
  }

  &__footer {
    > *:not(:last-child) {
      margin-bottom: 30px;
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .success-page {
    &__banner {
      &__bg {
        &--yellow {
          left: 10%;
        }

        &--green {
          left: 19%;
        }

        &--blue {
          right: 18%;
        }
      }

      &__card {
        max-width: 275px;
      }
    }
  }
}
</style>
