<template>
  <div class="scenario-demonstration">
    <slot v-if="!hideScript" />
    <div class="v-application v-application--is-ltr theme--light" data-app>
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
              <RawFormBot
                :upil="upil"
                :isMissingValue.sync="isMissingValue"
                :initializingUpil.sync="initializingUpil"
              />
            </v-sheet>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import { UPILCore } from "@appsocially/vue-upil-plugin";
import RawFormBot from "./formMode/rawFormBot";

export default {
  name: "FormMode",
  components: {
    RawFormBot
  },
  props: {
    simple: {
      type: Boolean,
      default: false
    },
    hideScript: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMissingValue: false,
      initializingUpil: true,
      upil: null,
      panel: null,
      hasRun: false,
      isReady: false
    };
  },
  computed: {
    isOpen() {
      return this.panel === 0;
    }
  },
  watch: {
    isOpen(isOpen) {
      if (isOpen) {
        this.start();
      }
    }
  },
  methods: {
    getScenario() {
      const preTag = this.$slots.default[0].children.find(c => c.tag === "pre");
      const text = preTag.children[0].children[0].text;
      if (this.simple) {
        return `DIALOG mainDialog ${text} /DIALOG RUN a mainDialog /RUN`;
      } else {
        return text;
      }
    },
    start() {
      this.isReady = false;
      const scenario = this.getScenario();
      this.upil = new UPILCore();
      this.upil.startRaw(scenario, {
        mode: "form",
        resetOnInputUpdate: true
      });
      this.$nextTick(() => (this.isReady = true));
    }
  }
};
</script>

<style scoped>
.scenario-demonstration {
  margin-bottom: 30px;
}
</style>
