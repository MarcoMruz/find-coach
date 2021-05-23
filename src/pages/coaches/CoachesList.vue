<template>
  <div>
    <VDialog :show="!!error" title="An error occured" @close="closeModal">
      <p>{{ error }}</p>
    </VDialog>
    <section><CoachFilter @change-filter="setFilters" /></section>
    <VCard v-if="isLoading">
      <VSpinner />
    </VCard>
    <VCard v-else>
      <div class="controls">
        <VButton mode="outline" @click="loadCoaches(true)">Refresh</VButton>
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
  </div>
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
      },
      isLoading: false,
      error: null
    };
  },

  created() {
    this.loadCoaches();
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
    },

    async loadCoaches(forceRefresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', { forceRefresh });
      } catch (error) {
        this.error = error || 'Oops something went wrong!';
      }
      this.isLoading = false;
    },

    closeModal() {
      this.error = null;
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
