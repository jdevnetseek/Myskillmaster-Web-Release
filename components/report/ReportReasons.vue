<template>
  <div class="report-reasons">
    <div
      v-if="isLoading"
      class="d-flex justify-center my-7"
    >
      <v-progress-circular indeterminate color="primary" />
    </div>
    <ul v-else class="report-reasons__list">
      <li
        v-for="(reason) in reportReasons"
        :key="reason.value"
        class="report-reasons__list-item"
      >
        <SelectableListCheckbox
          v-model="selected"
          :label="reason.label"
          :input-value="reason.id"
          class="mb-4"
        />
      </li>
    </ul>
  </div>
</template>
<script>

import SelectableListCheckbox from '@/components/fields/SelectableListCheckbox'
import SnackbarMixin from '@/utils/mixins/Snackbar'
export default {
  name: 'ReportReasons',

  components: {
    SelectableListCheckbox
  },

  mixins: [SnackbarMixin],

  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },

  data() {
    return {
      isLoading: false,
      reportReasons: []
    }
  },

  computed: {
    selected: {
      get() {
        return this.value
      },
      set(items) {
        this.$emit('input', items)
      }
    }
  },

  mounted() {
    this.getReportReasons()
  },

  methods: {
    async getReportReasons() {
      this.isLoading = true
      try {
        const response = await this.$axios.$get('/report/categories?filter[type]=lessons')
        this.reportReasons = response.data
      } catch (err) {
        this.showSnackbar(
          'Cannot get report categories',
          false
        )
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.report-reasons {
  &__list {
    padding-left: 0;
  }

  &__list-item {
    list-style-type: none;
  }
}
</style>
