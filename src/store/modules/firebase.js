import Firebase from 'firebase'
import router from '../../router'
import { alerter } from '../../util/alert.js'
import _ from 'lodash'

const buildArray = function (val) {
  let array = []
  for (let value in val) {
    let newVal = _.clone(val[value])
    newVal.id = value
    array.push(newVal)
  }
  return array
}

const refRead = function (commit, refUrl, setter) {
  let r = Firebase.database().ref(refUrl)
  r.on('value', function (snapshot) {
    commit(setter, {ref: r, value: snapshot.val()})
  }, function (errorObject) {
    console.error('The read failed: ' + errorObject.code)
  })
}

const handleAuth = function (state, provider) {
  return Firebase.auth().signInWithRedirect(provider)
}

const goHomeAfterLogin = function (state) {
  console.log('Logged In!')
  router.push({ name: 'Home' })
  return Promise.resolve(state.currentUser)
}

export const firebase = {
  state: {
    currentUser: null,
    teamRef: {},
    teams: [],
    userRef: {},
    users: [],
    pageRef: {},
    pageBoxes: []
  },
  getters: {
    getCurrentUser (state) {
      return state.currentUser
    },
    getCurrentUserDetails (state) {
      if (!state.currentUser) return null
      return _.find(state.users, { id: state.currentUser.uid })
    },
    getFirebaseTeams (state) {
      return state.teams
    },
    getFirebaseUsers (state) {
      return state.users
    },
    getPageBoxes (state) {
      return state.pageBoxes
    }
  },
  mutations: {
    setUser (state, currentUser) {
      state.currentUser = currentUser
    },
    setTeams (state, {ref, value}) {
      state.teamRef = ref
      state.teams = buildArray(value)
    },
    setUsers (state, {ref, value}) {
      state.usersRef = ref
      state.users = buildArray(value)
    },
    setPage (state, {ref, value}) {
      state.pageRef = ref
      state.pageBoxes = buildArray(value)
    }
  },
  actions: {
    logout ({state}, route) {
      state.currentUser = null
      Firebase.auth().signOut().then(res => {
        console.log('Logged out!')
        if (route) {
          router.push(route)
        } else {
          router.push({name: 'SplashPage', params: {useLoadTimer: false}})
        }
      })
    },
    loginWithEmail ({state}, user) {
      if (state.currentUser) return goHomeAfterLogin(state)
      return Firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .catch(error => {
          console.error(JSON.stringify(error))
          if (error.code === 'auth/user-not-found') {
            alerter.confirm('Create New Account?', 'No account is currently associated with this email address. Do you want to continue and create this new account?',
              () => { Firebase.auth().createUserWithEmailAndPassword(user.email, user.password) })
          }
          return Promise.reject(error)
        })
    },
    sendRecoveryEmail ({state}, user) {
      return Firebase.auth().sendPasswordResetEmail(user.email)
    },
    loginWithFacebook ({state}, user) {
      if (state.currentUser) return goHomeAfterLogin(state)
      let provider = new Firebase.auth.FacebookAuthProvider()
      provider.addScope('public_profile')
      provider.addScope('email')
      return handleAuth(state, provider)
    },
    loginWithGoogle ({state}, user) {
      if (state.currentUser) return goHomeAfterLogin(state)
      let provider = new Firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      return handleAuth(state, provider)
    },
    loginWithTwitter ({state}, user) {
      if (state.currentUser) return goHomeAfterLogin(state)
      return handleAuth(state, new Firebase.auth.TwitterAuthProvider())
    },
    handleRedirectAuth () {
      return Firebase.auth().getRedirectResult()
    },
    loadPage ({commit}, page) {
      commit('setPage', {ref: null, value: []})
      refRead(commit, '/pageBoxes/' + page, 'setPage')
    },
    upsertUserDetails ({getters, state}, newDetails) {
      let details = getters.getCurrentUserDetails
      let currentUserId = getters.getCurrentUser.uid
      if (!details) {
        state.usersRef.child(currentUserId).set(newDetails)
      } else {
        var childRef = state.usersRef.child(currentUserId)
        childRef.update(newDetails)
      }
    },
    loadFirebaseModule ({commit, state}) {
      // Manage this user
      Firebase.auth().onAuthStateChanged(function (user) {
        let currentUser = _.clone(state.currentUser)
        commit('setUser', user)

        // If we just logged in load other data we want to keep around
        if (!currentUser && user) {
          refRead(commit, '/userTeams', 'setTeams')
          refRead(commit, '/userDetails', 'setUsers')
          return goHomeAfterLogin(state)
        }
      })
    }
  }
}
