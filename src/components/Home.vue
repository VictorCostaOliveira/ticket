<template>
    <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a user's home page</p>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Sua senha</h3>
              <div v-if="ticket">{{ ticket }}</div>
              <div v-else>Sem senha</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="black" @click="createTicket">Pedir sua senha</v-btn>
         <!--    <v-btn flat color="orange">Explore</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        ticket: ''
      }
    },
    methods: {
      createTicket() {
        this.$store.dispatch('createTicket', {ticket: this.ticket})
      }
    }
  };
</script>

<style></style>
