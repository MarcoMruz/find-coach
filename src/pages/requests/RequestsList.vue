<template>
  <VDialog :show="!!error" title="An error occured" @close="closeModal">
    <p>{{ error }}</p>
  </VDialog>

  <VCard>
    <header>
      <h2>Requests received</h2>
    </header>

    <VSpinner v-if="isLoading" />

    <section v-else>
      <ul v-if="hasRequests">
        <RequestItem
          v-for="request in requests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        />
      </ul>

      <h3 v-else>You don't have any requests as of now!</h3>
    </section>
  </VCard>
</template>

<script>
import { mapGetters } from 'vuex';

import RequestItem from '../../components/requests/RequestItem';

export default {
  data() {
    return {
      isLoading: false,
      error: null
    };
  },

  created() {
    this.loadRequests();
  },

  components: {
    RequestItem
  },

  computed: {
    ...mapGetters('requests', ['requests', 'hasRequests'])
  },

  methods: {
    async loadRequests() {
      this.isLoading = true;

      try {
        await this.$store.dispatch('requests/loadRequests');
      } catch (error) {
        this.error = error || 'Something failed!';
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
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
