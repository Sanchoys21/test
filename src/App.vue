<script>
import {defineComponent, onMounted, ref} from "vue";
import apiClient from "@/plugins/apiClient.js";
import FilmCard from "@/components/Film-card.vue";

export default defineComponent({
  components: {FilmCard},
  setup() {

    const trending = ref([])
    const topRated = ref([])

    onMounted(async () => {
      const [trendingData, topRatedData] = await Promise.all([
        apiClient.get('/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'),
        apiClient.get('discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200')
      ])
      console.log(topRatedData.data)
      trending.value = trendingData.data.results
      topRated.value = topRatedData.data.results
    })


    return {
      trending,
      topRated
    }
  }
})
</script>

<template>
  <div class="page">
    <aside class="sidebar-streaming">
      <!--      icons-->
    </aside>
    <aside class="sidebar">
      <div class="menu">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Discovery</a></li>
          <li><a href="#">Community</a></li>
          <li><a href="#">Coming soon</a></li>
        </ul>
      </div>
      <div class="library">
        <ul>
          <li><a href="#">Recent</a></li>
          <li><a href="#">Bookmarked</a></li>
          <li><a href="#">Top Rated</a></li>
          <li><a href="#">Downloaded</a></li>
        </ul>
      </div>
      <div class="settings">
        <ul>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </div>
      <button class="logout">Logout</button>
    </aside>
    <main>
      <div class="top-bar">
        <ul>
          <li><a href="#">Movies</a></li>
          <li><a href="#">Series</a></li>
          <li><a href="#">TV Shows</a></li>
        </ul>
      </div>
      <section class="trending">
        <h2>Trending Movies</h2>
        <div class="movie-list">
          <film-card v-for="(movie, index) in trending"
                     :key="index"
                     :title="movie.title"
                     :year="movie.release_date.split('-')[0]"
                     :image="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
                     :description="movie.overview"
                     :rating="Math.round(movie.vote_average * 10) / 10"
                     :size="`large`"
          ></film-card>
        </div>
      </section>
      <section class="top">
        <h2>Top Rated</h2>
        <div class="movie-list">
          <film-card v-for="(movie, index) in topRated"
                     :key="index"
                     :title="movie.title"
                     :year="movie.release_date.split('-')[0]"
                     :image="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
                     :description="movie.overview"
                     :rating="Math.round(movie.vote_average * 10) / 10"
          ></film-card>
        </div>
      </section>
<!--      to check small size-->
      <section class="trending">
        <h2>Small size test</h2>
        <div class="movie-list">
          <film-card v-for="(movie, index) in trending"
                     :key="index"
                     :title="movie.title"
                     :year="movie.release_date.split('-')[0]"
                     :image="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
                     :description="movie.overview"
                     :rating="Math.round(movie.vote_average * 10) / 10"
                     :size="`small`"
          ></film-card>
        </div>
      </section>
    </main>
    <aside class="sidebar-right">
      <div class="profile-data"></div>

    </aside>
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

.sidebar-streaming {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5%;
  padding-top: 5%;
}

.sidebar, .sidebar-right {
  background: #1A171E;
  width: 10%;
  padding: 20px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  padding-top: 5%;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 15px 0;
}

.sidebar li a {
  text-decoration: none;
  color: #6F6E74;
  border: none;
  cursor: pointer;
}

.menu, .library {
  border-bottom: #6F6E74 1px solid;
}

main {
  flex: 1;
  padding: 0 20px 20px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

main::-webkit-scrollbar {
  display: none;
}

.top-bar ul {
  display: flex;
  list-style: none;
  gap: 40px;
  padding: 0;
}

.top-bar ul li a {
  text-decoration: none;
  color: #6F6E74;
}

button {
  border: none;
  cursor: pointer;
  padding: 0;
  background: #1A171E;
  color: #6F6E74;
  text-align: left;
  margin: auto 0 0;
}

.movie-list {
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
}

</style>
