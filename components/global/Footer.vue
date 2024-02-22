<template>
  <div class="footer">
    <div class="footer__border">
      <v-row>
        <v-col
          v-for="(group, index) in navItems"
          :key="index"
          cols="12"
          sm="12"
          md="12"
          lg="3"
        >
          <v-list-item class="footer__item">
            <v-list-item-content class="footer__item__content">
              <v-list-item-title>
                <p v-if="group.name" class="text-body-2 font-weight-bold">
                  {{ group.name }}
                </p>
              </v-list-item-title>
              <v-list-item-subtitle
                v-for="(item, itemIndex) in group.items"
                :key="itemIndex"
              >
                <p
                  class="text-subtitle-2"
                  @click="
                    $router.push({
                      name: item.to,
                    })
                  "
                >
                  {{ item.label }}
                </p>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col class="footer__contact" cols="12" sm="12" md="12" lg="3">
          <v-list-item>
            <v-list-item-content class="footer__item__content">
              <v-list-item-title>
                <p class="text-body-2 font-weight-bold">
                  Contact support:
                </p>
              </v-list-item-title>
              <a
                href="mailto:admin@myskillmaster.com"
                class="text-body-2 white--text mb-4"
              >
                admin@myskillmaster.com
              </a>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="3">
          <v-list-item>
            <v-list-item-content class="footer__item__content">
              <v-list-item-title class="footer__item__logo-container">
                <v-img
                  class="footer__item__logo-img"
                  width="100%"
                  :src="require('@/assets/footer-logo.svg')"
                  contain
                />
              </v-list-item-title>
              <p class="text-body-2">
                Myskillmaster is an online learning platform for community
                members to learn, to teach and to have fun.
              </p>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center white--text">
          © {{ $store.getters['appName'] }}. 2023
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Footer
 * ==================================================================================
 **/

export default {
  computed: {
    navItems() {
      return [
        {
          name: '',
          items: [
            {
              label: 'Home',
              to: 'index'
            }
          ]
        },
        {
          name: '',
          items: [
            {
              label: 'Privacy Policy',
              to: 'privacy-policy'
            },
            {
              label: 'Terms & Conditions',
              to: 'terms-and-conditions'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
.footer {
  padding: 83px 0;
  background: #0a2127;

  p {
    font-family: 'Lato', sans-serif !important;
    color: #ffffff;
  }

  &__border {
    max-width: 960px;
    margin: 0 auto;

    .row {
      > * {
        padding: 0;
      }
    }
  }

  &__item {
    ::v-deep &__content {
      padding: 0;

      .v-list-item__title {
      }

      .v-list-item__subtitle {
        p {
          color: #a3a7ae;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }
    }

    &__logo-container {
      margin-bottom: 14px;
    }

    &__logo-img {
      max-width: 127px;
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'lg')) {
  .footer {
    display: flex;
    align-items: center;

    &__border {
      width: 80%;
      margin: 0 auto;
    }
  }
}

@media (min-width: map-get($grid-breakpoints, 'lg')) {
  // Move contact div to first on large screens
  .footer {
    &__contact {
      order: -1;
    }
  }
}
</style>
