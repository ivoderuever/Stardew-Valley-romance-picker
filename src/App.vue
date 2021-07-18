<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import url("https://use.typekit.net/eqp3quc.css");

:root {
  --bg: #0c0c0c;
  --font: #f0f0f0;

  --primary: #dd3e61;
}

html, body {
  height: unset;
  width: unset;
}

body {
  background-color: var(--bg);
  background: url(./assets/bg.png) no-repeat fixed center center / cover;
  color: var(--font);
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  height: 100%;
  font-family: sofia-pro;


  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.btn {
  background-color: #FA9305;
  border: 1px solid #853605;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  border-radius: 1px;
  padding: 5px 10px;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background-color: #F08003;
  }
}
</style>
