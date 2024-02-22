<template>
  <div
    class="lesson-category-carousel"
    :class="{
      'lesson-category-carousel--has-margin': hasScreenMargin,
    }"
  >
    <div
      class="lesson-category-carousel__header"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    >
      <h5>{{ header }}</h5>
    </div>
    <template v-if="!listingForm.$busy">
      <template v-if="list.length > 0">
        <VueSlickCarousel
          class="lesson-category-carousel__list"
          v-bind="carouselSettings"
        >
          <LessonCategoryCard
            v-for="(category, index) in list"
            :key="index"
            :category="category"
            @click="
              $router.push({
                name: 'search',
                query: {
                  q: encodeURIComponent(category.label),
                },
              })
            "
          />
        </VueSlickCarousel>
      </template>
      <template v-else>
        <div class="lesson-category-carousel__placeholder">
          <p class="mb-0">
            No lesson categories found
          </p>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="lesson-category-carousel__skeleton">
        <LessonCategoryCardSkeleton
          v-for="n in skeletonCount"
          :key="n"
          class="lesson-category-carousel__skeleton__item"
        />
      </div>
    </template>
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Lesson Category Carousel
 * ==================================================================================
 **/

import SETTINGS from '@/utils/enums/Settings'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import CarouselMixin from '@/utils/mixins/Carousel'
import ListingMixin from '@/utils/mixins/Listing'
import LessonCategoryCard from '../cards/LessonCategoryCard'
import LessonCategoryCardSkeleton from '../cards/LessonCategoryCardSkeleton'

export default {
  components: {
    LessonCategoryCard,
    LessonCategoryCardSkeleton
  },
  mixins: [ListingMixin, SnackbarMixin, CarouselMixin],
  props: {
    header: {
      type: String,
      default: 'Lesson Categories'
    },

    fetchFilter: {
      type: Object,
      default: () => {}
    },

    limit: {
      type: Number,
      default: SETTINGS.pagination.itemsPerCarousel,
      validator(value) {
        return value > 0
      }
    },

    skeletonCount: {
      type: Number,
      default: 5,
      validator(value) {
        return value > 0
      }
    },

    hasScreenMargin: {
      type: Boolean,
      default: true
    }
  },

  async mounted() {
    await this.fetch(1)
  },

  methods: {
    async fetch(page = 1) {
      this.listingForm.$clearErrors()

      if (!this.listingForm.$busy) {
        this.listingForm.$busy = true

        await this.$store
          .dispatch('category/getCategories', {
            ...this.fetchFilter,
            filter: {
              type: 'lesson'
            },
            limit: this.limit
          })
          .then((result) => {
            if (result.categories && result.categories.length > 0) {
              this.list = result.categories
            }
          })
          .finally(() => {
            this.listingForm.$busy = false
          })
      }
    }
  }
}
</script>
<style scoped lang="scss">
$marginLeft: 2.5%;
.lesson-category-carousel {
  &__header {
    margin-bottom: 10px;

    h5 {
      margin-bottom: 0;
    }
  }

  $cardWidth: 170px;
  $cardHeight: 215px;

  &__skeleton,
  &__list {
    display: flex;
    flex-direction: row;

    ::v-deep .slick-list {
      padding-left: 8px;
    }

    &__item,
    ::v-deep .slick-slide {
      width: $cardWidth;
      min-width: $cardWidth;
      height: $cardHeight;
      margin-top: 10px;
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }

  &__skeleton {
    padding-left: 8px;
  }

  &__placeholder {
    margin: 40px 0 40px $marginLeft;
    text-align: center;

    > * {
      font-style: italic;
    }
  }
}

.lesson-category-carousel--has-margin {
  .lesson-category-carousel__skeleton,
  .lesson-category-carousel__list {
    margin-left: $marginLeft;
  }
}
</style>
