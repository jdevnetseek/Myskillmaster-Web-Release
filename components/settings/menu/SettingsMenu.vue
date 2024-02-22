<template>
  <ul class="settings-menu">
    <li v-for="(menu, index) in menuItems" :key="index">
      <v-btn
        v-if="menu.type === 'button'"
        :class="menu.class"
        class="settings-menu__btn"
        text
        @click="menu.action()"
      >
        {{ menu.title }}
      </v-btn>
      <NuxtLink v-else class="text-body-1 mb-0" :to="{ name: menu.link }" exact>
        {{ menu.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
/**
 * ==================================================================================
 * Settings Menu
 * ==================================================================================
 **/

export default {
  computed: {
    menuItems() {
      return [
        {
          title: 'Account and personal profile',
          link: 'settings'
        },
        {
          title: 'My interests',
          link: 'settings-my-interests'
        },
        {
          title: 'Master profile',
          link: 'settings-master-profile'
        },
        {
          title: 'Payment details',
          link: 'settings-payment-details'
        },
        {
          title: 'Payout details',
          link: 'settings-payout-details'
        },
        {
          title: 'Delete account',
          action: this.toggleDeleteAccountModal,
          class: 'text-body-1 mb-0 red--text',
          type: 'button'
        }
      ]
    }
  },

  methods: {
    toggleDeleteAccountModal() {
      this.$store.commit('toggleDeleteAccountModal', true)
    },
    goToPage(name) {
      this.$router.push({ name })
    }
  }
}
</script>
<style lang="scss" scoped>
.settings-menu {
  list-style: none;
  padding-left: 0;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0;
    max-width: 270px;

    a {
      width: 100%;
      font-weight: 500;
      border-radius: $border-radius;
      padding: 16px;
      color: $regular-text;
    }

    a.nuxt-link-active.nuxt-link-exact-active {
      font-weight: 700;
      background: rgba(0, 118, 117, 0.1);
      color: $primary;
    }
  }

  &__btn {
    padding: 16px !important;
    width: 100%;
    justify-content: left !important;
  }
}
</style>
