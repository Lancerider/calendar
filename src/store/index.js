import Vue from 'vue'
import Vuex from 'vuex'

import {
  format,
  setDate,
  lastDayOfMonth,
  lastDayOfWeek,
  eachWeekOfInterval,
  isBefore
} from 'date-fns'

import { prepareCalendarDays, prepareNewMonthData } from '@/helpers/calendar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    daysOfWeek: [
      'Sunday',
      'Monday',
      'Twuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    date: new Date(),
    datePicker: new Date().toISOString().substr(0, 10),
    monthsData: {
      January: null,
      February: null,
      March: null,
      April: null,
      May: null,
      June: null,
      July: null,
      August: null,
      September: null,
      October: null,
      November: null,
      December: null
    },
    calendar: {
      date: null,
      currentMonth: null,
      days: []
    },
    selectedDay: null,
    showDayModal: false,
    showCreateReminderModal: false
  },

  mutations: {
    SET_CALENDAR_DATE_PICKER (state, date) {
      state.datePicker = date
    },

    SET_CALENDAR_DATE (state, date) {
      state.calendar.date = date
    },

    SET_CALENDAR_DAYS (state, { calendarDays }) {
      state.calendar.days = calendarDays
    },

    SET_SELECTED_DAY (state, day) {
      state.selectedDay = day
    },

    SET_NEW_MONTH (state, { monthDays, month }) {
      state.monthsData[month] = monthDays
    },

    SET_CALENDAR_CURRENT_MONTH (state, month) {
      state.calendar.currentMonth = month
    },

    SET_REMINDER_MODAL_STATE (state, visibility) {
      state.showCreateReminderModal = visibility
    },

    SET_DAY_MODAL_STATE (state, visibility) {
      state.showDayModal = visibility
    },

    ADD_DAY_REMINDER (state, reminder) {
      const month = format(reminder.date, 'MMMM')
      const day = format(reminder.date, 'd')

      const dayReminders = [...state.monthsData[month][day].tasks, reminder]

      const dayRemindersSorted = dayReminders.sort(function (dateA, dateB) {
        return isBefore(dateA.date, dateB.date) ? -1 : 1
      })

      state.monthsData[month][day].tasks = dayRemindersSorted
    }
  },

  actions: {
    setCalendarCurrentMonth ({ commit, state }, date) {
      const month = format(date, 'MMMM')
      const isCurrentMonth = state.calendar.currentMonth === month

      if (isCurrentMonth) {
        return
      }

      commit('SET_CALENDAR_CURRENT_MONTH', month)
      commit('SET_CALENDAR_DATE', date)

      const firstDayOfMonth = setDate(date, 1)
      const monthInteval = {
        start: firstDayOfMonth,
        end: lastDayOfMonth(date)
      }

      if (!state.monthsData[month]) {
        const monthDays = prepareNewMonthData(monthInteval, date)

        commit('SET_NEW_MONTH', { monthDays, month })
      }

      const monthWeeks = eachWeekOfInterval(monthInteval)

      const monthLastWeek = monthWeeks[monthWeeks.length - 1]

      const calendarMonthInterval = {
        start: monthWeeks[0],
        end: lastDayOfWeek(monthLastWeek)
      }

      const calendarDays = prepareCalendarDays(calendarMonthInterval, date, state.monthsData[month])

      commit('SET_CALENDAR_DAYS', { calendarDays, month })
    },

    saveReminder ({ commit, dispatch }, reminder) {
      dispatch('setCalendarCurrentMonth', { date: reminder.date })

      commit('ADD_DAY_REMINDER', reminder)
    }
  }
})
