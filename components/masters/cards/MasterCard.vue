<template>
  <div class="master-card">
    <div class="master-card__border">
      <div
        class="master-card__header"
        :class="{
          'master-card__header--no-banner': !hasBannerImage,
        }"
        :style="{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: hasBannerImage ? 'cover' : 'auto',
        }"
      >
        <Avatar
          :avatar="masterObj.avatarUrl"
          :size="56"
          class="master-card__header__avatar"
        />
      </div>
      <div class="master-card__content">
        <h6>{{ masterObj.full_name || 'NA' }}</h6>
        <caption>
          {{
            masterObj.addressLabel
          }}
        </caption>
        <div class="master-card__content__categories d-flex">
          <div
            v-for="(tag, index) in masterObj.posted_lesson_categories"
            :key="index"
          >
            <caption>
              {{
                tag.label
              }}
            </caption>
          </div>
        </div>
        <Rating
          v-if="hasRating"
          class="mt-1"
          :total="masterObj.no_of_reviews"
          :average="masterObj.average_rating"
        />
      </div>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Master Card
 * ==================================================================================
 **/

import IMAGE from '@/utils/Image'
import Master from '@/models/Master'
import Avatar from '@/components/common/Avatar'
import DragOrClickMixin from '@/utils/mixins/DragOrClick'
import Rating from '@/components/common/Rating'

export default {
  components: {
    Avatar,
    Rating
  },
  mixins: [DragOrClickMixin],
  props: {
    master: {
      type: [Master, Object],
      required: true
    },

    hasRating: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    masterObj() {
      return this.master instanceof Master
        ? this.master
        : new Master(this.master)
    },

    banner() {
      return this.hasBannerImage
        ? IMAGE.url(this.masterObj.coverPhoto[0], true)
        : require('@/assets/logo-text-white.svg')
    },

    hasBannerImage() {
      return this.masterObj.coverPhoto.length > 0
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    /**
     * Bind click event on carousel, we are manually checking the drag OR click
     * event as the carousel library doesn't provide `is dragging` checker
     */
    init() {
      this.dragOrClick(this.$el)
    }
  }
}
</script>
<style scoped lang="scss">
$cardRadius: 8px;
.master-card {
  border-radius: $cardRadius;
  background: #ffffff;
  box-shadow: $card-box-shadow;

  &__border {
    padding: 5px;
  }

  $avatarSize: 56px;
  &__header {
    position: relative;
    height: 102px;
    border-top-right-radius: $cardRadius;
    border-top-left-radius: $cardRadius;
    margin-bottom: $avatarSize / 2;
    background: #fafafa;

    &--no-banner {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $primary;
    }

    &__avatar {
      position: absolute;
      left: 5px;
      bottom: ($avatarSize / 2) * -1;
      border-radius: 50%;
      border: 2px solid #ffffff;
    }
  }

  &__content {
    padding: 10px 5px 5px 5px;

    > h6 {
      @include wrap-text-ellipsis(1);
    }

    > caption {
      display: flex;
      text-align: left;
      color: #46676a;

      @include wrap-text-ellipsis(1, 18px);
    }

    &__categories {
      min-height: 22px;
      margin-top: 5px;
      overflow-x: scroll;

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      &::-webkit-scrollbar {
        display: none;
      }

      > * {
        padding: 2px 15px;
        background: #f3f5f5;
        border-radius: 50px;

        &:not(:last-child) {
          margin-right: 5px;
        }

        caption {
          display: block;
          text-align: left;
          white-space: nowrap;
          color: #46676a;
        }
      }
    }
  }
}
</style>
