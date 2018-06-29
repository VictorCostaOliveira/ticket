<template>
    <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Senha</h1>
      </v-flex>
      <v-flex xs12 mt-3>
        <v-card >
          <div class="text-xs-center">
            <v-card-title primary-title>
              <div>
                <h2 class="headline mb-0" v-if="ticket">Numero - {{ ticket }}</h2>
                <h2 class="headline mb-0" v-else>Sem senha</h2>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="black" v-if="!ticket" @click="createTicket">Pedir sua senha</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        user: this.$store.getters.getUser,
      };
    },
    methods: {
      createTicket() {
        this.$store.dispatch('createTicket', this.$store.getters.getUser);
      },
    },
    computed: {
      ticket() {
        return this.$store.getters.getTicket;
      },
    },
  };
</script>

<style>

</style>
