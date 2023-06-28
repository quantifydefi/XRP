<template>
  <v-row no-gutters class="outer-glow">
    <v-col class="pa-0" style="z-index: 1">
      <v-sheet tile outlined height="100%">
        <v-card :color="color" tile height="100%">
          <slot></slot>
        </v-card>
      </v-sheet>
    </v-col>
    <span></span>
    <span></span>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'OutlineGlow',
  props: {
    color: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss">
.outer-glow {
  position: relative;
  margin: 0 50px;
  padding: 5px;
  width: 100%;
  height: 100%;
}

.outer-glow span {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  width: 100%;
  background: inherit;
  transform: translate(-50%, -50%);
}

.outer-glow:hover span:nth-child(2) {
  filter: blur(7px);
}
.outer-glow:hover span:nth-child(3) {
  filter: blur(14px);
}

.outer-glow:hover {
  background: linear-gradient(#48a5be, #807bae, #a25fa4);
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
