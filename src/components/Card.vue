<template>
  <div class="col-12 col-sm-6 col-md-6 div-parents">
    <v-card class="card-style div-parents" color="#0F477C11">
      <v-card-title class="pb-0 mb-0">
        <v-row class="justify-space-between">
          <v-col class="pt-0 ps-2 pb-0 font-weight-light">
            <p>{{ title }}</p>
          </v-col>
          <v-chip
            small
            class="float-right mt-2 me-2 pe-1 ps-2"
            :color="is_completed.toString() == '1' ? '#02C77B' : 'yellow'"
            outlined
            >{{ is_completed.toString() == "1" ? "Completed" : "Pending" }}
            <v-icon
              v-if="is_completed.toString() != '0'"
              small
              class="ms-2"
              :color="is_completed.toString() == '1' ? '#02C77B' : 'yellow'"
            >
              mdi-check-circle
            </v-icon>
          </v-chip>
        </v-row>
      </v-card-title>
      <div
        v-if="due_date"
        class="text--secondary text-start ps-3 pb-2 font-weight-thin date-style"
      >
        {{ due_date }}
      </div>
      <v-overlay absolute color="#00000000" class="div-overlay">
        <v-col cols="12" class="detail-style">
          <Form :id="id" :opened="true" />
        </v-col>
      </v-overlay>
    </v-card>
  </div>
</template>

<script>
import Form from "./Form.vue";
export default {
  components: { Form },
  name: "Card",

  data: () => ({
    msg: "",
  }),

  /**
   *  card props
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
};
</script>

<style lang="scss" scoped>
// CARD style
.card-style {
  border-width: thin;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.226) !important;
  flex-grow: 1;
  margin: 0.5rem;
}

// allow full height for content child
.div-parents {
  display: flex;
  flex-direction: column;
  padding: 0;
}

// the date typografy
.date-style {
  font-size: 12px;
}

// Full height and width for the child div
.detail-style {
  width: 560px;
  height: 100px;
}

// allows to hide the overflow child content
.div-overlay {
  overflow: hidden;
}
</style>