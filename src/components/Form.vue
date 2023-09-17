<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <div class="btn-dialog" @click="getTask()" v-if="opened"></div>
      <v-btn
        v-if="icon == 'mdi-plus-circle'"
        color="blue-grey"
        class="ma-2 white--text pe-1 ps-1"
        outlined
        v-bind="attrs"
        v-on="on"
      >
        <div
          class="d-none d-md-flex d-lg-none text-center float-center font-weight-light white--text"
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
              is_completed.toString() == '0' && id
                ? (is_completed = 1)
                : (is_completed = 0)
            "
            small
            class="float-right ms-auto pe-2 ps-2"
            :class="
              is_completed.toString() == 1 ? 'white--text' : 'black--text'
            "
            :color="is_completed.toString() == 1 ? '#02C77B' : '#FFFB07'"
            >{{ is_completed.toString() == 1 ? "Completed" : "Pending" }}
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
                    label="Task details"
                    :value="details"
                    v-model="details"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="addNewTask()">{{
            id ? "Actualizar" : "Guardar"
          }}</v-btn>
          <v-btn text @click="dialog.value = false">Cerrar</v-btn>
        </v-card-actions>
        <v-snackbar v-model="alert" :timeout="timeout" shaped elevation="24">
          {{ msg }}
        </v-snackbar>
      </v-card>
    </template>
  </v-dialog>
</template>


<script>
//Service endpoints
import service from "../service/service";

export default {
  name: "Form",
  /**
   * Form props
   */
  props: {
    icon: { type: String },
    id: { type: Number },
    opened: { type: Boolean },
  },

  /**
   * Lifecycle methods
   */
  created() {
    //seting the editMode of the form
    if (this.icon === "mdi-plus-circle") {
      this.editMode = true;
    }
  },

  // updated() {
  //   //Calling function to consult the detail of a single task
  //   if (this.dialog == true) {
  //     //this.getTask();
  //     this.tasks = this.$store.state.tasks;
  //   }
  //   //Close dialog and execute the resetForm function
  //   if (this.dialog == false) {
  //     this.editMode = false;
  //     //wait one second after close form
  //     setTimeout(() => this.resetForm(), 100);
  //   }
  //   //seting the editMode of the form
  //   if (this.icon === "mdi-plus-circle") {
  //     this.editMode = true;
  //   }
  // },

  //data variable required for the form component
  data: (vm) => ({
    comments: [],
    tasks: [],
    tags: [],
    alert: false,
    editMode: false,
    valid: false,
    dialog: false,
    msg: "",
    title: "",
    is_completed: 0,
    details: "",
    comment: "",
    tag: "",

    timeout: 2000,

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
    TASK_COMPUTED: {
      get() {
        return this.$store.state.tasks;
      },
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
    //reset the form
    resetForm() {
      this.title = "";
      this.is_completed = 0;
      this.comments = [];
      this.details = "";
      this.tags = [];
      this.tag = "";
      this.comment = "";
    },

    /**
     * @id checks if is a new task or is editing one
     * @title allows to know if the variable title is not null
     * the array variables are turned into string variables
     */

    //Add new task
    async addNewTask() {
      if (this.id) {
        //if is an edit task
        this.updateTask();
      } else {
        if (this.title !== "") {
          let taskObj = {
            title: this.title,
            is_completed: this.is_completed,
            due_date: this.date,
            details: this.details ? this.details : null,
          };

          try {
            const response = await service.postTask(taskObj);
            //Checking if the response is success
            if (response.success) {
              //updating the state
              this.$store.dispatch("addOneTask", response.data);

              this.alert = true;
              this.msg = "La nota se agregó";
              setTimeout(() => {
                this.alert = false;
                this.msg = "";
              }, 2000);
            }
          } catch (error) {
            this.alert = true;
            this.msg = "An error has ocurred " + error;
            setTimeout(() => {
              this.alert = false;
              this.msg = "";
            }, 2000);
          }
        } else {
          this.alert = true;
          this.msg = "Title is required";
          setTimeout(() => ((this.alert = false), (this.msg = "")), 2000);
        }
      }
    },

    //Update a task
    async updateTask() {
      if (this.title !== "") {
        let taskObj = {
          id: this.id,
          title: this.title,
          is_completed: this.is_completed,
          due_date: this.date,
          comments: this.comments.length > 0 ? this.comments.join() : "",
          details: this.details ? this.details : null,
          tags: this.tags.length > 0 ? this.tags.join() : "",
        };

        try {
          const response = await service.updateTask(taskObj);
          //Checking if the response is success
          if (response.data.detail === "Éxito al actualizar la tarea") {
            this.tasks[0].map((e, i) => {
              if (e.id == this.id) {
                this.tasks[0][i] = {
                  ...this.tasks[0][i],
                  ...response.data.task,
                };
              }
            });
            //updating the state
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

    //Get the complete detail of a task
    async getTask() {
      if (this.id) {
        try {
          const response = await service.getTask(this.id);
          let data = response.data[0];
          if (response.data[0]) {
            //Turning the tags into array variable
            if (data.tags) {
              if (data.tags.includes(",")) {
                this.tags = data.tags.split(",");
              } else {
                this.tags.push(data.tags);
              }
            }
            //Turning the tags into array variable
            if (data.comments) {
              if (data.comments.includes(",")) {
                this.comments = data.comments.split(",");
              } else {
                this.comments.push(data.comments);
              }
            }
            this.title = data.title;
            this.details = data.details;
            this.is_completed = data.is_completed;
            this.date = data.due_date;
          }
        } catch (error) {
          this.alert = true;
          this.msg = "An error has ocurred " + error;
          setTimeout(() => ((this.alert = false), (this.msg = "")), 2000);
        }
        this.dialog = true;
      }
    },

    //Delete a task by id
    async deleteTask() {
      if (this.id) {
        try {
          const response = await service.deleteTask(this.id);
          //Checking if the response is success
          if (response.data.detail === "Éxito al eliminar la tarea") {
            this.tasks = this.$store.state.tasks;
            this.tasks[0].map((e, i) => {
              if (e.id === this.id) {
                this.tasks[0].splice(i, 1);
              }
            });
            //updating the state
            this.$store.dispatch("addTasks", this.tasks);
          }
        } catch (error) {
          this.alert = true;
          this.msg = "Ocurrió un error " + error;
          setTimeout(() => ((this.alert = false), (this.msg = "")), 2000);
        }
      }
    },

    //Pushing a comment to the comments for the detail task
    addComment() {
      if (this.comment) {
        this.comments.push(this.comment);
        this.comment = "";
      }
    },

    //Pushing a tag to the tags for the detail task
    addTag() {
      if (this.tag) {
        this.tags.push(this.tag);
        this.tag = "";
      }
    },

    //Removing comments with the position in array
    removeComment(pos) {
      this.comments.splice(pos, 1);
      this.comment = "";
    },

    //Removing tags with the position in array
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

    //Parsing date with the required format
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>

<style lang="scss" scoped>
// style of the section inside of the Form
.section-style {
  background-color: rgba(3, 7, 15, 0.486);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

// style of btn-dialog when is needed to cover the full of the parent
.btn-dialog {
  width: 100%;
  height: 100%;
}
</style>