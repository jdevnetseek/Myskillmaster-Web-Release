<template>
  <div class="lesson-category-card">
    <div class="lesson-category-card__border d-flex">
      <div class="lesson-category-card__content">
        <img :src="category.icon_url" :draggable="false">
        <div class="mb-2 d-flex flex-row flex-row justify-space-between" :draggable="false">
          <h6 class="mb-0">
            {{ category.label }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Card
 * ==================================================================================
 **/

import DragOrClickMixin from '@/utils/mixins/DragOrClick'

export default {
  components: {
  },
  mixins: [DragOrClickMixin],
  props: {
    category: {
      type: Object,
      required: true
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    /**
     * Bind click event on carousel, we are manually checking the drag OR click
     * event as the carousel library doesn't provide `is dragging` checker
     */
    init() {
      this.dragOrClick(this.$el)
    }
  }
}
</script>
<style scoped lang="scss">
$cardRadius: 8px;
.lesson-category-card {
  border-radius: $cardRadius;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(10, 33, 39, 0.08);

  &__border {
    flex-direction: column;
    padding: 5px;
  }

  &__content {
    padding: 31px 16px;

    img {
      width: 71px;
      height: 71px;
      margin-bottom: 16px;
    }

    h6 {
      @include wrap-text-ellipsis(1);
    }
  }
}
</style>
