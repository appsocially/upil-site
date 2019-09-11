
<template>
  <v-sheet color="light-grey" class="upil-example-container">
    <ChatThemePlugin
      removeBottomBar
      :upil="upil"
      :avatar="Logo"
      :wrapperStyleOverride="{height: '240px', 'overflow-y': 'scroll'}"
    >
      <template v-slot:external="{allNodes, currentNode, scenarioEnded}">
        <div id="bottom-bar" v-if="currentNode && !scenarioEnded">
          <component v-bind:is="currentNode.componentType" v-bind="currentNode.node" />
        </div>
      </template>
    </ChatThemePlugin>
  </v-sheet>
</template>

<script>
import { UPILCore, ChatTheme } from '@appsocially/vue-upil-plugin'
import '@appsocially/vue-upil-plugin/dist/vue-userpil-plugin.css'
import Logo from '../public/logo.png'

const { ChatThemePlugin } = ChatTheme

export default {
  components: {
    ChatThemePlugin
  },
  data () {
    return {
      upil: new UPILCore(),
      Logo
    }
  },
  props: {
    // script: {
    //   type: String,
    //   required: true
    // }
  },
  methods: {
    start: function () {
//       console.log('this.script', this.script)
//       import(this.script).then(script=>{
// console.log('script', script)
//       this.upil.startRaw(this.script)
//       })
      const text = this.$slots.default[0].children[0].children[0].children[0].text
      this.upil.startRaw(text)
    }
  },
  created () {
    this.start()
  }
}
</script>

<style scoped>
.upil-example-container {
  position: relative;
  height: 300px;
}

.upil-example-container #bottom-bar {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding-left: 0px;
  padding-right: 0px;
}
</style>
