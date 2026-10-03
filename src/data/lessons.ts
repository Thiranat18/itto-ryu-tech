export type Lesson = {
  slug: string;
  rank: string;
  title: string;
  titleEn: string;
  indicator: string;
  summary: string;
  learn: string[];
  status: 'draft' | 'live';
};

export const lessons: Lesson[] = [
  {
    slug: 'trend-phase',
    rank: '4 Kyu',
    title: 'อ่านเฟสของเทรนด์',
    titleEn: 'Trend Phase',
    indicator: 'MACD Trend Phase MTF',
    summary:
      'รู้ก่อนว่าตลาดอยู่เฟสไหน ใน Daily / 4H / 1H แล้วค่อยคิดเรื่องเข้าเทรด',
    learn: [
      'เฟสของเทรนด์จาก PPO: เริ่มต้น เร่งตัว อ่อนแรง กลับตัว',
      'อ่าน 3 ไทม์เฟรมพร้อมกัน และทำไมต้องให้ไทม์เฟรมใหญ่นำ',
      'ผลทดสอบจริง: ทำไมสัญญาณฝั่ง long ใช้ได้ แต่ฝั่ง short ไม่ผ่าน',
    ],
    status: 'draft',
  },
  {
    slug: 'trade-plan',
    rank: '3 Kyu',
    title: 'วางแผนก่อนชักดาบ',
    titleEn: 'Trade Plan',
    indicator: 'Auto Swing Trade Set Up',
    summary:
      'จุดเข้า จุดตัดขาดทุนจาก ATR อัตรา Risk:Reward และเป้า TP1–TP2 ต้องรู้ครบก่อนกดส่งคำสั่ง',
    learn: [
      'ตั้ง Stop Loss จาก ATR แทนการเดาเป็นจุด',
      'คำนวณ R:R และขนาดสัญญาให้ความเสี่ยงต่อไม้คงที่',
      'แบ่งทำกำไร TP1 / TP2 และเลื่อน SL',
    ],
    status: 'draft',
  },
  {
    slug: 'pullback-system',
    rank: '2 Kyu',
    title: 'ระบบรอย่อ',
    titleEn: 'Pullback System',
    indicator: 'EMA + Ichimoku (S50)',
    summary:
      'กรองทิศทางด้วย Daily รอราคาย่อใน 1H แล้วเข้าเมื่อมีสัญญาณยืนยัน พร้อมผลทดสอบจริงรวมจุดที่ระบบนี้แพ้',
    learn: [
      'ใช้ Daily filter ตัดสัญญาณที่สวนเทรนด์ใหญ่',
      'นิยามการย่อที่วัดได้ ไม่ใช่ "ดูแล้วน่าจะย่อ"',
      'Trigger เข้าเทรด และสิ่งที่ backtest บอกเกี่ยวกับมัน',
    ],
    status: 'draft',
  },
  {
    slug: 'backtest-edge',
    rank: '1 Kyu',
    title: 'Backtest และ Edge',
    titleEn: 'Backtest & Edge',
    indicator: 'กรณีศึกษา v3.1.1',
    summary:
      'Backtest ที่ดูสวยจาก 14 เทรดหลอกเราได้อย่างไร และวิธีพิสูจน์ edge ก่อนลงเงินจริง',
    learn: [
      'Overfitting คืออะไร ดูจากเคสจริงที่มีแค่ 14 เทรด',
      'ทดสอบ forward return ของสัญญาณก่อนสร้างกลยุทธ์',
      'ต้นทุน ค่าคอม slippage: edge ที่เล็กกว่าต้นทุนคือไม่มี edge',
    ],
    status: 'draft',
  },
];
