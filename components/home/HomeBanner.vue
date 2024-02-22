<template>
  <div class="home-banner d-flex">
    <div class="home-banner__bg">
      <div class="home-banner__bg__triangles" />

      <div class="home-banner__bg__gradient-bg" />
    </div>

    <div class="home-banner__container screen-border">
      <v-row>
        <v-col cols="12" lg="6">
          <div class="home-banner__container__text">
            <div>
              <v-img
                :src="require('@/assets/images/glow-blue.svg')"
                class="home-banner__container__text__glow-blue"
              />

              <v-img
                :src="require('@/assets/images/home/rays.svg')"
                class="home-banner__container__text--rays"
              />

              <h1>Learn, teach, and have fun!</h1>

              <v-img
                :src="require('@/assets/images/home/line-green.svg')"
                class="home-banner__container__text--line"
              />
            </div>

            <p class="mt-2 mb-8">
              Join us to discover new knowledge, learn new hobbies and earn
              extra income by giving lessons.
            </p>

            <Searchbar :for-home="true" />

            <v-img
              :src="require('@/assets/images/glow-yellow.svg')"
              class="home-banner__container__text__glow-yellow"
            />

            <v-img
              :src="require('@/assets/images/glow-green.svg')"
              class="home-banner__container__text__glow-green"
            />
          </div>
        </v-col>

        <v-col cols="12" lg="6">
          <div class="home-banner__container__icons">
            <v-img
              :src="require('@/assets/images/glow-yellow.svg')"
              class="home-banner__container__icons__glow-yellow"
            />

            <v-img
              :src="require('@/assets/images/home/chat-box.svg')"
              class="home-banner__container__icons__chat-box"
              contain
            />

            <v-img
              :src="require('@/assets/images/glow-green.svg')"
              class="home-banner__container__icons__glow-green"
            />

            <v-img
              :src="require('@/assets/images/glow-blue.svg')"
              class="home-banner__container__icons__glow-blue"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Searchbar from '@/components/global/Searchbar.vue'

export default {
  components: {
    Searchbar
  }
}
</script>

<style lang="scss" scoped>
.home-banner {
  position: relative;
  min-height: 733px;
  overflow: hidden;

  &__bg {
    position: absolute;
    width: 100%;
    height: 100%;

    &,
    > * {
      position: absolute;
      z-index: 0;
    }

    &__gradient-bg {
      width: 100%;
      height: 100%;
      z-index: 1;

      background-image: linear-gradient(
        180deg,
        #cbecdb 0%,
        rgba(203, 236, 219, 0.73) 76.33%,
        rgba(203, 236, 219, 0) 100%
      );
    }

    &__triangles {
      position: absolute;
      width: 100% !important;
      height: 100%;
      z-index: 2;

      background-image: url('@/assets/images/home/triangles-bg-web.svg');
    }
  }

  &__container {
    position: relative;
    width: 100%;

    &__text {
      position: absolute;
      top: 170px;
      z-index: 10;

      h1,
      p {
        color: #1a3235;
      }

      h1 {
        max-width: 606px;
        line-height: 22px;
      }

      p {
        max-width: 470px;
        line-height: 20px;
      }

      &--rays {
        height: 27px;
        width: 28.89px;
        left: 610px;
        top: 0px;
      }

      &--line {
        width: 207px;
        left: 400px;
        top: 12px;
      }

      &__glow-yellow {
        left: 30%;
        top: 20px;
        width: 47px;
        height: 47px;
      }

      &__glow-green {
        left: 45%;
        bottom: -15px;
        width: 34px;
        height: 32px;
      }

      &__glow-blue {
        left: 63%;
        bottom: 0%;
        width: 27px;
        height: 27px;
      }
    }

    &__icons {
      position: absolute;
      height: 0;
      width: auto;

      &__chat-box {
        width: 460px;
        height: 365px;
        left: 10%;
        top: 100px;
        z-index: 2;
      }

      &__glow-yellow {
        left: 80%;
        top: 110px;
        width: 50px;
        height: 50px;
      }

      &__glow-green {
        width: 75px;
        height: 75px;
        left: 0%;
        bottom: 170px;
      }

      &__glow-blue {
        left: 70%;
        bottom: 10px;
        width: 50px;
        height: 50px;
      }
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'lg')) {
  .home-banner {
    min-height: 810px;

    &__bg {
      &__triangles {
        width: 100%;
        background-image: url('@/assets/images/home/triangles-bg-mobile.svg');
      }
    }

    &__container {
      &__text {
        top: 79px;

        h1 {
          max-width: 210px;
          font-size: 32px;
          line-height: 40px;
          letter-spacing: -0.02em;
        }

        p {
          font-size: 14px;
          line-height: 20px;
        }

        &--rays {
          height: 21px;
          width: 21px;
          left: 180px;
          top: 17px;
        }

        &--line {
          width: 146.5px;
          left: 50px;
          top: -2px;
        }

        &__glow-yellow,
        &__glow-green,
        &__glow-blue {
          display: none;
        }
      }

      &__icons {
        top: 318px;
        height: unset;

        &__chat-box {
          left: unset;
          width: 95%;
          top: unset;
          height: unset;
        }

        &__glow-yellow {
          left: 5%;
          top: 135px;
          width: 40px;
          height: 40px;
        }

        &__glow-green {
          left: 80%;
          bottom: 90px;
          height: 50px;
          width: 50px;
          z-index: 2;
        }

        &__glow-blue {
          left: 70%;
          bottom: 440px;
          height: 50px;
          width: 50px;
        }
      }
    }
  }
}
</style>
