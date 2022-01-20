<template>
  <div>
    <v-row no-gutters>
      <card
        v-for="(t, i) in tasks"
        :key="i"
        :title="t.title"
        :is_completed="t.is_completed"
        :comments="t.comments"
        :description="t.description"
        :due_date="t.due_date"
        :tags="t.tags"
      />
    </v-row>
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
  data: () => ({
    tasks: [],
  }),

  methods: {
    async getAllTasks() {
      try {
        const response = await service.getTasks();
        console.log(response.data);
        this.tasks = response.data;
        console.log(response.data, "HERE");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="css">
</style>