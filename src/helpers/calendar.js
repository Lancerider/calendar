import {
  format,
  isWeekend,
  eachDayOfInterval,
  getWeekOfMonth
} from 'date-fns'

const prepareCalendarDays = (daysInterval, date, monthData) => {
  const daysArray = eachDayOfInterval(daysInterval)

  const calendarDays = daysArray.map(day => {
    const isCurrentMonth = format(day, 'M') === format(date, 'M')
    const dayOfMonth = format(day, 'd')

    return {
      dayOfWeek: format(day, 'EEEE'),
      dayOfMonth,
      month: format(day, 'M'),
      year: format(day, 'y'),
      monthData: isCurrentMonth ? monthData[dayOfMonth] : null,
      weekOfMonth: getWeekOfMonth(date),
      isWeekend: isWeekend(day),
      isCurrentMonth
    }
  })

  return calendarDays
}

const prepareNewMonthData = (monthInteval) => {
  const month = {}

  eachDayOfInterval(monthInteval).forEach(day => {
    const dayOfMonth = format(day, 'd')

    month[dayOfMonth] = {
      date: day,
      tasks: []
    }
  })

  return month
}

export {
  prepareCalendarDays,
  prepareNewMonthData
}
