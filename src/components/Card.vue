<template>
  <div class="col-12 col-sm-6 col-md-4 div-parents">
    <v-card class="card-style div-parents" color="#142038">
      <v-card-title class="pb-0">
        <v-row class="justify-space-between">
          <v-col class="pt-0 ps-2">
            <p>{{ title }}</p>
          </v-col>

          <v-chip
            small
            class="float-right mt-2 me-2"
            :color="is_completed ? '#02C77B' : 'yellow'"
            outlined
            >{{ is_completed == 1 ? "Completed" : "Pending" }}
            <v-icon
              small
              v-if="is_completed"
              class="ms-2"
              :color="is_completed == 1 ? '02C77B' : 'yellow'"
            >
              mdi-check-circle
            </v-icon>
          </v-chip>
        </v-row>
      </v-card-title>
      <v-row class="justify-space-between ma-2 mt-0 align-content-end">
        <Form icon="mdi-pencil" />
        <div v-if="due_date">
          {{ due_date }}
        </div>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import Form from "./Form.vue";
export default {
  components: { Form },
  name: "Card",

  /**
   * Props card
   */
  props: {
    //Title propis required
    title: { type: String, required: true },
    //Completed prop is required
    is_completed: { type: Number, required: true },
    //The rest of the props are optionals
    due_date: String,
    comments: Array,
    description: String,
    tags: Array,
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  border-width: thin;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.226) !important;
  flex-grow: 1;
  margin: 0.5rem;
}
.div-parents {
  display: flex;
  flex-direction: column;
  padding: 0;
}
</style>