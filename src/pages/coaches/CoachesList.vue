<template>
  <section><CoachFilter @change-filter="setFilters" /></section>
  <VCard>
    <div class="controls">
      <VButton mode="outline">Refresh</VButton>
      <VButton link to="/register" v-if="!isCoach">Become coach</VButton>
    </div>
    <ul v-if="hasCoaches">
      <CoachItem
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :coach="coach"
      />
    </ul>
    <div v-else>no coaches here</div>
  </VCard>
</template>

<script>
import { mapGetters } from 'vuex';

import CoachItem from '../../components/coaches/CoachItem';
import CoachFilter from '../../components/coaches/CoachFilter';

export default {
  components: {
    CoachItem,
    CoachFilter
  },

  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },

  computed: {
    ...mapGetters('coaches', ['hasCoaches', 'isCoach']),

    filteredCoaches() {
      return this.$store.getters['coaches/coaches'].filter(coach => {
        const hasBadges = coach.areas.map(area => {
          const keys = [];
          for (const [key, value] of Object.entries(this.activeFilters)) {
            if (value) keys.push(key);
          }

          return keys.includes(area);
        });

        return hasBadges.some(badge => badge === true);
      });
    }
  },

  methods: {
    setFilters(update) {
      this.activeFilters = update;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
