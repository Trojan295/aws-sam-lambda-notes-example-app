<template>
  <div>
    <h2>Notes</h2>
     <table style="width:100%">
       <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
       </thead>
       <tbody>
          <tr v-for="note in notes" v-bind:key="note.id">
            <td>{{ note.title }}</td>
            <td>{{ note.description }}</td>
            <td>
              <button @click="removeNote(note.id)">Delete</button>
            </td>
          </tr>
       </tbody>
    </table> 
  </div>
</template>

<script>
export default {
  name: 'NotesGrid',
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('fetchNotes')
    }, 1000)
  },

  computed: {
    notes() {
      return this.$store.state.notes
    }
  },

  methods: {
    removeNote(noteID) {
      this.$store.dispatch('removeNote', noteID).then(() => {
        alert('removed')
      })
    }
  }
}
</script>