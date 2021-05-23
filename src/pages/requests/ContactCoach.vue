<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-control">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required />
    </div>

    <div class="form-control">
      <label for="message">Message</label>
      <textarea id="message" cols="5" v-model="message" required />
    </div>

    <div class="action">
      <VButton type="submit">Send message</VButton>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: ''
    };
  },

  methods: {
    handleSubmit() {
      this.$store.dispatch('requests/sendMessage', {
        coachId: this.$route.params.id,
        email: this.email,
        message: this.message
      });

      this.$router.replace('/coaches');
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
