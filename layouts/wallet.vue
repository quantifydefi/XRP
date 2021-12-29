<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import Notification from '../components/common/Notification.vue'
import ApiMenuHeader from '../components/common/ApiMenuHeader.vue'
import LayoutMixin from '~/mixins/LayoutMixin.vue'

@Component({
  name: 'Wallet',
  components: { ApiMenuHeader, Notification },
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class Wallet extends mixins(LayoutMixin) {
  cards = ['Today', 'Yesterday']
  links = [['mdi-inbox-arrow-down', 'Terminal']]
}
</script>
