<template lang="pug">
  #app
    img(src='./../dist/logo.png')
    h1 appMusic
    select(v-model="selectedContry")
      option(v-for="contry in contries" :value="contry.value") {{ contry.name }}
    spinner(v-show="loading")
    ul
      //-li(v-for="artist in artists") {{ artist.name }}
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")

</template>

<script>
import getArtists from './api'
import Artist from './components/Artist.vue'
import Spinner from './components/Spinner.vue'

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      contries: [
        {name: 'México', value: 'mexico'},
        {name: 'Argentina', value: 'argentina'},
        {name: 'Colombia', value: 'colombia'},
        {name: 'España', value: 'spain'},
      ],
      selectedContry: 'mexico',
      loading: true
    }
  },
  components: {
    Artist,
    Spinner
  },
  methods: {
    refreshArtists() {
      const self = this;
      this.loading = true
      this.artists = []
      getArtists(this.selectedContry)
        .then(function (artists) {
        self.artists = artists;
        self.loading = false
      })
    }
  },
  mounted() {
    this.refreshArtists();
  },
  watch: {
    selectedContry() {
      this.refreshArtists();
    }
  }
}
</script>

<style lang="stylus">
#app 
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

h1, h2 
  font-weight normal

ul 
  list-style-type none
  padding 0

li 
  display inline-block
  margin 0 10px

a 
  color #42b983
</style>
