<template>
  <div class="demo-app">
    <!-- <el-button style="width: 200px" type="warning" @click="toggleDialog"
      >填寫表單</el-button
    > -->
    <el-dialog v-model="dialogVisible" width="500">
      <p style="font-size: 2em">我要捐獻！</p>
      <div class="formContent">
        <el-form
          :model="form"
          :rules="rules"
          ref="formRef"
          :label-position="'left'"
          style="padding: 15px"
        >
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input
              v-model="form.name"
              placeholder="請填寫姓名（例: 王小明、Andy-lee）"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="單位名稱"
            :label-width="formLabelWidth"
            prop="org"
          >
            <el-input
              v-model="form.org"
              placeholder="請填寫單位名稱（例: 個人、街角家）"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="聯絡電話"
            :label-width="formLabelWidth"
            prop="phone"
          >
            <el-input
              v-model="form.phone"
              placeholder="請填寫手機號碼（例：0912345678）"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="內容" :label-width="formLabelWidth" prop="item">
            <el-input
              v-model="form.item"
              placeholder="請描述物資內容 （例：素菜便當）"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="份數"
            :label-width="formLabelWidth"
            prop="quantity"
          >
            <el-input
              v-model="form.quantity"
              placeholder="請填寫提供物資份數（例：10）"
              autocomplete="off"
            >
              <template #append>份</template>
            </el-input>
          </el-form-item>
          <el-form-item label="類型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="form.type" placeholder="請選擇物資類型">
              <el-option label="食物" value="food" />
              <el-option label="保暖" value="clothes" />
              <el-option label="衛生" value="hygiene" />
              <el-option label="醫療" value="medical" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="地點"
            :label-width="formLabelWidth"
            prop="location"
          >
            <el-select v-model="form.location" placeholder="請選擇發放地點">
              <el-option label="台中火車站" value="1" />
              <el-option label="民權地下道" value="2" />
              <el-option label="光復國小" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="請選擇日期"
              :disabled-date="disabledDate"
            />
          </el-form-item>
          <el-form-item label="時間" :label-width="formLabelWidth" prop="time">
            <el-time-select
              v-model="form.time"
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
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 確認 </el-button>
        </div>
      </template>
    </el-dialog>
    <div class="demo-app-main">
      <FullCalendar
        ref="fullCalendar"
        class="demo-app-calendar"
        :options="calendarOptions"
      >
        <template v-slot:eventContent="arg">
          <div
            class="custom-event"
            :style="{
              backgroundColor: arg.event.backgroundColor,
            }"
          >
            <div class="custom-event-time">
              {{ arg.timeText }} - {{ arg.event.extendedProps.item }} ({{
                arg.event.extendedProps.quantity
              }}份)
            </div>
          </div>
        </template>
      </FullCalendar>
    </div>
    <el-card
      v-if="cardVisible"
      class="box-card"
      shadow="hover"
      :style="cardStyle"
      @click.stop
    >
      <template #header>
        <div
          class="card-header"
          style="display: flex; justify-content: space-between"
        >
          <span>詳細資訊</span>
          <el-button @click="removeEventClick">
            <el-icon style="vertical-align: middle; width: 2em">
              <Delete /> </el-icon
          ></el-button>
        </div>
      </template>
      <div class="text item">
        <div class="custom-event-name">姓名：{{ cardData.name }}</div>
        <div class="custom-event-org">單位：{{ cardData.org }}</div>
        <div class="custom-event-item">物資內容：{{ cardData.item }}</div>
        <div class="custom-event-quantity">份數：{{ cardData.quantity }}</div>
        <div class="custom-event-location">地點：{{ cardData.location }}</div>
        <div class="custom-event-date">日期：{{ cardData.date }}</div>
        <div class="custom-event-time">時間：{{ cardData.time }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ElMessage, ElMessageBox } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { INITIAL_EVENTS, createEventId } from "../event-utils";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const fullCalendar = ref(null);
const currentEvents = ref([]);
const currentEvent = ref(null);
const cardStyle = ref({});
const formLabelWidth = "140px";
const dialogVisible = ref(false);
const cardVisible = ref(false);
const cardHovered = ref(false);

const disabledDate = (time) => {
  return time.getTime() < Date.now() - 86400000;
};

const cardData = reactive({
  name: "",
  org: "",
  phone: "",
  item: "",
  quantity: "",
  type: "",
  location: "",
  date: "",
  time: "",
});

const cardPosition = reactive({
  top: 0,
  left: 0,
});

const formRef = ref(null);
const form = ref({
  name: "",
  org: "",
  phone: "",
  item: "",
  quantity: "",
  type: "",
  location: "",
  date: "",
  time: "",
});

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  customButtons: {
    formButton: {
      text: "填寫表單",
      click: function () {
        toggleDialog();
      },
    },
  },
  headerToolbar: {
    left: "prev,next,today",
    center: "title",
    // right: "formButton dayGridMonth,timeGridWeek,timeGridDay",
    right: "formButton",
  },
  buttonText: {
    today: "今天",
    month: "月",
    week: "週",
    day: "日",
  },
  initialView: "dayGridMonth",
  events: [],

  // events: INITIAL_EVENTS,
  eventTimeFormat: {
    hour: "numeric",
    minute: "2-digit",
    meridiem: false,
    hour12: false,
  },
  locale: "zh-tw",
  fixedWeekCount: false,
  dayMaxEvents: false,
  editable: false,
  selectable: true,
  selectMirror: true,
  weekends: true,
  dateClick: handleDateSelect,
  eventClick: handleEventClick,
  eventMouseEnter: eventMouseEnter,
  eventMouseLeave: eventMouseLeave,
  // eventsSet: handleEvents,
});

const rules = reactive({
  name: [{ required: true, message: "請填寫姓名", trigger: "blur" }],
  org: [{ required: true, message: "請填寫單位名稱", trigger: "blur" }],
  phone: [{ required: true, message: "請填寫手機號碼", trigger: "blur" }],
  item: [{ required: true, message: "請描述物資內容", trigger: "blur" }],
  quantity: [
    { required: true, message: "請填寫提供物資份數", trigger: "blur" },
  ],
  type: [{ required: true, message: "請選擇物資類型", trigger: "change" }],
  location: [{ required: true, message: "請選擇發放地點", trigger: "change" }],
  date: [{ required: true, message: "請選擇日期", trigger: "change" }],
  time: [{ required: true, message: "請選擇時間", trigger: "change" }],
});

function toggleDialog() {
  dialogVisible.value = !dialogVisible.value;
}

function closeDialog() {
  dialogVisible.value = false;
  resetForm();
}

function closeCard() {
  cardVisible.value = false;
}

function handleDateSelect(selectInfo) {
  let calendarApi = selectInfo.view.calendar;
  calendarApi.unselect(); // clear date selection
}

function handleEventClick(clickInfo) {
  cardVisible.value = true;
  currentEvents.value = clickInfo;

  const rect = clickInfo.el.getBoundingClientRect();
  cardPosition.top = rect.top + window.scrollY;
  cardPosition.left = rect.left + window.scrollX + 180;

  cardStyle.value = {
    position: "absolute",
    top: `${cardPosition.top}px`,
    left: `${cardPosition.left}px`,
    zIndex: 10000,
    backgroundColor: "#ffffff",
    border: `1px solid ${clickInfo.event.backgroundColor}`,
  };

  cardData.name = clickInfo.event.extendedProps.name;
  cardData.org = clickInfo.event.extendedProps.org;
  cardData.phone = clickInfo.event.extendedProps.phone;
  cardData.item = clickInfo.event.extendedProps.item;
  cardData.quantity = clickInfo.event.extendedProps.quantity;
  cardData.type = clickInfo.event.extendedProps.type;
  cardData.location = clickInfo.event.extendedProps.location;
  cardData.date = clickInfo.event.startStr.split("T")[0];
  cardData.time = clickInfo.event.startStr.split("T")[1].slice(0, 5);

  clickInfo.jsEvent.stopPropagation();
}

function eventMouseEnter(clickInfo) {
  cardVisible.value = true;
  currentEvents.value = clickInfo;

  const rect = clickInfo.el.getBoundingClientRect();
  cardPosition.top = rect.top + window.scrollY;
  cardPosition.left = rect.left + window.scrollX + 180;

  cardStyle.value = {
    position: "absolute",
    top: `${cardPosition.top}px`,
    left: `${cardPosition.left}px`,
    zIndex: 10000,
    backgroundColor: "#ffffff",
    border: `1px solid ${clickInfo.event.backgroundColor}`,
  };

  cardData.name = clickInfo.event.extendedProps.name;
  cardData.org = clickInfo.event.extendedProps.org;
  cardData.phone = clickInfo.event.extendedProps.phone;
  cardData.item = clickInfo.event.extendedProps.item;
  cardData.quantity = clickInfo.event.extendedProps.quantity;
  cardData.type = clickInfo.event.extendedProps.type;
  cardData.location = clickInfo.event.extendedProps.location;
  cardData.date = clickInfo.event.startStr.split("T")[0];
  cardData.time = clickInfo.event.startStr.split("T")[1].slice(0, 5);
}

function eventMouseLeave() {
  cardVisible.value = true;
}

function removeEventClick() {
  const selectedEvent = currentEvents.value.event;
  ElMessageBox.prompt("請輸入聯絡電話", "刪除提示", {
    confirmButtonText: "確認",
    cancelButtonText: "取消",
    inputPattern: /^[0-9]{10}$/,
    inputErrorMessage: "聯絡電話格式錯誤",
  })
    .then(({ value }) => {
      if (value === selectedEvent.extendedProps.phone) {
        ElMessage({
          type: "success",
          message: `電話號碼正確，活動已刪除`,
        });
        selectedEvent.remove();
        cardVisible.value = false;
      } else {
        ElMessage({
          type: "error",
          message: "電話號碼不正確",
        });
      }
    })
    .catch(() => {
      // Handle cancel action
    });
}

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const formContent = form.value;
      const formatDate = formContent.date.toISOString().replace(/T.*$/, "");
      const startTime = `${formatDate}T${formContent.time}`;

      // Define the mapping between types and colors
      const typeColorMap = {
        food: "#fca421",
        clothes: "#67C23A",
        hygiene: "#409EFF",
        medical: "#fc8686",
      };

      // Get the color based on the type
      const backgroundColor = typeColorMap[formContent.type];

      // Create new event in FullCalendar
      const calendarApi = fullCalendar.value.getApi();
      calendarApi.addEvent({
        id: createEventId(),
        title: formContent.org,
        start: startTime,
        backgroundColor: backgroundColor,
        extendedProps: {
          name: formContent.name,
          org: formContent.org,
          phone: formContent.phone,
          item: formContent.item,
          quantity: formContent.quantity,
          type: formContent.type,
          location: formContent.location,
        },
      });
      resetForm();

      dialogVisible.value = false;
    } else {
      console.log("Form validation failed");
    }
  });
};

function resetForm() {
  form.value = {
    name: "",
    org: "",
    phone: "",
    item: "",
    quantity: "",
    type: "",
    location: "",
    date: "",
    time: "",
  };
}

function handleEvents(events) {
  currentEvents.value = events;
}

function handleClickOutside(event) {
  if (!event.target.closest(".box-card")) {
    closeCard();
  }
}

function fetchEvents() {
  const eventsCol = collection(db, "calEvent");
  onSnapshot(eventsCol, (snapshot) => {
    const events = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      events.push({
        id: doc.id,
        start: data.start,
        backgroundColor: data.backgroundColor,
        extendedProps: {
          name: data.name,
          org: data.org,
          phone: data.phone,
          item: data.item,
          quantity: data.quantity,
          type: data.type,
          location: data.location,
        },
      });
    });
    calendarOptions.events = events;
  });
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  fetchEvents();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.demo-app {
  display: flex;
}

.demo-app-sidebar {
  width: 230px;
  padding: 10px;
}

.demo-app-sidebar-section {
  margin-bottom: 20px;
  width: 230px;
  text-align: left;
}

.demo-app-main {
  flex-grow: 1;
  padding: 10px;
  height: 1000px;
}

.demo-app-calendar {
  max-width: 1200px;
  margin: 0 auto;
}

.box-card {
  width: 250px;
  text-align: left;
  background-color: #fff; /* Explicitly set background color */
}

.custom-event {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  text-wrap: wrap;
  color: #fff;
}

.custom-event-time {
  font-weight: bold;
}

.custom-event-title {
  font-size: 14px;
}

.custom-event-description {
  font-size: 12px;
  color: #666;
}

:deep(.el-picker-panel__body) {
  width: max-content;
}

:deep(.el-date-picker__header) {
  display: flex;
  align-items: center;
}

:deep(.el-form-item__label) {
  font-size: 16px;
}
</style>
