<template>
  <div class="lesson-category">
    <div class="lesson-category__section mb-8">
      <LessonCategoryCarousel />
    </div>
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Home: Lesson Categories component
 * ==================================================================================
 **/

import LessonCategoryCarousel from '@/components/lesson-category/fields/LessonCategoryCarousel'

export default {
  components: {
    LessonCategoryCarousel
  }
}
</script>
<style scoped lang="scss">
.lesson-category {
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
