<template>
  <div class="typography-page">
    <v-row>
      <NavWithTitle class="mb-4">
        <h5>Typography</h5>
      </NavWithTitle>
    </v-row>
    <v-card class="typography-page__list">
      <v-card-text>
        <template v-for="(t, index) in typography">
          <div :key="index" class="typography-page__typo text-left">
            <component :is="t.dom" :ref="t.dom" :href="t.dom === 'a'">
              {{ t.label }}
            </component>
          </div>
          <v-divider
            v-if="index !== typography.length - 1"
            :key="'divider-' + index"
          />
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Typography page
 * ==================================================================================
 **/

import NavWithTitle from '@/components/global/Nav/NavWithTitle'

export default {
  name: 'TypographyPage',
  components: {
    NavWithTitle
  },
  middleware: ['dev'],
  auth: false,
  data() {
    return {
      typography: [
        { dom: 'h1', label: 'Heading 1' },
        { dom: 'h2', label: 'Heading 2' },
        { dom: 'h3', label: 'Heading 3' },
        { dom: 'h4', label: 'Heading 4' },
        { dom: 'h5', label: 'Heading 5' },
        { dom: 'h6', label: 'Heading 6' },
        { dom: 'p', label: 'Paragraph' },
        { dom: 'label', label: 'Label' },
        { dom: 'caption', label: 'Caption' },
        { dom: 'a', label: 'Anchor' }
      ]
    }
  },
  head() {
    return {
      title: 'Typography | '
    }
  },
  mounted() {
    this.initTypoStyles()
  },

  methods: {
    /**
     * Display CSS styles on typography elements
     * below each elements
     */
    initTypoStyles() {
      const typos = document.querySelectorAll('.typography-page__typo > *')
      typos.forEach((elem) => {
        const styles = window.getComputedStyle(elem)
        const css = document.createElement('caption')
        css.innerHTML =
          'Family: ' +
          styles.getPropertyValue('font-family') +
          ' | Size: ' +
          styles.getPropertyValue('font-size') +
          ' | Line height: ' +
          styles.getPropertyValue('line-height') +
          ' | Weight: ' +
          styles.getPropertyValue('font-weight')

        elem.parentNode.append(css)
      })
    }
  }
}
</script>
<style scoped lang="scss">
.typography-page {
  .typography-page__list {
    margin-bottom: 30px;
  }

  ::v-deep .typography-page__typo {
    margin: 10px 0;

    > * {
      margin-bottom: 0;
    }

    > *:nth-child(1) {
      display: block;
      margin: 0;
    }

    caption {
      display: block;
      text-align: left;
      font-family: 'Arial';
    }
  }
}
</style>
