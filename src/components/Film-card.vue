<script>
export default {
  name: "FilmCard",
  props: {
    title: String,
    year: String,
    image: String,
    description: String,
  },
  computed: {
    style() {
      return {
        '--background-image': 'url(' + this.image + ')'
      }
    }
  }
}
</script>

<template>
  <div class="card" :style="style">
    <div class="content">
      <h3 class="title">{{ title }}</h3>
      <p class="year">{{ year }}</p>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  flex: 0 0 auto;
  border: 1px solid #000;
  border-radius: 10px;
  width: 500px;
  height: 281px;
  background: rgba(0, 0, 0, 0.35) var(--background-image);
  background-blend-mode: darken;
  position: relative;
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
