<script>
import {defineComponent} from "vue";
import FilmCard from "@/components/Film-card.vue";
import {useMovieStore} from "@/stores/movies.js";
import {useUserStore} from "@/stores/user.js";

export default defineComponent({
  name: "HomeView",
  components: {FilmCard},
  setup() {
    const store = useMovieStore();
    const user = useUserStore();
    return {
      store,
      user
    }
  }
})
</script>

<template>
  <main v-if="store.loaders.main">
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
        <div v-for="n in 10" :key="n" class="loader"></div>
      </div>
    </section>

    <section class="top">
      <h2>Top Rated</h2>
      <div class="movie-list">
        <div v-for="n in 10" :key="n" class="loader"></div>
      </div>
    </section>
  </main>

  <main v-else-if="store.results.length">
    <div class="top-bar">
      <ul>
        <li><a href="#">Movies</a></li>
        <li><a href="#">Series</a></li>
        <li><a href="#">TV Shows</a></li>
      </ul>
    </div>

    <div class="search-list">
      <film-card v-for="(movie, index) in store.results"
                 :key="index"
                 :title="movie.title"
                 :year="movie.release_date.split('-')[0]"
                 :image="movie.backdrop_path"
                 :description="movie.overview"
                 :rating="Math.round(movie.vote_average * 10) / 10"
                 :size="`large`"
      ></film-card>
    </div>
  </main>

  <main v-else>
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
        <film-card v-for="(movie, index) in store.trending"
                   :key="index"
                   :title="movie.title"
                   :year="movie.release_date.split('-')[0]"
                   :image="movie.backdrop_path"
                   :description="movie.overview"
                   :rating="Math.round(movie.vote_average * 10) / 10"
                   :size="`large`"
        ></film-card>
      </div>
    </section>

    <section class="top">
      <h2>Latest</h2>
      <div class="movie-list">
        <film-card v-for="(movie, index) in store.topRated"
                   :key="index"
                   :title="movie.title"
                   :year="movie.release_date.split('-')[0]"
                   :image="movie.backdrop_path"
                   :description="movie.overview"
                   :rating="Math.round(movie.vote_average * 10) / 10"
        ></film-card>
      </div>
    </section>

    <section class="extra">
      <h2>German</h2>
      <div class="movie-list">
        <p v-if="!user.isAuthorised">Visible only for Authorised users</p>
        <film-card v-for="(movie, index) in store.austrian"
                   :key="index"
                   :title="movie.title"
                   :year="movie.release_date.split('-')[0]"
                   :image="movie.backdrop_path"
                   :description="movie.overview"
                   :rating="Math.round(movie.vote_average * 10) / 10"
        ></film-card>
      </div>
    </section>
  </main>
</template>

<style scoped>
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

.movie-list {
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
}

.search-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 500px);
  gap: 10px;
}

.loader {
  flex: 0 0 auto;
  position: relative;
  width: 500px;
  height: 281px;
  animation: pulse 2s infinite;
  border-radius: 10px;
}

@keyframes pulse {
  0% {
    background-color: #0D0D0F;
  }
  50% {
    background-color: #414044;
  }
  100% {
    background-color: #0D0D0F;
  }
}

</style>
