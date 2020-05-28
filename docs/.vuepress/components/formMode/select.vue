<template>
  <v-select v-model="selectValue" :items="items" />
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
  computed: {
    items () {
      return this.node.options.map(({ text, value }) => ({ text, value: JSON.stringify(value) }))
    },
    inputName () {
      return this.node.input.name
    },
    selectValue: {
      set (value) {
        this.onSubmit(value)
      },
      get () {
        const index = this.upil.findOptionIndex(this.node.options, this.state[this.inputName])
        return this.items[index]
      }
    }
  },
  methods: {
    getOriginalValues (userInput) {
      const selectedOption = this.items.find()
      return selectedOption.value
    },
    onSubmit (input) {
      return this.upil.consume(this.node.event, JSON.parse(input))
    }
  }
}
</script>

<style>
</style>
