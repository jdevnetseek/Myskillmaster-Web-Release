<template>
  <div class="button-stylesheet">
    <h5 class="mb-4">
      Buttons
    </h5>
    <v-card>
      <v-card-text>
        <v-row no-gutter>
          <v-col>
            <v-spacer />
          </v-col>
          <v-col md="auto">
            <v-select
              v-model="buttonColor"
              hide-details="auto"
              placeholder="Select here..."
              append-icon="mdi-chevron-down"
              class="text-capitalize"
              :items="buttonColors"
            />
          </v-col>
          <v-col md="auto">
            <v-select
              v-model="buttonSize"
              hide-details="auto"
              placeholder="Select here..."
              append-icon="mdi-chevron-down"
              :items="buttonSizes"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(attr, attrIndex) in buttonAttrs"
            :key="'col-' + attrIndex"
            cols="auto"
          >
            <v-btn v-bind="attr">
              <template v-if="attr.fab || attr.icon">
                <v-icon>
                  mdi-square-edit-outline
                </v-icon>
              </template>
              <template v-if="attr.append">
                <v-icon left>
                  mdi-square-edit-outline
                </v-icon>
              </template>
              <template v-if="attr.append || (!attr.fab && !attr.icon)">
                Button
              </template>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <p class="text-subtitle mb-2">
          Checkbox
        </p>
        <v-row>
          <v-col
            v-for="(color, index) in buttonColors"
            :key="'col-' + index"
            cols="auto"
          >
            <v-checkbox
              v-model="checkboxValue"
              hide-details="auto"
              label="Option"
              :color="color.value"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <p class="text-subtitle mb-2">
          Radio
        </p>
        <v-row>
          <v-col
            v-for="(color, index) in buttonColors"
            :key="'col-' + index"
            cols="auto"
          >
            <v-radio-group v-model="checkboxValue">
              <v-radio
                hide-details="auto"
                label="Option"
                :color="color.value"
              />
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Button Stylesheet
 * ==================================================================================
 **/

const BUTTON_SIZES = [
  {
    text: 'Extra small',
    value: 'x-small'
  },
  {
    text: 'Small',
    value: 'small'
  },
  {
    text: 'Regular',
    value: null
  },
  {
    text: 'Large',
    value: 'large'
  },
  {
    text: 'Extra large',
    value: 'x-large'
  }
]
const BUTTON_COLORS = [
  {
    text: 'Primary',
    value: 'primary'
  },
  {
    text: 'Secondary',
    value: 'secondary'
  },
  {
    text: 'Success',
    value: 'success'
  },
  {
    text: 'Error',
    value: 'error'
  },
  {
    text: 'Warning',
    value: 'warning'
  }
]

export default {
  name: 'ButtonStylesheet',
  data() {
    return {
      buttonSize: null,
      buttonColor: 'primary',
      checkboxValue: true
    }
  },

  computed: {
    buttonAttrs() {
      return [
        {},
        { rounded: true },
        { append: true },
        { fab: true },
        { outlined: true },
        { outlined: true, rounded: true },
        { append: true, outlined: true },
        { outlined: true, fab: true },
        { plain: true },
        { icon: true }
      ].map((v) => {
        const newArr = { ...v }
        newArr.color = this.buttonColor
        newArr[this.buttonSize] = true
        return newArr
      })
    },

    buttonColors() {
      return BUTTON_COLORS
    },

    buttonSizes() {
      return BUTTON_SIZES
    }
  }
}
</script>
<style scoped lang="scss">
.button-stylesheet {
  //
}
</style>
