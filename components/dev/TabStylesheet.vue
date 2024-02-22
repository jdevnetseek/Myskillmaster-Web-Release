<template>
  <div class="tab-stylesheet">
    <h5 class="mb-4">
      Tabs
    </h5>
    <v-tabs v-model="tabIndex" height="40" class="mb-4">
      <v-tab v-for="(tab, index) in tabs" :key="index" :ripple="false">
        {{ tab }}
      </v-tab>
    </v-tabs>
    <v-card>
      <v-card-text>
        <v-tabs-items v-model="tabIndex">
          <v-tab-item
            v-for="(tab, index) in tabs"
            :key="index"
            :transition="false"
            class="text-center"
          >
            <label>This is the {{ tab }} tab's content</label>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Tab Stylesheet
 * ==================================================================================
 **/

export default {
  name: 'TabStylesheet',
  data() {
    return {
      tabIndex: null,
      tabs: ['Active', 'Draft', 'Closed']
    }
  }
}
</script>
<style scoped lang="scss">
.tab-stylesheet {
  //
}
</style>
