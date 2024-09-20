<script>
export default {
  name: "FilmCard",
  props: {
    title: String,
    year: String,
    image: String,
    description: String,
    rating: Number,
  }
}
</script>

<template>
  <div class="card">
    <img :src="image" alt="poster"/>
    <div class="content">
      <h3 class="title">{{ title }}</h3>
      <p class="year">{{ year }}</p>
      <p class="rating">Rating: {{ rating }}</p>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  flex: 0 0 auto;
  width: 500px;
  height: 281px;
  position: relative;
}

.card img {
  border-radius: 10px;
  filter: brightness(70%);
}

.content {
  position: absolute;
  bottom: 0;
  padding: 5%;
  width: 90%;
}

.description {
  max-height: 0;
  opacity: 0;
  transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.card:hover .description {
  opacity: 1;
  max-height: 200px;
}

.card h3, .card p {
  padding: 0;
  margin: 0;
}

</style>
