<template>
  <v-card-title
    class="py-1 px-2"
    :class="!$vuetify.theme.dark ? 'grey lighten-3' : ''"
    :style="{ backgroundColor: $vuetify.theme.themes[theme].background }"
  >
    <component
      :is="title === 'Daily Winners/Losers' ? 'h1' : 'span'"
      class="subtitle-1"
    >
      {{ title }}
    </component>
    <v-spacer></v-spacer>
    <v-tooltip v-if="infoTooltip" top color="black">
      <template #activator="{ on }">
        <v-hover v-slot="{ hover }">
          <v-btn
            icon
            :color="hover ? 'primary' : 'grey lighten-1'"
            :href="infoLink"
            target="_blank"
            height="24"
            width="24"
            v-on="on"
          >
            <v-icon class="pa-0 ma-0">mdi-information-outline</v-icon>
          </v-btn>
        </v-hover>
      </template>
      <span>{{ infoTooltip }}</span>
    </v-tooltip>
  </v-card-title>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  name: 'GridHeader',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class GridHeader extends Vue {
  @Prop({ default: '' }) readonly title!: string
  @Prop({ default: null }) readonly infoTooltip!: string | null
  @Prop({ default: null }) readonly infoLink!: string | null
}
</script>
