<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-sub-menu index="0">
      <template #title>地點</template>
      <el-menu-item index="1">台中火車站</el-menu-item>
      <el-menu-item index="2">民權地下道</el-menu-item>
      <el-menu-item index="3">光復國小</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="台中火車站" name="台中火車站">a</el-tab-pane>
    <el-tab-pane label="民權地下道" name="民權地下道">b</el-tab-pane>
    <el-tab-pane label="光復國小" name="光復國小">c</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeName = ref("first");

const handleClick = (tab, event) => {
  // console.log(tab, event);
};

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
