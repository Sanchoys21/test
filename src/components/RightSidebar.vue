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
    <div v-if="store.loaders.user" class="profile">
      <div class="loader-profile"></div>
    </div>
    <div v-else-if="profile" class="profile">
      <img :src="profile.image" alt="Profile picture">
      <div class="profile-data">
        <p class="profile-name"> {{ profile.firstName }} {{ profile.lastName }}</p>
        <p class="profile-email"> {{ profile.email }}</p>
      </div>
    </div>

    <div class="search">
      <input type="text" v-model="store.input" @input="search" placeholder="Search movies"/>
    </div>

    <div v-if="store.loaders.user" class="loader-genres"></div>
    <div v-else class="genres">
      <span class="title">genre</span>
      <div class="list">
        <div v-for="genre in genres"
             :key="genre.id"
             :class="{active: isActive(genre.id)}"
             @click="choose(genre.id)"
        >
          {{ genre.name }}
          <!--          <span v-if="isActive(genre.id)">✔</span><span v-else>+</span>-->
        </div>
      </div>
    </div>

  </aside>
</template>

<style scoped>
.sidebar-right {
  background: #1A171E;
  width: 15%;
  padding: 20px;
}

.genres {
  color: #b4b3b7;
}

.genres .title {
  font-size: xx-small;
  text-transform: uppercase;
}

.genres .list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.genres .list div {
  background-color: #0D0D0F;
  border-radius: 20px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
}

.genres .list div span {
  padding-left: 3px;
}

.genres .list .active {
  background: red;
  color: white;
}

.profile {
  display: flex;
}

.profile img {
  width: 30px;
  border-radius: 50%;
  padding-right: 5px;
}

.profile-data p, .profile-data img {
  margin: 0;
  padding: 0;
  font-size: small;
}

.profile-data .profile-email {
  font-size: x-small;
  color: #b4b3b7;
}

.search input {
  border: none;
  width: 80%;
  border-radius: 15px;
  background: #0D0D0F url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png') no-repeat 5% center;
  background-size: 25px;
  padding: 10px 2px 10px 40px;
  font-size: x-small;
  color: #b4b3b7;
}

.search {
  margin: 10px 0;
}

.loader-profile {
  width: 100%;
  height: 40px;
  animation: pulse 2s infinite;
  border-radius: 10px;
}

.loader-genres {
  height: 80%;
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
