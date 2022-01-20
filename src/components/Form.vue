<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="blue-grey"
        class="ma-2 white--text"
        outlined
        v-bind="attrs"
        v-on="on"
      >
        Add new
        <v-icon class="ms-3">mdi-plus-circle</v-icon></v-btn
      >
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="#42b983" dark >Add new task</v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">Form!</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>


<script>
export default {
  name: "Form",
};
</script>

