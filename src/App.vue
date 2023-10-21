<template>
  <div id="main">
    <aside-vue class="aside-vue"/>
    <content-vue class="content-vue"/>
  </div>
</template>

<script>
import AsideVue from 'comps/aside/index.vue'
import ContentVue from 'comps/content/index.vue'

import songsListStore from 'store/songsList.js'
import { reactive } from 'vue'

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
  background-image: url("/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.content-vue {
  width: 950px;
  height: 767px;
  position: relative;
  top: 170px;
  left: -110px;
}
.aside-vue{
  width: 740px;
  height: 740px;
  position: relative;
  top: 120px;
  left: 80px;
}
</style>