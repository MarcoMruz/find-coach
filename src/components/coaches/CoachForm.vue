<template>
  <VCard>
    <form @submit.prevent="handleSubmit">
      <div class="form-control">
        <label for="firstName">Firstname</label>
        <input type="text" id="firstName" v-model.trim="firstName" required />
      </div>

      <div class="form-control">
        <label for="lastName">Lastname</label>
        <input type="text" id="lastName" v-model.trim="lastName" required />
      </div>

      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          type="text"
          id="description"
          rows="5"
          v-model.trim="description"
          required
        />
      </div>

      <div class="form-control">
        <label for="rate">Hourly rate</label>
        <input type="number" id="rate" v-model.number="rate" required />
      </div>

      <div class="form-control">
        <h3>Areas of expertise</h3>

        <div>
          <input
            type="checkbox"
            id="frontend"
            value="frontend"
            v-model="areas"
          />
          <label for="frontend">Frontend dev</label>
        </div>

        <div>
          <input type="checkbox" id="backend" value="backend" v-model="areas" />
          <label for="backend">Backend dev</label>
        </div>

        <div>
          <input type="checkbox" id="career" value="career" v-model="areas" />
          <label for="career">Career adv</label>
        </div>
      </div>

      <VButton type="submit">Register</VButton>
    </form>
  </VCard>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: '',
      lastName: '',
      description: '',
      areas: [],
      rate: null
    };
  },

  methods: {
    handleSubmit() {
      const newCoach = {
        first: this.firstName,
        last: this.lastName,
        rate: this.rate,
        desc: this.description,
        areas: this.areas
      };

      this.$emit('save-data', newCoach);
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
