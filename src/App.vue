<template>
  <div id="app">
    <UpilBot script="EXTERNAL test" />
  </div>
</template>

<script>
import UpilBot from './components/UpilBot.vue'

export default {
  name: 'app',
  components: {
    UpilBot
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
