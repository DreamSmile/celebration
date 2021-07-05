<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100% !important;
  // min-height: 100vh !important; //解决页面因为输入框软键盘导致页面布局变化bug
  width: 100%;
  overflow: hidden;
}
</style>
