import { symbols } from '@appsocially/vue-upil-plugin'
import debounce from 'lodash.debounce'

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
      inputValue: this.stateInputValue,
      waitingOnIme: false,
      onSubmit: debounce(function (input) {
        if (this.isValid && !this.waitingOnIme) {
          const trimmedInput = (input || '').trim()
          const finalInput = !trimmedInput || trimmedInput === '' ? symbols.UNRESOLVED : trimmedInput
          return this.upil.consume(this.node.event, finalInput)
        }
      }, 100)
    }
  },
  computed: {
    inputName () {
      return this.node.input.name
    },
    stateInputValue () {
      const inputValue = this.state[this.inputName]
      return inputValue === symbols.UNRESOLVED ? '' : inputValue
    }
  },
  watch: {
    stateInputValue: {
      immediate: true,
      handler (stateInputValue, oldValue) {
        if (!this.inputValue) {
          this.inputValue = stateInputValue
        } else if (stateInputValue !== oldValue) {
          if (this.$refs.text) {
            this.$refs.text.focus()
          }
        }
      }
    }
  },
  methods: {
    compositionEnded () {
      this.waitingOnIme = false
      this.onSubmit(this.inputValue)
    }
  }
}
