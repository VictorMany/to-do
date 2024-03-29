<template>
  <v-dialog v-model="OPEN_EDIT" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <!-- <div class="btn-dialog" @click="getTask()" v-if="opened"></div> -->
      <v-fab-transition>
        <v-btn
          v-bind="attrs"
          v-on="on"
          @click="resetForm"
          color="#F59762"
          style="
            bottom: 30px;
            right: 30px;
            z-index: 100;
            border-radius: 12px;
            box-shadow: 10px 10px 25px 10px rgba(0, 0, 0, 0.1);
          "
          width="47"
          height="47"
          fab
          absolute
          bottom
          right
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>
    <template v-slot:default="OPEN_EDIT">
      <v-card style="border-radius: 8px" class="form-card">
        <v-toolbar color="rgba(3, 7, 15, 0.486)">
          <v-row no-gutters justify="end">
            <v-chip
              v-if="editMode"
              color="error"
              class="white--text ms-auto px-2"
              small
              @click="deleteTask()"
            >
              <v-icon small>mdi-trash-can-outline</v-icon>
            </v-chip>
            <v-chip
              small
              style="border-radius: 8px"
              class="float-right ms-2 pe-2 ps-2"
              :class="is_completed == 1 ? 'white--text' : 'black--text'"
              :color="is_completed == 1 ? '#02C77B' : '#FFFB07'"
              @click="changeStatus()"
              >{{ is_completed == 1 ? "Completada" : "Pendiente" }}
              <v-icon small class="ps-1">
                {{
                  is_completed == 1
                    ? "mdi-timeline-check-outline"
                    : "mdi-timeline-clock-outline "
                }}</v-icon
              >
            </v-chip>
          </v-row>
        </v-toolbar>
        <v-card-text class="pa-1 form-card">
          <v-form v-model="valid">
            <v-container>
              <v-row no-gutters>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="title"
                    :rules="titleRules"
                    label="Nota"
                    class="border-rounded details-text"
                    dense
                    solo
                    background-color="rgba(31, 31, 40)"
                    required
                  >
                    <v-icon slot="prepend-inner"
                      >mdi-notebook-edit-outline</v-icon
                    >
                  </v-text-field>
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-textarea
                    height="auto"
                    class="border-rounded details-text"
                    dense
                    placeholder="Detalles de la nota"
                    solo
                    background-color="rgba(31, 31, 40)"
                    :value="details"
                    v-model="details"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" class="py-0">
                  <div>Fecha límite</div>
                </v-col>
                <v-col cols="12" class="py-0">
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
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        class="border-rounded details-text"
                        dense
                        solo
                        background-color="rgba(31, 31, 40)"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      color="info"
                      v-model="date"
                      class="border-rounded"
                      no-title
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end black">
          <v-btn class="text-capitalize" text @click="OPEN_EDIT.value = false"
            >Cancelar</v-btn
          >
          <v-btn text @click.native="addNewTask()" class="text-capitalize">{{
            editMode ? "Actualizar" : "Guardar"
          }}</v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="alert"
        :timeout="timeout"
        shaped
        color="blue-grey darken-4"
        elevation="24"
      >
        <v-row justify="space-between" no-gutters>
          {{ msg }}
          <!-- <v-icon color="#30ffb3"> mdi-check-outline </v-icon> -->
        </v-row>
      </v-snackbar>
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
    _id: null,
    details: "",
    comment: "",
    tag: "",

    indexNote: 0,

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

    OPEN_EDIT: {
      get() {
        return this.$store.state.openEdit;
      },
      set(val) {
        this.$store.dispatch("openEdit", val);
      },
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(val);
    },
    OPEN_EDIT: {
      handler(val) {
        if (val._id) {
          this._id = val._id;
          this.title = val.title;
          this.details = val.details;
          this.is_completed = val.is_completed;

          if (val.due_date)
            this.date = new Date(val.due_date).toISOString().slice(0, 10);

          this.editMode = true;
          this.indexNote = val.index;
        }
      },
      deep: true,
    },
  },

  methods: {
    //reset the form
    resetForm() {
      this._id = null
      this.title = "";
      this.is_completed = 0;
      this.details = "";
      this.editMode = false;

      console.log("Reseteando el form")
    },

    async addNewTask() {
      if (this.title !== "") {
        let taskObj = {
          title: this.title,
          is_completed: this.is_completed,
          due_date: this.date,
          details: this.details ? this.details : null,
        };

        if (this._id) {
          taskObj._id = this._id;
        }

        try {
          const response = await service.postTask(taskObj);
          //Checking if the response is success
          if (response.success) {
            //updating the state
            if (this.editMode) {
              this.$store.dispatch("updateOneTask", {
                note: response.data,
                index: this.indexNote,
              });
              this.msg = "Actualizado";
            } else {
              this.$store.dispatch("addOneTask", response.data);
              this.msg = "Agregado";
            }
            this.alert = true;

            setTimeout(() => {
              this.alert = false;
              this.msg = "";
              this.resetForm();
              this.OPEN_EDIT = false;
            }, 500);
          }
        } catch (error) {
          this.alert = true;
          this.msg = "An error has ocurred " + error;
          setTimeout(() => {
            this.alert = false;
            this.msg = "";
          }, 500);
        }
      } else {
        this.alert = true;
        this.msg = "Title is required";
        setTimeout(() => ((this.alert = false), (this.msg = "")), 2000);
      }
    },

    //Delete a task by id
    async deleteTask() {
      if (this._id) {
        try {
          const response = await service.deleteTask(this._id);
          //Checking if the response is success
          if (response.success) {
            this.alert = true;
            this.msg = "Eliminada";
            setTimeout(() => {
              this.alert = false;
              this.msg = "";
              this.resetForm();
              this.OPEN_EDIT = false;
            }, 500);
            //updating the state
            this.$store.dispatch("deleteOneTask", this.indexNote);
          }
        } catch (error) {
          this.alert = true;
          this.msg = "Ocurrió un error " + error;
          setTimeout(() => ((this.alert = false), (this.msg = "")), 2000);
        }
      }
    },

    async changeStatus() {
      if (this._id) {
        let completed = this.is_completed == 1 ? 0 : 1;

        let taskObj = {
          is_completed: completed,
          _id: this._id,
        };
        try {
          const response = await service.changeStatus(taskObj);
          //Checking if the response is success
          if (response.success) {
            this.is_completed = completed;

            this.$store.dispatch("updateOneTask", {
              note: response.data,
              index: this.indexNote,
            });
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

.form-card {
  background: #0000004a;
  backdrop-filter: blur(2px);
}

.details-text {
  font-weight: 300 !important;
}
</style>