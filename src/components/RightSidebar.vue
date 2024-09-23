<script>
import {useMovieStore} from "@/stores/movies.js";
import _ from "lodash";

export default {
  name: "RightSidebar",
  props: {
    profile: Object,
    genres: Array,
  },
  setup() {
    const store = useMovieStore();
    const search = _.debounce(() => {
      store.searchMovies();
    }, 300)
    const isActive = (id) => {
      return store.genres.includes(id)
    }
    const choose = (id) => {
      store.genreButton(id)
    }

    return {
      store,
      search,
      isActive,
      choose,
    }
  }
}
</script>

<template>
  <aside class="sidebar-right">
    <div class="profile-data">
      <img :src="profile.image" alt="Profile picture">
      <p class="profile-name"> {{ profile.firstName }} {{ profile.lastName }}</p>
      <p class="profile-email"> {{ profile.email }}</p>
    </div>

    <div class="search">
      <input type="text" v-model="store.input" @input="search" placeholder="Search film..."/>
    </div>

    <div class="genres">
      <ul>
        <li v-for="genre in genres"
            :key="genre.id"
            :class="{active: isActive(genre.id)}"
            @click="choose(genre.id)"
        >
          {{ genre.name }}
        </li>
      </ul>
    </div>

  </aside>
</template>

<style scoped>
.sidebar-right {
  background: #1A171E;
  width: 10%;
  padding: 20px;
}

.genres ul {
  list-style: none;
  padding: 0;
}

.genres li {
  cursor: pointer;
}

.genres .active {
  font-weight: bold;
  background: #512764;
}

.profile-data img {
  width: 30px;
  border-radius: 50%;
}

.profile-data {
  border-bottom: #6F6E74 1px solid;
  padding-bottom: 5px;
}

.profile-data p, .profile-data img {
  margin: 0;
  padding: 0;
}

.profile-data .profile-email {
  font-size: x-small;
}

.search input {
  width: 95%;
}

</style>
