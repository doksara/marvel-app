<template>
  <router-link class="link" :to="to">
    {{ text }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    to: String,
    text: String
  },
  setup() {
    
  },
})
</script>


<style lang="scss" scoped>
a {
  background-color: red;
  color: white;
  padding: 1em 1.5em;
  text-decoration: none;
  text-transform: uppercase;
}

a:hover {
  background-color: #555;
}

a:active {
  background-color: black;
}

a:visited {
  background-color: #ccc;
}
</style>