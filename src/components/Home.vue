<template>
  <div class="home-cont-style">
    <h1>{{ msg }}</h1>

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
  props: {
    msg: String,
  },
  data: () => ({
    search: "",
    tasks: [],
  }),

  created() {
    this.tasks = this.$store.state.tasks;
  },

  methods: {
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
<style scoped>
h1 {
  color: #42b983;
  margin: 1rem;
}

/* Style dekstop screen */
@media all and (min-width: 701px) {
  .home-cont-style {
    padding-top: 10px;
    padding-inline: 10%;
  }
}

@media all and (max-width: 701px) {
  .home-cont-style {
    padding: 10px;
  }
}

.w-100 {
  width: 100%;
}
</style>
