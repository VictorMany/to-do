<template>
  <div class="home-cont-style">
    <!--The message welcome-->
    <h1 class="styleh1">{{ msg }}</h1>
    <v-row class="mb-2">
      <v-col cols="12" md="6" class="ps-5 pe-5"
        ><v-text-field
          v-model="search"
          label="Type task title"
          dark
          @input="setSearch()"
          dense
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field
      ></v-col>
    </v-row>
    <list />
  </div>
</template>

<script>
import List from "./List.vue";
export default {
  components: { List },
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
  }),

  /**
   * Lifecycle methods
   */
  created() {
    this.tasks = this.$store.state.tasks;
  },

  methods: {
    /**
     * @setSearch
     * 1-. Get all the aux tasks array and seting to the tasks array (refill all tasks)
     * 2-. If search is not null, then start the filtering the actual state tasks, so it can be reflected in other components
     * 3-. Set the filtered tasks to the tasks state
     */
    setSearch() {
      this.$store.dispatch("searchTasks", this.AUXTASKS);
      if (this.search == null) {
        this.$store.dispatch("searchTasks", this.AUXTASKS);
      } else {
        this.tasks = this.TASKS.filter((e) => {
          if (e.title.toLowerCase().includes(this.search.toLowerCase()))
            return e;
        });
        this.$store.dispatch("searchTasks", this.tasks);
      }
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
  color: #42b983;
  margin: 1rem;
}

/* Style DESKTOP screen */
@media all and (min-width: 701px) {
  .home-cont-style {
    padding-top: 10px;
    padding-inline: 10%;
  }
}

/* Style MOBILE screen */
@media all and (max-width: 701px) {
  .home-cont-style {
    padding: 10px;
  }
}
</style>
