<template>
  <div
    class="master-carousel"
    :class="{
      'master-carousel--has-margin': hasScreenMargin,
    }"
  >
    <div
      class="master-carousel__header"
      :class="{
        'screen-border': hasScreenMargin,
      }"
    >
      <h5>{{ header }}</h5>
    </div>
    <template v-if="!listingForm.$busy">
      <template v-if="list.length > 0">
        <VueSlickCarousel
          class="master-carousel__list"
          v-bind="carouselSettings"
        >
          <MasterCard
            v-for="(master, index) in list"
            :key="index"
            :master="master"
          />
        </VueSlickCarousel>
      </template>
      <template v-else>
        <div class="master-carousel__placeholder">
          <p class="mb-0">
            No masters found
          </p>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="master-carousel__skeleton">
        <MasterCardSkeleton
          v-for="n in skeletonCount"
          :key="n"
          class="master-carousel__skeleton__item"
        />
      </div>
    </template>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Master Carousel
 * ==================================================================================
 **/

import SETTINGS from '@/utils/enums/Settings'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import CarouselMixin from '@/utils/mixins/Carousel'
import ListingMixin from '@/utils/mixins/Listing'
import MasterCard from '../cards/MasterCard'
import MasterCardSkeleton from '../cards/MasterCardSkeleton'

export default {
  components: {
    MasterCard,
    MasterCardSkeleton
  },
  mixins: [ListingMixin, SnackbarMixin, CarouselMixin],
  props: {
    header: {
      type: String,
      default: 'Meet our Masters'
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
          .dispatch('master/getList', {
            ...this.fetchFilter,
            page:
              page || Math.min(this.meta.current_page + 1, this.meta.last_page),
            limit: this.limit
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
.master-carousel {
  &__header {
    margin-bottom: 10px;

    h5 {
      margin-bottom: 0;
    }
  }

  $cardWidth: 181px;
  $cardHeight: 260px;

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

.master-carousel--has-margin {
  .master-carousel__skeleton,
  .master-carousel__list {
    margin-left: $marginLeft;
  }
}
</style>
