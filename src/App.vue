<script>
import {defineComponent, onMounted, ref} from "vue";
import LeftSidebar from "@/components/LeftSidebar.vue";
import RightSidebar from "@/components/RightSidebar.vue";
import {useMovieStore} from "@/stores/movies.js";
import apiClient from "@/plugins/apiClient.js";
import axios from "axios";

export default defineComponent({
  components: {RightSidebar, LeftSidebar},
  setup() {
    const store = useMovieStore();
    const profile = ref({})
    const genres = ref([])

    onMounted(async () => {
      store.loaders.user = true;
      try {
        const genresResponse = await apiClient.get(`https://api.themoviedb.org/3/genre/movie/list?language=en}`);
        console.log(genresResponse)
        genres.value = genresResponse.data.genres;

        const profileResponse = await axios.get("https://dummyjson.com/users/1");
        profile.value = profileResponse.data;
      } catch (error) {
        console.log("error")
        await store.goToErrorPage(error);
      } finally {
        store.loaders.user = false;
      }
    })

    store.getMovies();

    return {
      store,
      profile,
      genres,
    }
  }
})
</script>

<template>
  <div class="page">
    <LeftSidebar/>
    <RouterView/>
    <RightSidebar :profile="profile" :genres="genres"/>
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
