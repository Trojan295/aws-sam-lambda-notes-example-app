<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="one-half column"><p /></div>
        <div class="one-half column">
          <h5>Hello, {{ username }}</h5>
        </div>
      </div>
      <div class="row">
        <AddNote />
      </div>
      <div class="row">
        <NotesGrid />
      </div>
    </div>
  </div>
</template>

<script>
import {CognitoAuth} from 'amazon-cognito-auth-js'
import jwt from 'jsonwebtoken'

import NotesGrid from './components/NotesGrid.vue'
import AddNote from './components/AddNote.vue'

export default {
  name: 'App',
  components: {
    NotesGrid,
    AddNote,
  },

  mounted() {
    var authData = {
        ClientId : '33ji9dogm7druegp6b0qk62q7l',
        UserPoolId : 'eu-west-1_lZ3k4mvWB',
        AppWebDomain : 'notes-sam.auth.eu-west-1.amazoncognito.com',
        TokenScopesArray : ['openid'],
        RedirectUriSignIn : 'http://localhost:8080',
        RedirectUriSignOut : 'http://localhost:8080',
        AdvancedSecurityDataCollectionFlag : false,
    };
    var auth = new CognitoAuth(authData);

    const comp = this;
    auth.userhandler = {
        onSuccess: function(result) {
          comp.$store.commit('setAccessToken', result.idToken.jwtToken)
        },
        onFailure: function(err) {
            alert("Auth error: " + err);
        }
    };

    var curUrl = window.location.href;
    auth.parseCognitoWebResponse(curUrl);
    auth.getSession();
  },

  computed: {
    username() {
      const payload = jwt.decode(this.$store.state.accessToken)
      if (payload === null) {
        return ''
      }
      return payload.email
    }
  }
}
</script>
