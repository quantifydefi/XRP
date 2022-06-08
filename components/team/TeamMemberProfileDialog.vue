<template>
  <div class="text-center">
    <v-dialog v-model="teamMember.bioIsVisible.value" persistent transition="dialog-bottom-transition" width="700">
      <v-card class="text-center" tile outlined>
        <v-card-actions class="justify-end">
          <v-btn icon @click="teamMember.bioIsVisible.value = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-container class="pa-10">
          <v-avatar size="120">
            <img
              :src="`https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/team/${teamMember.thumbnailUrl.value}.jpg`"
              :alt="`${teamMember.name.value} avatar`"
            />
          </v-avatar>
          <h4 class="text-h6 mt-6">
            {{ teamMember.name.value }}
          </h4>
          <div class="text--secondary">
            {{ teamMember.jobTitle.value }}
          </div>
          <v-btn
            v-for="social in teamMember.socials.value"
            :key="social.link"
            class="ma-1"
            icon
            :href="social.link"
            target="_blank"
          >
            <v-icon size="20">mdi-{{ social.icon }}</v-icon>
          </v-btn>
          <div class="text-left" v-html="teamMember.bio.value"></div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from '@nuxtjs/composition-api'
import { TeamMember } from '~/types/team'

export default defineComponent({
  name: 'TeamMemberProfileDialog',
  props: {
    memberInfo: {
      type: Object as PropType<TeamMember>,
      required: true,
    },
  },
  setup(props) {
    const teamMember = toRefs<TeamMember>(props.memberInfo)
    return { teamMember }
  },
})
</script>
