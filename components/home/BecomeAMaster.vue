<template>
  <div class="home-master d-flex align-center">
    <div class="home-master__bg">
      <div class="home-master__bg__gradient-bg" />
    </div>

    <div class="home-master__section screen-border">
      <v-row>
        <v-col class="home-master__section--master" cols="12" md="12" lg="6">
          <BecomeAMasterCard />
        </v-col>

        <v-col
          class="home-master__section--recommended"
          cols="12"
          md="12"
          lg="6"
        >
          <RecommendedPlanList
            class="home-master__section--recommended__card"
          />

          <v-img
            :src="require('@/assets/images/glow-yellow.svg')"
            class="home-master__section--recommended__icon__glow-yellow"
          />

          <v-img
            :src="require('@/assets/images/glow-green.svg')"
            class="home-master__section--recommended__icon__glow-green"
          />

          <v-img
            :src="require('@/assets/images/glow-blue.svg')"
            class="home-master__section--recommended__icon__glow-blue"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Home: Become a Master/Create a Lesson component
 * ==================================================================================
 **/

import BecomeAMasterCard from '@/components/masters/cards/BecomeAMasterCard.vue'
import RecommendedPlanList from '@/components/masters/fields/RecommendedPlanList'

export default {
  components: {
    BecomeAMasterCard,
    RecommendedPlanList
  }
}
</script>
<style scoped lang="scss">
.home-master {
  position: relative;
  height: 733px;

  &__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;

    &__gradient-bg {
      width: 100%;
      height: 100%;

      background-image: linear-gradient(
        180deg,
        rgba(236, 243, 243, 0) 0%,
        #cbecdb 100%
      );
    }
  }

  &__section {
    z-index: 2;
    &:not(:last-child) {
      margin-bottom: 30px;
    }

    h4,
    h6 {
      margin-bottom: 5px;
    }

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }

    &--recommended {
      position: relative;
      width: 100%;

      &__card {
        position: relative;
        z-index: 1;
      }

      &__icon {
        position: absolute;
        height: 0;
        width: auto;
        z-index: 0;

        &__glow-yellow {
          left: 8%;
          bottom: 45%;
          width: 100px;
          height: 100px;
          z-index: 0;
        }

        &__glow-green {
          left: 12%;
          bottom: 44%;
          width: 60px;
          height: 60px;
          z-index: 0;
        }

        &__glow-blue {
          left: 76%;
          bottom: 95%;
          width: 60px;
          height: 60px;
          z-index: 0;
        }
      }
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .home-master {
    &__bg {
      display: none;
    }

    &__section {
      &--recommended {
        display: none;
      }
    }
  }
}
</style>
