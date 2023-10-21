<template>
    <div>
        <div class="search">
            <div class="select"></div>
            <input class="input" v-model="search" placeholder="请输入想搜索的序号、歌名、歌手、语种、类型">
        </div>
        <div class="songs-list">
            <table class="table">
                <tr class="first">
                    <th class="index">序号</th>
                    <th class="name">歌名</th>
                    <th class="singer">歌手</th>
                    <th class="language">语种</th>
                    <th class="type">类型</th>
                    <th class="pay">是否付费</th>
                </tr>
                <tr v-for="(item) in searchSongs(songsList)" :key="item">
                    <td class="index">第<a style="letter-spacing: 4px;">{{item.id}}</a>首</td>
                    <td class="name">{{item.name}}</td>
                    <td class="singer">{{item.singer}}</td>
                    <td class="language">{{item.language}}</td>
                    <td class="type">{{item.type === "" ? "/" : item.type}}</td>
                    <td class="pay">{{item.pay === "" ? "否" : item.pay + "元"}}</td>
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
                    if(
                        String(item["id"]).includes(this.search) ||
                        item["name"].includes(this.search) ||
                        item["singer"].includes(this.search) ||
                        item["language"].includes(this.search) ||
                        item["type"].includes(this.search)
                        )
                    {
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
    font-size: 30px;
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

    border-collapse:collapse;
    table-layout: fixed;
    margin: 0 auto;
}
table.table{
    width: 100%;
}
tr.first {
    font-size: 22px;
    font-family: "Source Han Serif CN";
    font-weight: 300;
    color: #3D3E43;
    text-shadow: none;
    text-align: center;
}
tr {
    margin-bottom: 15px;
}
th {
    padding: 10px;
}
td {
    width: fit-content;
    font-size: 22px;
    line-height: 30px;
    font-family: "Source Han Serif CN";
    font-weight: normal;
    color: #acb7ec;
    text-shadow: none;
    text-align: center;
    padding: 10px;
}
.index {
    padding-left: 15px;
    padding-right: 20px;
    border-right: 3px solid #B4B6E9;
}
.index, .language, .type {
    /* width: 100px; */
    text-align: center;
    letter-spacing: 2px;
}
.singer
{
    text-align: center;
    letter-spacing: 4px;
    white-space: nowrap;
}
.pay {
    text-align: center;
    letter-spacing: 2px;
}
.name{
    text-align: center;
    padding-left: 20px;
}
</style>