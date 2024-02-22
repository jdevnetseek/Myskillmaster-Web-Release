<template>
  <div class="master">
    <div class="master__section mb-8">
      <MasterCarousel />
    </div>
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Home: Meet the Masters component
 * ==================================================================================
 **/

import MasterCarousel from '@/components/masters/fields/MasterCarousel'

export default {
  components: {
    MasterCarousel
  }
}
</script>
<style scoped lang="scss">
.master {
  &__section {
    &:not(:last-child) {
      margin-bottom: 30px;
    }

    h4,
    h6 {
      margin-bottom: 5px;
    }

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
