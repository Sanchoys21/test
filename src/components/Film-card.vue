<script>
export default {
  name: "FilmCard",
  props: {
    title: String,
    year: String,
    image: String,
    description: String,
    rating: Number,
    size: {
      validator: (value, props) => {
        return ['small', 'medium', 'large'].includes(value);
      },
      default: 'medium'
    }
  }
}
</script>

<template>
  <div class="card" :class="size">
    <img :src="image" alt="poster"/>
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
  overflow: hidden;
  font-size: small;
}

.card img {
  border-radius: 10px;
  filter: brightness(70%);
  height: 100%;
}

.small img {
  width: 125px;
  height: 125px;
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

.card .description {
  max-height: 0;
  opacity: 0;
  transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.large:hover .description {
  opacity: 1;
  max-height: 200px;
}

.card h3, .card p {
  padding: 0;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
