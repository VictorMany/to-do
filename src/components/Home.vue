<template>
  <div class="home-cont-style">
    <!--The message welcome-->
    <v-row class="pa-0 ma-0">
      <v-col cols="12">
        <v-row no-gutters class="justify-space-between">
          <h1 class="styleh1">{{ msg }}</h1>
          <Form icon="mdi-plus-circle" />
        </v-row>
      </v-col>
      <v-col cols="12" md="6" class="pt-0">
        <v-text-field
          v-model="search"
          style="border-radius: 8px; font-size: 12px !important"
          label="Buscar notas"
          @input="setSearch()"
          dense
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        />
      </v-col>
      <v-col cols="12" class="pt-0 px-0 container-cards">
        <list />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import List from "./List.vue";
import Form from "./Form.vue";
import service from "../service/service";

export default {
  components: { List, Form },
  name: "Home",
  /**
   * Home props
   */
  props: {
    msg: String,
  },

  data: () => ({
    search: "",
    tasks: [],

    timeoutSearch: null,
    delaySearch: 500, // El tiempo que le dejas antes de volver a escribir de nuevo
  }),

  /**
   * Lifecycle methods
   */
  created() {
    this.tasks = this.$store.state.tasks;
  },

  methods: {
    setSearch() {
      clearTimeout(this.timeoutSearch);
      if (this.search === null) this.search = "";
      this.timeoutSearch = setTimeout(async () => {
        try {
          const response = await service.getTasksByName(this.search);
          if (response.success) {
            this.$store.dispatch("addTasks", response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }, this.delaySearch);
    },
  },

  //Computed methods for consulting the actual and the aux state for tasks
  computed: {
    TASKS() {
      return this.$store.state.tasks[0];
    },
    AUXTASKS() {
      return this.$store.state.auxTasks[0];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
//set typography to H1
.styleh1 {
  color: #30ffb3;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

/* Style DESKTOP screen */
@media all and (min-width: 701px) {
  .home-cont-style {
    padding-inline: 10%;
  }
}

.home-cont-style {
  position: fixed;
  width: 100vw;
}

.container-cards {
  height: 85vh !important;
  overflow: scroll;
}

@media screen and (max-width: 600px) {
  .container-cards {
    height: 79vh !important;
    overflow: scroll;
  }
}
</style>
