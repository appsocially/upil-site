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
  name: 'VuetifyLayout',
  components: {
    ParentLayout,
  }
}
</script>