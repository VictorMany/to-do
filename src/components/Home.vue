<template>
  <div class="home-cont-style">
    <h1>{{ msg }}</h1>
    <list />
  </div>
</template>

<script>
import List from "./List.vue";
export default {
  components: { List },
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
  margin: 1rem;
}

/* Style dekstop screen */
@media all and (min-width: 701px) {
  .home-cont-style {
    padding: 34px;
    padding-top: 10px;
  }
}

@media all and (max-width: 701px) {
  .home-cont-style {
    padding: 10px;
  }
}
</style>
