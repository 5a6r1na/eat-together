<template>
  <el-dialog v-model="visible" width="500">
    <p style="font-size: 2em">我要捐獻！</p>
    <div class="formContent">
      <el-form :model="form" :label-position="'left'" style="padding: 15px">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            placeholder="請填寫姓名（例: 王小明、Andy-lee）"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="單位名稱" :label-width="formLabelWidth">
          <el-input
            v-model="form.org"
            placeholder="請填寫單位名稱（例: 街角家）"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="聯絡電話" :label-width="formLabelWidth">
          <el-input
            v-model="form.phone"
            placeholder="請填寫手機號碼（例：0912345678）"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="內容" :label-width="formLabelWidth">
          <el-input
            v-model="form.content"
            placeholder="請描述物資內容 （例：素菜便當）"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="份數" :label-width="formLabelWidth">
          <el-input
            v-model="form.quantity"
            placeholder="請填寫提供物資份數（例：10）"
            autocomplete="off"
          >
            <template #append>份</template>
          </el-input>
        </el-form-item>
        <el-form-item label="類型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="請選擇物資類型">
            <el-option label="食物" value="food" />
            <el-option label="保暖" value="clothes" />
            <el-option label="衛生" value="hygiene" />
            <el-option label="醫療" value="medical" />
          </el-select>
        </el-form-item>
        <el-form-item label="地點" :label-width="formLabelWidth">
          <el-select v-model="form.location" placeholder="請選擇發放地點">
            <el-option label="台中火車站" value="1" />
            <el-option label="民權地下道" value="2" />
            <el-option label="光復國小" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="date" type="date" placeholder="請選擇日期" />
        </el-form-item>
        <el-form-item label="時間" :label-width="formLabelWidth">
          <el-time-select
            v-model="time"
            style="width: 240px"
            start="07:00"
            step="00:15"
            end="22:30"
            placeholder="請選擇時間"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false"> 確認 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const date = ref("");
const time = ref("");

const props = defineProps({
  visible: Boolean,
});
const visible = ref(props.visible);

console.log("Visible prop:", visible.value);
const form = ref({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
const formLabelWidth = "140px";

watch(
  () => props.visible,
  (newValue) => {
    visible.value = newValue;
  }
);
</script>

<style scoped>
:deep(.el-form-item__label) {
  font-size: 16px;
}
</style>
