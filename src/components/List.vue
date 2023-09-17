<template>
  <div>
    <v-row class="pa-2 ma-0">
      <v-col cols="6" md="4" class="pa-1">
        <div v-for="(t, index) in TASK_COMPUTED" :key="t._id" class="pb-1">
          <card
            v-if="index % 2 == 0"
            :id="t._id"
            :title="t.title"
            :is_completed="t.is_completed"
            :details="t.details"
            :due_date="t.due_date"
          />
        </div>
      </v-col>
      <v-col cols="6" md="4" class="pa-1">
        <div v-for="(t, index) in TASK_COMPUTED" :key="t._id" class="pb-1">
          <card
            v-if="index % 2 != 0"
            :id="t._id"
            :title="t.title"
            :is_completed="t.is_completed"
            :details="t.details"
            :due_date="t.due_date"
          />
        </div>
      </v-col>
    </v-row>
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
