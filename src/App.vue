<template>
  <v-app>
    <v-app-bar
      absolute
      color="primary"
      dark
      app
      elevation="0"
    >
      <v-toolbar-title>Calendar</v-toolbar-title>

      <v-spacer></v-spacer>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              dark
              v-bind="attrs"
              v-on="on"
            >
              +
            </v-btn>
          </template>
          <span>New reminder</span>
        </v-tooltip>
    </v-app-bar>

    <v-main class="app__container">
      <h2 class="calendar__month">November</h2>
      <div class="calendar__container">
        <Calendar />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'App',

  components: {
    Calendar
  }
}
</script>

<style lang="scss" scoped>
  .app__container {
    margin: 2rem;
  }

  .calendar__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .calendar__month {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
</style>
