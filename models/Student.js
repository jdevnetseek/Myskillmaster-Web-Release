import { get } from 'lodash'
import Model from '@/models/Model'
import IMAGE from '@/utils/Image'

export default class Student extends Model {
  resource() {
    return 'students'
  }

  get name() {
    return this.first_name && this.last_name
      ? `${this.first_name} ${this.last_name}`.trim()
      : this.email
  }

  get avatarUrl() {
    return this.avatar
      ? IMAGE.url(this.avatar)
      : this.avatar_permanent_thumb_url || this.avatar_permanent_url
  }

  get addressLabel() {
    return get(this, 'address.formatted_address', 'NA')
  }
}
