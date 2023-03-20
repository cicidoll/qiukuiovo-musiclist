import { reactive } from 'vue'
import songsList from 'data/songs_list.json'

const songsListStore = reactive({
  debug: false,
  state: {
    songsList: songsList
  }
})

export default songsListStore