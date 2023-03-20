<template>
  <div id="main">
    <content-vue class="content-vue"/>
    <aside-vue class="aside-vue"/>
  </div>
</template>

<script>
import AsideVue from 'comps/aside/index.vue'
import ContentVue from 'comps/content/index.vue'

import songsListStore from 'store/songsList.js'
import { reactive, watch } from 'vue'

export default {
  setup() {
    return {
      songsListStore: reactive(songsListStore.state)
    }
  },
  methods: {},
  components: {
    'aside-vue': AsideVue,
    'content-vue': ContentVue
  },
  created () {}
}
</script>

<style scoped>
div#main{
  width: 1920px;
  height: 969px;
  display: flex;
  justify-content: space-between;
  background-image: url("./src/assets/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.content-vue {
  width: 1050px;
  height: 750px;
  position: relative;
  top: 185px;
  left: 130px;
}
.aside-vue{
  width: 296px;
  height: 366px;
  position: relative;
  top: 560px;
  right: 150px;
}
</style>