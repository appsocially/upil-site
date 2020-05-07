<template>
  <figure align='center'>
    <slot/>
    <figcaption><i>{{ caption }}</i></figcaption>
  </figure>
</template>

<script>
export default {
  props: ['caption'],
}
</script>

<style scoped>
    figure {
        margin-bottom: 20px;
    }
</style>