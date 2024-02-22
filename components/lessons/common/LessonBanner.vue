<template>
  <div class="lesson-banner">
    <div class="lesson-banner__actions">
      <slot name="actions" />
    </div>
    <VueSlickCarousel
      v-if="images.length > 0"
      class="lesson-banner__carousel"
      :class="{
        'lesson-banner__carousel--small': isSmall,
      }"
      v-bind="settings"
    >
      <v-img
        v-for="(url, index) in validImages"
        :key="index"
        :src="url"
        cover
      />
    </VueSlickCarousel>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Banner
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
    },

    isSmall: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    settings() {
      const settings = JSON.parse(JSON.stringify(this.carouselSettings))
      settings.variableWidth = false
      settings.dots = this.images.length > 0

      return settings
    },

    validImages() {
      return this.images.map(image => IMAGE.url(image))
    }
  }
}
</script>
<style scoped lang="scss">
@mixin change-height($height) {
  & {
    max-height: $height;
    ::v-deep .slick-list {
      .slick-slide {
        .v-image {
          height: $height;
        }
      }
    }
  }
}

.lesson-banner {
  position: relative;

  &__carousel {
    @include change-height(400px);

    ::v-deep .slick-list {
      background: #fafafa;
    }

    &--small {
      @include change-height(250px);
    }
  }

  &__actions {
    position: absolute;
    right: 50px;
    top: 30px;
    z-index: 2;
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .lesson-banner {
    &__carousel {
      @include change-height(172px);
    }

    &__actions {
      position: absolute;
      right: 20px;
      top: 10px;
      z-index: 2;
    }
  }
}
</style>
