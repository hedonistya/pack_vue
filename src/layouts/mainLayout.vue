<template>
  <sidebar />
  <router-view />
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "mainLayout",
  components: { Sidebar }
};
</script>
