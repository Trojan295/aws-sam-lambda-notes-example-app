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
