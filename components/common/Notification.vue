<template>
  <v-snackbar
    v-model="snackbar"
    bottom
    :timeout="timeout"
    :multi-line="multiLine"
    style="padding-bottom: 0"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn :color="buttonColor" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({ name: 'Notification' })
export default class Notification extends Vue {
  color: string = ''
  buttonColor: string = 'blue'
  mode: string = ''
  snackbar: boolean = false
  text: string = ''
  timeout: number = 10000
  multiLine: boolean = true

  openNotification(text: string): void {
    this.snackbar = true
    this.text = text
  }
}
</script>

<style scoped></style>
