<script>
import {defineComponent, onMounted, ref} from "vue";
import LeftSidebar from "@/components/LeftSidebar.vue";
import RightSidebar from "@/components/RightSidebar.vue";
import Login from "@/components/Login.vue";
import {useMovieStore} from "@/stores/movies.js";
import apiClient from "@/plugins/apiClient.js";

export default defineComponent({
  components: {Login, RightSidebar, LeftSidebar},
  setup() {
    const store = useMovieStore();
    const genres = ref([])

    onMounted(async () => {
      store.loaders.user = true;
      try {
        const genresResponse = await apiClient.get(`https://api.themoviedb.org/3/genre/movie/list?language=en}`);
        // console.log(genresResponse)
        genres.value = genresResponse.data.genres;
      } catch (error) {
        await store.goToErrorPage(error);
      } finally {
        store.loaders.user = false;
      }
    })

    store.getMovies();

    return {
      store,
      genres,
    }
  }
})
</script>

<template>
  <div class="page">
    <LeftSidebar/>
    <Login v-if="store.isLogin"/>
    <RouterView/>
    <RightSidebar :profile="store.profile" :genres="genres"/>
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
