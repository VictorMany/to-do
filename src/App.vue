<template>
  <v-app>
    <Form icon="mdi-plus-circle" />
    <v-main class="body-style main-container-app">
      <home msg="Bienvenido" />
    </v-main>
  </v-app>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
/**
* GLOBAL STYLES
*/

.body-style {
  background-color: #0d1117;
  height: 90vh;
  width: 100%;
}

/**scrollbar in different browsers */
::-webkit-scrollbar {
  margin-bottom: 0rem; /* remove default margin */
  scrollbar-width: none; /* Also needed to disable scrollbar Firefox */
  -ms-overflow-style: none; /* Disable scrollbar IE 10+ */
  overflow-y: scroll;
  width: 0px;
  background: transparent; /* Disable scrollbar Chrome/Safari/Webkit */
}

/**the word break with complete words in all the 'p' tags */
p {
  word-break: normal;
}

/**the style for the all the alerts inside the project */
.alert {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.main-container-app {
  overflow: scroll;
}

.main-container-app-bar {
  top: 0;
  position: fixed;
}
</style>

