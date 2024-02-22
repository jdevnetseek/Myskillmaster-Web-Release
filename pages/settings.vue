<template>
  <div class="settings-page screen-border">
    <h4 class="mb-4">
      Settings
    </h4>
    <div class="settings-page__border d-flex">
      <SettingsMenu class="settings-page__settings" />
      <NuxtChild class="settings-page__form" />
    </div>
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Settings page
 * ==================================================================================
 **/

import SettingsMenu from '@/components/settings/menu/SettingsMenu'

export default {
  components: {
    SettingsMenu
  },
  head() {
    return {
      title: 'Settings | '
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-page {
  &__settings {
    width: 27%;
    margin-right: 20px;
  }

  &__form {
    flex-grow: 1;
    margin-left: 0 !important;
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .settings-page {
    &__settings {
      display: none;
    }

    &__form {
      margin-left: auto !important;
    }
  }
}
</style>
