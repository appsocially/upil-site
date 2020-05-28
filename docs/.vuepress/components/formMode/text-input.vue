<template>
  <keep-alive>
    <v-textarea
      v-model="inputValue"
      :rows="1"
      :rules="rules"
      @update:error="onUpdateError"
      auto-grow
      ref="text"
      @compositionstart="waitingOnIme = true"
      @compositionend="compositionEnded"
    />
  </keep-alive>
</template>

<script>

import textInputMixin from './text-input-mixin'

export default {
  mixins: [textInputMixin],
  props: {
    rules: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isValid: this.rules.length === 0
    }
  },
  watch: {
    inputValue (inputValue) {
      this.onSubmit(inputValue)
    }
  },
  methods: {
    onUpdateError (hasError) {
      this.isValid = !hasError
    }
  }
}
</script>

<style>
</style>
