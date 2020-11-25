<template>
  <v-col>
    <v-avatar max-height="32" style="bottom: 8px">
      <v-img
        :src="tokenData.coinImage"
        :lazy-src="tokenData.coinImage"
        max-width="32"
        max-height="32"
      />
    </v-avatar>
    <span class="text-h4">{{ tokenData.name }} ({{ tokenData.symbol }})</span>
    <span class="text-h5 mx-2"
      >{{ tokenData.price_usd }} <span class="text-subtitle-1">USD</span
      ><span class="mx-2"></span>{{ tokenData.token_price.toFixed(4) }}
      <span class="text-subtitle-1"
        >ETH
        <span class="text-caption ml-1">
          ${{ tokenData.eth_price_usd.toFixed(4) }}/ETH</span
        ></span
      ></span
    >
    <span class="text-h6" :style="{ color: tokenData.percent24hColor }"
      >{{ tokenData.percent_change_24h }}%</span
    >
    <span class="text-caption">24h</span>
  </v-col>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Token } from '~/models/token'

@Component({ name: 'TokenHeader' })
export default class TokenHeader extends Vue {
  @Prop({ default: () => ({}) }) tokenData!: Token
}
</script>

<style scoped></style>
