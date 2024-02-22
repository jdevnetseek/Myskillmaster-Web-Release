<template>
  <div class="home-page">
    <HomeBanner class="home-page__banner" />
    <LessonCategories class="mt-8" />
    <MeetOurMasters />
    <RecommendedLessons />
    <BecomeAMaster />
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Home page
 * ==================================================================================
 **/

import HomeBanner from '~/components/home/HomeBanner.vue'
import LessonCategories from '~/components/home/LessonCategories.vue'
import MeetOurMasters from '~/components/home/MeetOurMasters.vue'
import RecommendedLessons from '~/components/home/RecommendedLessons.vue'
import BecomeAMaster from '~/components/home/BecomeAMaster.vue'

export default {
  components: { HomeBanner, LessonCategories, MeetOurMasters, RecommendedLessons, BecomeAMaster },
  head() {
    return {
      title: 'Learn Life Skills from Local Experts |'
    }
  },
  auth: false
}
</script>
<style lang="scss" scoped>
.home-page {
}
</style>
