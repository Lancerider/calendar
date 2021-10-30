<template>
  <div class="calendar">
    <div
      v-for="(day, index) of daysOfWeek"
      :key="index"
      class="calendar__header"
    >
      {{ day }}
    </div>
    <div
      v-for="(day, index) in days"
      :key="index"
      class="day"
    >
      {{ day.dayOfMonth }}
    </div>
  </div>
</template>

<script>
import {
  format,
  setDate,
  lastDayOfMonth,
  lastDayOfWeek,
  eachDayOfInterval,
  eachWeekOfInterval
} from 'date-fns'

export default {
  name: 'Calendar',

  data () {
    return {
      daysOfWeek: [
        'Sunday',
        'Monday',
        'Twuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      daysOfMonth: [...Array(31).keys()],
      date: new Date(),
      numberOfWeeks: null,
      days: [],
      currentCalendarInterval: null
    }
  },

  mounted () {
    this.setWeeksOfMonth()
    this.setCurrentCalendarInterval()
    this.setDaysOfMonth()

    console.log('currentCalendarInterval', this.currentCalendarInterval)
    console.log('this.days', this.days)
    console.log('numberOfWeeks', this.numberOfWeeks)
  },

  methods: {
    setCurrentCalendarInterval () {
      this.currentCalendarInterval = {
        start: this.weeksOfMonth[0],
        end: lastDayOfWeek(this.weeksOfMonth[this.weeksOfMonth.length - 1])
      }
    },

    setWeeksOfMonth () {
      const firstDayOfMonth = setDate(this.date, 1)

      this.weeksOfMonth = eachWeekOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth(this.date)
      })
    },

    setDaysOfMonth () {
      this.days = eachDayOfInterval(this.currentCalendarInterval).map(day => {
        return {
          dayOfWeek: format(day, 'EEEE'),
          dayOfMonth: format(day, 'd'),
          month: format(day, 'M'),
          year: format(day, 'y'),
          date: day,
          weekOfMonth: 1
        }
      })
    }
  }
}
</script>

<style>
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar__header {
    display: flex;
    background-color: blue;
    color: #fff;
    align-items: center;
    justify-content: center;
    padding: 1vw;
  }

  .day {
    min-height: 100px;
    background-color: lightgrey;
    padding: 1vw;
  }
</style>
