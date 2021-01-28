<template>
  <v-app id="inspire">
    <!--<v-navigation-drawer app>
      <v-sheet class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

        <div>Some Address</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->

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
import Notification from '../components/common/Notification.vue'
import ApiMenuHeader from '../components/common/ApiMenuHeader.vue'
import LayoutMixin from '~/mixins/LayoutMixin.vue'

@Component({
  name: 'Wallet',
  components: { ApiMenuHeader, Notification },
})
export default class Wallet extends mixins(LayoutMixin) {
  cards = ['Today', 'Yesterday']
  links = [['mdi-inbox-arrow-down', 'Terminal']]
}
</script>
