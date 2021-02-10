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
          <v-avatar size="120">
            <img
              class="rounded-circle"
              :src="require(`~/assets/images/team/${thumbnailUrl}.jpg`)"
              alt="avatar"
            />
          </v-avatar>
          <h4 class="text-h6 mt-6">
            {{ name }}
          </h4>
          <p class="text--secondary">
            {{ jobTitle }}
          </p>
          <a
            v-for="social in socials"
            :key="social.social"
            :href="social.link"
            target="_blank"
          >
            <v-icon class="mt-n7 mr-3" size="20">mdi-{{ social.icon }}</v-icon>
          </a>
          <p>
            {{ bio }}
          </p>
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
  @Prop({ required: false, default: [] }) readonly socials!: Array<any>
  @Prop({
    default:
      'John is an Information Technology developer with over 30 years of executive experience in financial services, including 23 years at the New York Stock Exchange. He flourished as lead developer for the vital SuperDot order flow system that tracked every order entering the NYSE computer systems. Later, John was responsible for the Capacity Planning of all NYSE order flow system, earning the Chairman’s Award for his project management success. As the CEO of Quantify Crypto, John combines his deep understanding of the securities industry and project leadership expertise to form the company vision.',
  })
  readonly bio!: string
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
