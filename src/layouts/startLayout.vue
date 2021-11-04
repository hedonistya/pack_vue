<template>
  <router-view />
</template>

<script>
export default {
  name: "startLayout"
};
</script>

<style lang="less" scoped>
.auth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 530px;
  height: 520px;
  background: #1F1D2B;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
  margin: auto;

  &:hover {
    box-shadow: 0px 0px 80px 4px rgba(234, 124, 105, 0.25);
  }
}

.main {
  display: flex;
  flex-direction: column;
}
</style>
