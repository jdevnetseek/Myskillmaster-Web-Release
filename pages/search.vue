<template>
  <div class="search-page">
    <div class="screen-border">
      <Back class="search-page__back mb-5" />
      <SearchLessonList />
    </div>
    <BecomeAMaster />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Search page
 * ==================================================================================
 **/

import Back from '@/components/global/Back'
import SearchLessonList from '@/components/lessons/fields/SearchLessonList'
import BecomeAMaster from '@/components/home/BecomeAMaster.vue'

export default {
  components: {
    Back,
    SearchLessonList,
    BecomeAMaster
  },

  head() {
    return {
      title: 'Search | '
    }
  }
}
</script>
<style scoped lang="scss">
.search-page {
  &__back {
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .search-page {
    &__back {
      display: none;
    }
  }
}
</style>
