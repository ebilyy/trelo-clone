<script setup lang="ts">
const drawer = ref(false)
const items = reactive([
  {
    title: 'Home',
    to: '/'
  },
  {
    title: 'Users',
    to: '/users'
  },
  {
    title: 'Tickets',
    to: '/tickets'
  }])
</script>
<template>
  <!-- <NuxtLayout>
    <v-app>
      <v-app-bar></v-app-bar>
      
    </v-app>
  </NuxtLayout> -->

  <v-layout>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Trello clone</v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-if="$vuetify.display.mdAndUp">
        <v-btn icon="mdi-magnify" variant="text"></v-btn>

        <v-btn icon="mdi-filter" variant="text"></v-btn>
      </template>

      <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list :items="items">
        <v-list-item v-for="item in items">
          <nuxt-link  :to="item.to">{{ item.title }}</nuxt-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <NuxtPage class="pa-2" />
    </v-main>
  </v-layout>
</template>
<style>
.w-100 {
  width: 100%;
}
</style>
