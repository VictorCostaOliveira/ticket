<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Bem vindo aluno</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <blockquote class="blockquote text-xs-center">
          Aqui você pode pedir uma senha para<br>
          poder ser atendido.
        </blockquote>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
        <v-btn color="primary" to="/signin">Entrar</v-btn>
        <v-btn color="primary" to="/signup">Cadastro</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

};
</script>
