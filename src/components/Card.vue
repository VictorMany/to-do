<template>
  <v-card class="card-style d-flex flex-column" height="100%">
    <v-card-title class="font-weight-normal px13 pb-2">
      {{ title }}
    </v-card-title>
    <v-card-text class="font-weight-light px12">
      {{ details }}
    </v-card-text>
    <v-card-actions v-if="due_date" class="font-weight-light px12 mt-auto">
      <v-row class="pa-0 ma-0">
        <v-col cols="auto ms-auto pt-0 pb-1 date-style">
          {{ getCurrentDate(due_date) }}
        </v-col>
      </v-row>
    </v-card-actions>
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
    due_date: { type: String, required: false },
    //Completed prop is required
    //The rest of the props are optionals
  },

  methods: {
    getCurrentDate(dueDate) {
      const fechaOriginal = new Date(dueDate);
      // Suma un día a la fecha original
      fechaOriginal.setDate(fechaOriginal.getDate() + 1);

      return new Date(fechaOriginal).toDateString();
    }
  },
};
</script>

<style lang="scss" scoped>
// CARD style
.card-style {
  border-width: thin;
  border-style: solid;
  border-radius: 12px;
  cursor: pointer; user-select: none;

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

.px12 {
  font-size: 12px;
  word-break: normal;
  line-height: 16px;
}

.px13 {
  font-size: 13px;
  word-break: normal;
  line-height: 16px;
}

.date-style {
  color: rgb(191, 191, 191);
}
</style>