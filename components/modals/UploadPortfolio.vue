<template>
  <!-- <v-dialog
    :value="value"
    content-class="view-image"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="view-image__border">
      <v-card-title class="view-image__title justify-space-between">
        <h6>View Content</h6>
        <v-btn fab icon class="view-image__close" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="view-image__content">
        <img v-if="url" :src="url">
      </v-card-text>
    </v-card>
  </v-dialog> -->
  <v-dialog
    :value="value"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-navigation-drawer>
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="settings__h6">
                Photo Library
              </v-list-item-title>
            </v-list-item-content>
            <v-icon> mdi-chevron-right </v-icon>
          </v-list-item>

          <v-divider />

          <v-list-item class="pl-0 py-3">
            <v-list-item-content>
              <v-list-item-title class="settings__h6">
                Take Photo
              </v-list-item-title>
            </v-list-item-content>
            <v-icon> mdi-chevron-right </v-icon>
          </v-list-item>

          <v-divider />

          <v-list-item class="pl-0 py-3">
            <v-list-item-content>
              <v-list-item-title class="settings__h6">
                Choose File
              </v-list-item-title>
            </v-list-item-content>
            <v-icon> mdi-chevron-right </v-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-dialog>
</template>

<script>
/**
 * ==================================================================================
 * Upload Portfolio options
 * ==================================================================================
 **/

export default {
  name: 'ViewImage',
  props: {
    value: {
      type: [Boolean],
      default: () => false
    }
  },

  data() {
    return {}
  },

  methods: {
    close() {
      this.$emit('input', null)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .view-image {
  width: auto;
  height: 100%;
  box-shadow: none;

  .view-image__border {
    .view-image__content {
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      flex-grow: 1;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
