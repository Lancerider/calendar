import axios from 'axios'

const apiBaseURL = process.env.VUE_APP_API_BASE_URL || 'https://api.openweathermap.org/data/2.5'
const apiKey = process.env.VUE_APP_API_KEY

const weatherApi = axios.create({
  baseURL: apiBaseURL
})

export const getWeatherByCity = (city) => {
  const url = `/weather?q=${city}&appid=${apiKey}`

  return weatherApi.get(url)
}
