<script>
import {defineComponent} from "vue";
import LeftSidebar from "@/components/LeftSidebar.vue";
import RightSidebar from "@/components/RightSidebar.vue";
import Login from "@/components/Login.vue";
import {useMovieStore} from "@/stores/movies.js";
import {useUserStore} from "@/stores/user.js";

export default defineComponent({
  methods: {useUserStore},
  components: {Login, RightSidebar, LeftSidebar},
  setup() {
    const store = useMovieStore();
    store.getAustrian();

    return {
      store,
    }
  }
})
</script>

<template>
  <div class="page">
    <LeftSidebar/>
    <Login v-if="useUserStore().isLogin"/>
    <RouterView/>
    <RightSidebar :profile="useUserStore().profile" :genres="store.genres"/>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  background: #0D0D0F;
  color: white;
  height: 100vh;
  font-family: sans-serif;
}
</style>
