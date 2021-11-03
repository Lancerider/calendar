<template>
  <div class="calendar__container">
    <div class="month__header">
      <v-btn class="mx-2"
        x-small
        fab
        dark
        elevation="0"
        color="primary"
      >
        <v-icon dark @click="changeMonth('back')">
          mdi-less-than
        </v-icon>
      </v-btn>
      <div class="month__title">{{ calendar.currentMonth }}</div>
      <v-btn
        class="mx-2"
        x-small
        fab
        dark
        elevation="0"
        color="primary"
      >
        <v-icon dark @click="changeMonth()">
          mdi-greater-than
        </v-icon>
      </v-btn>
    </div>
    <div class="calendar">
      <div
        v-for="(day) of daysOfWeek"
        :key="day"
        class="calendar__header"
      >
        {{ day }}
      </div>
      <div
        v-for="(day, dayIndex) in calendar.days"
        :key="dayIndex"
        class="day"
        @click="selectDay(day)"
        :class="{
          'day--out-of-month': !day.isCurrentMonth,
          'day--is-weekend': day.isWeekend
        }"
      >
        <div class="day__number">
          {{ day.dayOfMonth }}
        </div>
        <template v-if="day.monthData">
          <div
            v-for="(task, taskIndex) in day.monthData.tasks"
            :key="taskIndex"
            class="day__task"
            :style="{ backgroundColor: task.color.hex }"
          >
            {{ task.label }}
          </div>
        </template>
      </div>
    </div>

    <CalendarDayModal @closeDayModal="closeDayModal" />
  </div>
</template>

<script>
import { subMonths, addMonths } from 'date-fns'

import CalendarDayModal from '@/components/CalendarDayModal.vue'

export default {
  name: 'Calendar',

  components: {
    CalendarDayModal
  },

  data () {
    return {
      showDayModal: false
    }
  },

  methods: {
    closeDayModal () {
      this.showDayModal = false
    },

    selectDay (day) {
      this.$store.commit('SET_SELECTED_DAY', day)
      this.$store.commit('SET_DAY_MODAL_STATE', true)
    },

    changeMonth (direction = 'next') {
      const newDate = direction === 'back'
        ? subMonths(this.calendar.date, 1)
        : addMonths(this.calendar.date, 1)

      this.$store.dispatch('setCalendarCurrentMonth', newDate)
    }
  },

  computed: {
    daysOfWeek () {
      return this.$store.state.daysOfWeek
    },

    calendar () {
      return this.$store.state.calendar
    }
  }
}
</script>

<style lang="scss" scoped>
  .calendar {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, minmax(120px, 1fr));
    overflow-x: auto;
  }

  .calendar__header {
    display: flex;
    background-color: #3575af;
    color: #fff;
    align-items: center;
    font-size: 14px;
    justify-content: center;
    line-height: 1.5rem;
  }

  .calendar__container {
    display: flex;
    justify-items: center;
    align-items: center;
    max-width: 1200px;
    flex-direction: column;
    width: 100%;
  }

  .day {
    color: #000;
    background-color: #fff;
    height: 150px;
    padding: 0.5rem;
    font-size: 14px;
    border: 1px solid #c3c3c3;
    overflow-y: auto;

    .day__number {
      font-weight: 700;
    }

    .day__task {
      color: white;
      padding: .25rem;
      font-size: .75rem;
      letter-spacing: .1rem;
    }

    &:hover {
      border-color: #3575af;
      cursor: pointer;
    }
  }

  .day.day--out-of-month .day__number {
    color: #bababa;
    font-weight: 300;
  }

  .day.day--out-of-month .day__number {
    color: #bababa;
    font-weight: 300;
  }

  .day.day--is-weekend {
    color: #3575af;
    background-color: #f2f2f2;
  }

  .month__header {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 1rem;
  }

  .month__title {
    font-size: 2rem;
    align-items: center;
    margin: 0 1rem;
  }
</style>
