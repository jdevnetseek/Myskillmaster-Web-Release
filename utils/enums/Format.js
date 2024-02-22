const dateFormat = 'MMM DD, YYYY'
const timeFormat = 'hh:mm A'
const datetimeFormat = `${dateFormat} ${timeFormat}`

const laravelDateFormat = 'YYYY-MM-DD'
const laravelTimeFormat = 'HH:mm:ss'
const laravelFormat = `${laravelDateFormat} ${laravelTimeFormat}`

const FORMAT = {
  dateFormat,
  timeFormat,
  laravelDateFormat,
  laravelTimeFormat,
  laravelFormat,
  datetimeFormat,
  dateTimeFormatTz: `${datetimeFormat} z`
}

export default FORMAT
