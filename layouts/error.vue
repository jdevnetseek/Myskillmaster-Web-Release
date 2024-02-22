<template>
  <v-container
    fluid
    fill-height
    class="error-layout justify-center align-center flex-column"
  >
    <template v-if="error.statusCode === 404">
      <h1>
        {{ pageNotFound }}
      </h1>
      <h5>Not Found</h5>
      <h6 class="error-layout__content">
        The page you were looking for does not exist
      </h6>
    </template>
    <template v-else>
      <h4>
        {{ otherError }}
      </h4>
    </template>
    <v-btn color="primary" class="error-layout__btn" to="/">
      Go home
    </v-btn>
  </v-container>
</template>
<script>
/**
 * ==================================================================================
 * Error Layout
 * ==================================================================================
 **/

export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title: `${title} | `
    }
  }
}
</script>
<style scoped lang="scss">
.error-layout {
  a {
    font-weight: 600;
  }

  &__content {
    max-width: 450px;
    text-align: center;
    font-weight: 300;
    color: $secondary-text;
    margin-top: 20px;
  }

  &__btn {
    width: 100%;
    max-width: 200px;
    margin-top: 30px;
  }
}
</style>
