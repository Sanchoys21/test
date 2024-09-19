<script>
export default {
  name: "Film-card",
  props: {
    title: String,
    year: String,
    image: String
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
    </div>
  </div>
</template>

<style scoped>
.card {
  flex: 0 0 auto;
  border: 1px solid #000;
  border-radius: 10px;
  width: 250px;
  height: 140px;
  background: rgba(0, 0, 0, 0.35) var(--background-image);
  background-blend-mode: darken;
  background-size: contain;
}

.content {
  padding: 80px 20px 0 20px;
}

.card h3, .card p {
  padding: 0;
  margin: 0;
}

</style>