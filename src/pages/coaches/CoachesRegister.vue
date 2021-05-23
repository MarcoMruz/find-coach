<template>
  <section>
    <VCard>
      <h3>Register as a coach now!</h3>
    </VCard>

    <CoachForm @save-data="addCoach" />
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm';

export default {
  components: { CoachForm },

  methods: {
    addCoach(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    }
  }
};
</script>

<style scoped></style>
