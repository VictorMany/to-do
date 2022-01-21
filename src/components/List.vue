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

    <div v-if="display">
      <h4 class="text-center">No tasks yet !</h4>
      <p class="text-center mt-3">Create one :)</p>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import service from "../service/service";

export default {
  name: "List",
  components: { Card },
  created() {
    this.getAllTasks();
  },
  updated() {
    this.display = this.TASKS["length"] == 0;
  },
  data: () => ({
    tasks: [],
    display: false,
  }),

  methods: {
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
  computed: {
    TASKS() {
      return this.$store.state.tasks[0];
    },
  },
};
</script>
