<template>
  <!-- <Aside></Aside> -->
  <div class="menu-container">
    <button class="form-button form-button-mobile" @click="toggleDialog()">
      我要發放物資
      <img src="/img/handout.png" style="width: 2.5vh" />
    </button>
    <el-tabs
      v-model="selectedTab"
      @tab-click="handleTabClick"
      class="tabs-container"
    >
      <el-tab-pane label="台中火車站" name="1"></el-tab-pane>
      <el-tab-pane label="民權地下道" name="2"></el-tab-pane>
      <el-tab-pane label="光復國小" name="3"></el-tab-pane>
    </el-tabs>
    <button class="form-button form-button-desktop" @click="toggleDialog()">
      我要發放物資
      <img src="/img/handout.png" style="width: 2.5vh" />
    </button>
    <div class="tags-container">
      <el-button
        v-for="option in TYPE_OPTIONS"
        :key="option.value"
        :style="{ backgroundColor: option.color, color: 'white' }"
        @click="filterEvents(option.value)"
      >
        {{ option.label }}
      </el-button>
    </div>

    <!-- sabrina{8/3}: registered event list toggle section -->
    <div v-if="selectedTag" class="events-section">
      <li
        v-for="event in filteredEvents"
        :key="event.id"
        :style="{ backgroundColor: event.backgroundColor }"
      >
        <div>
          {{ event.start.split("T")[0] }}
          {{ event.start.split("T")[1].slice(0, 5) }}
          {{ itemMap[event.extendedProps.item] || event.extendedProps.item }}
        </div>
      </li>
      <li v-if="filteredEvents.length === 0" class="no-events">
        暫無已登記物資
      </li>
    </div>
  </div>
  <div class="demo-app">
    <div class="container" style="display: flex">
      <div class="demo-app-sidebar">
        <div class="demo-app-sidebar-section">
          <!-- <button class="form-button" @click="toggleDialog()">
            我要發放物資
            <img src="/img/handout.png" style="width: 2.5vh" />
          </button> -->
          <h2>已登記物資</h2>
          <!-- sabrina{7/21}: move tags to sidebar -->
          <div class="sidebar-tags">
            <el-button
              v-for="option in TYPE_OPTIONS"
              :key="option.value"
              :style="{ backgroundColor: option.color, color: 'white' }"
              @click="filterEvents(option.value)"
            >
              {{ option.label }}
            </el-button>
          </div>
        </div>
        <div>
          <h2>所有物資 ({{ calendarOptions.events.length }})</h2>
          <div
            v-for="(eventsByType, typeLabel) in groupedEventsByType"
            :key="typeLabel"
          >
            <h2>{{ typeLabel }} ({{ eventsByType.length }})</h2>
            <li
              class="sidebar-event"
              v-for="event in eventsByType"
              :key="event.id"
              :style="{ backgroundColor: event.backgroundColor }"
            >
              <div>
                {{ event.start.split("T")[0] }}
                {{ event.start.split("T")[1].slice(0, 5) }}
                {{
                  itemMap[event.extendedProps.item] || event.extendedProps.item
                }}
              </div>
            </li>
          </div>
        </div>
      </div>
      <el-dialog v-model="dialogVisible" width="500px">
        <p style="font-size: 2em; color: #000000">發放表單</p>
        <div class="formContent">
          <el-form
            :model="form"
            :rules="rules"
            ref="formRef"
            :label-position="'left'"
            style="padding: 15px"
            class="donation-form"
          >
            <el-form-item
              label="姓名"
              :label-width="formLabelWidth"
              prop="name"
            >
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
                maxlength="10"
                autocomplete="off"
              />
            </el-form-item>
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
                  v-for="option in TYPE_OPTIONS"
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
                    v-for="option in filteredOptions"
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
            <el-form-item
              label="日期"
              :label-width="formLabelWidth"
              prop="date"
            >
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="請選擇日期"
                :editable="false"
                :disabled-date="disabledDate"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="時間"
              :label-width="formLabelWidth"
              prop="time"
            >
              <el-time-select
                v-model="form.time"
                style="width: 240px"
                start="07:00"
                step="00:15"
                end="22:30"
                placeholder="請選擇時間"
                :editable="false"
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
                {{ arg.timeText }} -
                {{
                  itemMap[arg.event.extendedProps.item] ||
                  arg.event.extendedProps.item
                }}
                ({{ arg.event.extendedProps.quantity }}份)
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
import { db } from "../firebase";
import { TYPE_OPTIONS, ITEM_OPTIONS } from "../dropdownOptions";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEventStore } from "../stores/eventStore";

const store = useEventStore();
const fullCalendar = ref(null);
const currentYear = ref();
const currentMonth = ref();
const currentEvents = ref([]);
const cardStyle = ref({});
const formLabelWidth = "100px";
const dialogVisible = ref(false);
const cardVisible = ref(false);
const selectedTab = ref(store.selectedTab);
const screenWidth = ref(window.innerWidth);
const formClick = ref(false);
const selectedTag = ref("");
const filteredEvents = ref([]);

// sabrina{7/18}: sidebar events
const groupedEventsByType = computed(() => {
  const grouped = calendarOptions.events.reduce((acc, event) => {
    const typeValue = event.extendedProps.type || "unknown";
    const typeLabel = typeMap[typeValue] || "unknown";
    if (!acc[typeLabel]) {
      acc[typeLabel] = [];
    }
    acc[typeLabel].push(event);
    return acc;
  }, {});

  // sabrina{7/21}: sort events within each type group
  Object.keys(grouped).forEach((typeLabel) => {
    grouped[typeLabel].sort((a, b) => new Date(a.start) - new Date(b.start));
  });

  return grouped;
});

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

const filteredOptions = computed(() => {
  const selectedType = form.value.type;
  const selectedOption = ITEM_OPTIONS[selectedType];
  return selectedOption || [];
});

// sabrina{7/21}: event type mapping
const typeMap = TYPE_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

// sabrina{7/21}: event item mapping

const itemMap = Object.values(ITEM_OPTIONS)
  .flat()
  .reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});

// const itemMap = computed(() => {
//   return Object.values(DROPDOWN).reduce((acc, option) => {
//     option.forEach((item) => {
//       acc[item.value] = item.label;
//     });
//     return acc;
//   }, {});
// });

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  // customButtons: {
  //   formButton: {
  //     text: "登記發放",
  //     click: function () {
  //       // sabrina{7/21}: add formClick to check dialog trigger position
  //       formClick.value = true;
  //       toggleDialog();
  //     },
  //   },
  // },
  headerToolbar: {
    left: "prev,next,today",
    center: "title",
    // right: "formButton dayGridMonth,timeGridWeek,timeGridDay",
    right: "",
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
  // sabrina{7/21}: get calendar view time information
  datesSet: (info) => {
    const today = info.view.currentStart;
    // sabrina{7/21}: note-fullcalendar month index starts from 0
    currentMonth.value = today.getMonth();
    currentYear.value = today.getFullYear();
    fetchEvents(currentYear.value, currentMonth.value, selectedTab.value);
  },
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
  select: toggleDialog,
});

const rules = reactive({
  name: [{ required: true, message: "請填寫姓名", trigger: "blur" }],
  org: [{ required: true, message: "請填寫單位名稱", trigger: "blur" }],
  phone: [
    { required: true, message: "請填寫手機號碼", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        const phoneRegex = /^09\d{8}$/;
        if (!value) {
          callback(new Error("請輸入連絡電話"));
        } else if (/\s/.test(value)) {
          callback(new Error("連絡電話不可包含空白"));
        } else if (!phoneRegex.test(value)) {
          callback(new Error("請輸入有效的手機號碼"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  item: [{ required: true, message: "請描述物資內容", trigger: "blur" }],
  quantity: [
    { required: true, message: "請填寫提供物資份數", trigger: "blur" },
  ],
  type: [{ required: true, message: "請選擇物資類型", trigger: "change" }],
  location: [{ required: true, message: "請選擇發放地點", trigger: "change" }],
  date: [{ required: true, message: "請選擇日期", trigger: "change" }],
  time: [{ required: true, message: "請選擇時間", trigger: "change" }],
});

function toggleDialog(info) {
  // sabrina{7/18}: auto-fill form date when click calendar date
  // sabrina{7/21}: add formClick to check dialog trigger position
  if (!dialogVisible.value && !formClick) {
    form.value.date = info.startStr;
  }
  dialogVisible.value = !dialogVisible.value;
}

function closeDialog() {
  dialogVisible.value = false;
  // sabrina{7/21}: add formClick to check dialog trigger position
  formClick.value = false;
  resetForm();
}

function closeCard() {
  cardVisible.value = false;
}

// sabrina{8/3}
function filterEvents(tag) {
  if (selectedTag.value === tag) {
    // Deselect the tag if the same button is clicked again
    selectedTag.value = "";
    filteredEvents.value = [];
  } else {
    selectedTag.value = tag;
    filteredEvents.value = calendarOptions.events.filter(
      (event) => event.extendedProps.type === tag
    );

    // sabrina{8/4}: sort by event date
    filteredEvents.value.sort((a, b) => new Date(a.start) - new Date(b.start));
  }
}

// handle date selection
function handleDateSelect(selectInfo) {
  let calendarApi = selectInfo.view.calendar;
  calendarApi.unselect(); // clear date selection
}

// handle event click
function handleEventClick(clickInfo) {
  cardVisible.value = true;
  currentEvents.value = clickInfo;

  const rect = clickInfo.el.getBoundingClientRect();
  cardPosition.top = rect.top + window.scrollY - 10;
  cardPosition.left = rect.left + window.scrollX + 120;

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
  // sabrina{7/21}: card event item mapping
  cardData.item =
    itemMap[clickInfo.event.extendedProps.item] ||
    clickInfo.event.extendedProps.item;
  cardData.quantity = clickInfo.event.extendedProps.quantity;
  cardData.type = clickInfo.event.extendedProps.type;
  cardData.location = clickInfo.event.extendedProps.location;
  cardData.date = clickInfo.event.startStr.split("T")[0];
  cardData.time = clickInfo.event.startStr.split("T")[1].slice(0, 5);

  clickInfo.jsEvent.stopPropagation();
}

// handle hover
function eventMouseEnter(clickInfo) {
  cardVisible.value = true;
  currentEvents.value = clickInfo;

  const rect = clickInfo.el.getBoundingClientRect();
  cardPosition.top = rect.top + window.scrollY - 10;
  cardPosition.left = rect.left + window.scrollX + 120;

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
  // sabrina{7/21}: card event item mapping
  cardData.item =
    itemMap[clickInfo.event.extendedProps.item] ||
    clickInfo.event.extendedProps.item;
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
      // sabrina{7/21}: fix timezone
      const formattedDate = formContent.date.toLocaleDateString("en-CA", {
        timeZone: "Asia/Taipei",
      });

      // Phone number validation
      const phoneRegex = /^09\d{8}$/;
      if (!phoneRegex.test(formContent.phone)) {
        console.log("聯絡電話格式錯誤");
        return;
      }
      const startTime = `${formattedDate}T${formContent.time}`;

      // Define the mapping between types and colors
      const typeColorMap = {
        food: "#D45113",
        clothes: "#657B4F",
        hygiene: "#437A89",
        medical: "#B9A44C",
      };

      // Get the color based on the type
      const backgroundColor = typeColorMap[formContent.type];

      addDoc(collection(db, "calEvent"), {
        start: startTime,
        backgroundColor: backgroundColor,
        name: formContent.name,
        org: formContent.org,
        phone: formContent.phone,
        item: formContent.item,
        quantity: formContent.quantity,
        type: formContent.type,
        location: formContent.location,
      })
        .then((docRef) => {
          resetForm();
          // Show success dialog using ElMessageBox
          const successDialogMessage = `
          <h2>表單細節:<br>
              姓名: ${formContent.name}<br>
              聯絡電話: ${formContent.org}<br>
              地點: ${formContent.location}<br>
              物資類型: ${typeMap[formContent.type] || "unknown"}<br>
              物資內容: ${itemMap[formContent.item] || "mapping failed"}<br>
              份數: ${formContent.quantity}<br>
              <br>
              請記下您填寫的聯絡電話，以便於取消登記時使用，再次感謝您填寫表單!</h2> `;

          ElMessageBox.alert(successDialogMessage, "登記成功", {
            dangerouslyUseHTMLString: true,
            showConfirmButton: false,
            confirmButtonText: "確認",
            callback: () => {
              // ElMessage({
              //   type: "success",
              //   message: "活動成功創建",
              // });
            },
          });
          dialogVisible.value = false;
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          ElMessage({
            type: "error",
            message: "表單提交時出錯，請檢查網路狀態後重新嘗試，謝謝您的配合",
          });
        });
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

function handleClickOutside(event) {
  if (!event.target.closest(".box-card")) {
    closeCard();
  }
}

// sabrina{7/21}: fetch events from firebase by month and tab
function fetchEvents(year, month, selectedTab) {
  const eventsCol = collection(db, "calEvent");
  onSnapshot(eventsCol, (snapshot) => {
    const events = [];
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    snapshot.forEach((doc) => {
      const data = doc.data();
      const eventStartDate = new Date(data.start);
      if (
        eventStartDate >= startOfMonth &&
        eventStartDate <= endOfMonth &&
        data.location === selectedTab
      ) {
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
    console.log("fetch:", calendarOptions.events.length);
  });
}

// sabrina{8/1}: update selectedTab in store
function handleTabClick(tab) {
  store.updateSelectedTab(tab.props.name);
}

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("resize", updateScreenWidth);
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

// sabrina{8/1}: fetch event when selectedTab in store is updated
watch(
  () => store.selectedTab,
  (newTab) => {
    selectedTab.value = newTab;
    fetchEvents(currentYear.value, currentMonth.value, newTab);
    filterEvents(selectedTag.value);
  }
);
</script>

<style scoped>
.demo-app {
  display: flex;
  align-items: center;
  margin: 0 2rem;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
}

.container {
  gap: 20px;
}

.menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 2rem;
}

.sidebar-tags {
  display: flex;
  padding-bottom: 5px;
  color: #fff;
}

/* sabrina{8/3}: calendar, sidebar layout fix and scroll bar*/
.demo-app-main {
  flex: 3;
  margin: 20px auto;
}

.demo-app-sidebar {
  flex: 1;
  padding: 10px;
  background-color: #f8f9fa;
  max-height: 95vh;
  overflow-y: auto;
  border-radius: 8px;
}

.demo-app-sidebar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* sabrina{7/21}: sidebar event style */
.sidebar-event {
  line-height: 1.5;
  font-size: 14px;
  color: #ffffff;
  margin: 10px;
  border-radius: 6px;
  padding: 2px 0px;
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

.events-section {
  display: none;
}

.el-dialog {
  z-index: 1000; /* Ensure the dialog is above other elements */
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

:deep(.el-tabs__item) {
  color: white;
  font-size: 16px;
}

:deep(.tags-container .el-button) {
  --el-button-active-border-color: #fca421;
  border-color: #2f3334;
  border: none;
}

:deep(.el-button--primary) {
  --el-button-bg-color: #fca421;
  --el-button-border-color: #fca421;
  --el-button-active-color: #fca421;
  --el-button-active-bg-color: #fca421;
  --el-button-disabled-bg-color: #fca421;
  --el-button-disabled-border-color: #fca421;
  --el-button-hover-bg-color: #fca421;
  --el-button-active-border-color: #fca421;
}

/* sabrina{7/21}: hide tabbar tags */
.tags-container {
  display: none;
}

/* .toggle-button {
  padding: 1vh 6vh;
  background-color: #fca140;
  border-radius: 6px;
  font-weight: bold;
  font-size: large;
  margin-bottom: 20px;
  transition: background-color 0.3s, transform 0.1s;
}

.toggle-button:hover {
  background-color: #8c580f;
}

.toggle-button:active {
  transform: scale(0.95);
} */

.form-button {
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  gap: 0.5vh;
  padding: 1vh 6vh;
  background-color: #508d4e;
  color: #ffffff;
  border-radius: 6px;
  font-weight: bold;
  font-size: 20px;
  transition: background-color 0.3s, transform 0.1s;
  animation: pulse 2s infinite; /* Adding the pulsing animation */
}

.form-button:hover {
  background-color: #e8921a; /* Slightly darker shade for hover effect */
}

.form-button:active {
  transform: scale(0.95); /* Slightly shrink the button on click */
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(252, 161, 64, 0.7);
  }
  70% {
    transform: scale(1.02);
    box-shadow: 0 0 20px 10px rgba(252, 161, 64, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(252, 161, 64, 0);
  }
}

.form-button-mobile {
  display: none;
}

/* @media (max-width: 900px) {
  .demo-app-sidebar {
    display: none;
  }

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
    flex-direction: column;
    align-items: center;
    margin-bottom: 0px;
    margin-top: 3em;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 0px;
    margin-left: 0px;
    margin-bottom: 10px;
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
  font-size: 12px;
} */

@media (max-width: 480px) {
  .demo-app-sidebar {
    display: none;
  }

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

  :deep(.el-tabs__item) {
    font-size: 14px;
  }

  .form-button-mobile {
    display: flex;
  }
  .form-button-desktop {
    display: none;
  }

  .form-button {
    padding: 1vh 6vh;
    font-size: 16px;
    margin: 1vh 0;
  }

  .menu-container {
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 0px;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 10px 0px;
  }

  :deep(.tags-container .el-button) {
    --el-button-active-border-color: #fca421;
    border-color: #2f3334;
    border: #fca421;
  }

  :deep(.el-dialog) {
    width: 90%;
  }

  :deep(.fc .fc-toolbar.fc-header-toolbar) {
    margin-bottom: 1.5em;
    font-size: 0.75em;
  }

  :deep(.fc-daygrid-day-events) {
    min-height: 2em;
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }

  .custom-dot {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
  .custom-event-name,
  .custom-event-org,
  .custom-event-item,
  .custom-event-quantity,
  .custom-event-location,
  .custom-event-date,
  .custom-event-time {
    font-size: 12px;
  }

  /* sabrina{8/3} */
  .events-section {
    display: block;
    margin-bottom: 10px;
    width: auto;
    max-height: 100px; /* Set the maximum height for the section */
    overflow-y: auto; /* Enable vertical scrolling */
  }

  .events-section li {
    line-height: 1.5;
    font-size: 14px;
    color: #ffffff;
    padding: 2px 65px;
    border-radius: 2px;
  }
}
</style>
