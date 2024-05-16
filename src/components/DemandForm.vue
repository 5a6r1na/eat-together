<template>
  <el-button plain @click="dialogFormVisible = true"> 表單 </el-button>
  <el-dialog v-model="dialogFormVisible" title="我要捐獻！" width="500">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="單位名稱" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="聯絡電話" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="內容" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="份數" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="類型" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="物資類型">
          <el-option label="食物" value="shanghai" />
          <el-option label="醫療" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="地點" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="發放地點">
          <el-option label="台中火車站" value="shanghai" />
          <el-option label="光復地下道" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
</script>
