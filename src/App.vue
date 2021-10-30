<template>
  <v-app>
    <v-main>
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
  .calendar__container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
  }
</style>
