import router from '@/router';
import firebase from 'firebase';

const actions = {
  userSignUp({ commit }, payload) {
    commit('setLoading', true);
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.userRegistration)
    .then((user) => {
      firebase.database().ref(`/users/${user.uid}`).set({ email: payload.email, name: payload.name, userRegistration: payload.userRegistration })
      .then(() => {
        commit('setUser', { uid: user.uid, email: payload.email, name: payload.name, userRegistration: payload.userRegistration });
        commit('setLoading', false);
        commit('setError', null);
        router.push('/home');
      });
    })
    .catch((error) => {
      commit('setError', error.message);
      commit('setLoading', false);
    });
  },

  userSignIn({ commit }, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.userRegistration)
    .then((res) => {
      firebase.database().ref(`/users/${res.uid}`).on('value', (user) => {
        commit('setUser', {
          uid: res.uid,
          email: user.val().email,
          name: user.val().name,
          userRegistration: user.val().userRegistration,
        });
        commit('setLoading', false);
        commit('setError', null);
        router.push('/home');
      });
    })
    .catch((error) => {
      commit('setError', error.message);
      commit('setLoading', false);
    });
    commit('setLoading', true);
  },

  autoSignIn({ commit }, payload) {
    firebase.database().ref(`/users/${payload.uid}`).on('value', (user) => {
      firebase.database().ref('tickets');
      const userData = {
        uid: payload.uid,
        name: user.val().name,
        email: user.val().email,
        userRegistration: user.val().userRegistration,
      };
      commit('setUser', userData);
    });
  },

  userSignOut({ commit }) {
    firebase.auth().signOut();
    commit('setUser', null);
    router.push('/');
  },

  createTicket({ commit }, userState) {
    const newTicket = { number: '', attended: false, user: userState };
    const currentUser = firebase.auth().currentUser.uid;
    const dbReference = firebase.database().ref('tickets/');
    const userDbReference = firebase.database().ref(`users/${currentUser}/ticket`);
    dbReference.once('value', (res) => {
      const objects = res.val();
      const allTickets = [];
      let currentTicket;
      if (objects) {
        Object.keys(objects).forEach((key) => {
          if (objects[key].user.uid === currentUser && !objects[key].attended) {
            currentTicket = {
              attended: objects[key].attended,
              number: objects[key].number,
            };
          } else {
            allTickets.push(objects[key]);
          }
        });
      }
      if (!currentTicket) {
        if (allTickets.length === 0) {
          newTicket.number = 1;
          dbReference.push(newTicket).on('value', (newTicketResponse) => {
            userDbReference.set({
              attended: newTicketResponse.val().attended,
              number: newTicketResponse.val().number,
            });
            commit('setTicket', newTicketResponse.val());
          });
        } else {
          const lastRes = allTickets[allTickets.length - 1];
          newTicket.number = lastRes.number + 1;
          dbReference.push(newTicket).on('value', (newTicketResponse) => {
            userDbReference.set({
              attended: newTicketResponse.val().attended,
              number: newTicketResponse.val().number,
            });
            commit('setTicket', newTicketResponse.val());
          });
        }
      } else {
        commit('setTicket', currentTicket);
      }
    });
  },
};

export default actions;
