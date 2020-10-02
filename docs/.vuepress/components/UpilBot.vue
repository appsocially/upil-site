
<template>
  <div class="scenario-demonstration">
    <slot />
    <div class="v-application v-application--is-ltr theme--light" data-app>
      <v-expansion-panels v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header>{{
            isOpen ? "Close" : "Show chat-mode example"
          }}</v-expansion-panel-header>
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
              v-if="upil"
            >
              <ChatMode
                removeBottomBar
                :upil="upil"
                :avatar="Logo"
                :wrapperStyleOverride="{
                  height: '240px',
                  'overflow-y': 'scroll',
                }"
                :listeners="listeners"
                :override="override"
                :types="types"
                :locale="locale"
                :i18n="i18n"
                :transformReplyVariables="transformReplyVariables"
                :transformTextVariables="transformTextVariables"
              >
                <template
                  v-slot:external="{
                    allNodes,
                    currentNode,
                    scenarioEnded,
                    placeholderText,
                    state,
                  }"
                >
                  <div
                    class="pl-1"
                    id="bottom-bar"
                    v-if="currentNode && !scenarioEnded"
                  >
                    <component
                      :upil="upil"
                      v-bind:is="currentNode.componentType"
                      v-bind="currentNode.node"
                      :state="state"
                      :placeholderText="placeholderText"
                      :locale="locale"
                      :rules="calculateRules(currentNode)"
                      :rawNode="currentNode.rawNode"
                      @consume="onConsume"
                    />
                  </div>
                </template>
              </ChatMode>
            </v-sheet>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import { UPILCore } from "@appsocially/userpil-core";
import { ChatBot } from "@appsocially/vue-upil";
import Logo from "../public/logo.png";
import listeners from "./listeners";
import { override } from "./overrides";
import { email } from "vee-validate/dist/rules";

const emailValidationRules = [
  (value) => (value && value.length > 0 ? true : "Required"),
  (value) => (email.validate(value) ? true : "Invalid email address"),
];

const types = {
  email: emailValidationRules,
};

const padTime = (timeNum) => `${timeNum}`.padStart(2, 0);

const formatTimeInputValue = (timeInputValue) => {
  return `${padTime(timeInputValue.hours)}:${padTime(timeInputValue.minutes)}`;
};

const commaChooser = (locale) => {
  switch (locale) {
    case "ja":
      return "、";
    default:
      return ", ";
  }
};

const transformReplyVariables = ({
  node: {
    event: { value },
    label,
  },
  locale,
}) => {
  if (Array.isArray(value)) {
    return value.join(commaChooser(locale));
  } else if (label === "time-input") {
    return formatTimeInputValue(value, locale);
  } else {
    return value;
  }
};

const transformTextVariables = ({ value, key, locale }) => {
  if (key === "meetingsStart" || key === "meetingsEnd") {
    return formatTimeInputValue(value, locale);
  } else if (Array.isArray(value)) {
    return value.join(commaChooser(locale));
  } else {
    return value;
  }
};

const { ChatMode } = ChatBot;

export default {
  name: "UpilBot",
  components: {
    ChatMode,
  },
  data() {
    return {
      upil: null,
      Logo,
      panel: null,
      hasRun: false,
      listeners,
      override,
      types,
      locale: "en",
      locales: ["en", "ja"],
      i18n: {
        ja: {
          missingValue: "未記入",
          templateInputPlaceholder: "入力してください",
          selectInputPlaceholder: "選んでください",
          multiSelectInputPlaceholder: "選んでください",
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
  props: {
    simple: {
      type: Boolean,
      default: false,
    },
    withLocale: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onConsume({ event, value }) {
      this.upil.consume(event, value);
    },
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
      const scenario = this.getScenario();
      this.upil = new UPILCore();
      this.upil.startRaw(scenario);
    },
    getLabelOverride(type) {
      switch (type) {
        case "select":
          return "Choose one";
        case "multi-select":
          return "Please choose";
        default:
          return null;
      }
    },
    calculateRules(currentNode) {
      const hasInputType =
        currentNode &&
        currentNode.node &&
        currentNode.node.input &&
        currentNode.node.input.type;
      if (hasInputType) {
        return this.types[currentNode.node.input.type] || [];
      } else {
        return [];
      }
    },
    transformReplyVariables,
    transformTextVariables,
  },
};
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

.scenario-demonstration >>> .chat-bubble {
  max-width: 70% !important;
}
</style>
