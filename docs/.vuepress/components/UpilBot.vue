
<template>
  <div class="scenario-demonstration">
    <slot />
    <div class="v-application v-application--is-ltr theme--light">
      <v-expansion-panels v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header>{{isOpen ? 'Close' : 'Show example'}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn text icon color="primary" class="mb-1" @click="start">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-sheet
              color="light-grey"
              class="upil-example-container"
              :elevation="3"
              v-if="isReady"
            >
              <ChatThemePlugin
                removeBottomBar
                :upil="upil"
                :avatar="Logo"
                :wrapperStyleOverride="{height: '240px', 'overflow-y': 'scroll'}"
                :listeners="listeners"
                :override="override"
              >
                <template v-slot:external="{allNodes, currentNode, scenarioEnded}">
                  <div id="bottom-bar" v-if="currentNode && !scenarioEnded">
                    <component
                      v-bind:is="currentNode.componentType"
                      v-bind="currentNode.node"
                      placeholderOverride="Type your answer here"
                      :labelOverride="getLabelOverride(currentNode.node.type)"
                    />
                  </div>
                </template>
              </ChatThemePlugin>
            </v-sheet>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import { UPILCore, ChatTheme } from '@appsocially/vue-upil-plugin'
import Logo from '../public/logo.png'
import listeners from './listeners'
import { override } from './overrides'

const { ChatThemePlugin } = ChatTheme

export default {
  name: 'UpilBot',
  components: {
    ChatThemePlugin
  },
  data () {
    return {
      upil: null,
      Logo,
      panel: null,
      hasRun: false,
      listeners,
      isReady: false,
      override
    }
  },
  computed: {
    isOpen(){
      return this.panel === 0
    },
  },
  watch: {
    isOpen(isOpen){
      if(isOpen){
        this.start()
      }
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
    start() {
        this.isReady = false
        const scenario = this.getScenario()
        this.upil = new UPILCore()
        this.upil.startRaw(scenario)
        this.$nextTick(()=>this.isReady = true)
    },
    getLabelOverride(type){
      switch(type){
        case 'select':
          return "Choose one"
        case 'multi-select':
          return "Please choose"
        default:
          return null
      }
    }
  },
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
