<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="-1"
    right
    class="global-snackbar"
  >
    <div class="global-snackbar__content">
      {{ message }}
      <ErrorMessage
        v-if="list"
        display="list"
        :error="list"
        class="global-snackbar__list"
      />
    </div>
    <v-btn
      text
      class="global-snackbar__btn ml-2"
      @click.prevent="setVisibility(false)"
    >
      OK
    </v-btn>
  </v-snackbar>
</template>
<script>
/**
 * ==================================================================================
 * Global Snackbar
 * ==================================================================================
 **/
import { mapState, mapMutations } from 'vuex'
import SETTINGS from '@/utils/enums/Settings'
import ErrorMessage from '@/components/fields/ErrorMessage'

export default {
  components: {
    ErrorMessage
  },

  data() {
    return {
      show: false,
      timer: null
    }
  },

  computed: {
    ...mapState({
      message: state => state.snackbar.message,
      list: state => state.snackbar.list,
      color: state => state.snackbar.color
    })
  },

  watch: {
    show(value) {
      if (!value) {
        clearTimeout()
        this.reset()
      }
    },

    message(newValue, oldValue) {
      if (newValue) {
        this.setVisibility(true)
      } else {
        this.setVisibility(false)
      }
    }
  },

  methods: {
    ...mapMutations({
      setMessage: 'snackbar/setMessage',
      setList: 'snackbar/setList',
      setColor: 'snackbar/setColor'
    }),

    reset() {
      setTimeout(() => {
        this.setMessage(null)
        this.setList(null)
        this.setColor(null)
      }, 250)
    },

    /**
     * Create timer logic as v-snackbar `timeout` props
     * carries over to the next snackbar
     */
    setTimer(func) {
      clearTimeout(this.timer)
      this.timer = setTimeout(function() {
        func()
      }, SETTINGS.snackbar.timeout)
    },

    setVisibility(show) {
      this.$nextTick(() => {
        this.show = show

        if (show) {
          this.setTimer(() => {
            this.setVisibility(false)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.global-snackbar {
  @mixin color($color) {
    .v-snack__content {
      .global-snackbar__list,
      .global-snackbar__content {
        color: $color;
      }

      .global-snackbar__btn {
        span {
          color: $color;
        }
      }

      .v-messages__wrapper {
        .v-messages__message {
          color: $color;
        }
      }
    }
  }

  ::v-deep .v-snack__wrapper {
    @include color($regular-text);

    .v-snack__content {
      display: flex;
      flex-direction: row;

      .global-snackbar__btn {
        min-height: inherit;
        padding: inherit;
      }
    }
  }

  ::v-deep .v-snack__wrapper.red {
    @include color(#ffffff);
  }
}
</style>
