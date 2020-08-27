<template>
  <div class="scenario-demonstration">
    <slot v-if="!hideScript" />
    <div class="v-application v-application--is-ltr theme--light" data-app>
      <v-expansion-panels v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header>{{isOpen ? 'Close' : 'Show form-mode example'}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-gutters align-content="center">
              <v-col cols="auto">
                <v-btn text icon color="primary" class="mb-1" @click="start">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="auto" v-if="withLocale">
                <v-select
                  class="ma-0 pa-0 ml-2 mb-1"
                  hide-details
                  :items="locales"
                  v-model="locale"
                  label="Locale"
                />
              </v-col>
            </v-row>
            <v-sheet
              color="light-grey"
              class="upil-example-container"
              :elevation="3"
              v-if="isReady"
            >
              <RawFormMode
                :upil="upil"
                :isMissingValue.sync="isMissingValue"
                :initializingUpil.sync="initializingUpil"
                :types="types"
                :locale="locale"
                :i18n="i18n"
              />
            </v-sheet>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import { UPILCore } from "@appsocially/userpil-core";
import { FormMode } from "@appsocially/vue-upil";
import { email } from "vee-validate/dist/rules";

const emailValidationRules = [
  (value) => (value && value.length > 0 ? true : "Required"),
  (value) => (email.validate(value) ? true : "Invalid email address"),
];

const types = {
  email: emailValidationRules,
};

export default {
  name: "FormMode",
  components: {
    RawFormMode: FormMode, //Rename to prevent recursion in vuepress
  },
  props: {
    simple: {
      type: Boolean,
      default: false,
    },
    hideScript: {
      type: Boolean,
      default: false,
    },
    withLocale: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMissingValue: false,
      initializingUpil: true,
      upil: null,
      panel: null,
      hasRun: false,
      isReady: false,
      types,
      locale: "en",
      locales: ["en", "ja"],
      i18n: {
        ja: {
          missingValue: "未記入",
        },
      },
    };
  },
  computed: {
    isOpen() {
      return this.panel === 0;
    },
  },
  watch: {
    isOpen(isOpen) {
      if (isOpen) {
        this.start();
      }
    },
  },
  methods: {
    getScenario() {
      const preTag = this.$slots.default[0].children.find(
        (c) => c.tag === "pre"
      );
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
        resetOnInputUpdate: true,
      });
      this.$nextTick(() => (this.isReady = true));
    },
  },
};
</script>

<style scoped>
.scenario-demonstration {
  margin-bottom: 30px;
}
</style>
