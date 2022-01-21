<template>
  <div class="col-12 col-sm-6 col-md-6 div-parents">
    <v-card class="card-style div-parents" color="#0F477C11">
      <v-card-title class="pb-0">
        <v-row class="justify-space-between">
          <v-col class="pt-0 ps-2">
            <p>{{ title }}</p>
          </v-col>

          <v-chip
            small
            class="float-right mt-2 me-2 pe-1 ps-2"
            :color="is_completed.toString() == '1' ? '#02C77B' : 'yellow'"
            outlined
            >{{ is_completed.toString() == "1" ? "Completed" : "Pending" }}
            <v-icon
              v-if="is_completed"
              small
              class="ms-2"
              :color="is_completed.toString() == '1' ? '#02C77B' : 'yellow'"
            >
              mdi-check-circle
            </v-icon>
          </v-chip>
        </v-row>
      </v-card-title>
      <v-row class="justify-space-between ma-2 mt-0 align-content-end">
        <div>
          <Form :id="id" icon="mdi-pencil" />
          <v-chip
            color="blue"
            outlined
            class="white--text ms-2"
            small
            @click="deleteTask()"
          >
            <v-icon small>mdi-trash-can</v-icon>
          </v-chip>
        </div>
        <div v-if="due_date" class="text--secondary">
          {{ due_date }}
        </div>
      </v-row>
      <div class="alert">
        <v-alert border="bottom" dark v-if="alert" color="warning">
          {{ msg }}
        </v-alert>
      </div>
    </v-card>
  </div>
</template>

<script>
import service from "../service/service";
import Form from "./Form.vue";
export default {
  components: { Form },
  name: "Card",

  data: () => ({
    tasks: [],
    alert: false,
    msg: "",
  }),
  /**
   * Props card
   */
  props: {
    //Title propis required
    id: { type: Number, required: true },
    //Title propis required
    title: { type: String, required: true },
    //Completed prop is required
    is_completed: { required: true },
    //The rest of the props are optionals
    due_date: String,
  },

  methods: {
    async deleteTask() {
      if (this.id) {
        try {
          const response = await service.deleteTask(this.id);
          if (response.data.detail === "Éxito al eliminar la tarea") {
            this.tasks = this.$store.state.tasks;
            this.tasks[0].map((e, i) => {
              if (e.id === this.id) {
                this.tasks[0].splice(i, 1);
              }
            });
            this.$store.dispatch("addTasks", this.tasks);
          }
        } catch (error) {
          this.alert = true;
          this.msg = "Ocurrió un error " + error;
          setTimeout(() => ((this.alert = false), (this.msg = "")), 2000);
        }
      }
    },
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