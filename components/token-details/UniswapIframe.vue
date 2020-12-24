<template>
  <v-card class="mb-2" height="100%" tile outlined>
    <iframe
      id="myId"
      :src="`https://app.uniswap.org/#/swap?theme=${ui.theme}&outputCurrency=${quoteToken}`"
      height="730px"
      width="100%"
      style="
        background-color: black;
        border: 0;
        margin: 0 auto;
        display: block;
        border-radius: 10px;
        max-width: 600px;
      "
    />
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  name: 'UniswapIframe',
  computed: {
    ...mapState({
      // TODO: Add models for UI types
      ui: (state: any) => state.ui,
    }),
  },
})
export default class UniswapIframe extends Vue {
  @Prop({ default: () => '' }) readonly quoteToken!: string
}
</script>

<style scoped></style>
