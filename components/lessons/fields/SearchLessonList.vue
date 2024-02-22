<template>
  <div class="search-lesson-list">
    <Searchbar :has-icon="true" class="search-lesson-list__search mb-4" />
    <h5 v-if="currentSearch">
      {{ header }}
    </h5>
    <v-row class="search-lesson-list__list">
      <template v-if="!form.$busy">
        <template v-if="list.length > 0">
          <v-col
            v-for="(lesson, index) in list"
            :key="index"
            cols="6"
            md="4"
            lg="3"
          >
            <LessonCard
              :lesson="lesson"
              class="search-lesson-list__list__item"
              @click="
                $router.push({
                  name: 'lessons-slug',
                  params: {
                    slug: lesson.slug,
                  },
                })
              "
            />
          </v-col>
        </template>
        <template v-else>
          <div class="search-lesson-list__list__placeholder">
            <p class="mb-0">
              No lessons found
            </p>
          </div>
        </template>
      </template>
      <template v-else>
        <v-col v-for="n in skeletonCount" :key="n" cols="6" md="4" lg="3">
          <LessonCardSkeleton />
        </v-col>
      </template>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination
          v-model="meta.current_page"
          :length="meta.last_page"
          :page="meta.from"
          :disabled="form.$busy"
          :total-visible="settings.pagination.totalVisiblePageNumber"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Search Lesson List
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import SETTINGS from '@/utils/enums/Settings'
import Searchbar from '@/components/global/Searchbar'
import LessonCard from '@/components/lessons/cards/LessonCard'
import LessonCardSkeleton from '@/components/lessons/cards/LessonCardSkeleton'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    Searchbar,
    LessonCard,
    LessonCardSkeleton
  },
  mixins: [SnackbarMixin],
  props: {
    limit: {
      type: Number,
      default: SETTINGS.pagination.itemsPerPage
    },

    include: {
      type: Array,
      default: () => ['cover', 'user.masterProfile', 'user.address']
    },

    skeletonCount: {
      type: Number,
      default: 4,
      validator(value) {
        return value > 0
      }
    }
  },

  data() {
    return {
      currentSearch: ''
    }
  },

  computed: {
    settings() {
      return SETTINGS
    },

    ...mapState({
      form: state => state.lesson.listing,
      list: state => state.lesson.list,
      meta: state => state.lesson.listMeta
    }),

    header() {
      return `Search results for '${this.currentSearch}'`
    }
  },

  watch: {
    'meta.current_page'(n) {
      this.fetch(this.meta.current_page)
    }
  },

  mounted() {
    this.$root.$on('search', () => {
      this.fetch(1, true)
    })

    this.fetch(1, true)
  },

  methods: {
    async fetch(page = null, initial = false) {
      if (this.form.$busy) {
        return
      }

      this.form.$clearErrors()
      this.currentSearch = this.form.search

      const params = {
        include: this.include,
        page: page || 1,
        limit: this.limit,
        search: this.currentSearch
      }

      await this.$store.dispatch('lesson/getList', params).then(() => {
        if (this.form.$hasErrors()) {
          this.showSnackbar(this.form.$errorMessage, false)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.search-lesson-list {
  &__search {
    display: none;
  }

  &__list {
    margin-top: 30px;

    &__item {
      cursor: pointer;
    }

    &__placeholder {
      margin: 40px auto;

      > * {
        font-style: italic;
      }
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'lg')) {
  .search-lesson-list {
    &__list {
      margin-bottom: 50px;
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .search-lesson-list {
    &__search {
      display: block;
    }

    &__list {
      margin-top: 10px;
      margin-bottom: 0;
    }
  }
}
</style>
