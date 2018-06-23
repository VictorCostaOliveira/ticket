import router from '@/router';
import firebase from 'firebase';

const actions = {
  userSignUp({ commit }, payload) {
    commit('setLoading', true);
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then((user) => {
      commit('setUser', { email: user.email });
      commit('setLoading', false);
      commit('setError', null);
      router.push('/home');
    }).catch((error) => {
      commit('setError', error.message);
      commit('setLoading', false);
    });
  },

  userSignIn({ commit }, payload) {
    commit('setLoading', true);
    debugger;
    firebase.database().ref('users/').push(payload)
    .then((user) => {
      commit('setUser', { email: user.email });
      commit('setLoading', false);
      commit('setError', null);
      router.push('/home');
    })
    .catch((error) => {
      commit('setError', error.message);
      commit('setLoading', false);
    });
  },

  autoSignIn({ commit }, payload) {
    commit('setUser', { email: payload.email });
  },

  userSignOut({ commit }) {
    firebase.auth().signOut();
    commit('setUser', null);
    router.push('/');
  },

  createTicket({ commit }) {
    const databaseReference = firebase.database().ref('tickets/');
    const newTicket = { ticket: '' };
    databaseReference.once('value')
    .then((res) => {
      const objects = res.val();
      const allTickets = [];

      Object.keys(objects).forEach((key) => {
        allTickets.push(objects[key]);
      });

      if (allTickets.length === 0) {
        newTicket.ticket = 1;
        databaseReference.push(newTicket).on('value', (newTicketResponse) => {
          commit('setTicket', newTicketResponse.val());
        });
      } else {
        const lastRes = allTickets[allTickets.length - 1];
        newTicket.ticket = lastRes.ticket + 1;
        databaseReference.push(newTicket).on('value', (newTicketResponse) => {
          commit('setTicket', newTicketResponse.val());
        });
      }
    });
  },
};

export default actions;
