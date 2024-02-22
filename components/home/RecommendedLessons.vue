<template>
  <div class="lessons">
    <div class="lessons__section mb-8">
      <LessonCarousel />
    </div>
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Home: Recommended/Random Lessons component
 * ==================================================================================
 **/

import LessonCarousel from '@/components/lessons/fields/LessonCarousel'

export default {
  components: {
    LessonCarousel
  }
}
</script>
<style scoped lang="scss">
.lessons {
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
