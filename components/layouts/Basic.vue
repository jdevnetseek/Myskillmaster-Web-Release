<template>
  <v-app class="basic-layout layout">
    <v-main class="layout__main">
      <VerifyNotice />
      <OnboardingNotice />
      <Header />
      <div class="layout__main__border" :class="borderClasses">
        <Nuxt />
      </div>
      <Footer />
      <Snackbar />
      <DeleteAccountModal />
    </v-main>
  </v-app>
</template>
<script>
/**
 * ==================================================================================
 * Basic Layout
 * ==================================================================================
 **/

import SETTINGS from '@/utils/enums/Settings'
import Header from '@/components/global/Header'
import DeleteAccountModal from '@/components/modals/DeleteAccountModal'
import Footer from '@/components/global/Footer'
import Snackbar from '@/components/global/Snackbar'
import VerifyNotice from '@/components/user/common/VerifyNotice'
import OnboardingNotice from '@/components/user/common/OnboardingNotice'

export default {
  components: {
    Header,
    DeleteAccountModal,
    Footer,
    Snackbar,
    VerifyNotice,
    OnboardingNotice
  },

  computed: {
    borderClasses() {
      const classes = []
      const routeName = this.$route.name
      /**
       * Depending on the current page:
       * - For pages w/ banners, add/remove padding at the top to make sure the page
       * starts behind of the header
       */
      if (!SETTINGS.layout.pagesStartAtTop.includes(routeName)) {
        classes.push('layout--header-padding')
      }

      if (SETTINGS.layout.headerExact.includes(routeName)) {
        classes.push('layout--header-padding-exact')
      }

      if (!SETTINGS.layout.noPaddingAtBottom.includes(routeName)) {
        classes.push('layout--padding-bottom')
      }

      return classes.join(' ')
    }
  },

  watch: {
    $route: {
      handler() {
        this.$store.commit('toggleDrawer', false)
      },
      deep: true
    }
  }
}
</script>
<style scoped lang="scss">
.basic-layout {
}
</style>
