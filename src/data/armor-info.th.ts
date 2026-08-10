const armorImages = import.meta.glob("../assets/products/armor/*.png", { eager: true, import: "default" }) as Record<string, string>;

const softArmorSpec = {
  pidTitle: "โครงสร้างแบลลิสติกและการออกแบบ",
  pidDesc:
    "แผ่นเกราะแบลลิสติกผลิตจากโพลีเอทิลีนน้ำหนักโมเลกุลสูงพิเศษ (UHMWPE) ขั้นสูง ให้อัตราส่วนความแข็งแรงต่อน้ำหนักที่โดดเด่น โครงสร้างน้ำหนักเบาช่วยลดความเมื่อยล้าของผู้สวมใส่ พร้อมมอบการป้องกันที่เชื่อถือได้จากภัยคุกคามจากปืนพกทั่วไป <br /><br /> ตัวเสื้อเกราะ (carrier) ออกแบบให้ปรับได้เต็มรูปแบบตามหลักสรีรศาสตร์ด้วยตัวยึดแบบตีนตุ๊กแก ช่วยให้ผู้สวมใส่ได้ขนาดที่กระชับและเหมาะสมกับตนเอง การกระจายน้ำหนักอย่างสมดุลเพิ่มความสบายตลอดภารกิจที่ยาวนาน ขณะที่การออกแบบแบบโมดูลาร์ช่วยให้สวมใส่และถอดออกได้อย่างรวดเร็วเมื่อจำเป็นต้องพร้อมปฏิบัติการทันที",
  specTitle: "ข้อมูลจำเพาะทางเทคนิค",
  tableContent: [
    { label: "ประเภทผลิตภัณฑ์", value: "เสื้อเกราะอ่อน (Soft Body Armor Vest)" },
    { label: "วัสดุแบลลิสติก", value: "UHMWPE (โพลีเอทิลีนน้ำหนักโมเลกุลสูงพิเศษ)" },
    { label: "ระดับการป้องกัน", value: "มาตรฐาน NIJ 0101.04 / 0101.06 ระดับ IIIA (9x19 มม. FMJ RN, .44 Magnum SJHP)" },
    { label: "ค่าการยุบตัวด้านหลัง (BFS)", value: "< 44 มม." },
    { label: "การรับรอง", value: "ผ่านการทดสอบตามมาตรฐาน NIJ 0101.04 / 0101.06" },
  ],
  highlightTitle: "จุดเด่นผลิตภัณฑ์",
  highlightItems: [
    "โครงสร้าง UHMWPE ขั้นสูงมอบการป้องกันสูงสุดในน้ำหนักที่เบาเป็นพิเศษ",
    "อัตราส่วนความแข็งแรงต่อน้ำหนักสูงช่วยลดความเมื่อยล้าระหว่างปฏิบัติภารกิจ",
    "ตัวเสื้อเกราะปรับได้เต็มรูปแบบเพื่อความกระชับและสบาย",
  ],
};

const quickReleaseSpec = {
  pidTitle: "โครงสร้างแบลลิสติกและการออกแบบ",
  pidDesc:
    "ระบบเกราะนี้ผสานแผ่นเกราะแบลลิสติกคอมโพสิต UHMWPE และเซรามิกขั้นสูง ออกแบบมาเพื่อป้องกันภัยคุกคามจากปืนไรเฟิลความเร็วสูงได้อย่างเหนือกว่า พร้อมลดน้ำหนักโดยรวม ดีไซน์แผ่นเกราะทรง SAPI Cut แบบโค้งเดี่ยว (Single-Curved) ช่วยให้พอดีกับรูปร่างและเพิ่มความสบายโดยไม่ลดทอนประสิทธิภาพแบลลิสติก <br /><br /> ตัวเสื้อเกราะยุทธวิธีมีระบบสายรัดที่ปรับได้เต็มรูปแบบตามหลักสรีรศาสตร์ เพื่อกระจายน้ำหนักอย่างสมดุลตลอดการปฏิบัติงานที่ยาวนาน กลไกปลดล็อกด่วนที่ไหล่ซ้ายช่วยให้ถอดออกได้อย่างรวดเร็วในกรณีฉุกเฉิน ขณะที่ระบบสายรัด MOLLE ในตัวช่วยให้ผู้ใช้งานปรับแต่งกระเป๋าและอุปกรณ์ตามความต้องการของภารกิจได้",
  specTitle: "ข้อมูลจำเพาะทางเทคนิค",
  tableContent: [
    { label: "ประเภทผลิตภัณฑ์", value: "เสื้อเกราะยุทธวิธีแบบถอดเร็ว" },
    { label: "วัสดุแบลลิสติก", value: "UHMWPE + คอมโพสิตเซรามิก" },
    {
      label: "ระดับการป้องกัน",
      value: "มาตรฐาน NIJ 0101.04 / 0101.06 ระดับ III+++ (7.62x51 มม. NATO FMJ, 7.62x39 มม. MSC (AK), 5.56x45 มม. SS109/M855, 7.62x39 มม. AK API)",
    },
    { label: "ค่าการยุบตัวด้านหลัง (BFS)", value: "< 44 มม." },
    { label: "การรับรอง", value: "ผ่านการทดสอบตามมาตรฐาน NIJ 0101.04 / 0101.06" },
  ],
  highlightTitle: "จุดเด่นผลิตภัณฑ์",
  highlightItems: [
    "แผ่นเกราะคอมโพสิต UHMWPE และเซรามิกมอบการป้องกันปืนไรเฟิลที่เพิ่มขึ้นในน้ำหนักที่น้อยลง",
    "ออกแบบให้รับมือภัยคุกคามพลังงานสูงเหนือกว่าระดับ III ทั่วไป (ตามข้อกำหนดของผู้ผลิต)",
    "กลไกปลดล็อกด่วนที่ไหล่ซ้ายช่วยให้ถอดออกได้อย่างรวดเร็วในกรณีฉุกเฉิน",
    "สายรัด MOLLE เต็มรูปแบบรองรับกระเป๋าและอุปกรณ์ตามภารกิจ",
  ],
};

const armorColors = [
  { color: "ดำ", hex: "#3B3B3B" },
  { color: "กากี", hex: "#C3B091" },
  { color: "น้ำเงินกรมท่า", hex: "#1F3A5F" },
];

export const armorInfosTh = [
  {
    slug: "iiia-01",
    name: "เสื้อเกราะกันกระสุนแบบภายนอก",
    productName: "เสื้อเกราะกันกระสุนแบบภายนอก",
    productsImg: [
      armorImages["../assets/products/armor/armor_01.png"],
      armorImages["../assets/products/armor/armor_01_02.png"],
      armorImages["../assets/products/armor/armor_01_03.png"],
      armorImages["../assets/products/armor/armor_01_04.png"],
    ],
    level: "NIJ LEVEL IIIA",
    colors: armorColors,
    sizes: ["S", "M", "L", "XL"],
    productDesc:
      "เสื้อเกราะอ่อนระดับ NIJ Level IIIA น้ำหนักเบา ผลิตจาก UHMWPE ให้การป้องกันกระสุนปืนพกที่มีประสิทธิภาพและสวมใส่สบายตลอดวัน เหมาะสำหรับเจ้าหน้าที่บังคับใช้กฎหมาย ทหาร และเจ้าหน้าที่รักษาความปลอดภัย",
    ...softArmorSpec,
  },
  {
    slug: "iiia-02",
    name: "เสื้อเกราะกันกระสุนแบบภายนอก",
    productName: "เสื้อเกราะกันกระสุนแบบภายนอก",
    productsImg: [
      armorImages["../assets/products/armor/armor_02.png"],
      armorImages["../assets/products/armor/armor_02_02.png"],
      armorImages["../assets/products/armor/armor_02_03.png"],
      armorImages["../assets/products/armor/armor_02_04.png"],
    ],
    level: "NIJ LEVEL IIIA",
    colors: armorColors,
    sizes: ["S", "M", "L", "XL"],
    productDesc:
      "เสื้อเกราะอ่อนระดับ NIJ Level IIIA น้ำหนักเบา ผลิตจาก UHMWPE ให้การป้องกันกระสุนปืนพกที่มีประสิทธิภาพและสวมใส่สบายตลอดวัน เหมาะสำหรับเจ้าหน้าที่บังคับใช้กฎหมาย ทหาร และเจ้าหน้าที่รักษาความปลอดภัย",
    ...softArmorSpec,
  },
  {
    slug: "iiia-03",
    name: "เสื้อเกราะกันกระสุนแบบซ่อนภายใน",
    productName: "เสื้อเกราะกันกระสุนแบบซ่อนภายใน",
    productsImg: [
      armorImages["../assets/products/armor/armor_03.png"],
      armorImages["../assets/products/armor/armor_03_02.png"],
      armorImages["../assets/products/armor/armor_03_03.png"],
      armorImages["../assets/products/armor/armor_03_04.png"],
    ],
    level: "NIJ LEVEL IIIA",
    colors: armorColors,
    sizes: ["วัดตัวตัด"],
    productDesc:
      "เสื้อเกราะอ่อนระดับ NIJ Level IIIA น้ำหนักเบา ผลิตจาก UHMWPE ให้การป้องกันกระสุนปืนพกที่มีประสิทธิภาพและสวมใส่สบายตลอดวัน เหมาะสำหรับเจ้าหน้าที่บังคับใช้กฎหมาย ทหาร และเจ้าหน้าที่รักษาความปลอดภัย",
    ...softArmorSpec,
  },
  {
    slug: "fragmentation",
    name: "เสื้อเกราะกันกระสุนและสะเก็ดระเบิด",
    productName: "เสื้อเกราะกันกระสุนและสะเก็ดระเบิด",
    productsImg: [
      armorImages["../assets/products/armor/armor_04.png"],
      armorImages["../assets/products/armor/armor_04_02.png"],
      armorImages["../assets/products/armor/armor_04_03.png"],
      armorImages["../assets/products/armor/armor_04_04.png"],
    ],
    level: "NIJ LEVEL III++",
    colors: armorColors,
    sizes: ["S", "M", "L", "XL"],
    productDesc:
      "ระบบเสื้อเกราะยุทธวิธีที่ผสานเกราะอ่อนระดับ NIJ Level IIIA กับแผ่นเกราะแข็งระดับ NIJ Level III เพื่อป้องกันทั้งปืนพกและปืนไรเฟิล ผลิตจากวัสดุคอมโพสิต UHMWPE น้ำหนักเบา เหมาะสำหรับปฏิบัติการทางทหาร การบังคับใช้กฎหมาย และปฏิบัติการเชิงยุทธวิธี",
    pidTitle: "โครงสร้างแบลลิสติกและการออกแบบ",
    pidDesc:
      "ระบบเกราะนี้ประกอบด้วยชุดเกราะอ่อน UHMWPE น้ำหนักเบา ควบคู่กับแผ่นเกราะแข็งระดับ NIJ Level III แบบถอดเปลี่ยนได้ ให้การป้องกันที่ปรับระดับได้ทั้งจากกระสุนปืนพกและกระสุนปืนไรเฟิลความเร็วสูง ผลิตด้วยเทคโนโลยีคอมโพสิตขั้นสูง ชิ้นส่วนแบลลิสติกให้อัตราส่วนความแข็งแรงต่อน้ำหนักที่เหนือกว่า พร้อมความทนทานที่ยอดเยี่ยม <br /><br /> ตัวเสื้อเกราะออกแบบให้ปรับได้เต็มรูปแบบตามหลักสรีรศาสตร์ เพื่อกระจายน้ำหนักอย่างสมดุลตลอดภารกิจที่ยาวนาน ระบบสายรัด MOLLE ในตัวช่วยให้ผู้ปฏิบัติงานปรับแต่งเสื้อเกราะด้วยกระเป๋าและอุปกรณ์ยุทธวิธีตามภารกิจได้โดยไม่ลดทอนความคล่องตัว",
    specTitle: "ข้อมูลจำเพาะทางเทคนิค",
    tableContent: [
      { label: "ประเภทผลิตภัณฑ์", value: "ตัวเสื้อเกราะยุทธวิธีพร้อมแผ่นเกราะแข็ง" },
      { label: "วัสดุแบลลิสติก", value: "UHMWPE (โพลีเอทิลีนน้ำหนักโมเลกุลสูงพิเศษ)" },
      {
        label: "ระดับการป้องกัน",
        value: "มาตรฐาน NIJ 0101.04 / 0101.06 ระดับ III++ (7.62x51 มม. NATO FMJ, 7.62x39 มม. MSC (AK), 5.56x45 มม. SS109/M855)",
      },
      { label: "ค่าการยุบตัวด้านหลัง (BFS)", value: "< 44 มม." },
      { label: "ขนาดแผ่นเกราะ", value: "25 x 30 ซม." },
      { label: "ความโค้งของแผ่นเกราะ", value: "โค้งหลายระดับ/โค้งเดี่ยว" },
      { label: "การรับรอง", value: "ผ่านการทดสอบตามมาตรฐาน NIJ 0101.04 / 0101.06" },
    ],
    highlightTitle: "จุดเด่นผลิตภัณฑ์",
    highlightItems: [
      "โครงสร้างคอมโพสิต UHMWPE ขั้นสูงมอบการป้องกันสูงสุดในน้ำหนักที่ลดลง",
      "ผสานเกราะอ่อนระดับ IIIA กับแผ่นเกราะแข็งระดับ III เพื่อป้องกันทั้งปืนพกและปืนไรเฟิล",
      "สายรัด MOLLE เต็มรูปแบบรองรับกระเป๋าและอุปกรณ์ตามภารกิจ",
    ],
  },
  {
    slug: "quick-release-iii-01",
    name: "เสื้อเกราะกันกระสุนแบบถอดเร็ว Level III+++",
    productName: "เสื้อเกราะกันกระสุนแบบถอดเร็ว Level III+++",
    productsImg: [
      armorImages["../assets/products/armor/armor_05.png"],
      armorImages["../assets/products/armor/armor_05_02.png"],
      armorImages["../assets/products/armor/armor_05_03.png"],
      armorImages["../assets/products/armor/armor_05_04.png"],
    ],
    level: "NIJ LEVEL III+++",
    colors: armorColors,
    sizes: ["S", "M", "L", "XL"],
    productDesc:
      "เสื้อเกราะยุทธวิธีแบบถอดเร็วระดับ NIJ Level III+++ ผลิตจากแผ่นเกราะคอมโพสิต UHMWPE และเซรามิก มอบการป้องกันปืนไรเฟิลที่เพิ่มขึ้นพร้อมถอดออกได้อย่างรวดเร็วในกรณีฉุกเฉิน เหมาะสำหรับบุคลากรทางทหาร เจ้าหน้าที่บังคับใช้กฎหมาย และหน่วยปฏิบัติการพิเศษ",
    ...quickReleaseSpec,
  },
  {
    slug: "quick-release-iii-02",
    name: "เสื้อเกราะกันกระสุนแบบถอดเร็ว Level III+++",
    productName: "เสื้อเกราะกันกระสุนแบบถอดเร็ว Level III+++",
    productsImg: [
      armorImages["../assets/products/armor/armor_06.png"],
      armorImages["../assets/products/armor/armor_06_02.png"],
      armorImages["../assets/products/armor/armor_06_03.png"],
      armorImages["../assets/products/armor/armor_06_04.png"],
    ],
    level: "NIJ LEVEL III++",
    colors: armorColors,
    sizes: ["S", "M", "L", "XL"],
    productDesc:
      "เสื้อเกราะยุทธวิธีแบบถอดเร็วระดับ NIJ Level III+++ ผลิตจากแผ่นเกราะคอมโพสิต UHMWPE และเซรามิก มอบการป้องกันปืนไรเฟิลที่เพิ่มขึ้นพร้อมถอดออกได้อย่างรวดเร็วในกรณีฉุกเฉิน เหมาะสำหรับบุคลากรทางทหาร เจ้าหน้าที่บังคับใช้กฎหมาย และหน่วยปฏิบัติการพิเศษ",
    ...quickReleaseSpec,
  },
  {
    slug: "quick-release-iii-03",
    name: "เสื้อเกราะกันกระสุนแบบถอดเร็ว Level III+++",
    productName: "เสื้อเกราะกันกระสุนแบบถอดเร็ว Level III+++",
    productsImg: [
      armorImages["../assets/products/armor/armor_07.png"],
      armorImages["../assets/products/armor/armor_07_02.png"],
      armorImages["../assets/products/armor/armor_07_03.png"],
      armorImages["../assets/products/armor/armor_07_04.png"],
    ],
    level: "NIJ LEVEL III++",
    colors: armorColors,
    sizes: ["S", "M", "L", "XL"],
    productDesc:
      "เสื้อเกราะยุทธวิธีแบบถอดเร็วระดับ NIJ Level III+++ ผลิตจากแผ่นเกราะคอมโพสิต UHMWPE และเซรามิก มอบการป้องกันปืนไรเฟิลที่เพิ่มขึ้นพร้อมถอดออกได้อย่างรวดเร็วในกรณีฉุกเฉิน เหมาะสำหรับบุคลากรทางทหาร เจ้าหน้าที่บังคับใช้กฎหมาย และหน่วยปฏิบัติการพิเศษ",
    ...quickReleaseSpec,
  },
  {
    slug: "quick-release-iii-04",
    name: "เสื้อเกราะกันกระสุนแบบถอดเร็ว Level III+++",
    productName: "เสื้อเกราะกันกระสุนแบบถอดเร็ว Level III+++",
    productsImg: [
      armorImages["../assets/products/armor/armor_08.png"],
      armorImages["../assets/products/armor/armor_08_02.png"],
      armorImages["../assets/products/armor/armor_08_03.png"],
      armorImages["../assets/products/armor/armor_08_04.png"],
    ],
    level: "NIJ LEVEL III+++",
    colors: armorColors,
    sizes: ["S", "M", "L", "XL"],
    productDesc:
      "เสื้อเกราะยุทธวิธีแบบถอดเร็วระดับ NIJ Level III+++ ผลิตจากแผ่นเกราะคอมโพสิต UHMWPE และเซรามิก มอบการป้องกันปืนไรเฟิลที่เพิ่มขึ้นพร้อมถอดออกได้อย่างรวดเร็วในกรณีฉุกเฉิน เหมาะสำหรับบุคลากรทางทหาร เจ้าหน้าที่บังคับใช้กฎหมาย และหน่วยปฏิบัติการพิเศษ",
    ...quickReleaseSpec,
  },
  {
    slug: "quick-release-iii-05",
    name: "เสื้อเกราะกันกระสุนแบบถอดเร็ว Level III+++",
    productName: "เสื้อเกราะกันกระสุนแบบถอดเร็ว Level III+++",
    productsImg: [
      armorImages["../assets/products/armor/armor_09.png"],
      armorImages["../assets/products/armor/armor_09_02.png"],
      armorImages["../assets/products/armor/armor_09_03.png"],
      armorImages["../assets/products/armor/armor_09_04.png"],
    ],
    level: "NIJ LEVEL III+++",
    colors: armorColors,
    sizes: ["S", "M", "L", "XL"],
    productDesc:
      "เสื้อเกราะยุทธวิธีแบบถอดเร็วระดับ NIJ Level III+++ ผลิตจากแผ่นเกราะคอมโพสิต UHMWPE และเซรามิก มอบการป้องกันปืนไรเฟิลที่เพิ่มขึ้นพร้อมถอดออกได้อย่างรวดเร็วในกรณีฉุกเฉิน เหมาะสำหรับบุคลากรทางทหาร เจ้าหน้าที่บังคับใช้กฎหมาย และหน่วยปฏิบัติการพิเศษ",
    ...quickReleaseSpec,
  },
];
