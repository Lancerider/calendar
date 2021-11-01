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
      :class="{
        'day--out-of-month': !day.isCurrentMonth,
        'day--is-weekend': day.isWeekend
      }"
    >
      <div class="day__number">
        {{ day.dayOfMonth }}
      </div>
      <div v-for="(task, taskIndex) in day.tasks" :key="taskIndex" class="day__task">
        {{ task.title }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  format,
  setDate,
  lastDayOfMonth,
  lastDayOfWeek,
  isWeekend,
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
      date: new Date(),
      numberOfWeeks: null,
      days: [],
      currentCalendarInterval: null
    }
  },

  mounted () {
    this.setCurrentMonth()

    console.log('currentCalendarInterval', this.currentCalendarInterval)
    console.log('this.days', this.days)
    console.log('numberOfWeeks', this.numberOfWeeks)
  },

  methods: {
    // TODO: refactor for multiple months
    setCurrentMonth () {
      this.setWeeksOfMonth()
      this.setCurrentCalendarInterval()
      this.setDaysOfMonth()
    },

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
        const isCurrentMonth = format(day, 'M') === this.currentDate.month

        return {
          dayOfWeek: format(day, 'EEEE'),
          dayOfMonth: format(day, 'd'),
          month: format(day, 'M'),
          year: format(day, 'y'),
          date: day,
          weekOfMonth: 1,
          isWeekend: isWeekend(day),
          isCurrentMonth,
          tasks: [
            // { title: format(day, 'EEEE') },
            // { title: format(day, 'MMMM') }
          ]
        }
      })
    }
  },

  computed: {
    currentDate () {
      return {
        day: format(this.date, 'd'),
        month: format(this.date, 'M'),
        year: format(this.date, 'y')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .calendar {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, minmax(100px, 1fr));
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

  .day {
    color: #000;
    background-color: #fff;
    min-height: 100px;
    padding: 0.5rem;
    font-size: 14px;
    border: 1px solid #c3c3c3;

    .day__number {
      font-weight: 700;
    }
  }

  .day.day--out-of-month {
    .day__number {
      color: #bababa;
      font-weight: 300;
    }
  }

  .day.day--is-weekend {
    color: #3575af;
    background-color: #f2f2f2;
  }
</style>
