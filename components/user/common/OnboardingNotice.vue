<template>
  <div v-if="isVisible" class="onboarding-notice">
    <div class="onboarding-notice__border screen-border">
      <p class="text-subtitle-2">
        {{ message }}
      </p>
      <v-btn
        depressed
        color="white"
        :to="{
          name: 'onboarding',
        }"
      >
        Complete Profile
      </v-btn>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Verify Notice
 * ==================================================================================
 **/

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      isLoggedIn: 'user/isLoggedIn',
      isVerified: 'user/isVerified',
      isOnboarded: 'user/isOnboarded'
    }),

    /**
     * @NOTE: Message percentage removed for now
     */
    message() {
      return ''
    },

    percentage() {
      /**
       * TODO: Calculate percentage
       */
      return '0%'
    },

    isVisible() {
      return (
        this.isLoggedIn &&
        this.isVerified &&
        !this.isOnboarded &&
        /**
         * TODO: Add in all onboarding page names
         */
        !['onboarding'].includes(this.$route.name)
      )
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/abstracts/_placeholders';

.onboarding-notice {
  padding: 20px 0;
  background: $regular-text;

  &__border {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  p {
    margin-bottom: 0;
    color: #ffffff;
  }

  .v-btn {
    width: 150px;
    min-height: 35px;
    @extend %body-2-style;
    font-weight: 700;
    color: $primary;

    &::before {
      color: #ffffff;
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .onboarding-notice {
    &__border {
      flex-direction: column;
      align-items: start;
    }

    p {
      margin-bottom: 15px;
    }
  }
}
</style>
