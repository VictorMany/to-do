<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-col cols="12" class="btn-dialog" @click="dialog = true" v-if="opened">
      </v-col>

      <v-btn
        v-if="icon == 'mdi-plus-circle'"
        color="blue-grey"
        class="ma-2 white--text pe-1 ps-1"
        outlined
        v-bind="attrs"
        v-on="on"
      >
        <div
          class="
            d-none d-md-flex d-lg-none
            pt-0
            pb-0
            text-center
            float-center
            font-weight-light
            white--text
          "
        >
          Add new
        </div>
        <v-icon color="white" class="pa-1">{{ icon }}</v-icon></v-btn
      >
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="rgba(3, 7, 15, 0.486)">
          <v-chip
            v-if="opened"
            color="blue"
            outlined
            class="white--text ms-2"
            small
            @click="deleteTask()"
          >
            <v-icon small>mdi-trash-can</v-icon>
          </v-chip>
          <v-chip
            v-if="opened"
            color="blue"
            :outlined="!editMode"
            class="white--text ms-2"
            small
            @click="editMode = !editMode"
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-chip>
          <v-chip
            @click="
              is_completed == 0 && id ? (is_completed = 1) : (is_completed = 0)
            "
            small
            class="float-right ms-auto black--text pe-2 ps-2"
            :color="is_completed ? '#02C77B' : '#FFFB07'"
            >{{ is_completed == 1 ? "Completed" : "Pending" }}
            <v-icon v-if="is_completed" class="ms-2"> mdi-check-circle </v-icon>
          </v-chip>
        </v-toolbar>
        <v-card-text class="pa-1">
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="title"
                    :rules="titleRules"
                    label="Title"
                    required
                    :readonly="!editMode"
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
                      :readonly="!editMode"
                      v-model="date"
                      no-title
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" class="pb-0">
                  <v-textarea
                    outlined
                    :readonly="!editMode"
                    height="100"
                    name="input-7-4"
                    label="Task description"
                    :value="description"
                    v-model="description"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" class="section-style pa-5">
                  <h3 class="pb-2">Comments</h3>
                  <v-row class="py-1">
                    <v-chip
                      class="ma-4 pe-2"
                      color="info"
                      v-for="(c, i) in comments"
                      :key="i"
                    >
                      {{ c }}
                      <v-icon
                        v-if="editMode"
                        class="float-right ms-1"
                        @click="removeComment(i)"
                        >mdi-close-circle</v-icon
                      >
                    </v-chip>
                  </v-row>

                  <v-text-field
                    v-if="editMode"
                    v-model="comment"
                    label="Comment"
                  >
                    <v-icon slot="prepend"> mdi-comment </v-icon>
                  </v-text-field>
                  <v-card-text v-if="editMode" class="text-center">
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
                      class="ma-4 pe-2"
                      color="info"
                      small
                      v-for="(t, i) in tags"
                      :key="i"
                    >
                      {{ t }}

                      <v-icon
                        small
                        class="float-right ms-1"
                        @click="removeTag(i)"
                        v-if="editMode"
                        >mdi-close-circle</v-icon
                      >
                    </v-chip>
                  </v-row>

                  <v-text-field v-if="editMode" v-model="tag" label="Tag">
                    <v-icon slot="prepend"> mdi-tag </v-icon>
                  </v-text-field>
                  <v-card-text v-if="editMode" class="text-center">
                    <v-divider class="mx-4" vertical></v-divider>
                    <v-btn small outlined color="info" @click="addTag()">
                      Add tag
                    </v-btn>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="addNewTask()">{{
            id ? "UPDATE" : "PUBLISH"
          }}</v-btn>
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
        <div class="alert">
          <v-alert border="bottom" dark v-model="alert" color="warning">
            {{ msg }}
          </v-alert>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>


<script>
import service from "../service/service";
export default {
  name: "Form",
  props: {
    icon: { type: String },
    id: { type: Number },
    opened: { type: Boolean },
  },

  created() {
    if (this.icon === "mdi-plus-circle") {
      this.editMode = true;
    }
  },

  updated() {
    if (this.dialog == true) {
      this.getTask(this.id);
      this.tasks = this.$store.state.tasks;
    }
    if (this.dialog == false) {
      this.resetForm();
      this.editMode = false;
    }
  },

  data: (vm) => ({
    tasks: [],
    alert: false,
    editMode: false,
    msg: "",
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
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
    resetForm() {
      this.title = "";
      this.is_completed = 0;
      this.comments = [];
      this.description = "";
      this.tags = [];
    },

    async addNewTask() {
      if (this.id) {
        this.updateTask();
      } else {
        if (this.title !== "") {
          let taskObj = {
            title: this.title,
            is_completed: this.is_completed,
            due_date: this.date,
            comments: this.comments.length > 0 ? this.comments.join() : null,
            description: this.description ? this.description : null,
            tags: this.tags.length > 0 ? this.tags.join() : null,
          };
          try {
            const response = await service.postTask(taskObj);
            if (response.data.detail === "Éxito al crear la tarea") {
              this.tasks[0].push(response.data.task);
              this.$store.dispatch("addTasks", this.tasks);
              this.dialog = false;
            }
          } catch (error) {
            this.alert = true;
            this.msg = "An error has ocurred " + error;
            setTimeout(() => ((this.alert = false), (this.msg = "")), 2000);
          }
        } else {
          this.alert = true;
          this.msg = "Title is required";
          setTimeout(() => ((this.alert = false), (this.msg = "")), 2000);
        }
      }
    },

    async updateTask() {
      if (this.title !== "") {
        let taskObj = {
          id: this.id,
          title: this.title,
          is_completed: this.is_completed,
          due_date: this.date,
          comments: this.comments.length > 0 ? this.comments.join() : null,
          description: this.description ? this.description : null,
          tags: this.tags.length > 0 ? this.tags.join() : null,
        };
        try {
          const response = await service.updateTask(taskObj);
          if (response.data.detail === "Éxito al actualizar la tarea") {
            this.tasks[0].map((e, i) => {
              if (e.id == this.id) {
                this.tasks[0][i] = {
                  ...this.tasks[0][i],
                  ...response.data.task,
                };
              }
            });
            this.$store.dispatch("addTasks", this.tasks);
            this.dialog = false;
          }
        } catch (error) {
          this.alert = true;
          this.msg = "An error has ocurred " + error;
          setTimeout(() => ((this.alert = false), (this.msg = "")), 2000);
        }
      } else {
        this.alert = true;
        this.msg = "Title is required";
        setTimeout(() => ((this.alert = false), (this.msg = "")), 2000);
      }
    },

    async getTask() {
      if (this.id) {
        try {
          const response = await service.getTask(this.id);
          let data = response.data[0];

          if (response.data[0]) {
            if (data.tags) {
              if (data.tags.includes(",")) {
                this.tags = data.tags.split(",");
              } else {
                this.tags.push(data.tags);
              }
            }
            if (data.comments) {
              if (data.comments.includes(",")) {
                this.comments = data.comments.split(",");
              } else {
                this.comments.push(data.comments);
              }
            }
            this.title = data.title;
            this.description = data.description;
            this.is_completed = data.is_completed;
            this.date = data.due_date;
          }
        } catch (error) {
          this.alert = true;
          this.msg = "An error has ocurred " + error;
          setTimeout(() => ((this.alert = false), (this.msg = "")), 2000);
        }
      }
    },

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

    addComment() {
      if (this.comment) {
        this.comments.push(this.comment);
        this.comment = "";
      }
    },

    addTag() {
      if (this.tag) {
        this.tags.push(this.tag);
        this.tag = "";
      }
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

.btn-dialog {
  width: 100%;
  height: 100%;
}
</style>