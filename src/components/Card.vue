<template>
  <div class="col-12 col-sm-6 col-md-4 div-parents">
    <v-card class="card-style div-parents" color="#142038">
      <v-card-title>
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

      <v-card-text
        v-if="due_date || comments || description"
        class="div-parents"
      >
        <div v-if="description">
          <h3>Description</h3>
          {{ description }}
        </div>
        <div class="mt-4" v-if="comments">
          <h3>Comments</h3>
          {{ comments }}
        </div>
      </v-card-text>
      <div class="text-subtitle-1 text-right mt-auto px-3 pb-2">
        {{ due_date }}
      </div>
      <div v-if="tags">
        <v-divider></v-divider>
        <v-card-text>
          <v-chip-group active-class="white--text" column>
            <v-chip small color="#4BCCDDD8" v-for="(t, i) in tags" :key="i"
              >{{ t }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
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