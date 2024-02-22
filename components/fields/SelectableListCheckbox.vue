<template>
  <div
    class="selectable-list-item d-flex flex-row align-center"
    :class="{
      'selectable-list-item--selected': isActive,
    }"
    @click.self="toggleCheckbox"
  >
    <v-checkbox
      ref="checkbox"
      v-model="model"
      class="ma-0"
      color="primary"
      :value="inputValue"
      multiple
      hide-details
    >
      <template #label>
        <span class="selectable-list-item__checkbox-label">
          {{ label }}
        </span>
      </template>
    </v-checkbox>
  </div>
</template>
<script>
export default {
  name: 'SelectableListCheckbox',
  props: {
    label: {
      type: String,
      required: true
    },
    inputValue: {
      type: [String, Number],
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    isActive() {
      return this.value.includes(this.inputValue)
    },
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    toggleCheckbox() {
      const index = this.model.indexOf(this.inputValue)
      if (index === -1) {
        this.model.push(this.inputValue)
      } else {
        this.model.splice(index, 1)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.selectable-list-item {
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;

  &--selected {
    border-color: $primary;
  }

  &__checkbox-label {
    color: $regular-text;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  }
}

</style>
