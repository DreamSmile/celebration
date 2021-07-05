<template>
  <div class="home" :style="{height:winHeight}" ref="home">
    <audio autoplay="true" loop ref="music" src="http://tm.lilanz.com/QYWX/Test/LMTest/assets/music/music_bg.mp3"></audio>
    <van-swipe style="height: 100%;" vertical :show-indicators="false" :loop="false">
      <van-swipe-item>
        <img :class="rate?'imgH':'imgW'" ref="homePage" v-lazy="$assetsSrc+'bg.png'">
        <!-- 第一页的输入名字区 -->
        <div class="edit" ref="edit" :style="editStyle">
          <div class="inp_edit">
            <p>送呈</p>
            <input @focus="focusInp" @blur="blurInp" type="text" placeholder="输入宾客姓名" v-model="userName">
            <button @click="sure">生成请帖</button>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item><img :class="rate?'imgH':'imgW'" v-lazy="$assetsSrc+'img1.png'"></van-swipe-item>
      <van-swipe-item><img :class="rate?'imgH':'imgW'" v-lazy="$assetsSrc+'img2.png'"></van-swipe-item>
      <van-swipe-item><img :class="rate?'imgH':'imgW'" v-lazy="$assetsSrc+'img3.png'"></van-swipe-item>
      <!-- 地图 -->
      <van-swipe-item>
        <img class="map_imgs" v-lazy="$assetsSrc+'map_bg.jpg'">
        <div class="details">
          <img v-lazy="$assetsSrc+'title.png'" class="title_img">
          <div class="address1">
            <img v-lazy="$assetsSrc+'icon.png'">
            <p>利郎创意园演艺楼</p>
          </div>
          <div class="address2">
            <img v-lazy="$assetsSrc+'icon.png'">
            <p>利郎底下车库入口</p>
          </div>
          <div class="map">
            <div class="info">
              <p class="info_title">席设地点</p>
              <p class="info_address">利郎总部创意园演艺楼</p>
            </div>
            <button class="btn" @click="goMap">导航</button>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>


<script>
export default {
  name: "Home",
  mounted() {
    this.getscale();
    this.getImgHeight();
    this.audioPlay();
    this.userName = document.documentElement.clientHeight;
    window.addEventListener("resize", () => {
      this.getscale();
      this.getImgHeight();
      // let nowHeight = document.documentElement.clientHeight;
      // if (winHeight - nowHeight > 50) {
      //   this.winHeight = nowHeight;
      // } else {
      //   this.winHeight = "100%";
      // }
    });
  },
  data() {
    return {
      userName: "",
      rate: true, //为true时，高度100%，false：宽度100%
      imgHeight: 0,
      editStyle: "",
      testHeight: 0,
      winHeight: "100%",
    };
  },
  methods: {
    // input焦点等于是键盘弹出
    focusInp() {
      this.userName = document.documentElement.clientHeight;
      return true;
    },
    // input失去焦点
    blurInp() {
      this.getscale();
      this.getImgHeight();
    },

    // 去地图界面
    goMap() {
      let url =
        "https://mapapi.qq.com/web/mapComponents/locationMarker/v/index.html?type=0&marker=coord:24.797304,118.571200;title:%E5%88%A9%E9%83%8E%E6%80%BB%E9%83%A8%E5%88%9B%E6%84%8F%E5%9B%AD%E6%BC%94%E8%89%BA%E6%A5%BC;addr:%E7%A6%8F%E5%BB%BA%E7%9C%81%E6%B3%89%E5%B7%9E%E5%B8%82%E6%99%8B%E6%B1%9F%E5%B8%82%E5%88%A9%E9%83%8E%E5%88%9B%E6%84%8F%E5%9B%AD6%E5%8F%B7%E6%A5%BC&key=key=SS2BZ-CV6KR-LBAWE-W6BR3-OAB25-Q2BJN";
      window.open(url);
    },
    // 背景音乐播放
    audioPlay() {
      let audio = this.$refs.music;
      audio.play();
      document.addEventListener(
        //ios自动播放
        "WeixinJSBridgeReady",
        function () {
          audio.play();
        },
        false
      );
    },
    // 根据手机页面宽高，定义图片展示形式
    getscale() {
      var ratio =
        document.documentElement.clientWidth /
        document.documentElement.clientHeight;
      if (ratio > 375 / 724) {
        this.rate = true;
      } else {
        this.rate = false;
      }
    },
    // 获得首页图片的高度设置输入框位置
    getImgHeight() {
      let _this = this;
      this.$refs.homePage.onload = function () {
        // console.log("宽度：" + this.width + "高度：" + this.height);
        _this.editStyle =
          "width:" + `${this.width}` + "px;height:" + `${this.height}` + "px";
      };
      this.$nextTick(() => {
        // this.editStyle =
        //   "width:" +
        //   `${this.$refs.homePage.offsetWidth}` +
        //   "px;height:" +
        //   `${this.$refs.homePage.clientHeight}` +
        //   "px";
        // console.log(this.$refs.homePage.naturalHeight);
        // console.log(this.$refs.homePage.offSetheight);
        // console.log(this.$refs.homePage.clientHeight);
      });
    },
    // 生成请帖按钮
    sure() {
      if (!this.userName) {
        alert("请输入宾客名字再生成请帖！");
        return;
      }
      alert(this.userName);
    },
  },
};
</script>

<style scoped lang="less">
.home {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, 微软雅黑;
  max-width: 540px;
  height: 100%;
  width: 100%;
  margin: auto;
  background-color: #c11a20;

  /deep/.van-swipe-item {
    text-align: center;
    position: relative;
  }
  .map_imgs {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .bg_imgs {
    background-position: 50%;
    background-size: cover;
    width: 100%;
    height: 100%;
  }
  .imgW {
    width: 100%;
  }
  .imgH {
    height: 100%;
  }
  // 输入名字区
  .edit {
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    overflow-y: scroll;
    .inp_edit {
      position: absolute;
      top: 58%;
      // top: 0;
      left: 0;
      right: 0;
      width: 65%;
      text-align: center;
      margin: 0 auto;
      p {
        font-size: 28px;
        font-weight: bold;
        color: #ffdd89;
        text-align: left;
      }
      input[type="text"] {
        text-align: center;
        font-weight: bold;
        color: #ffdd89;
        font-size: 24px;
        width: 100%;
        margin: 26px 0;
        background-color: #af1419;
        padding: 4px 0;
      }
      input::-webkit-input-placeholder,
      textarea::-webkit-input-placeholder {
        color: #ffdd89;
        font-size: 24px;
        padding: 4px 0;
      }

      button {
        border: 2px solid #ffdd89;
        padding: 8px 34px;
        font-weight: 600;
        color: #ffdd89;
        background-color: transparent;
      }
    }
  }
  //地图界面
  .details {
    height: 100%;
    width: 100%;
    position: relative;
    .title_img {
      width: 80%;
      position: absolute;
      margin: 0 auto;
      top: 5%;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .address1 {
      width: 8em;
      position: absolute;
      bottom: 23%;
      left: 23%;
      img {
        width: 72px;
      }
      p {
        font-size: 14px;
        color: #fff;
        font-weight: 600;
      }
    }
    .address2 {
      width: 8em;
      position: absolute;
      bottom: 25%;
      right: 5%;

      img {
        width: 66px;
      }
      p {
        font-size: 14px;
        color: #fff;
        font-weight: 600;
      }
    }
    .map {
      width: 80%;
      height: 72px;
      background: rgba(37, 40, 51, 0.7);
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.5);
      border-radius: 6px;
      position: absolute;
      bottom: 4%;
      margin: 0 auto;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      padding: 15px 20px;
      box-sizing: border-box;
      .info {
        text-align: left;
        .info_title {
          font-size: 14px;
          color: #f5df8c;
          font-weight: 500;
          padding-left: 14px;
          position: relative;
        }
        .info_title::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #f5df8c;
          position: absolute;
          left: 0;
          top: 3px;
        }
        .info_address {
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          margin-top: 10px;
        }
      }
      .btn {
        width: 88px;
        height: 42px;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        background-color: #18ccc0;
        border-radius: 4px;
      }
    }
  }
}
</style>