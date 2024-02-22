import SETTINGS from '@/utils/enums/Settings'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      timer: null,
      delay: 0
    }
  },

  computed: {
    /**
     * Required to be overwritten on component
     */
    timerResetDispatch() {
      return ''
    },
    timerCookieCode() {
      return ''
    }
  },

  created() {
    this.startTimer()
  },

  methods: {
    startTimer() {
      if (!this.timerResetDispatch || !this.timerCookieCode) {
        return console.warn(
          '[Mixin] Rate Limit Timer: Missing `timerResetDispatch` and `timerCookieCode` values'
        )
      }

      if (this.checkTimer()) {
        this.timer = setTimeout(() => {
          this.startTimer()
        }, 1000)
      } else {
        this.$store.commit(this.timerResetDispatch)
        this.timer = null
        this.delay = 0
      }
    },

    checkTimer() {
      this.delay = this.getCurrentDelayTime()
      if (this.delay) {
        return true
      }

      return false
    },

    getCurrentDelayTime() {
      const currentCodeTimer = Cookies.get(this.timerCookieCode)
      if (currentCodeTimer) {
        return Math.max(
          SETTINGS.notification.rateLimit -
            Math.round(
              (new Date().getTime() - new Date(currentCodeTimer).getTime()) /
                1000
            ),
          0
        )
      }

      return 0
    }
  }
}
