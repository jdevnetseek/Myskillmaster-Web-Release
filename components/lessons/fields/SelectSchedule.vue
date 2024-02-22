<template>
  <v-select
    class=""
    :value="value"
    :items="validItems"
    :label="placeholder"
    :loading="loading"
    :disabled="disabled"
    item-value="id"
    append-icon="mdi-chevron-down"
    v-bind="$attrs"
    @input="onChange"
  />
</template>
<script>
/**
 * ==================================================================================
 * Select Lesson Schedule/Slot
 * ==================================================================================
 **/

import LessonSchedule from '@/models/LessonSchedule'

export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    },

    placeholder: {
      type: String,
      default: 'Choose new time and date'
    },

    loading: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    schedules: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    validItems() {
      const items =
        this.schedules && this.schedules.length
          ? this.schedules.map((a) => {
            const schedule = new LessonSchedule(a)

            return {
              id: schedule.id,
              text: schedule.scheduleLabel,
              disabled: !schedule.is_available_for_enrollment
            }
          })
          : []

      return items
    }
  },

  methods: {
    onChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
