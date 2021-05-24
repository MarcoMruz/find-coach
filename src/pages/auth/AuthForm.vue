<template>
  <div>
    <VDialog :show="!!error" title="An error occured" @close="closeErrorModal">
      <p>{{ error }}</p>
    </VDialog>
    <VDialog :show="isLoading" fixed title="Authenticating">
      <VSpinner />
    </VDialog>
    <VCard v-if="!isLoading">
      <form @submit.prevent="handleLogin">
        <div class="form-control">
          <label for="email">Email:</label>
          <input type="email" id="email" required v-model.trim="email" />
        </div>

        <div class="form-control">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            v-model.trim="password"
          />
        </div>

        <VButton>{{ submitButtonCaption }}</VButton>
        <VButton type="button" mode="flat" @click="switchToRegister">{{
          toggleButtonCaption
        }}</VButton>
      </form>
    </VCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      mode: 'login',
      isLoading: false,
      error: null
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
    async handleLogin() {
      this.isLoading = true;

      const user = {
        email: this.email,
        password: this.password
      };

      try {
        this.mode === 'login'
          ? await this.$store.dispatch('login', user)
          : await this.$store.dispatch('signup', user);

        const redirect = this.$route.query.r || 'coaches';
        this.$router.replace(`/${redirect}`);
      } catch (error) {
        this.error = error.message || 'Something went wrong. Try again later';
      } finally {
        this.isLoading = false;
      }
    },

    switchToRegister() {
      this.mode = this.mode === 'login' ? 'signup' : 'login';
    },

    closeErrorModal() {
      this.error = null;
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
