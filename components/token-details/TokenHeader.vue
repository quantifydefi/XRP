<template>
  <v-row>
    <v-col cols="12">
      <v-avatar
        max-height="32"
        style="bottom: 6px"
        class="mx-0"
        min-width="32"
        width="32"
      >
        <v-img
          :src="tokenData.coinImage(tokenData.token0_id)"
          :lazy-src="tokenData.coinImage(tokenData.token0_id)"
          max-width="32"
          max-height="32"
          min-width="32"
        />
      </v-avatar>

      <v-avatar
        max-height="32"
        style="bottom: 6px"
        class="mx-0"
        min-width="32"
        width="32"
      >
        <v-img
          :src="tokenData.coinImage(tokenData.token1_id)"
          :lazy-src="tokenData.coinImage(tokenData.token1_id)"
          max-width="32"
          max-height="32"
          min-width="32"
        />
      </v-avatar>
      <span
        :class="{
          'text-h4': $vuetify.breakpoint.lgAndUp,
          'text-h5': $vuetify.breakpoint.mdAndDown,
        }"
      >
        {{ tokenData.token0_name }} - {{ tokenData.token1_name }}

        <span class="text-h6">
          | {{ tokenData.token0_symbol }}-{{ tokenData.token1_symbol }}</span
        > </span
      ><br v-if="$vuetify.breakpoint.mdAndDown" />
    </v-col>
    <v-col cols="2" class="py-0">
      <v-card tile outlined link>
        <v-card-actions class="py-0">
          <v-list-item class="grow px-0">
            <v-list-item-avatar size="32">
              <v-img
                :src="tokenData.coinImage(tokenData.token0_id)"
                :lazy-src="tokenData.coinImage(tokenData.token0_id)"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="text-subtitle-1 font-weight-medium"
                >1 {{ tokenData.token0_symbol }} =
                {{ tokenData.token1_price.toFixed(4) }}
                {{ tokenData.token1_symbol }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="2" class="py-0">
      <v-card tile outlined link>
        <v-card-actions class="py-0">
          <v-list-item class="grow px-0">
            <v-list-item-avatar size="32">
              <v-img
                :src="tokenData.coinImage(tokenData.token1_id)"
                :lazy-src="tokenData.coinImage(tokenData.token1_id)"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="text-subtitle-1 font-weight-medium"
                >1 {{ tokenData.token1_symbol }} =
                {{ tokenData.token0_price.toFixed(4) }}
                {{ tokenData.token0_symbol }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
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
