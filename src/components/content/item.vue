<template>
    <div class="sub-song">
        <div class="content">
            第{{ id }}首: {{ name }}
        </div>
    </div>
</template>

<script>
export default {
    props: ['songs'],
    setup(props) {
        return {
            id: props.songs.id,
            name: props.songs.name
        }
    }
}
</script>

<style scoped>
.sub-song{
    width: 80%;
    min-height: 60px;
    background: linear-gradient(to right, #C2B3E9, #AF8CD9);
    border: 3px solid #FFFFFF;
    border-radius: 44px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    box-shadow: 0 0 0 #FFF;
}
.sub-song::before {
    content: '';
    width: 246px;
    height: 78px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    background-image: url("./src/assets/songs/images/jianzhang-left-bottom.png");
    background-size: 246px 78px;
    background-repeat: no-repeat;
    background-position: right top;
    box-shadow: 0 0 0 #FFF;
    z-index: 1;
}
.sub-song::after {
    content: '';
    width: 246px;
    height: 78px;
    position: absolute;
    top: 0px;
    right: 0px;
    background-image: url("./src/assets/songs/images/jianzhang-right-top.png");
    background-size: 246px 78px;
    background-repeat: no-repeat;
    background-position: right top;
    box-shadow: 0 0 0 #FFF;
    z-index: 1;
}
.content {
    width: 100%;
    background-image: url("./src/assets/songs/images/chat-background.png");
    background-repeat: no-repeat;
    background-position: center calc(50% + 50px);
    font-size: 50px;
    font-family: 'SourceHanSerif-Heavy';
    font-weight: 800 !important;
    color: #FFFFFF !important;
    text-shadow: none !important;
    text-align: center;
    box-shadow: 0 0 0 #FFF;
}
</style>