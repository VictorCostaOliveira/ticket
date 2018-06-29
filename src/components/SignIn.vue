<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Ola Aluno</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="userSignIn">
          <v-layout column>
            <v-flex>
              <v-text-field name="email" label="Seu email" id="user-email" type="text" v-model="email" required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field name="user-registration" label="Sua matricula" id="user-registration" v-model="userRegistration" mask="############"></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" :disabled="loading">Entrar</v-btn>
            </v-flex>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        name: '',
        userRegistration: '',
        alert: '',
      };
    },
    methods: {
      userSignIn() {
        if (this.name !== null && this.userRegistration !== null) {
          const userData = { email: this.email, userRegistration: this.userRegistration };
          this.$store.dispatch('userSignIn', userData);
        }
      },
    },
    watch: {
      error(value) {
        if (value) {
          this.alert = true;
        }
      },
      alert(value) {
        if (!value) {
          this.$store.commit('setError', null);
        }
      },
    },
    computed: {
      error() {
        return this.$store.state.error;
      },
      loading() {
        return this.$store.state.loading;
      },
    },
  };
</script>

<style></style>
