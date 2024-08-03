import { db } from "./index.js";
import { setDoc, doc } from "firebase/firestore";

// sabrina{8/6}: create Options
const saveOptionsToFirebase = async () => {
  console.log("save");
  const options = {
    food: [
      { label: "便當", value: "bento" },
      { label: "泡麵", value: "instantnoodle" },
      { label: "熱食", value: "hotfood" },
      { label: "湯品", value: "soup" },
      { label: "包子", value: "bun" },
      { label: "麵包", value: "bread" },
      { label: "罐頭", value: "cans" },
      { label: "乾糧", value: "dryfood" },
      { label: "飲品", value: "drinks" },
      { label: "水果", value: "fruit" },
    ],
    clothes: [
      { label: "夏季衣物", value: "summerclothes" },
      { label: "冬季衣物", value: "winterclothes" },
      { label: "外套", value: "coat" },
      { label: "內衣褲", value: "underwear" },
      { label: "襪子", value: "socks" },
      { label: "鞋子", value: "shoes" },
      { label: "棉被", value: "blanket" },
      { label: "睡袋", value: "sleepingbag" },
    ],
    hygiene: [
      { label: "牙刷", value: "toothbrush" },
      { label: "牙膏", value: "toothpaste" },
      { label: "刮鬍刀", value: "shaver" },
      { label: "肥皂", value: "soap" },
      { label: "毛巾", value: "towel" },
      { label: "口罩", value: "mask" },
      { label: "衛生棉", value: "pads" },
      { label: "濕紙巾", value: "wetwipes" },
      { label: "衛生紙", value: "tissue" },
      { label: "棉花棒", value: "cottonswab" },
    ],
    medical: [{ label: "街頭義診(家醫科, 急診)", value: "doctor" }],
  };

  for (const [type, items] of Object.entries(options)) {
    await setDoc(doc(db, "itemOptions", type), { items });
  }
};

// Call this function once to save the initial options
// saveOptionsToFirebase();

export { saveOptionsToFirebase };
