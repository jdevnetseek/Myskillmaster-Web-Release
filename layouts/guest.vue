<template>
  <Basic class="guest-layout" />
</template>
<script>
/**
 * ==================================================================================
 * Guest Layout
 * ==================================================================================
 **/

import Basic from '@/components/layouts/Basic'

export default {
  name: 'GuestLayout',
  components: {
    Basic
  },
  auth: 'guest',
  middleware: ['guest', 'route-guard']
}
</script>
<style scoped lang="scss">
.guest-layout {
}
</style>
