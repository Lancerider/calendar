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
              @click.stop="openReminderModal"
            >
              +
            </v-btn>
          </template>
          <span>New reminder</span>
        </v-tooltip>
    </v-app-bar>

    <v-main>
      <div class="app__container">
        <Calendar />
      </div>
    </v-main>

    <CreateReminderModal />
  </v-app>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
import CreateReminderModal from '@/components/CreateReminderModal.vue'

export default {
  name: 'App',

  components: {
    Calendar,
    CreateReminderModal
  },

  mounted () {
    this.$store.dispatch('setCalendarCurrentMonth', new Date())
  },

  methods: {
    openReminderModal () {
      this.$store.commit('SET_REMINDER_MODAL_STATE', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app__container {
    margin: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
