<template>
  <div v-if="aaveAssets">
    <v-row no-gutters>
      <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="2">
        <v-avatar size="30">
          <img
            alt="aave logo"
            src="https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/aave.png"
            @error="aaveAssets.setAltImg"
          />
        </v-avatar>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndDown" cols="6">
        <v-avatar size="30">
          <img
            alt="aave logo"
            src="https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/aave.png"
            @error="aaveAssets.setAltImg"
          />
        </v-avatar>
      </v-col>

      <v-col class="text-right"> zzqqqszd </v-col>
      <v-col cols="9">
        <v-row v-if="$vuetify.breakpoint.lgAndUp">
          <v-col cols="3"> Frist </v-col>
          <v-col cols="3"> Second </v-col>
          <v-col cols="3"> Third </v-col>
          <v-col cols="3"> Fourth </v-col>
        </v-row>

        <v-row
          v-if="$vuetify.breakpoint.lgAndUp"
          style="height: 25px"
          class="text-center"
        >
          <v-col cols="3">
            <v-btn outlined tile block small>Deposit</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn outlined tile block small>Lend</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn outlined tile block small>Withdraw</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn outlined tile block small>Borrow</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="$vuetify.breakpoint.mdAndDown" no-gutters>
      <v-col cols="3"> Frist </v-col>
      <v-col cols="3"> Second </v-col>
      <v-col cols="3"> Third </v-col>
      <v-col cols="3"> Fourth </v-col>
    </v-row>
    <v-row
      v-if="$vuetify.breakpoint.mdAndDown"
      style="height: 25px"
      class="text-center"
    >
      <v-col cols="3">
        <v-btn outlined tile block small>Deposit</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn outlined tile block small>Lend</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn outlined tile block small>Withdraw</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn outlined tile block small>Borrow</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { AaveAssets } from '~/models/aave'

@Component({
  name: 'RSICard',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class DefiAssetCard extends Vue {
  items = [
    { header: 'Assets' },
    {
      avatar:
        'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/aave.png',
      title: 'Aave',
      subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
    },
    { divider: true, inset: true },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
      subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
    },
    { divider: true, inset: true },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      title: 'Oui oui',
      subtitle:
        '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
    },
    { divider: true, inset: true },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      title: 'Birthday gift',
      subtitle:
        '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
    },
    { divider: true, inset: true },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      title: 'Recipe to try',
      subtitle:
        '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
  ]

  aaveAssets: AaveAssets | null = null

  desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
    },
    {
      name: 'Eclair',
      calories: 262,
    },
    {
      name: 'Cupcake',
      calories: 305,
    },
    {
      name: 'Gingerbread',
      calories: 356,
    },
    {
      name: 'Jelly bean',
      calories: 375,
    },
    {
      name: 'Lollipop',
      calories: 392,
    },
    {
      name: 'Honeycomb',
      calories: 408,
    },
    {
      name: 'Donut',
      calories: 452,
    },
    {
      name: 'KitKat',
      calories: 518,
    },
  ]

  mounted() {
    this.aaveAssets = new AaveAssets(this.$store)
  }
}
</script>
