<template>
  <v-app>
    <v-toolbar app>
      <v-btn v-if="needBackButton" icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="text-xs-center">
        <router-link to='/' tag='span' style='cursor: pointer'>
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      appTitle: 'Estácio senhas',
      sidebar: false,
    };
  },
  methods: {
    userSignOut() {
      this.$store.dispatch('userSignOut');
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    back() {
      window.history.back();
    },
  },
  computed: {
    menuItems() {
      if (this.isAuthenticated) {
        return [
          { title: 'Home', path: '/home', icon: 'home' },
        ];
      }
      return [
        { title: 'Sign in', path: '/signin', icon: 'face' },
        { title: 'Sign up', path: '/signup', icon: 'lock_open' },
      ];
    },
    needBackButton() {
      return this.$route.meta.backButton;
    },
  },
};
</script>
