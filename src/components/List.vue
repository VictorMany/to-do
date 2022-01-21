<template>
  <div>
    <v-row no-gutters>
      <card
        v-for="t in TASKS"
        :key="t.id"
        :id="t.id"
        :title="t.title"
        :is_completed="t.is_completed"
        :comments="t.comments"
        :description="t.description"
        :due_date="t.due_date"
        :tags="t.tags"
      />
    </v-row>
    <!--Rendering other component for no tasks-->
    <div v-if="display">
      <h4 class="text-center">No tasks !</h4>
    </div>
  </div>
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
        if (response.data) {
          this.tasks = response.data;
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
