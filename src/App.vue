<script>
import {defineComponent, onMounted} from "vue";
import apiClient from "@/plugins/apiClient.js";

export default defineComponent({
  setup() {

    onMounted(async () => {
      const { data } = await apiClient.get('/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc')
      console.log(data)
    })

    return {}
  }
})
</script>

<template>
  <main>

  </main>
</template>

<style scoped>
</style>
