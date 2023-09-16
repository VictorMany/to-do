<template>
  <v-row class="pa-0 ma-0">
    <v-col
      cols="12"
      md="6"
      lg="4"
      v-for="t in TASKS"
      :key="t._id"
    >
      <card
        :id="t._id"
        :title="t.title"
        :is_completed="t.is_completed"
        :details="t.details"
        :due_date="t.due_date"
      />
      <!--Rendering other component for no tasks-->
      <div v-if="display">
        <h4 class="text-center">No tasks !</h4>
      </div>
    </v-col>
  </v-row>
</template>

<script>
//Imports
import Card from "./Card.vue";
import service from "../service/service";

export default {
  name: "List",
  components: { Card },
  /**
   * Lifecycle methods
   */

  //Calling get all the tasks
  created() {
    this.getAllTasks();
  },

  //Checking if tasks array has items to iterate
  updated() {
    this.display = this.TASKS["length"] == 0;
  },

  data: () => ({
    tasks: [],
    display: false,
  }),

  methods: {
    //get all the tasks method
    async getAllTasks() {
      try {
        const response = await service.getTasks();
        console.log("LA DATA", response);
        if (response) {
          this.tasks = response;
          this.$store.dispatch("addTasks", this.tasks);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  //Computed methods for TASKS state
  computed: {
    TASKS() {
      return this.$store.state.tasks[0];
    },
  },
};
</script>
