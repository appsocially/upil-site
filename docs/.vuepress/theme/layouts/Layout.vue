<template>
  <v-app>
    <v-content>
      <ParentLayout />
    </v-content>
  </v-app>
</template>

<script>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'

export default {
  components: {
    ParentLayout,
  }
}
</script>

<style>
 .v-application code {
   box-shadow: none;
   display: inline;
 }

 .v-application code:after, .v-application code:before, .v-application kbd:after, .v-application kbd:before {
   content: none;
 }
</style>