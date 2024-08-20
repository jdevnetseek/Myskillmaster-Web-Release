<template>
  <v-navigation-drawer
    v-model="controls.drawer"
    class="navigation-items"
    floating
    app
    width="100%"
  >
    <div
      class="navigation-items__header screen-border d-flex align-center justify-space-between"
    >
      <template v-if="isOnSubmenu">
        <div
          class="navigation-items__header__back d-flex align-center flex-row"
          @click="goToParentMenu"
        >
          <v-icon color="black" :size="14" class="mr-2">
            $chevronLeft
          </v-icon>
          <h5>{{ submenu.title }}</h5>
        </div>
      </template>
      <template v-else>
        <v-img
          :src="require('@/assets/logo-w-text.svg')"
          height="28px"
          contain
          class="flex-grow-0"
          @click="goToPage('index')"
        />
      </template>
      <v-icon color="black" @click="toggleDrawer(false)">
        mdi-close
      </v-icon>
    </div>
    <v-list>
      <v-img
        class="navigation-items__bg"
        :src="require('@/assets/images/nav/bg.svg')"
      />
      <v-list-item
        v-for="item in menu"
        :key="item.title"
        class="navigation-items__item"
        @click="
          item.menu ? goToSubmenu(item) : item.action ? item.action() : null
        "
      >
        <v-list-item-content>
          <div class="d-flex flex-row align-center justify-space-between">
            <div>
              <v-list-item-title>
                <h6 :class="item.titleTextClass || ''">
                  {{ item.title }}
                </h6>
              </v-list-item-title>
              <v-list-item-subtitle>
                <caption>
                  {{
                    item.subtitle
                  }}
                </caption>
              </v-list-item-subtitle>
            </div>
            <v-icon v-if="item.menu" color="black" size="14">
              $chevronRight
            </v-icon>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-btn
        v-if="!isLoggedIn"
        class="navigation-items__join screen-border mt-7"
        color="primary"
        depressed
        @click="goToPage('sign-up')"
      >
        Join myskillmaster
      </v-btn>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
/**
 * ==================================================================================
 * Navigation Items
 * ==================================================================================
 **/

import { mapGetters } from 'vuex'
import NavigationMixin from '@/utils/mixins/Navigation'

export default {
  mixins: [NavigationMixin],
  data() {
    return {
      menuQueue: []
    }
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      user: 'user/getUser'
    }),

    menu() {
      return this.isOnSubmenu ? this.submenu.menu : this.menuItems
    },

    submenu() {
      return this.isOnSubmenu ? this.menuQueue[this.menuQueue.length - 1] : null
    },

    menuItems() {
      if (!this.isLoggedIn) {
        return [
          {
            title: 'Log in',
            action: () => this.goToPage('login')
          },
          { title: 'Search for lessons' },
          { title: 'Start teaching' }
        ]
      }

      return [
        {
          title: 'Upcoming lessons',
          subtitle:
            '*This includes all the lessons you have created and taught.',
          action: () => this.goToPage('my-lessons')
        },
        {
          title: 'Search',
          action: () => {
            this.goToPage('search')
          }
        },
        {
          title: 'Past lessons',
          subtitle:
            '*This includes all the lessons you have learned and saved.',
          action: () => {
            this.goToPage('past-lessons')
          }
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
          menu: [
            {
              title: 'Account and personal profile',
              action: () => this.goToPage('settings')
            },
            {
              title: 'My interests',
              action: () => this.goToPage('settings-my-interests')
            },
            {
              title: 'Master profile',
              action: () => this.goToPage('settings-master-profile')
            },
            // {
            //   title: 'Payment details',
            //   action: () => this.goToPage('settings-payment-details')
            // },
            {
              title: 'Payout details',
              action: () => this.goToPage('settings-payout-details')
            },
            {
              title: 'About',
              menu: [
                {
                  title: 'Terms & Conditions',
                  action: () => this.goToPage('terms-and-conditions')
                },
                {
                  title: 'Privacy Policy',
                  action: () => this.goToPage('privacy-policy')
                }
              ]
            },
            {
              title: 'Delete account',
              titleTextClass: 'red--text',
              action: () =>
                this.$store.commit('toggleDeleteAccountModal', true)
            }
          ]
        },
        {
          title: 'Log out',
          action: () => this.submitÅction('user/logout')
        }
      ]
    },

    isOnSubmenu() {
      return this.menuQueue.length > 0
    }
  },

  methods: {
    goToSubmenu(menu) {
      this.menuQueue.push(menu)
    },

    goToParentMenu() {
      this.menuQueue.pop()
    },

    goToPage(name) {
      this.toggleDrawer(false)
      this.$router.push({ name })
    },

    submitÅction(action) {
      this.toggleDrawer(false)
      this.$store.dispatch(action)
    }
  }
}
</script>
<style lang="scss" scoped>
.navigation-items {
  &__bg {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &__header {
    padding: 15px 0;

    &__back {
      position: relative;
      z-index: 1;
    }
  }

  &__item {
    position: relative;
    border-bottom: 1px solid $border-color;
    z-index: 1;
  }

  &__join {
  }
}
</style>
