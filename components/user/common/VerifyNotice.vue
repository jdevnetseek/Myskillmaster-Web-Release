<template>
  <div v-if="isVisible" class="verify-notice">
    <div class="verify-notice__border screen-border">
      <p class="text-subtitle-2">
        {{ message }}
        <b>({{ user.email }})</b>. If you have not received it...
      </p>
      <v-btn
        :to="{
          name: 'verify',
        }"
      >
        Verify
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
      isVerified: 'user/isVerified'
    }),

    message() {
      return `${
        this.user.first_name ? `${this.user.first_name}, you` : 'You'
      } need to activate your account via your email inbox`
    },

    isVisible() {
      return (
        this.isLoggedIn && !this.isVerified && this.$route.name !== 'verify'
      )
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/abstracts/_placeholders';

.verify-notice {
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
    width: 89px;
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
  .verify-notice {
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
