<template>
  <v-text-field
    class="password-field"
    :type="type"
    :value="value"
    v-bind="$attrs"
    @input="onChange"
    @keydown.enter.prevent="onEnter"
  >
    <v-icon slot="append" class="password-field__toggle icon" @click="toggle">
      {{ icon }}
    </v-icon>
  </v-text-field>
</template>
<script>
/**
 * ==================================================================================
 * Password Field
 * ==================================================================================
 **/

export default {
  props: {
    value: {
      type: String,
      default: null
    },

    onEnter: {
      type: Function,
      default: () => {}
    }
  },

  data() {
    return {
      show: false
    }
  },

  computed: {
    icon() {
      return this.show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
    },

    type() {
      return this.show ? 'text' : 'password'
    }
  },

  methods: {
    toggle() {
      this.show = !this.show
    },

    onChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.password-field {
  &__toggle {
    cursor: pointer;
  }
}
</style>
