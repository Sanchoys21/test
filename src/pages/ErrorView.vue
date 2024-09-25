<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "ErrorView",
})
</script>

<template>
  <main>
    <h1>404 - Page Not Found</h1>
    <RouterLink class="link" to="/">Go back to Home page</RouterLink>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  flex: 1;
}

.link {
  color: white;
}

</style>
