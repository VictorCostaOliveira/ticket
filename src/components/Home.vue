<template>
    <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Senha</h1>
      </v-flex>
      <v-flex xs12 mt-3>
        <v-card class="meu-pau">
          <div class="text-xs-center">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0 center">Sua senha</h3>
                <h4 class="headline mb-0" v-if="ticket">{{ ticket }}</h4>
                <div v-else>Sem senha</div>
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
      }
    },
    methods: {
      createTicket() {
        this.$store.dispatch('createTicket')
      }
    },
    computed: {
      ticket() {
        return this.$store.getters.getTicket
      }
    }
  };
</script>

<style>
.meu-pau {
  background-color: black;
}
</style>
