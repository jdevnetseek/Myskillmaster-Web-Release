<template>
  <div class="header-stylesheet">
    <v-row>
      <NavWithTitle>
        <div class="d-flex flex-column">
          <h5 class="mb-2">
            Page header
          </h5>
          <label class="font-color-secondary text-body-2">{{
            subheader
          }}</label>
        </div>
      </NavWithTitle>

      <v-col class="hidden-md-and-down">
        <v-spacer />
      </v-col>
      <v-col cols="12" md="auto">
        <v-text-field
          flat
          hide-details="auto"
          solo
          rounded
          clearable
          background-color="grey lighten-2"
          label="Placeholder"
          prepend-inner-icon="$magnifyingGlass"
          class="v-text-field--search"
        />
      </v-col>
      <v-col cols="12" md="auto" class="text-right">
        <v-btn color="primary" depressed>
          <v-icon left>
            mdi-tray-arrow-down
          </v-icon>
          Button
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Header Stylesheet
 * ==================================================================================
 **/

import DATE from '@/utils/Date'
import NavWithTitle from '@/components/global/Nav/NavWithTitle'

export default {
  name: 'HeaderStylesheet',
  components: {
    NavWithTitle
  },

  computed: {
    subheader() {
      const formattedDate = DATE.format(new Date())
      return `${formattedDate} - ${formattedDate}`
    }
  }
}
</script>
<style scoped lang="scss">
.header-stylesheet {
  //
}
</style>
