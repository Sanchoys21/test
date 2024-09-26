<script>
import {defineComponent} from "vue";
import {useMovieStore} from "@/stores/movies.js";

export default defineComponent({
  name: "ErrorView",
  setup() {
    const store = useMovieStore();
    return {
      store,
    }
  }
})
</script>

<template>
  <main>
    <h1>Something went wrong</h1>
    <p>{{ store.error }}</p>
    <RouterLink class="link" to="/">Go back to Home page</RouterLink>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  flex: 1;
  padding-top: 30%;
}

.link {
  color: white;
}

</style>
