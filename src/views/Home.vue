<template>
  <div class="home" ref="home">
    <audio autoplay="true" loop ref="music" src="http://tm.lilanz.com/QYWX/Test/LMTest/assets/music/music_bg.mp3"></audio>
    <van-swipe style="height: 100%;" vertical :show-indicators="false" :loop="false">
      <van-swipe-item>
        <img :class="rate?'imgH':'imgW'" ref="homePage" v-lazy="$assetsSrc+'bg.png'">
        <!-- 第一页的输入名字区 -->
        <div class="edit" ref="edit" :style="editStyle">
          <div class="inp_edit" v-if="!isShare">
            <p>送呈</p>
            <input type="text" placeholder="输入宾客姓名" v-model="userName">
            <button @click="sure">生成请帖</button>
          </div>
          <div class="name_edit" v-else>
            <p>送呈</p>
            <h2>{{userName}}</h2>
            <p class="text_right">台启</p>
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
    this.getWXInfo();
    if (this.getUrlString("userName")) {
      //检测出当前界面是收件人的界面
      this.userName = this.getUrlString("userName");
      this.isShare = true;
    }
    // 解决页面因为输入框软键盘导致页面布局变化bug
    let _body = document.getElementsByTagName("body")[0];
    _body.style.height = _body.clientHeight + "px";
    window.addEventListener("resize", () => {
      this.getscale();
      this.getImgHeight();
    });
  },
  data() {
    return {
      userName: "",
      rate: true, //为true时，高度100%，false：宽度100%
      imgHeight: 0,
      editStyle: "",
      isShare: false, //为true时代表该界面是收件人见面，首页显示名字而不是输入框
      wxinfo: [],
    };
  },
  methods: {
    // 获得微信要分享需要的东西
    getWXInfo() {
      this.$api
        .getWxInfo({
          action: "getWXJSsignature",
          parameter: {
            configkey: 5,
            url: window.location.href.replace("\/#", ""), //("\/#", "")要写这样的，不然会出错
          },
        })
        .then((res) => {
          console.log(res);
          if (res.errcode != 0) {
            alert("界面出现错误不允许分享，可刷新重试");
            return;
          }
          this.wxinfo = res.data;
        })
        .catch((err) => {
          alert("接口出现错误！");
          console.log(err);
        });
    },
    // 获得url中的收件人名字
    getUrlString(key) {
      // 获取参数
      let url = window.location.search; // 正则筛选地址栏
      let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); // 匹配目标参数
      let result = url.substr(1).match(reg); // 返回参数值
      return result ? decodeURIComponent(result[2]) : null;
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
        _this.editStyle =
          "width:" + `${this.width}` + "px;height:" + `${this.height}` + "px";
      };
    },
    // 生成请帖按钮
    sure() {
      if (!this.userName) {
        alert("请输入宾客名字再生成请帖！");
        return;
      }
      if (this.userName.replace(/[^\x00-\xff]/g, "00").length > 14) {
        alert("名字长度限制7位！");
        return;
      }
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.wxinfo[0], // 必填，公众号的唯一标识，填自己的！
        timestamp: this.wxinfo[1], // 必填，生成签名的时间戳，刚才接口拿到的数据
        nonceStr: this.wxinfo[2], // 必填，生成签名的随机串
        signature: this.wxinfo[3], // 必填，签名，见附录1
        jsApiList: [
          "checkJsApi",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "showMenuItems",
          "updateAppMessageShareData",
        ], // 必填，需要使用的JS接口列表。
      });
      wx.ready(() => {
        //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          title: "这是分享名称", // 分享标题
          desc: `2021年7月9日\r\n利郎总部创意园六号楼\r\n福建晋江市长兴路200号`, // 分享描述
          link: window.location.href.replace("/#", "") + "?userName="+this.userName, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl:
            "http://tm.lilanz.com/QYWX/Test/LMTest/assets/img/celebration/share.jpg", // 分享图标
          success: function () {
            alert("生成请帖成功，请点击分享发送给朋友！");
          },
        });
        wx.error(function (res) {
          // config信息验证失败会执行error函数
          console.log(res);
        });
      });
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
  min-height: 100vh;
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
    .inp_edit,
    .name_edit {
      position: absolute;
      top: 58%;
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
      .text_right {
        text-align: right;
      }
      h2 {
        color: #ffdd89;
        font-weight: bold;
        font-size: 36px;
        height: 100px;
        line-height: 100px;
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