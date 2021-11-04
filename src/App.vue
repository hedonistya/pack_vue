<template>
  <div id="content">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import startLayout from "./layouts/startLayout";
import mainLayout from "./layouts/mainLayout";
import { Firebase } from "./firebase/firebase.config";

export default {
  data() {
    return {
      Firebase
    };
  },
  computed: {
    // work layout
    layout() {
      return (this.$route.meta.layout || "start") + "-layout";
    }
  },
  components: {
    startLayout,
    mainLayout
  }
};
</script>

<style lang="less">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#content {
  display: flex;
  width: 100vw;
  height: 100vh;
}

body {
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #fafafa;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: #252836;
}

h1 {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.4;
}

.button {
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  color: #EA7C69;
  background: transparent;
  border: 1px solid #EA7C69;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  transition: .3s ease-in-out;

  &.small {
    width: 175px;
    text-decoration: none;
  }

  &:hover {
    color: #ffffff;
    background: #EA7C69;
    box-shadow: 0px 8px 24px rgba(234, 124, 105, 0.4);
  }
}

input {
  display: flex;
  height: 48px;
  background-color: #2d303e;
  border: 1px solid #393C49;
  border-radius: 8px;
  color: #ffffff;
  padding: 14px;
  outline: none;

  &.big {
    width: 357px;
  }

  &.medium {
    width: 297px;
  }

  &.small {
    width: 172px;
  }
}

h1,
h2 {
  font-style: normal;
  font-weight: 600;
  line-height: 1.4;

  &.headerH1 {
    font-size: 28px;
  }

  &.headerH2 {
    font-size: 20px;
  }
}

.text {
  font-style: normal;
  line-height: 1.4;

  &.largeMedium {
    font-weight: 500;
    font-size: 16px;
  }

  &.largeRegular {
    font-weight: 400;
    font-size: 16px;
  }

  &.largeSemibold {
    font-weight: 600;
    font-size: 16px;
  }

  &.normalMedium {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.3;
  }

  &.normalRegular {
    font-weight: 400;
    font-size: 14px;
  }

  &.normalSemibold {
    font-weight: 600;
    font-size: 14px;
  }

  &.smallMedium {
    font-weight: 500;
    font-size: 12px;
  }

  &.smallRegular {
    font-weight: 400;
    font-size: 12px;
  }
}

hr {
  width: 100%;
  border: 1px solid #393C49;
  margin-top: 15px;
}
</style>
