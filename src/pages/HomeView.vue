<script>
import {defineComponent} from "vue";
import FilmCard from "@/components/Film-card.vue";
import {useMovieStore} from "@/stores/movies.js";

export default defineComponent({
  components: {FilmCard},
  setup() {
    const store = useMovieStore();
    store.getMovies();

    return {
      store,
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
        <v-skeleton-loader type="list-item, card"/>
      </section>
      <section class="top">
        <h2>Top Rated</h2>
        <v-skeleton-loader type="list-item, card"/>
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
                   :image="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
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
                     :image="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
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
          <film-card v-for="(movie, index) in store.trending"
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

</style>
