<template>
  <div class="lesson-exact-address">
    <p
      class="lesson-exact-address__label mb-0"
      :class="{
        'lesson-exact-address__label--hidden': !isEnrolled,
        'lesson-exact-address__label--show': hasAddress,
      }"
      @click="toggle"
    >
      {{ label }}
    </p>
    <caption v-if="!show" class="lesson-exact-address__note mt-2">
      NOTE: Once you've enrolled in this lesson, you'll be given the full
      address
    </caption>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Exact Address
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import Lesson from '@/models/Lesson'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  mixins: [SnackbarMixin],
  props: {
    lesson: {
      type: [Lesson, Object],
      required: true
    },

    hiddenPlaceholder: {
      type: String,
      default: '••••••••••••'
    },

    isAlwaysVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      show: false,
      address: ''
    }
  },

  computed: {
    ...mapState({
      form: state => state.lesson.lesson
    }),

    lessonObj() {
      return this.lesson instanceof Lesson
        ? this.lesson
        : new Lesson(this.lesson)
    },

    label() {
      return this.hasAddress ? this.address : this.hiddenPlaceholder
    },

    hasAddress() {
      return !!this.address
    },

    isEnrolled() {
      return this.lesson.is_enrolled || this.lesson.is_owner
    }
  },

  watch: {
    lesson() {
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.toggle()
    },

    setAddress(address) {
      if (address) {
        this.show = true
        this.address = address
      }
    },

    async toggle() {
      this.form.$clearErrors()

      if (
        !this.hasAddress &&
        (this.isEnrolled || this.isAlwaysVisible) &&
        !this.form.$busy
      ) {
        await this.$store
          .dispatch('lesson/getAddress', this.lesson.id)
          .then((address) => {
            if (!this.form.$hasErrors()) {
              this.setAddress(address)
            } else {
              this.showSnackbar(this.form.$errorMessage, false)
            }
          })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.lesson-exact-address {
  &__label {
    font-size: inherit;
    color: inherit;
    cursor: pointer;

    &--hidden {
      cursor: not-allowed;
    }

    &--show {
      cursor: auto;
    }
  }

  caption {
    display: inline-block;
    background: #f2f8f8;
    padding: 10px;
    border-radius: $border-radius;
    color: $regular-text;
  }
}
</style>
