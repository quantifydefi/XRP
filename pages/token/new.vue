<template>
  <div>
    <v-row no-gutters justify="center">
      <v-col cols="11">
        <v-row>
          <v-col><v-card tile outlined height="200"> </v-card> </v-col>

          <v-col><v-card tile outlined height="200"></v-card></v-col>
          <v-col><v-card tile outlined height="200"></v-card></v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
@Component({
  name: 'New',
  computed: {
    ...mapState({
      // TODO: Add models for UI types
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class New extends Vue {}
</script>

<style scoped></style>
