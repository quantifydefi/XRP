<template>
  <v-card tile outlined height="100%">
    <!--    <v-btn @click="addNewRecords">Update</v-btn>-->
    <v-simple-table>
      <template #default>
        <!--        <thead>-->
        <!--          <tr>-->
        <!--            <th class="text-left">Name</th>-->
        <!--            <th class="text-left">Calories</th>-->
        <!--          </tr>-->
        <!--        </thead>-->
        <tbody>
          <tr v-for="(item, i) in data" :key="i">
            <td class="py-1" :style="{ 'background-color': item.updateOption ? item.updateOption.color : '' }">
              <v-row no-gutters align="center">
                <v-col cols="2">
                  <v-avatar size="24">
                    <img :src="$imageUrlBySymbol(item.dexSymbol)" alt="" @error="$setAltImageUrl" />
                  </v-avatar>
                </v-col>
                <v-col cols="10">
                  <v-row no-gutters>
                    <v-col>
                      <span class="text-capitalize font-weight-bold" v-text="item.name" />
                      <span class="grey--text text-caption ml-4" v-text="item.dexName" />
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <span
                        class="grey--text text-caption d-inline-block text-truncate"
                        style="max-width: 100%"
                        v-text="item.address"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { useSubscription } from '@vue/apollo-composable/dist'
import { DexEventsStreamGQL } from '~/apollo/main/token.query.graphql'
import { DexEvent } from '~/types/apollo/main/types'

type DexEventObserver = DexEvent & {
  updateOption?: { status: boolean; color: string | null }
}
export default defineComponent({
  setup() {
    const { result: liveData } = useSubscription(DexEventsStreamGQL, () => ({
      network: 'ethereum',
    }))

    let updateTimeout: any = null
    const rowData = ref<DexEventObserver[]>([])

    const data = computed(() =>
      rowData.value.map((elem) => ({
        ...elem,
        dexName: elem.dex === 'uniswap_v2' ? 'UNISWAP V2' : 'UNISWAP V3',
        dexSymbol: 'UNI',
      }))
    )

    function addNewRecords(newRecords: DexEventObserver[]) {
      clearTimeout(updateTimeout)

      newRecords = newRecords.map((elem) => ({
        ...elem,
        updateOption: { status: true, color: '#4caf5026' },
      }))
      rowData.value = [...newRecords, ...rowData.value]
      if (rowData.value.length > 50) {
        rowData.value.splice(-newRecords.length)
      }

      updateTimeout = setTimeout(() => {
        rowData.value.forEach((elem) => {
          if (elem.updateOption) {
            elem.updateOption = { status: false, color: null }
          }
        })
      }, 1000)
    }

    watch(liveData, (val: any) => {
      const newData: DexEvent[] = val?.dexEvents ?? []
      addNewRecords(newData)
    })

    return { data, addNewRecords }
  },
})
</script>
