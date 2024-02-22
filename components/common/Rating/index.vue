<template>
  <div class="rating d-flex flex-row align-center">
    <Stars :value="average" class="mr-1" />
    <caption class="rating__total">
      {{
        totalLabel
      }}
    </caption>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Rating
 * ==================================================================================
 **/

import PRICE from '@/utils/Price'
import Stars from './common/Stars'

export default {
  components: {
    Stars
  },
  props: {
    average: {
      type: Number,
      default: 0
    },

    total: {
      type: Number,
      default: 0
    }
  },

  computed: {
    totalLabel() {
      return `(${PRICE.formatToShort(this.total)})`
    }
  }
}
</script>
<style scoped lang="scss">
.rating {
  &__total {
    display: block;
    text-align: left;
    color: $secondary-text;
  }
}
</style>
