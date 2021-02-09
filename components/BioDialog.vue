<template>
  <div class="text-center">
    <v-dialog
      v-model="isVisibility"
      persistent
      transition="dialog-bottom-transition"
      width="700"
    >
      <v-card class="text-center" tile outlined>
        <v-card-actions class="justify-end">
          <v-btn icon @click="$emit('close-dialog', thumbnailUrl)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-container class="pa-10">
          <v-avatar size="140">
            <img
              class="rounded-circle"
              :src="require(`~/assets/images/team/${thumbnailUrl}.jpg`)"
              alt="avatar"
            />
          </v-avatar>
          <h2 class="mt-5">
            {{ name }}
          </h2>
          <p>
            {{ jobTitle }}
          </p>
          <v-card-text class="bio-text">
            {{ bio }}
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class BioDialog extends Vue {
  @Prop({ default: false }) isVisibility!: boolean
  @Prop({ required: true, default: 'John Barry' }) readonly name!: string
  @Prop({ required: true, default: 'CEO/Co-Founder' })
  readonly jobTitle!: string

  @Prop({ required: true, default: 'john' }) readonly thumbnailUrl!: string
  @Prop({
    default:
      'John is an Information Technology developer with over 30 years of executive experience in financial services, including 23 years at the New York Stock Exchange. He flourished as lead developer for the vital SuperDot order flow system that tracked every order entering the NYSE computer systems. Later, John was responsible for the Capacity Planning of all NYSE order flow system, earning the Chairman’s Award for his project management success. As the CEO of Quantify Crypto, John combines his deep understanding of the securities industry and project leadership expertise to form the company vision.',
  })
  readonly bio!: string
}
</script>

<style scoped>
.bio-text {
  font-size: 1.1em;
}

p {
  font-size: 1.1em;
}
</style>
