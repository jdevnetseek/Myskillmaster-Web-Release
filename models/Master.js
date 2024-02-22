import { get } from 'lodash'
import { capitalize } from '@/utils/Helpers'
import IMAGE from '@/utils/Image'
import Model from '@/models/Model'

export default class Master extends Model {
  resource() {
    return 'masters'
  }

  get name() {
    if (this.full_name) {
      return this.full_name
    }

    return this.first_name && this.last_name
      ? `${this.first_name} ${this.last_name}`.trim()
      : this.email
  }

  get avatarUrl() {
    return this.avatar
      ? IMAGE.url(this.avatar)
      : this.avatar_permanent_thumb_url || this.avatar_permanent_url
  }

  get coverPhoto() {
    return get(this, 'master_details.portfolio', [])
  }

  get addressLabel() {
    return get(this, 'address.formatted_address', 'NA')
  }

  get languagesLabel() {
    return get(this, 'master_details.languages', ['NA'])
      .map(language => capitalize(language))
      .join(', ')
  }
}
