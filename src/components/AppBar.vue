<template>
  <div>
    <v-app-bar color="#161B22">
      <v-toolbar-title><strong>My TASKS</strong></v-toolbar-title>
      <v-spacer></v-spacer>
      <Form icon="mdi-plus-circle" />
    </v-app-bar>
  </div>
</template>

<script>
import Form from "./Form.vue";
export default {
  components: { Form },
  name: "AppBar",
};
</script>
