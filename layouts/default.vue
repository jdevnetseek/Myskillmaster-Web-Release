<template>
  <Basic class="default-layout" />
</template>
<script>
/**
 * ==================================================================================
 * Default Layout
 * ==================================================================================
 **/

import Basic from '@/components/layouts/Basic'

export default {
  name: 'DefaultLayout',
  components: {
    Basic
  },
  auth: 'auth',
  middleware: ['verified', 'onboarded', 'route-guard']
}
</script>
<style scoped lang="scss">
.default-layout {
}
</style>
