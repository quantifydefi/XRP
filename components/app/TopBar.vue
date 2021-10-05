<template>
  <v-app-bar
    app
    outlined
    elevation="0"
    :style="{
      backgroundColor: $vuetify.theme.themes[theme].appBg,
      borderBottom: `1px solid ${$vuetify.theme.dark ? '#2F2F2F' : '#DCDCDC'}`,
    }"
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-btn @click="disconnect">Disconnect</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  name: 'TopBar',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class TopBar extends Vue {
  @Prop({ default: '' }) title!: string

  disconnect() {
    this.$router.push('/')
  }
}
</script>
