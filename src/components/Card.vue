<template>
  <v-card
    class="card-style d-flex flex-column"
    height="100%"
    @touchstart="handleTouchStart"
    @click="openEdit"
    @blur="isActions = false"
  >
    <v-card-title class="font-weight-normal px13 pb-2">
      <v-row justify="space-between">
        <v-col cols>
          {{ title }}
        </v-col>
        <v-col cols="auto">
          <div
            class="rounded-pill"
            :class="is_completed == 1 ? 'status-done' : 'status-pending'"
          />
        </v-col>
      </v-row>
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

    <v-expand-transition>
      <div
        v-if="isActions"
        class="d-flex transition-fast-in-fast-out v-card--reveal"
        style="height: 100%; width: 100%; position: absolute"
      >
        <v-row no-gutters justify="center" align="center" class="form-card">
          <v-col>
            <v-row no-gutters justify="space-around" class="mb-2">
              <v-chip class="white--text px-2" @click="deleteTask()">
                <v-icon small>mdi-trash-can-outline</v-icon>
              </v-chip>
              <v-chip
                class="px-2"
                :color="is_completed == 1 ? '#02c77b' : '#fffb07'"
                :class="is_completed == 1 ? 'white--text' : 'black--text'"
                @click="changeStatus()"
              >
                <v-icon small>
                  {{
                    is_completed == 1
                      ? "mdi-check-circle-outline"
                      : "mdi-dots-horizontal-circle-outline"
                  }}</v-icon
                >
              </v-chip>
              <v-chip class="px-2" @click="handleTouchEnd()">
                <v-icon small>mdi-backspace-outline</v-icon>
              </v-chip>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
// import Form from "./Form.vue";
import service from "../service/service";

export default {
  // components: { Form },
  name: "Card",

  data: () => ({
    touchTimer: null,
    isActions: false,

    msg: "",
    alert: false,
    timeout: 2000,
  }),

  /**
   *  card props
   */

  props: {
    //Title propis required
    details: { type: String, required: true },
    //Title propis required
    title: { type: String, required: true },
    due_date: { type: String, required: false },
    _id: { type: [String, Object, null], required: false },
    is_completed: { type: Number, required: false },
    index: {
      type: Number,
      required: true,
    },
    //Completed prop is required
    //The rest of the props are optionals
  },

  methods: {
    getCurrentDate(dueDate) {
      const fechaOriginal = new Date(dueDate);
      // Suma un día a la fecha original
      fechaOriginal.setDate(fechaOriginal.getDate() + 1);

      return new Date(fechaOriginal).toDateString();
    },

    handleTouchStart() {
      setTimeout(() => {
        if (this.OPEN_EDIT === false) this.isActions = true;
      }, 200);
      // Agregar lógica adicional si es necesario
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
            this.$store.dispatch("updateOneTask", {
              note: response.data,
              index: this.index,
            });
          }
        } catch (error) {
          console.log(error)
        }
      }
    },

    //Delete a task by id
    async deleteTask() {
      if (this._id) {
        try {
          const response = await service.deleteTask(this._id);
          //Checking if the response is success
          if (response.success) {
            this.$store.dispatch("deleteOneTask", this.index);
          }
        } catch (error) {
          console.log(error)
        }
      }
    },

    handleTouchEnd() {
      setTimeout(() => {
        this.isActions = false;
      }, 200);
    },

    openEdit() {
      if (this.isActions === false) {
        this.OPEN_EDIT = {
          _id: this._id,
          is_completed: this.is_completed,
          due_date: this.is_due_date,
          details: this.details,
          title: this.title,
          index: this.index,
        };
      }
    },
  },

  computed: {
    OPEN_EDIT: {
      get() {
        return this.$store.state.openEdit;
      },
      set(val) {
        this.$store.dispatch("openEdit", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
// CARD style
.card-style {
  border-width: thin;
  border-style: solid;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  user-select: none;

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
.status-done {
  width: 8px !important;
  height: 8px !important;
  background-color: #02c77b;
}

.status-pending {
  width: 8px !important;
  height: 8px !important;
  background-color: #fffb07;
}

.form-card {
  background: #0000004a;
  backdrop-filter: blur(2px);
}
</style>