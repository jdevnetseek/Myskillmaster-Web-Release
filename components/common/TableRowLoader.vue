<template>
  <tr class="table-row-loader">
    <td v-for="(c, index) in col" :key="'col-' + index" class="pl-0">
      <v-skeleton-loader type="list-item" transition="fade-transition" />
    </td>
  </tr>
</template>
<script>
/**
 * ==================================================================================
 * Table row loader
 * ==================================================================================
 **/

export default {
  name: 'TableRowLoader',
  props: {
    col: {
      type: Number,
      default: 5
    }
  }
}
</script>
<style scoped lang="scss">
.table-row-loader {
  pointer-events: none;
}
</style>
