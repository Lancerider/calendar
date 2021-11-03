<template>
  <v-dialog
    v-model="showCreateReminderModal"
    max-width="360"
  >
    <v-card class="modal">
      <v-form
        ref="reminderForm"
        v-model="validForm"
        class="reminder__form"
      >
        <v-text-field
          v-model="reminderTitle"
          :counter="30"
          prepend-icon="mdi-note-edit-outline"
          placeholder="Add a Note"
          label="Note"
          :rules="rules.reminder"
          clearable
        ></v-text-field>

        <v-menu
          ref="date"
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="datePicker"
              label="Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="datePicker"
            no-title
            scrollable
            @input="dateMenu = false"
          >
          </v-date-picker>
        </v-menu>

        <v-dialog
          ref="timePicker"
          v-model="timeModal"
          :return-value.sync="time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="Time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="timeModal"
            v-model="time"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="timeModal = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.timePicker.save(time)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
        <v-color-picker
          v-model="color"
          hide-canvas
          hide-inputs
          hide-mode-switch
          hide-sliders
          show-swatches
          swatches-max-height="150"
          required
          width="100%"
        ></v-color-picker>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="darken-1"
          text
          @click="closeReminderModal"
        >
          Close
        </v-btn>
        <v-btn
          color="success"
          text
          @click="saveReminder"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { parseISO } from 'date-fns'
import format from 'date-fns/esm/format'

export default {
  name: 'CreateReminderModal',

  data () {
    return {
      dateMenu: false,
      timeModal: false,
      time: '12:00',
      rules: {
        reminder: [
          v => !!v || 'You must add note',
          v => (v || '').length >= 2 || 'min 2 chars',
          v => (v || '').length <= 30 || 'max 30 chars'
        ]
      },
      reminderTitle: '',
      color: null,
      validForm: false
    }
  },

  computed: {
    showCreateReminderModal: {
      get () {
        return this.$store.state.showCreateReminderModal
      },
      set (value) {
        this.$store.commit('SET_REMINDER_MODAL_STATE', value)
      }
    },

    datePicker: {
      get () {
        return this.$store.state.datePicker
      },
      set (value) {
        this.$store.commit('SET_CALENDAR_DATE_PICKER', value)
      }
    },

    date () {
      return parseISO(`${this.datePicker}T${this.time}`)
    }
  },

  methods: {
    closeReminderModal () {
      this.$refs.reminderForm.resetValidation()
      this.reminderTitle = ''

      this.$store.commit('SET_REMINDER_MODAL_STATE', false)
    },

    saveReminder () {
      if (!this.$refs.reminderForm.validate()) {
        return
      }

      const reminder = {
        label: this.reminderTitle,
        color: this.color,
        date: this.date,
        time: format(this.date, 'HH:mm')
      }

      this.$store.dispatch('setCalendarCurrentMonth', this.date)
      this.$store.commit('ADD_DAY_REMINDER', reminder)

      this.closeReminderModal()
    }
  }
}
</script>

<style>
.reminder__form {
  padding: 2rem;
}
</style>
