<template>
  <div class="table-stylesheet">
    <v-row class="mb-4">
      <v-col>
        <h5>Table</h5>
      </v-col>
      <v-col class="hidden-md-and-down">
        <v-spacer />
      </v-col>
      <v-col cols="12" md="auto" class="text-right">
        <v-switch
          v-model="tableLoading"
          hide-details
          color="primary"
          label="Toggle loading"
          class="my-0"
        />
      </v-col>
    </v-row>
    <v-card>
      <v-card-text>
        <p class="text-subtitle mb-2">
          Simple table
        </p>
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="tableHeader"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :items="tableLoading ? new Array({}) : tableData"
              :server-items-length="tableLoading ? 3 : tableData.length"
              :hide-default-footer="true"
            >
              <template v-if="!tableLoading" #[`item.action`]>
                <v-icon @click="clicked">
                  mdi-square-edit-outline
                </v-icon>
                <v-icon @click="clicked">
                  mdi-trash-can-outline
                </v-icon>
              </template>
              <template v-else #item>
                <TableRowLoader
                  v-for="(n, index) in 3"
                  :key="index"
                  :col="tableHeader.length"
                />
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-pagination v-model="page" :length="4" :disabled="tableLoading" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <p class="text-subtitle mt-7 mb-4">
      Simple table (Outside v-card)
    </p>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="tableHeader"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :items="tableLoading ? new Array({}) : tableData"
          :server-items-length="tableLoading ? 3 : tableData.length"
          :hide-default-footer="true"
        >
          <template v-if="!tableLoading" #[`item.action`]>
            <v-icon @click="clicked">
              mdi-square-edit-outline
            </v-icon>
            <v-icon @click="clicked">
              mdi-trash-can-outline
            </v-icon>
          </template>
          <template v-else #item>
            <TableRowLoader
              v-for="(n, index) in 3"
              :key="index"
              :col="tableHeader.length"
            />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination v-model="page" :length="4" :disabled="tableLoading" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Table Stylesheet
 * ==================================================================================
 **/

import TableRowLoader from '@/components/common/TableRowLoader'

export default {
  name: 'TableStylesheet',
  components: {
    TableRowLoader
  },
  data() {
    return {
      page: 1,
      sortBy: null,
      sortDesc: null,
      sortBy2: null,
      sortDesc2: null,

      tableLoading: false,
      tableHeader: [
        {
          text: 'Order No.',
          value: 'order_no',
          sortable: true
        },
        {
          text: 'Purchaser',
          value: 'purchaser',
          sortable: true
        },
        {
          text: 'Registration',
          value: 'registration',
          sortable: true
        },
        {
          text: 'Products',
          value: 'products',
          sortable: true
        },
        {
          text: 'Redeemed',
          value: 'redeemed',
          sortable: true
        },
        {
          text: 'Phone',
          value: 'phone_number',
          sortable: true
        },
        {
          text: 'Email',
          value: 'email',
          sortable: true
        },
        {
          text: null,
          value: 'action',
          sortable: false
        }
      ]
    }
  },

  computed: {
    tableData() {
      return new Array(3).fill({
        order_no: '#1234',
        purchaser: 'John Doe',
        registration: 'Completed',
        products: '10',
        redeemed: '8',
        phone_number: '0123 456 789',
        email: 'john.doe@gmail.com',
        action: null
      })
    }
  },

  watch: {
    page(curr, old) {
      this.tableLoading = true
      setTimeout(() => {
        this.tableLoading = false
      }, 500)
    }
  },

  methods: {
    clicked() {
      //
    }
  }
}
</script>
<style scoped lang="scss">
.table-stylesheet {
  //
}
</style>
