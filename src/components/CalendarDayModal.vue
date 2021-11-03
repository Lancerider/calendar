<template>
  <v-dialog
    v-model="showModal"
    max-width="480"
  >
    <v-card v-if="selectedDay" class="day-modal">
      <v-card-title class="text-h5 day__title">
        <div>{{ formatDate(selectedDay.monthData.date, 'dd MMMM') }}</div>
          <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click="addReminder"
            >
              +
            </v-btn>
          </template>
          <span>Add new reminder</span>
        </v-tooltip>
      </v-card-title>

      <template v-if="selectedDay.monthData.tasks.length === 0">
        <v-card-text class="task--no-tasks">
          No reminders
        </v-card-text>
      </template>
      <div class="tasks__container">
        <div
          v-for="(task, taskIndex) in selectedDay.monthData.tasks"
          :key="taskIndex"
          class="task"
        >
          {{ task.city ? task.city : '' }}
          <div class="task__label" :style="{ backgroundColor: task.color.hex }">
          {{ `${task.time} - ${task.label}`  }}
            <v-btn
              x-small
              text
              fab
              elevation="0"
              color="white"
            >
              <v-icon dark @click="removeReminder(taskIndex)">
                mdi-close
              </v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="darken-1"
          text
          @click="closeDayModal"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'CalendarDayModal',

  methods: {
    closeDayModal () {
      this.$store.commit('SET_DAY_MODAL_STATE', false)
    },

    formatDate (date, formatString) {
      return format(date, formatString)
    },

    addReminder () {
      this.closeDayModal()
      this.$store.commit('SET_REMINDER_MODAL_STATE', true)
      this.$store.commit('SET_CALENDAR_DATE_PICKER', this.selectedDay.monthData.date.toISOString().substr(0, 10))
    },

    removeReminder (index) {
      this.selectedDay.monthData.tasks.splice(index, 1)
    }
  },

  computed: {
    showModal: {
      get () {
        return this.$store.state.showDayModal
      },
      set (value) {
        this.closeDayModal()
      }
    },
    selectedDay () {
      return this.$store.state.selectedDay
    }
  }
}
</script>

<style>
  .task--no-tasks {
    display: flex;
    font-size: 1.25rem;
    justify-content: center;
  }

  .day-modal .day__title {
    display: grid;
    grid-template-columns: 9fr 1fr;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .tasks__container {
    max-height: 400px;
    overflow-y: auto;
  }

  .task {
    padding: 10px 20px;
  }

  .task__label {
    color: white;
    padding: .5rem 1rem;
    font-size: 1rem;
    letter-spacing: .1rem;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: 9fr 1fr;
    align-items: center;
  }
</style>
