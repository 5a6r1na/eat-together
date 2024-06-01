<template>
  <div class="menu-container">
    <el-tabs
      v-model="selectedTab"
      @tab-click="handleTabClick"
      class="tabs-container"
    >
      <el-tab-pane label="台中火車站" name="1"></el-tab-pane>
      <el-tab-pane label="民權地下道" name="2"></el-tab-pane>
      <el-tab-pane label="光復國小" name="3"></el-tab-pane>
    </el-tabs>
    <div class="tags-container">
      <el-tag color="#fca421">食物</el-tag>
      <el-tag color="#67C23A">保暖</el-tag>
      <el-tag color="#409EFF">衛生</el-tag>
      <el-tag color="#fc8686">醫療</el-tag>
    </div>
  </div>
  <div class="demo-app">
    <!-- <el-button style="width: 200px" type="warning" @click="toggleDialog"
      >填寫表單</el-button
    > -->
    <el-dialog v-model="dialogVisible" width="500px">
      <p style="font-size: 2em">發放表單</p>
      <div class="formContent">
        <el-form
          :model="form"
          :rules="rules"
          ref="formRef"
          :label-position="'left'"
          style="padding: 15px"
          class="donation-form"
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
          <!-- <el-form-item label="物資內容" :label-width="formLabelWidth" prop="item">
            <el-input
              v-model="form.item"
              placeholder="請描述物資內容 （例：素菜便當）"
              autocomplete="off"
            />
          </el-form-item> -->
          <!-- sabrina{6/1}: item dropdown -->
          <el-form-item
            label="物資類型"
            :label-width="formLabelWidth"
            prop="type"
          >
            <el-select
              v-model="form.type"
              placeholder="請選擇物資類型"
              clearable
            >
              <el-option
                v-for="option in typeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
          <div v-if="shouldRenderItem">
            <el-form-item
              label="物資內容"
              :label-width="formLabelWidth"
              prop="item"
            >
              <el-select
                v-model="form.item"
                placeholder="請選擇物資內容"
                clearable
              >
                <el-option
                  v-for="option in itemOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>
          </div>
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
          <el-form-item
            label="地點"
            :label-width="formLabelWidth"
            prop="location"
          >
            <el-select
              v-model="form.location"
              placeholder="請選擇發放地點"
              clearable
            >
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
              clearable
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
              clearable
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
            v-if="shouldRenderContent"
            class="custom-event"
            :style="{ backgroundColor: arg.event.backgroundColor }"
          >
            <div class="custom-event-time">
              {{ arg.timeText }} - {{ arg.event.extendedProps.item }} ({{
                arg.event.extendedProps.quantity
              }}份)
            </div>
          </div>
          <div
            v-else
            class="custom-dot"
            :style="{ backgroundColor: arg.event.backgroundColor }"
          ></div>
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
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
} from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ElMessage, ElMessageBox } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
// import { INITIAL_EVENTS, createEventId } from "../event-utils";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const fullCalendar = ref(null);
const currentEvents = ref([]);
const currentEvent = ref(null);
const cardStyle = ref({});
const formLabelWidth = "100px";
const dialogVisible = ref(false);
const cardVisible = ref(false);
const cardHovered = ref(false);
const selectedTab = ref("1");
const screenWidth = ref(window.innerWidth);
fetchEvents();

// sabrina{6/1}: item dropdown
const shouldRenderItem = computed(() => {
  return form.value.type && form.value.type !== "";
});

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
  type: "",
  item: "",
  quantity: "",
  location: "",
  date: "",
  time: "",
});

// sabrina{6/1}: item dropdown
const typeOptions = [
  { label: "食物", value: "food" },
  { label: "保暖", value: "clothes" },
  { label: "衛生", value: "hygiene" },
  { label: "醫療", value: "medical" },
];

// sabrina{6/1}: item dropdown
const itemOptions = computed(() => {
  switch (form.value.type) {
    case "food":
      return [
        { label: "包子", value: "bun" },
        { label: "麵包", value: "bread" },
        { label: "便當", value: "bento" },
        { label: "水果", value: "fruit" },
      ];
    case "clothes":
      return [
        { label: "短袖上衣", value: "bun" },
        { label: "長袖上衣", value: "bread" },
      ];
    case "hygiene":
      return [
        { label: "牙刷", value: "toothbrush" },
        { label: "牙膏", value: "toothpaste" },
        { label: "衛生棉", value: "pads" },
        { label: "衛生紙", value: "tissue" },
        { label: "棉花棒", value: "cottonswab" },
      ];
    case "medical":
      return [{ label: "診療", value: "doctor" }];
    default:
      return [
        { label: "包子", value: "bun" },
        { label: "麵包", value: "bread" },
        { label: "便當", value: "bento" },
        { label: "水果", value: "fruit" },
        { label: "短袖上衣", value: "bun" },
        { label: "長袖上衣", value: "bread" },
        { label: "牙刷", value: "toothbrush" },
        { label: "牙膏", value: "toothpaste" },
        { label: "衛生棉", value: "pads" },
        { label: "衛生紙", value: "tissue" },
        { label: "棉花棒", value: "cottonswab" },
        { label: "診療", value: "doctor" },
      ];
  }
});

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  customButtons: {
    formButton: {
      text: "登記發放",
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
  views: {
    dayGridMonth: {
      // titleFormat: { year: "numeric", month: "numeric" },
      // other view-specific options here
    },
  },
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
  cardPosition.top = rect.top + window.scrollY - 10;
  cardPosition.left = rect.left + window.scrollX + 180;

  // Calculate card width
  const cardWidth = 200;
  const screenWidth = window.innerWidth;

  if (screenWidth < 900) {
    cardStyle.value = {
      position: "absolute",
      top: `${cardPosition.top}px`,
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 10000,
      backgroundColor: "#ffffff",
      border: `1px solid ${clickInfo.event.backgroundColor}`,
    };
  } else {
    if (cardPosition.left + cardWidth > screenWidth) {
      cardPosition.left = rect.left + window.scrollX - cardWidth;
      cardPosition.top = rect.bottom + window.scrollY;
    }
    cardStyle.value = {
      position: "absolute",
      top: `${cardPosition.top}px`,
      left: `${cardPosition.left}px`,
      zIndex: 10000,
      backgroundColor: "#ffffff",
      border: `1px solid ${clickInfo.event.backgroundColor}`,
    };
  }

  // sabrina{6/1}: item dropdown
  const getLabelFromValue = (value) => {
    console.log(itemOptions.value);
    const option = itemOptions.value.find((item) => item.value === value);
    return option ? option.label : "";
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
  cardPosition.top = rect.top + window.scrollY - 10;
  cardPosition.left = rect.left + window.scrollX + 180;

  // Calculate card width
  const cardWidth = 200;
  const screenWidth = window.innerWidth;

  if (screenWidth < 900) {
    cardStyle.value = {
      position: "absolute",
      top: `${cardPosition.top}px`,
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 10000,
      backgroundColor: "#ffffff",
      border: `1px solid ${clickInfo.event.backgroundColor}`,
    };
  } else {
    if (cardPosition.left + cardWidth > screenWidth) {
      cardPosition.left = rect.left + window.scrollX - cardWidth;
      cardPosition.top = rect.bottom + window.scrollY;
    }
    cardStyle.value = {
      position: "absolute",
      top: `${cardPosition.top}px`,
      left: `${cardPosition.left}px`,
      zIndex: 10000,
      backgroundColor: "#ffffff",
      border: `1px solid ${clickInfo.event.backgroundColor}`,
    };
  }

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
  cardVisible.value = false;
  const selectedEvent = currentEvents.value.event;
  ElMessageBox.prompt("請輸入登記時的聯絡電話：", "刪除提示", {
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
        // selectedEvent.remove();
        deleteDoc(doc(db, "calEvent", selectedEvent.id));
        cardVisible.value = false;
      } else {
        ElMessage({
          type: "error",
          message: "電話號碼不正確，請重新輸入或聯繫街角家志工",
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
      // const calendarApi = fullCalendar.value.getApi();
      // calendarApi.addEvent({
      //   id: createEventId(),
      //   start: startTime,
      //   backgroundColor: backgroundColor,
      //   extendedProps: {
      //     name: formContent.name,
      //     org: formContent.org,
      //     phone: formContent.phone,
      //     item: formContent.item,
      //     quantity: formContent.quantity,
      //     type: formContent.type,
      //     location: formContent.location,
      //   },
      // });

      const docRef = addDoc(collection(db, "calEvent"), {
        start: startTime,
        backgroundColor: backgroundColor,
        name: formContent.name,
        org: formContent.org,
        phone: formContent.phone,
        item: formContent.item,
        quantity: formContent.quantity,
        type: formContent.type,
        location: formContent.location,
      });
      console.log("Document written with ID: ", docRef.id);
      resetForm();

      dialogVisible.value = false;
    } else {
      console.log(form.value.type);
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
      if (data.location === selectedTab.value) {
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
      }
    });
    calendarOptions.events = events;
    console.log("fetch");
  });
}

function handleTabClick(tab) {
  fetchEvents();
}

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("resize", updateScreenWidth);
  // fetchEvents();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", updateScreenWidth);
});

const shouldRenderContent = computed(() => {
  return screenWidth.value >= 600;
});

// sabrina{6/1}: item dropdown
watch(
  () => form.value.type,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      // Reset form.item when type changes
      form.value.item = "";
    }
  }
);
</script>

<style scoped>
.demo-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

.menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
}

.tags-container {
  display: flex;
  padding-bottom: 5px;
  margin-left: 40px;
}
.el-tag:not(:last-child) {
  margin-right: 10px;
}

.el-tag.el-tag--primary {
  color: #fff;
}

.tabs-container {
  width: 100%;
  /* max-width: 600px; */
  /* margin: 0 auto; */
}

.demo-app-main {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
}

.demo-app-calendar {
  width: 100%;
  max-width: 1200px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.dialog-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.custom-event {
  width: 100%;
}
.box-card {
  z-index: 1000;
  width: 200px;
  text-align: left;
  transition: transform 0.3s ease-in-out;
}

:deep(.el-tabs__active-bar) {
  background-color: #fca421;
}

:deep(.el-tabs__item:hover) {
  color: #fca421;
}

:deep(.el-tabs__item.is-active) {
  color: #fca421;
}

@media (max-width: 900px) {
  .demo-app-main {
    padding: 0 10px;
  }

  .dialog-title {
    font-size: 18px;
  }

  .demo-app-calendar {
    width: 100%;
    height: 500px;
  }

  .dialogMaxWidth {
    max-width: 90%;
  }

  .menu-container {
    /* max-width: 100%; */
    flex-direction: column;
    align-items: center;
    margin-bottom: 0px;
  }

  .tags-container {
    margin-top: 0px;
    margin-left: 0px;
  }

  .tags-container .el-tag {
    /* Remove margin between tags */
    margin-right: 5px;
  }

  :deep(.el-tabs__item) {
    font-size: 12px;
  }

  :deep(.el-dialog) {
    width: 90%;
  }

  .custom-dot {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }

  :deep(.fc .fc-toolbar.fc-header-toolbar) {
    margin-bottom: 1.5em;
    font-size: 0.75em;
  }

  /* .fc .fc-daygrid-body-unbalanced */
  :deep(.fc-daygrid-day-events) {
    min-height: 2em;
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
}

.custom-event {
  border-radius: 4px;
  padding: 5px;
  color: #fff;
  display: flex;
  justify-content: space-between;
}

.custom-event-time {
  font-size: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
}

.custom-event-name,
.custom-event-org,
.custom-event-item,
.custom-event-quantity,
.custom-event-location,
.custom-event-date,
.custom-event-time {
  margin-bottom: 5px;
  font-size: 12px;
}

@media (max-width: 480px) {
  .custom-event-name,
  .custom-event-org,
  .custom-event-item,
  .custom-event-quantity,
  .custom-event-location,
  .custom-event-date,
  .custom-event-time {
    font-size: 12px;
  }
}
</style>
