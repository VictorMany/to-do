<template>
  <v-app>
    <app-bar />
    <v-main class="body-style">
      <home msg="Welcome" />
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
  background-color: #0d1117;
  height: 100%;
  width: 100%;
}

::-webkit-scrollbar {
  margin-bottom: 0rem; /* remove default margin */
  scrollbar-width: none; /* Also needed to disable scrollbar Firefox */
  -ms-overflow-style: none; /* Disable scrollbar IE 10+ */
  overflow-y: scroll;
  width: 0px;
  background: transparent; /* Disable scrollbar Chrome/Safari/Webkit */
}

p {
  word-break: normal;
}

.alert {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

