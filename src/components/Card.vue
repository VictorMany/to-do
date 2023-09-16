<template>
    <v-card class="card-style" height="100%">
      <v-card-title>
        <v-row class="justify-space-between" no-gutters>
          <v-col class="font-weight-light">
            <p>{{ title }}</p>
          </v-col>
          <v-col cols="12" class="font-weight-light px10">
            {{ details }}
          </v-col>
        </v-row>
      </v-card-title>
      <!-- <div
        v-if="due_date"
        class="text--secondary text-start ps-3 pb-2 font-weight-thin date-style"
      >
        {{ due_date }}
      </div>
      <v-overlay absolute color="#00000000" class="div-overlay">
        <v-col cols="12" class="detail-style">
          <Form :id="id" :opened="true" />
        </v-col>
      </v-overlay> -->
    </v-card>
</template>

<script>
// import Form from "./Form.vue";
export default {
  // components: { Form },
  name: "Card",

  data: () => ({
    msg: "",
  }),

  /**
   *  card props
   */

  props: {
    //Title propis required
    id: { type: String, required: true },
    details: { type: String, required: true },
    //Title propis required
    title: { type: String, required: true },
    //Completed prop is required
    //The rest of the props are optionals
  },
};
</script>

<style lang="scss" scoped>
// CARD style
.card-style {
  border-width: thin;
  border-style: solid;
  border-radius: 12px;

  background: rgba(31, 31, 40, 0.709);
  backdrop-filter: blur(2px);
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

.px10 {
  font-size: 12px;
  word-break: normal;
  line-height: 16px;
}
</style>