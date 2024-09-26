<script>
import {useMovieStore} from "@/stores/movies.js";

export default {
  name: "FilmCard",
  props: {
    title: String,
    year: String,
    image: String,
    description: String,
    rating: Number,
    size: {
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value);
      },
      default: 'medium'
    },
  },
  data() {
    return {
      isLoading: true,
      imageDataUrl: null,
    };
  },
  mounted() {
    this.loadImage();
  },
  methods: {
    async loadImage() {
      try {
        const store = useMovieStore();

        if (this.image === null) {
          this.isLoading = false;
          return
        }

        const response = await fetch("https://image.tmdb.org/t/p/w500" + this.image);
        if (!response.ok) {
          store.goToErrorPage(response.status)
        }

        const blob = await response.blob();
        this.imageDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        store.goToErrorPage(error)
      } finally {
        this.isLoading = false;
      }
    },
  },
}
</script>

<template>
  <div class="card" :class="size">
    <div class="loader" v-if="isLoading">
    </div>
    <img v-if="!isLoading" :src="imageDataUrl" alt="poster"/>
    <div class="content">
      <h3 class="title">{{ title }}</h3>
      <p class="year">{{ year }}</p>
      <p class="rating">{{ rating }}</p>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  flex: 0 0 auto;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
}

.loader {
  position: absolute;
  height: 100%;
  width: 100%;
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

.large {
  width: 500px;
  height: 281px;
}

.medium {
  width: 250px;
  height: 140px;
  font-size: small;
}

.small {
  width: 125px;
  height: 125px;
  font-size: small;
}

.card img {
  border-radius: 10px;
  filter: brightness(70%);
  height: 100%;
}

.small img {
  width: 125px;
  object-fit: cover;
}

.content {
  position: absolute;
  bottom: 0;
  padding: 5%;
  width: 90%;
}

.rating {
  font-weight: bold;
}

.card h3, .card p {
  padding: 0;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card .description {
  max-height: 0;
  opacity: 0;
  transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
  white-space: unset;
}

.large:hover .description {
  opacity: 1;
  max-height: 200px;
}

</style>
