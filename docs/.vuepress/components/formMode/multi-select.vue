<template>
  <v-select v-model="tempValue" @blur="onBlur" multiple :items="items" />
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      required: true
    },
    upil: {
      type: Object,
      required: true
    },
    state: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tempValue: []
    }
  },
  computed: {
    items () {
      return this.node.options.map(({ text, value: { value, name } }) => ({ text, value: name === undefined ? value : name }))
    },
    inputName () {
      return this.node.input.name
    },
    selectValue: {
      set (value) {
        this.onSubmit(value)
      },
      get () {
        return this.state[this.inputName]
      }
    }
  },
  methods: {
    onBlur () {
      this.selectValue = this.tempValue
    },
    onSubmit (input) {
      return this.upil.consume(this.node.event, input)
    }
  },
  mounted () {
    this.tempValue = this.selectValue
  }
}
</script>

<style>

</style>
