<template>
  <div class="account-button">
    <v-menu
      v-if="isLoggedIn"
      v-model="show"
      offset-y
      class="account-button__border"
      content-class="account-button__menu"
    >
      <template #activator="{ on }">
        <v-btn text class="account-button__btn" v-on="on">
          <h6 class="mb-0 mr-2">
            {{ user.first_name ? user.first_name : 'My Account' }}
          </h6>
          <ProfileAvatar :size="35" class="mr-2" />
          <v-icon
            size="16"
            class="account-button__btn__icon"
            :style="{
              transform: show ? '' : 'rotate(180deg)',
            }"
          >
            $chevronDown
          </v-icon>
        </v-btn>
      </template>
      <v-list class="account-button__list">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          class="account-button__list__item"
          @click="item.action"
        >
          <v-list-item-title>
            <h6>{{ item.title }}</h6>
          </v-list-item-title>
          <v-list-item-subtitle>
            <caption>
              {{
                item.subtitle
              }}
            </caption>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Account Button
 * ==================================================================================
 **/

import { mapGetters } from 'vuex'
import ProfileAvatar from '@/components/user/common/ProfileAvatar'

export default {
  components: {
    ProfileAvatar
  },

  data() {
    return {
      show: false
    }
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      user: 'user/getUser'
    }),

    menuItems() {
      if (!this.isLoggedIn) {
        return []
      }

      return [
        {
          title: 'Upcoming lessons',
          subtitle:
            '*This includes all the lessons you have created and taught.',
          action: () => this.goToPage('my-lessons')
        },
        {
          title: 'Past lessons',
          action: () => this.goToPage('past-lessons')
        },
        {
          title: this.user.is_subscribed ? 'Subscription Tier' : 'Go Pro',
          action: () =>
            this.goToPage(
              this.user.is_subscribed ? 'subscription-tier' : 'go-pro'
            )
        },
        {
          title: 'Accounts',
          action: () => this.goToPage('settings')
        },
        {
          title: 'Log out',
          action: () => this.submitÅction('user/logout')
        }
      ]
    }
  },

  methods: {
    toggle(show = null) {
      this.show = show === null ? !this.show : show
    },

    goToPage(name) {
      this.toggle(false)
      this.$router.push({ name })
    },

    submitÅction(action) {
      this.toggle(false)
      this.$store.dispatch(action)
    }
  }
}
</script>
<style scoped lang="scss">
.account-button {
  &__btn {
    &__icon {
      @include transition(transform 0.3s ease);
    }
  }

  &__menu {
    border: 1px solid $border-color;
    border-radius: 8px;
    box-shadow: none;
  }

  &__list {
    padding: 0;

    &__item {
      display: flex;
      flex-direction: column;
      min-height: auto;
      align-items: flex-start;
      padding: 15px 10px;

      &:not(:last-child) {
        border-bottom: 1px solid #0000001f;
      }

      > * {
        align-self: flex-start;
      }
    }
  }
}
</style>
