<template>
  <div>
    <h3>Add note:</h3>
    <form>
      <label for="title">Title:</label><br>
      <input v-model="title" type="text" id="title"><br>
      <label for="description">Description</label><br>
      <textarea v-model="description" type="text" id="description"/><br>

      <button class="button-primary" v-on:click="addNote">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddNote',

  data() {
    return {
      title: '',
      description: ''
    }
  },

  methods: {
    addNote(evt) {
      evt.preventDefault()
      const data = {
        title: this.title,
        description: this.description,
      }
      this.$store.dispatch('addNote', data).then(() => {
        alert('added')
        this.title = ''
        this.description = ''
      })
    }
  }
}
</script>