<template>
  <div class="textfield-stylesheet">
    <h5 class="mb-4">
      Textfields
    </h5>
    <v-card>
      <v-card-text>
        <v-row no-gutter>
          <v-col><v-spacer /></v-col>
          <v-col md="auto" class="text-right">
            <v-switch
              v-model="textfieldError"
              hide-details
              color="error"
              label="Toggle error"
            />
          </v-col>
        </v-row>
        <p class="text-subtitle mb-2">
          Text Field
        </p>
        <v-row>
          <v-col v-for="(attr, index) in textfieldAttrs" :key="index" cols="4">
            <v-text-field
              v-bind="attr"
              hide-details="auto"
              label="Text"
              :error-messages="error"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <p class="text-subtitle mb-2">
          Password Field
        </p>
        <v-row>
          <v-col v-for="(attr, index) in textfieldAttrs" :key="index" cols="4">
            <PasswordField
              v-bind="attr"
              hide-details="auto"
              label="Password"
              :error-messages="error"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <p class="text-subtitle mb-2">
          Select Field
        </p>
        <v-row>
          <v-col v-for="(attr, index) in textfieldAttrs" :key="index" cols="4">
            <v-select
              v-bind="attr"
              hide-details="auto"
              label="Select here..."
              append-icon="mdi-chevron-down"
              :items="['Option 1', 'Option 2', 'Option 3']"
              :error-messages="error"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <p class="text-subtitle mb-2">
          Multi-Select Field
        </p>
        <v-row>
          <v-col v-for="(attr, index) in textfieldAttrs" :key="index" cols="4">
            <v-select
              v-bind="attr"
              multiple
              hide-details="auto"
              label="Select here..."
              append-icon="mdi-chevron-down"
              :items="['Option 1', 'Option 2', 'Option 3']"
              :error-messages="error"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <p class="text-subtitle mb-2">
          Combo box
        </p>
        <v-row>
          <v-col v-for="(attr, index) in textfieldAttrs" :key="index" cols="4">
            <v-combobox
              v-bind="attr"
              hide-details="auto"
              label="Text"
              append-icon="mdi-chevron-down"
              :items="['Option 1', 'Option 2', 'Option 3']"
              :error-messages="error"
            />
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <p class="text-subtitle mb-2">
          Date/Time picker
        </p>
        <v-row>
          <v-col cols="6">
            <DatetimePicker
              v-model="date"
              :less-than="date2"
              outlined
              single-line
              hide-details="auto"
              label="Date"
              :error-messages="error"
            />
          </v-col>
          <v-col cols="6">
            <DatetimePicker
              v-model="time"
              :time-date="date"
              :less-than="fullDate2"
              outlined
              single-line
              hide-details="auto"
              type="time"
              label="Time"
              :disabled="!date"
              :error-messages="error"
            />
          </v-col>
          <v-col cols="12 py-0">
            <p class="font-italic text-center text-caption mb-0">
              Must be greater than
            </p>
          </v-col>
          <v-col cols="6">
            <DatetimePicker
              v-model="date2"
              :greater-than="date"
              outlined
              single-line
              hide-details="auto"
              label="Date"
              :disabled="!date || !time"
              :error-messages="error"
            />
          </v-col>
          <v-col cols="6">
            <DatetimePicker
              v-model="time2"
              :time-date="date2"
              :greater-than="fullDate"
              outlined
              single-line
              hide-details="auto"
              type="time"
              label="Time"
              :disabled="!date2 || !date || !time"
              :error-messages="error"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Textfield Stylesheet
 * ==================================================================================
 **/

import FORMAT from '@/utils/enums/Format'
import DATE from '@/utils/Date'
import PasswordField from '@/components/fields/PasswordField'
import DatetimePicker from '@/components/fields/DatetimePicker'

export default {
  name: 'TextfieldStylesheet',
  components: {
    PasswordField,
    DatetimePicker
  },
  data() {
    return {
      textfieldError: false,
      textfieldAttrs: [
        { flat: true, outlined: true },
        // { flat: true },
        {
          outlined: true,
          'prepend-inner-icon': 'mdi-numeric-1-box'
        },
        { flat: true, filled: true, rounded: true }
        // { flat: true, 'prepend-inner-icon': 'mdi-numeric-2-box' }
      ],

      date: null,
      time: null,
      date2: null,
      time2: null
    }
  },

  computed: {
    fullDate() {
      return this.combineDate(this.date, this.time)
    },

    fullDate2() {
      return this.combineDate(this.date2, this.time2)
    },

    error() {
      return this.textfieldError ? ['Field is required'] : null
    }
  },

  methods: {
    combineDate(date, time) {
      return new Date(
        `${DATE.format(date || new Date(), FORMAT.dateFormat)} ${DATE.format(
          time || new Date(),
          FORMAT.timeFormat
        )}`
      )
    }
  }
}
</script>
<style scoped lang="scss">
.textfield-stylesheet {
  //
}
</style>
