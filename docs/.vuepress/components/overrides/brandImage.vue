
<template>
  <TextBubble>
    {{text}}
    <br />
    <v-hover>
      <template v-slot="{ hover }">
        <v-card :elevation="hover ? 14 : 2">
          <v-img :src="selfIntroduction" max-width="100px" />
        </v-card>
      </template>
    </v-hover>
  </TextBubble>
</template>

<script>
import selfIntroduction from './robot.png'
import { ChatTheme } from '@appsocially/vue-upil-plugin'

const { TextBubble } = ChatTheme
export default {
  components: {
    TextBubble
  },
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      selfIntroduction
    }
  },
}
</script>

