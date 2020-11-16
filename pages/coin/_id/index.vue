<template>
  <v-row align="center" justify="center">
    <v-col cols="10" class="py-0 px-0">
      <v-row>
        <v-col
          ><span class="text-h4">Wrapped BTC (WBTC)</span>
          <span class="text-h5 mx-2">$15,761</span>
          <span class="text-h6">1.22%</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg" tile outlined>
            <v-list color="transparent">
              <v-list-item v-for="n in 5" :key="n" link>
                <v-list-item-content>
                  <v-list-item-title> List Item {{ n }} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item link color="grey lighten-4">
                <v-list-item-content>
                  <v-list-item-title> Refresh </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet min-height="70vh" rounded="lg" tile outlined>
            <!--  -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Index',
}
</script>

<style scoped></style>
