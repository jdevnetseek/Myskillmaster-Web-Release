<template>
  <div class="components">
    <v-row no-gutter>
      <v-col cols="12">
        <HeaderStylesheet />
      </v-col>
      <v-col cols="12">
        <v-divider />
      </v-col>
      <v-col cols="12">
        <ButtonStylesheet />
      </v-col>
      <v-col cols="12">
        <v-divider />
      </v-col>
      <v-col cols="12">
        <ModalStylesheet />
      </v-col>
      <v-col cols="12">
        <v-divider />
      </v-col>
      <v-col cols="12">
        <TextfieldStylesheet />
      </v-col>
      <v-col cols="12">
        <v-divider />
      </v-col>
      <v-col cols="12">
        <FileUploadStylesheet />
      </v-col>
      <v-col cols="12">
        <v-divider />
      </v-col>
      <v-col cols="12">
        <TabStylesheet />
      </v-col>
      <v-col cols="12">
        <v-divider />
      </v-col>
      <v-col cols="12">
        <TableStylesheet />
      </v-col>
    </v-row>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Components page
 * ==================================================================================
 **/

import HeaderStylesheet from '@/components/dev/HeaderStylesheet'
import ButtonStylesheet from '@/components/dev/ButtonStylesheet'
import TextfieldStylesheet from '@/components/dev/TextfieldStylesheet'
import TabStylesheet from '@/components/dev/TabStylesheet'
import FileUploadStylesheet from '@/components/dev/FileUploadStylesheet'
import ModalStylesheet from '@/components/dev/ModalStylesheet'
import TableStylesheet from '@/components/dev/TableStylesheet'

export default {
  name: 'ComponentsPage',
  components: {
    HeaderStylesheet,
    ButtonStylesheet,
    TextfieldStylesheet,
    TabStylesheet,
    FileUploadStylesheet,
    ModalStylesheet,
    TableStylesheet
  },
  middleware: ['dev'],
  auth: false,
  head() {
    return {
      title: 'Components | '
    }
  }
}
</script>
<style scoped lang="scss">
.components {
  .components__title {
    margin-bottom: 15px;
  }
}
</style>
