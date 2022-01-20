<template>
  <div>
    <v-app-bar color="#161B22">
      <v-toolbar-title><strong>My TASKS</strong></v-toolbar-title>
      <v-spacer></v-spacer>
      <Form icon="mdi-plus-circle" />
      <v-btn color="blue-grey" class="ma-2 white--text" outlined>
        <div
          class="d-none d-md-flex d-lg-none pt-0 pb-0 text-center float-center"
        >
          Settings
        </div>
        <v-icon>mdi-cogs</v-icon>
      </v-btn>
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
