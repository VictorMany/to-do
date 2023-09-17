<template>
  <v-row class="pa-2 ma-0">
    <v-col
      cols="6"
      md="4"
      lg="3"
      class="pa-1"
      v-for="t in TASK_COMPUTED"
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
      <div v-if="TASK_COMPUTED.length === 0">
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

  // //Checking if tasks array has items to iterate
  // updated() {
  //   this.display = this.TASKS.length == 0;
  // },

  data: () => ({
    tasks: [],
    display: false,
  }),

  methods: {
    //get all the tasks method
    async getAllTasks() {
      try {
        const response = await service.getTasks();
        if (response.success) {
          this.$store.dispatch("addTasks", response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  //Computed methods for TASKS state
  computed: {
    TASK_COMPUTED() {
      return this.$store.state.tasks;
    },
  },
};
</script>
