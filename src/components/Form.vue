<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-chip
        color="blue"
        class="white--text"
        small
        @click="dialog = true"
        v-if="icon == 'mdi-pencil'"
      >
        <v-icon small>{{ icon }}</v-icon>
      </v-chip>

      <v-btn
        color="blue-grey"
        class="ma-2 white--text"
        outlined
        v-bind="attrs"
        v-on="on"
        v-if="icon != 'mdi-pencil'"
      >
        <div
          class="d-none d-md-flex d-lg-none pt-0 pb-0 text-center float-center"
        >
          Add new
        </div>
        <v-icon>{{ icon }}</v-icon></v-btn
      >
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="rgba(3, 7, 15, 0.486)"
          ><strong>ADD NEW TASK</strong></v-toolbar
        >
        <v-card-text>
          <div>
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="title"
                      :rules="titleRules"
                      label="Title"
                      required
                    >
                      <v-icon slot="prepend">mdi-format-title</v-icon>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="computedDateFormatted"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="info"
                        v-model="date"
                        no-title
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" class="pb-0">
                    <v-textarea
                      outlined
                      height="100"
                      name="input-7-4"
                      label="Task description"
                      :value="description"
                      v-model="description"
                    ></v-textarea>
                  </v-col>

                  <v-col cols="12" class="section-style pa-5">
                    <h3 class="pb-2">Comments</h3>
                    <v-alert
                      shaped
                      dark
                      class="py-1"
                      dense
                      color="info"
                      v-for="(c, i) in comments"
                      :key="i"
                    >
                      {{ c }}

                      <v-icon class="float-right" @click="removeComment(i)"
                        >mdi-close-circle</v-icon
                      >
                    </v-alert>

                    <v-text-field v-model="comment" label="Comment">
                      <v-icon slot="prepend"> mdi-comment </v-icon>
                    </v-text-field>
                    <v-card-text class="text-center">
                      <v-divider class="mx-4" vertical></v-divider>
                      <v-btn small outlined color="info" @click="addComment()">
                        Add comment
                      </v-btn>
                    </v-card-text>
                  </v-col>

                  <v-col cols="12" class="section-style pa-5">
                    <h3 class="pb-5">Tags</h3>
                    <v-row>
                      <v-chip
                        class="ma-4"
                        color="info"
                        small
                        v-for="(t, i) in tags"
                        :key="i"
                      >
                        {{ t }}

                        <v-icon class="float-right ms-1" @click="removeTag(i)"
                          >mdi-close-circle</v-icon
                        >
                      </v-chip>
                    </v-row>

                    <v-text-field v-model="tag" label="Tag">
                      <v-icon slot="prepend"> mdi-tag </v-icon>
                    </v-text-field>
                    <v-card-text class="text-center">
                      <v-divider class="mx-4" vertical></v-divider>
                      <v-btn small outlined color="info" @click="addTag()">
                        Add tag
                      </v-btn>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </div></v-card-text
        >
        <v-card-actions class="justify-end">
          <v-btn text @click="addNewTask()">Submit</v-btn>
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>


<script>
import service from "../service/service";
export default {
  name: "Form",

  props: {
    icon: { type: String, required: true },
  },

  data: (vm) => ({
    valid: false,
    dialog: false,
    title: "",
    is_completed: 0,
    due_date: new Date(),
    tags: [],
    comments: [],
    description: "",
    comment: "",
    tag: "",
    titleRules: [(v) => !!v || "Title is required"],

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu2: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date(val) {
      console.log(val);
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
    async addNewTask() {
      if (this.title !== "") {
        let taskObj = {
          title: this.title,
          is_completed: this.is_completed,
          due_date: this.date,
          comments: this.comments.join(),
          description: this.description,
          tags: this.tags.join(),
        };
        console.log(taskObj);
        try {
          const response = await service.postTask(taskObj);
          console.log(response.data);
          this.dialog = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No ");
      }
      this.stepobj = {};
    },

    addComment() {
      if (this.comment) {
        this.comments.push(this.comment);
        this.comment = "";
      }
      console.log(this.comments);
    },

    addTag() {
      if (this.tag) {
        this.tags.push(this.tag);
        this.tag = "";
      }
      console.log(this.tags);
    },

    removeComment(pos) {
      this.comments.splice(pos, 1);
      this.comment = "";
    },

    removeTag(pos) {
      this.tags.splice(pos, 1);
      this.tag = "";
    },
    //Methods for date picker
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>




<style>
.section-style {
  background-color: rgba(3, 7, 15, 0.486);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
</style>