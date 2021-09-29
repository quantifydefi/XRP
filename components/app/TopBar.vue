<template>
  <v-app-bar
    dark
    app
    outlined
    color="grey darken-4"
    style="border-bottom: solid 1px #404040 !important"
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-btn @click="disconnect">Disconnect</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({ name: 'TopBar' })
export default class TopBar extends Vue {
  @Prop({ default: '' }) title!: string

  disconnect() {
    this.$router.push('/')
  }
}
</script>
