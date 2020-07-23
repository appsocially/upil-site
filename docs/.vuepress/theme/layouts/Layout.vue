<template>
  <Layout />
</template>

<script>
import Layout from "@vuepress/theme-default/layouts/Layout.vue";
export default {
  components: {
    Layout,
  },
  mounted() {
    // Fix scrolling to the referenced element upon initial page load
    setTimeout(() => {
      const hash = document.location.hash;
      if (hash.length > 1) {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }
    }, 1000);
  },
};
</script>