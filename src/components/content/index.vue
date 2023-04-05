<template>
    <div>
        <div class="search">
            <div class="select"></div>
            <input class="input" v-model="search" placeholder="请输入想搜索的歌曲名">
        </div>
        <div class="songs-list">
            <table>
                <tr class="first">
                    <th class="index">序号</th>
                    <th class="name">歌名</th>
                </tr>
                <tr v-for="item in searchSongs(songsList)" :key="item">
                    <td class="index">第
                        <a style="letter-spacing: 0px;">{{item.id}}</a>
                    首</td>
                    <td class="name">{{item.name}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import songsListStore from 'store/songsList.js'
import { reactive, ref } from 'vue'

export default {
    setup() {
        let search = ref("")
        let songsList = reactive(songsListStore.state.songsList)

        return { search, songsList }
    },
    methods: {
        searchSongs(list) {
            return this.search == "" ? list : list.filter(
                (item) => {
                    if(item["name"].includes(this.search)){
                        return item
                    }
                }
            )
        }
    },
    components: {},
    mounted() {},
    computed: {}
}
</script>

<style scoped>
.search {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
}
.select {
    margin-top: 15px;
    width: 80%;
    height: 80px;
    background-color: transparent;
    border-radius: 40px;
}
.input {
    margin-top: 15px;
    width: 80%;
    height: 80px;
    background: linear-gradient(to right, #C2B3E9, #B4B6E9);
    border: 3px solid #FFFFFF;
    border-radius: 44px;
    font-size: 50px;
    font-family: "Source Han Serif CN";
    font-weight: 300;
    color: #FFFFFF;
    text-shadow: none;
    text-align: center;
    letter-spacing: 3px;
}
input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.8) !important;
}
.input:focus {
    border: 3px solid #FFFFFF;
    outline: none;
}
.songs-list {
    margin-top: 25px;
    width: 100%;
    height: 500px;
    overflow-y: scroll;
}
.songs-list::-webkit-scrollbar {
    width: 20px;
    height: 20px;
}

.songs-list::-webkit-scrollbar-thumb {
    background: #B4B6E9;
    border-radius: 5px;
}
.songs-list::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #ffffffcd;
}
table {
    width: 100%;
    border-collapse:collapse;
    table-layout: fixed;
}
tr.first {
    font-size: 30px;
    font-family: "Source Han Serif CN";
    font-weight: 300;
    color: #3D3E43;
    text-shadow: none;
    text-align: center;
}
tr {
    height: 50px;
    margin-bottom: 5px;
}
td {
    font-size: 30px;
    font-family: "Source Han Serif CN";
    font-weight: normal;
    color: #acb7ec;
    text-shadow: none;
    text-align: center;
    
}
td.index {
    border-right:  3px solid #B4B6E9;
}
.index {
    width: 300px;
    text-align: center;
    letter-spacing: 2px;
}
.name{
    width: calc(100% - 300px);
    text-align: center;
}
</style>