<template>
  <div
    class="lesson-carousel"
    :class="{
      'lesson-carousel--has-margin': hasScreenMargin,
    }"
  >
    <div
      class="lesson-carousel__header"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    >
      <h5>{{ header }}</h5>
    </div>
    <template v-if="!listingForm.$busy">
      <template v-if="list.length > 0">
        <VueSlickCarousel
          class="lesson-carousel__list"
          v-bind="carouselSettings"
        >
          <LessonCard
            v-for="(lesson, index) in list"
            :key="index"
            :lesson="lesson"
            @click="
              $router.push({
                name: 'lessons-slug',
                params: {
                  slug: lesson.slug,
                },
              })
            "
          />
        </VueSlickCarousel>
      </template>
      <template v-else>
        <div class="lesson-carousel__placeholder">
          <p class="mb-0">
            No lessons found
          </p>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="lesson-carousel__skeleton">
        <LessonCardSkeleton
          v-for="n in skeletonCount"
          :key="n"
          class="lesson-carousel__skeleton__item"
        />
      </div>
    </template>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Carousel
 * ==================================================================================
 **/

import SETTINGS from '@/utils/enums/Settings'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import CarouselMixin from '@/utils/mixins/Carousel'
import ListingMixin from '@/utils/mixins/Listing'
import LessonCard from '../cards/LessonCard'
import LessonCardSkeleton from '../cards/LessonCardSkeleton'

export default {
  components: {
    LessonCard,
    LessonCardSkeleton
  },
  mixins: [ListingMixin, SnackbarMixin, CarouselMixin],
  props: {
    header: {
      type: String,
      default: 'Recommended Lessons'
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

    include: {
      type: Array,
      default: () => ['cover', 'user.masterProfile', 'user.address']
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
    },

    isPopular: {
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
          .dispatch('lesson/getList', {
            ...this.fetchFilter,
            include: this.include,
            page:
              page || Math.min(this.meta.current_page + 1, this.meta.last_page),
            limit: this.limit,
            popular: this.isPopular
          })
          .then((result) => {
            if (result.list && result.list.length > 0) {
              this.list = [...this.list, ...result.list]
            }
            this.meta = result.meta
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
.lesson-carousel {
  &__header {
    margin-bottom: 10px;

    h5 {
      margin-bottom: 0;
    }
  }

  $cardWidth: 250px;
  $cardHeight: 300px;
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

.lesson-carousel--has-margin {
  .lesson-carousel__skeleton,
  .lesson-carousel__list {
    margin-left: $marginLeft;
  }
}
</style>
