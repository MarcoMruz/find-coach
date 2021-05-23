<template>
  <div>
    <section>
      <VCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ selectedCoach.hourlyRate }}/hour</h3>
      </VCard>
    </section>

    <section>
      <VCard>
        <header>
          <h2>Intrested? Reach out now!</h2>
          <VButton link :to="contactLink">Contact</VButton>
        </header>
        <router-view></router-view>
      </VCard>
    </section>

    <section>
      <VCard>
        <VBadge v-for="area in areas" :key="area" :title="area" :type="area" />
        <p>{{ selectedCoach.description }}</p>
      </VCard>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],

  data() {
    return {
      selectedCoach: null,
      showContactButton: true
    };
  },

  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      coach => coach.id === this.id
    );
  },

  computed: {
    contactLink() {
      return `${this.$route.path}/contact`;
    },

    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },

    areas() {
      return this.selectedCoach.areas;
    }
  }
};
</script>

<style></style>
