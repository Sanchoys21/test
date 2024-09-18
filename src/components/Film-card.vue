<script>
export default {
  name: "Film-card",
  props: {
    title: String,
    year: Number
  }
}
</script>

<template>
  <div class="card">
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
  height: 100px;
  padding: 100px 20px 20px 20px;
  background: gray;
}
.card h1, .card p {
  padding: 0;
  margin: 0;
}

</style>