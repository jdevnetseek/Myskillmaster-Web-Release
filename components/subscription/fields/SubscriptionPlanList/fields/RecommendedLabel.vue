<template>
  <div class="recommended-label flex-row justify-space-between align-center">
    <p class="text-body-2 font-weight-bold mb-0">
      {{ label }}
    </p>
    <v-icon color="white" class="ml-2" v-text="'$thumbsUp'" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Recommended Label
 * ==================================================================================
 **/

export default {
  props: {
    label: {
      type: String,
      default: 'Recommended'
    }
  }
}
</script>
<style scoped lang="scss">
.recommended-label {
  display: flex;
  background: #ffffff;
  padding: 0 10px;
  border-radius: $border-radius;

  p {
  }

  .v-icon {
    width: 15px;
    height: 10px;
  }
}
</style>
