import { capitalize } from '@/utils/Helpers'
import {
  REMOTE_OPTION_AVAILABLE,
  REMOTE_OPTION_UNAVAILABLE
} from '@/utils/enums/RemoteOption'
import PRICE from '@/utils/Price'
import IMAGE from '@/utils/Image'
import Model from '@/models/Model'
import Master from '@/models/Master'

export default class Lesson extends Model {
  resource() {
    return 'lessons'
  }

  relations() {
    return {
      master_profile: Master
    }
  }

  get banner() {
    return this.hasBannerImage
      ? IMAGE.url(this.cover_photo[0], true)
      : require('@/assets/logo-text-white.svg')
  }

  get durations() {
    return (this.lesson_schedules || []).map(
      schedule => schedule.lesson_duration || schedule.duration_in_hours
    )
  }

  get duration() {
    const hasRange = this.maxDuration !== this.minDuration
    return hasRange
      ? `${this.minDuration}-${this.maxDuration}`
      : this.minDuration
  }

  get maxDuration() {
    return this.durations.length ? Math.max(...this.durations) : 0
  }

  get minDuration() {
    return this.durations.length ? Math.min(...this.durations) : 0
  }

  durationLabel(short = false) {
    return !this.maxDuration && !this.minDuration
      ? 'NA'
      : `${this.duration} ${short ? 'hr' : 'hour'}${
          this.maxDuration > 1 ? 's' : ''
        }`
  }

  get tagsLabel() {
    const tags = Array.isArray(this.tags) ? [...this.tags] : ['NA']
    return tags.map(tag => capitalize(tag)).join(', ')
  }

  get priceLabel() {
    return `${PRICE.formatWithComma(this.lesson_price)}`
  }

  get removeOptionLabel() {
    return this.is_remote_supported
      ? REMOTE_OPTION_AVAILABLE.label
      : REMOTE_OPTION_UNAVAILABLE.label
  }

  get remoteLabel() {
    return this.is_remote_supported
      ? 'Remote supported'
      : 'Remote not supported'
  }

  get addressLabel() {
    return (
      [this.suburb, this.postcode, this.state].filter(a => !!a).join(', ') ||
      'NA'
    )
  }

  hasBannerImage() {
    return this.cover_photo && this.cover_photo.length > 0
  }
}
