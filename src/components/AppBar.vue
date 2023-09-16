<template>
  <div>
    <v-app-bar color="#010409">
      <v-toolbar-title><strong>Mis notas</strong></v-toolbar-title>
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
