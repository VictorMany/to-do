<template>
  <v-card
    class="card-style d-flex flex-column"
    height="100%"
    @touchstart="handleTouchStart"
    @click="openEdit"
    @blur="isActions = false"
  >
    <v-row justify="space-between" no-gutters>
      <v-col cols="10" xs="5" class="text-truncate pt-3 ps-4 font-weight-normal px13 pb-0 text-truncate">
          {{ title }}
      </v-col>
      <v-col cols="auto">
          <div
            class="rounded-pill me-4 mt-4"
            :class="is_completed == 1 ? 'status-done' : 'status-pending'"
          />
      </v-col>
    </v-row>
    <v-card-text class="font-weight-light px12 pt-2">
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
        @click="closeActions()"
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
                      ? "mdi-timeline-check-outline"
                      : "mdi-timeline-clock-outline "
                  }}</v-icon
                >
              </v-chip>
              <v-chip class="px-2" @click="handleTouchEnd()">
                <v-icon small>mdi-exit-to-app</v-icon>
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

    selectedAction: false,
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
    isActionsProp: { type: Boolean, required: false, default: false },
    //Completed prop is required
    //The rest of the props are optionals
  },

  methods: {
    // onClickOutside() {
    //   this.active = false;
    // },
    getCurrentDate(dueDate) {
      const fechaOriginal = new Date(dueDate);
      // Suma un día a la fecha original
      fechaOriginal.setDate(fechaOriginal.getDate() + 1);

      return new Date(fechaOriginal).toDateString();
    },

    closeActions() {
      if (!this.selectedAction) {
        this.handleTouchEnd();
      }
    },

    handleTouchStart() {
      setTimeout(() => {
        if (this.OPEN_EDIT === false && this.isActions == false) {
          this.$emit("update:isActionsProp", false);
        }
      }, 300);
      setTimeout(() => {
        if (this.OPEN_EDIT === false) {
          this.isActions = true;
          this.$emit("update:isActionsProp", true);
        }
      }, 500);
      // Agregar lógica adicional si es necesario
    },

    async changeStatus() {
      this.selectedAction = true;

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
            this.selectedAction = false;
          }
        } catch (error) {
          console.log(error);
          this.selectedAction = false;
        }
      }
    },

    //Delete a task by id
    async deleteTask() {
      this.selectedAction = true;

      if (this._id) {
        try {
          const response = await service.deleteTask(this._id);
          //Checking if the response is success
          if (response.success) {
            this.$store.dispatch("deleteOneTask", this.index);
            this.selectedAction = false;
          }
        } catch (error) {
          console.log(error);
          this.selectedAction = false;
        }
      }
    },

    handleTouchEnd() {
      this.$emit("update:isActionsProp", true);

      setTimeout(() => {
        this.isActions = false;
        this.selectedAction = false;
      }, 500);
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
        this.$emit("update:isActionsProp", false);
        this.$store.dispatch("openEdit", val);
      },
    },
  },

  watch: {
    "$props.isActionsProp": {
      handler(val) {
        if (val === false) {
          this.isActions = false;
          this.selectedAction = false;
        }
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