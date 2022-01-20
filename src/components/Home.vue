<template>
  <div class="home-cont-style">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {
    console.log(this.msg);
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}

.home-cont-style {
  padding: 34px;
}
</style>
