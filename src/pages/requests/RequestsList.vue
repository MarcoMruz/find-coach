<template>
  <section>
    <VCard>
      <header>
        <h2>Requests received</h2>
      </header>

      <ul v-if="hasRequests">
        <RequestItem
          v-for="request in requests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        />
      </ul>

      <h3 v-else>You don't have any requests as of now!</h3>
    </VCard>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import RequestItem from '../../components/requests/RequestItem';

export default {
  components: {
    RequestItem
  },
  computed: {
    ...mapGetters('requests', ['requests', 'hasRequests'])
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
