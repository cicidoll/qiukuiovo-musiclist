<template>
    <div>
        <div class="song__bg"><!--绝对定位-->
            <div class="song-wrap">
                <div class="song-disc" @click="songDiscClick"><!--相对定位-->
                    <div class="song-disc__bg"><!--绝对定位--></div>
                    <div class="song-disc__cover"><!--绝对定位-->
                        <div class="song-img">
                            <img alt="" class="u-img">
                        </div>
                    </div>
                    <div class="play-btn"></div><!--绝对定位-->
                    <div class="song-needle"></div><!--绝对定位-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {},
    mounted () {
        this.songDiscClick()
    },
    methods: {
        songDiscClick() {
            const $ = (str) => document.querySelector(str);//自定义了一个“$”的常量,使用了箭头函数，获取文档中的元素
            this.correctCoverRotate($);
            $('.song-needle').classList.toggle('play');//classList.toggle为 xx 元素添加 class=play
            $('.song-img').classList.toggle('play');
            $('.play-btn').classList.toggle('play');
        },
        correctCoverRotate($) {
            const isPlaying = $('.play-btn').classList.contains('play');//classList.contains()返回布尔值，判断指定的类名是否存在
            const nextPlay = !isPlaying;
            //下一步静止的时候才纠正旋转
        
            //getComputedStyle() 方法用于获取指定元素的 CSS 样式。
            //getPropertyValue('xx')返回 xx 属性的值
            //transform 属性向元素应用 2D 或 3D 转换。该属性允许您对元素进行旋转、缩放、移动或倾斜。
            //matrix(n,n,n,n,n,n)	定义 2D 转换，使用六个值的矩阵。
            //transform 2D的转换是由一个3*3的矩阵表示的，前两行代表转换的值，分别是 a b c d e f 
            //[ [a,c,e],
            //  [b,d,f],
            //  [0,0,1]
            //]
            //要注意是竖着排的，第一行代表的是X轴变化，第二行代表的是Y轴的变化，第三行代表的是Z轴的变化，2D不涉及到Z轴，这里使用 0 0 1
            if (!nextPlay) {
                const $songCover = $('.song-disc__cover');
                const $songImg = $('.song-img');
                const songImgMatrix = window.getComputedStyle($songImg).getPropertyValue('transform');//获取song——img的transform的matrix值
                const songCoverMatrix = window.getComputedStyle($songCover).getPropertyValue('transform');//获取song——disc__cover的transform的matrix值
                if (songCoverMatrix === 'none' ) {
                    $songCover.style.transform = songImgMatrix;
                } else {
                    const matrix1 = this.parseMatrix(songCoverMatrix);
                    const matrix2 = this.parseMatrix(songImgMatrix);
                    const angle1 = this.calcAngle(matrix1[0],matrix1[1]);
                    const angle2 = this.calcAngle(matrix2[0],matrix2[1]);
                    const angle = angle1 + angle2;
                    const radian = (Math.PI / 180) * angle;
                    const [a, b, c, d] = [Math.cos(radian), Math.sin(radian), -Math.sin(radian), Math.cos(radian)];
                    $songCover.style.transform = `matrix(${a}, ${b}, ${c}, ${d}, 0, 0)`;
                }
            }
        },
        /**
        * 解析 matrix 数据
        * @param {String} matrix "matrix(-0.958715, 0.284368, -0.284368, -0.958715, 0, 0)"
        * @returns {Array} [a, b, c, d, e, f]
        */
        parseMatrix(matrix) {
            const start = matrix.indexOf('(') + 1;
            const end = matrix.indexOf(')');
            const content = matrix.slice(start,end);
            const values = content.split(', ');
            return values;
        },
        /**
        * 根据x,y坐标，返回角度值angle
        * @param {Number} (a, b) "(a, b)=(x, y)"
        * @returns {Number} angle
        */
        calcAngle(a, b) {
            //Math.atan2() 返回从原点(0,0)到(x,y)点的线段与x轴正方向之间的平面角度(弧度值)，也就是Math.atan2(y,x)
            //注意此函数接受的参数：先传递 y 坐标，然后是 x 坐标。
            const radian = Math.atan2(b, a);//radian：弧度
            const angle = radian * (180 / Math.PI);//angle：角度
            return angle;
        }
    }
}
</script>

<style scoped>
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.song__bg{
    width: 296px;
    height: 366px;
    position: absolute;
    /*绝对定位*/
    top: 0;
    left:0;
    bottom: 0;
    right: 0;
}
.song-wrap{
    padding-top: 70px;
}
.song-disc{
    position: relative;
    /*相对定位 */
    width: 296px;
    height: 296px;
    margin: 0 auto;
}
.song-disc__bg{
    position: absolute;
    /*绝对定位*/
    z-index: 2;
    top: 0;
    left:0;
    bottom: 0;
    right: 0;
    background: url("./src/assets/aside/images/disk.png") no-repeat center;
    background-size: contain;/*contain：把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。*/
}
.song-disc__cover{
    position: absolute;
    /*绝对定位*/
    z-index: 1;
    width: 184px;
    height: 184px;
    left: 50%;
    top: 50%;
    margin-left: -92px;
    margin-top: -92px;
}
.song-img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;/*overflow 属性规定当内容溢出元素框时发生的事情。当值为hidden时，代表内容会被修剪，并且其余内容是不可见的。*/
    font-size: 0;
}
.u-img{
    width: 184px;
    height: 184px;
    background-image: url("./src/assets/aside/images/cover.png");
    background-size: cover;
}
.song-img.play {
    animation:circle 10s linear infinite;
}
@keyframes circle {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
.play-btn {
    width: 56px;
    height: 56px;
    position: absolute;
    /*绝对定位*/
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: url("./src/assets/aside/images/play_rdi_btn_play.png") no-repeat;
    background-size: contain;
    /*contain：把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。*/
}
.play-btn.play {
    width: 56px;
    height: 56px;
    position: absolute;
    /*绝对定位*/
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: url("./src/assets/aside/images/play_rdi_btn_pause.png") no-repeat;
    background-size: contain;
    /* contain：把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。*/
}
.song-needle {
    position: absolute;
    /*绝对定位*/
    z-index: 10;
    top: -70px;
    width: 96px;
    height: 137px;
    left: 133px;
    background: url("./src/assets/aside/images/play_needle.png") no-repeat;
    background-size: contain;/* contain：把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。*/
    transform: rotate(-30deg);
    transform-origin: left top;/* transform-origin CSS属性让你更改一个元素变形的原点。*/
    transition: transform .5s;
}
.song-needle.play {
    transform: rotate(0);
}
</style>