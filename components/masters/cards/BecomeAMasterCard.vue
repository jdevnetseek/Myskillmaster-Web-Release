<template>
  <div
    class="home-master-card"
  >
    <div class="home-master-card__header">
      <div class="mb-2 d-flex flex-row flex-row justify-space-between">
        <h5 class="mb-0">
          Want to make extra income by becoming a Master?
        </h5>
      </div>
    </div>
    <ul class="home-master-card__list">
      <li
        v-for="(benefit, index) in benefits"
        :key="index"
        class="d-flex flex-row"
      >
        <img :src="require('@/assets/images/home/stars.svg')">
        <p>{{ benefit.label }}</p>
      </li>
    </ul>
    <div class="home-master-card__footer d-flex flex-column align-center">
      <v-btn
        color="primary"
        depressed
        block
        @click="createLesson"
      >
        Create a Lesson
      </v-btn>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Home Become a Master Card
 * ==================================================================================
 **/

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),
    /**
     * TODO: Remove or replace by proper variable
     */
    benefits() {
      return [
        {
          label: 'Simply create a master profile'
        },
        {
          label: 'Teach and make money!'
        },
        {
          label: 'List your lessons, get in touch with your students.'
        }
      ]
    }
  },

  methods: {
    createLesson() {
      if (this.isLoggedIn) {
        this.$router.push({
          name: 'onboarding'
        })
      } else {
        this.$router.push({
          name: 'sign-up'
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.home-master-card {
  color: #0A2127;

  &__header {
    h5 {
      font-weight: 700;
      font-size: 32px;
      line-height: 40px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding-left: 0;
    margin: 29px auto;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    li {
      &:not(:last-child) {
        margin-bottom: 15px;
      }

      > * {
        margin-bottom: 0;
      }

      img {
        margin-right: 10px;
      }
    }
  }

  &__footer {
    .v-btn {
      display: none;
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .home-master-card {
    background: #FFFFFF;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 24px;

    &__header {
      h5 {
        font-size: 20px;
        line-height: 24px;
      }
    }

    &__footer {
      .v-btn {
        display:  block !important;
        font-weight: 700;
        font-size: 17px;
        line-height: 22px;
        height: 54px;
        margin-top: 40px;
        border-radius: 4px;
      }
    }
  }
}
</style>
