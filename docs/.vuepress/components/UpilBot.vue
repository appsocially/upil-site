
<template>
  <div class="scenario-demonstration">
    <slot />
    <v-sheet color="light-grey" class="upil-example-container">
      <ChatThemePlugin
        removeBottomBar
        :upil="upil"
        :avatar="Logo"
        :wrapperStyleOverride="{height: '240px', 'overflow-y': 'scroll'}"
      >
        <template v-slot:external="{allNodes, currentNode, scenarioEnded}">
          <div id="bottom-bar" v-if="currentNode && !scenarioEnded">
            <component
              v-bind:is="currentNode.componentType"
              v-bind="currentNode.node"
              placeholderOverride="Please enter a response..."
            />
          </div>
        </template>
      </ChatThemePlugin>
    </v-sheet>
  </div>
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
    simple: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    getScenario(){
      const preTag = this.$slots.default[0].children.find(c=>c.tag === 'pre')
      const text = preTag.children[0].children[0].text
      if(this.simple){
        return `DIALOG mainDialog ${text} /DIALOG RUN a mainDialog /RUN`
      }else{
        return text
      }
    },
    start: function () {
      // const text = this.$slots.default[0].children[0].children[0].children[0].text
      const scenario = this.getScenario()
      console.log({scenario})
      this.upil.startRaw(scenario)
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

.scenario-demonstration {
  margin-bottom: 30px;
}
</style>
