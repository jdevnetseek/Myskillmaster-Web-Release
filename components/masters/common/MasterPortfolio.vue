<template>
  <VueSlickCarousel
    v-if="images.length > 0"
    class="master-portfolio"
    v-bind="carouselSettings"
  >
    <v-img
      v-for="(url, index) in validImages"
      :key="index"
      :src="url"
      draggable="false"
      contain
    />
  </VueSlickCarousel>
</template>
<script>
/**
 * ==================================================================================
 * Master Portfolio
 * ==================================================================================
 **/

import IMAGE from '@/utils/Image'
import CarouselMixin from '@/utils/mixins/Carousel'

export default {
  mixins: [CarouselMixin],
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    validImages() {
      return this.images.map(image => IMAGE.url(image))
    }
  }
}
</script>
<style scoped lang="scss">
.master-portfolio {
  ::v-deep .slick-list {
    $maxWidth: 314px;
    $maxHeight: 211px;
    .slick-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      width: $maxWidth;
      height: $maxHeight;
      background: #fafafa;

      &:not(:last-child) {
        margin-right: 20px;
      }

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .v-image {
        width: 100%;
        max-width: $maxWidth;
        max-height: $maxHeight;
        border-radius: 5px;
      }
    }
  }
}
</style>
