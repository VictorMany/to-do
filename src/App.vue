<template>
  <v-app>
    <app-bar />
    <v-main class="body-style">
      <home msg="Welcome to your tasks"/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import Home from "./components/Home.vue";

export default {
  name: "App",

  components: {
    AppBar,
    Home,
  },

  data: () => ({
    //
  }),
};
</script>


<style>
.body-style {
  background-color: #0D1117;
  height: 100%;
  width: 100%;
}
</style>