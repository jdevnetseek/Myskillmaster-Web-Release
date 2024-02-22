import {
  required,
  maxLength,
  maxValue,
  minValue
} from 'vuelidate/lib/validators'

export const lessonForm = {
  title: {
    required,
    maxLength: maxLength(255)
  },
  lesson_price: {
    required
  },
  description: {
    required,
    maxLength: maxLength(500)
  },
  category_id: {
    required
  },
  is_remote_supported: {
    required,
    minValue: minValue(0),
    maxValue: maxValue(1)
  },
  cover_photo: {
    required
  },
  tags: {
    required
  },
  lesson_schedules: {
    required
  },
  suburb: {
    required
  },
  postcode: {
    required
  },
  state: {
    required
  },
  address_or_link: {
    required
  }
}
