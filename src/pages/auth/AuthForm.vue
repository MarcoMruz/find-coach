<template>
  <VCard>
    <form @submit.prevent="handleLogin">
      <div class="form-control">
        <label for="email">Email:</label>
        <input type="email" id="email" required v-model.trim="email" />
      </div>

      <div class="form-control">
        <label for="password">Password:</label>
        <input type="password" id="password" required v-model.trim="password" />
      </div>

      <VButton>{{ submitButtonCaption }}</VButton>
      <VButton type="button" mode="flat" @click="switchToRegister">{{
        toggleButtonCaption
      }}</VButton>
    </form>
  </VCard>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      mode: 'login'
    };
  },

  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Signup';
    },

    toggleButtonCaption() {
      return this.mode === 'login' ? 'Signup' : 'Login';
    }
  },

  methods: {
    handleLogin() {
      this.mode === 'login'
        ? ''
        : this.$store.dispatch('signup', {
            email: this.email,
            password: this.password
          });
    },

    switchToRegister() {
      this.mode = this.mode === 'login' ? 'signup' : 'login';
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
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
