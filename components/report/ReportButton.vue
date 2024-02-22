<template>
  <v-btn
    class="report-btn"
    :to="reportRoute"
    fab
  >
    <v-icon class="report-btn__icon">
      $report
    </v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'ReportButton',
  props: {
    reportRoute: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .report-btn {
    background-color: rgba(10, 33, 39, 0.7) !important;
    color: white;
    width: 60px !important;
    height: 60px !important
  }

  @media (max-width: map-get($grid-breakpoints, 'md')) {
    .report-btn {
      width: 40px !important;
      height: 40px !important;
      min-height: 40px !important;

      &__icon {
        width: 16px !important;
      }
    }
  }
</style>
