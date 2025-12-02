import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Legend, ScatterChart, Scatter, ZAxis, LabelList
} from 'recharts';
import { 
  Activity, Database, MessageSquare, ThumbsUp, ThumbsDown, Meh, 
  Heart, Zap, Utensils, AlertTriangle, ShoppingCart, Info, Star, 
  FlaskConical, Flag, Baby, ShieldAlert, Search, Lightbulb, Rocket,
  Mars, Venus, HelpCircle, Atom, Leaf, Target, Map, ArrowRight,
  Layout, FileText, Clock, Sparkles, Globe, User, Quote, Compass, Brain, Share2, Layers
} from 'lucide-react';

const COLORS = {
  cowfree: '#3CC4C7',
  remilk: '#0F1C2E',
  facebook: '#1877F2',
  tiktok: '#000000',
  youtube: '#FF0000',
  talkbacks: '#6A6A6A',
  instagram: '#E1306C',
  positive: '#3CC4C7',
  neutral: '#E5E7EB',
  negative: '#EF4444',
  harmonyBlue: '#4DA3FF'
};

export default function PresentationSlides({ slideIndex }) {

  const renderSlide = () => {
    switch (slideIndex) {
      // 🟦 שקף 0: שער המצגת
      case 0:
        return (
          <div className="h-full flex flex-col justify-between p-12 relative" dir="rtl">
            <div className="flex justify-center pt-8">
              <div className="flex flex-col items-center">
                 <h1 className="text-4xl font-bold tracking-tighter text-harmonyBlue mb-2">Harmony AI</h1>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center flex-grow text-center space-y-6">
              <div className="flex items-center gap-4 text-harmonyDark/90">
                <Activity size={60} strokeWidth={1.5} />
                <h1 className="text-[46pt] font-semibold leading-[120%]">דוח עומק צרכני<br/>לשוק החלב לא מהחי בישראל</h1>
              </div>
              <p className="text-[22pt] text-harmonyBlue font-medium">
                השוואה אסטרטגית: Remilk מול Cowfree
              </p>
              <div className="mt-8 px-8 py-3 bg-gray-50 rounded-full border border-gray-200">
                <span className="text-lg text-gray-600">מבוסס על 2,706 תגובות + 72 משתתפים בסקר טבעונים</span>
              </div>
            </div>

            <div className="flex justify-between items-end pb-8 px-12 w-full">
              {/* Remilk Custom Logo */}
              <div className="relative group mb-2">
                <Heart 
                  className="absolute -top-5 right-[2.9rem] text-[#C5A365] fill-[#C5A365] transform -rotate-12" 
                  size={26} 
                  strokeWidth={0}
                />
                <div className="text-[4.5rem] font-bold text-[#1e1e50] tracking-tight font-slab leading-none">
                  remilk.
                </div>
              </div>

              {/* Cowfree Custom Logo */}
              <div className="flex flex-col items-center leading-none select-none">
                <div className="relative">
                  <span className="text-[5.5rem] font-black text-[#008542] tracking-tighter font-sans" style={{ textShadow: '0 0 1px rgba(0,0,0,0.1)' }}>cow</span>
                  {/* Splash Drops */}
                  <svg className="absolute -top-3 left-[2.8rem] w-8 h-8 text-[#008542] fill-current" viewBox="0 0 24 24">
                     <path d="M12 2C12 2 16 8 16 11C16 13.2 14.2 15 12 15C9.8 15 8 13.2 8 11C8 8 12 2 12 2Z" transform="rotate(-15 12 12)" />
                     <circle cx="19" cy="6" r="2.5" />
                  </svg>
                </div>
                <span className="text-[4rem] font-black text-[#008542] tracking-[0.15em] -mt-3 font-sans">FREE</span>
              </div>
            </div>
          </div>
        );

      // 🟦 שקף 1 (Refined): מי אנחנו
      case 1:
        return (
          <div className="h-full p-12 flex flex-col bg-white" dir="rtl">
            <h2 className="text-4xl font-bold text-[#0F1C2E] mb-20 text-right relative inline-block self-start">
              Harmony – פלטפורמת המחקר של עידן ה־AI
              <span className="absolute -bottom-4 right-0 w-20 h-1 bg-[#4DA3FF]"></span>
            </h2>
            
            <div className="grid grid-cols-3 gap-12 h-full items-start">
              
              {/* Column 1: Who */}
              <div className="flex flex-col gap-6">
                <div className="w-12 h-12 bg-blue-50 text-[#4DA3FF] rounded-xl flex items-center justify-center mb-2">
                   <Globe size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#0F1C2E]">מי אנחנו</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  Harmony היא מערכת מחקר חכמה שמאפשרת לכל צוות בארגון להבין צרכנים בזמן אמת, על בסיס שילוב ייחודי של דאטה חי מהרשת ומודלים מחושבים מתקדמים.
                </p>
              </div>

              {/* Column 2: Uniqueness */}
              <div className="flex flex-col gap-6 relative">
                 <div className="absolute inset-y-0 -right-6 w-px bg-gray-100 hidden md:block"></div>
                 <div className="w-12 h-12 bg-teal-50 text-[#3CC4C7] rounded-xl flex items-center justify-center mb-2">
                   <Share2 size={24} />
                </div>
                 <h3 className="text-2xl font-bold text-[#0F1C2E]">הייחוד שלנו</h3>
                 <p className="text-lg text-gray-600 leading-relaxed font-light">
                    יצירת <span className="font-semibold text-[#3CC4C7]">קהלים מלאכותיים (Artificial Audiences)</span> שמדמים באופן סטטיסטי את התנהגות, הצרכים והמניעים של צרכנים אמיתיים. הקהלים מתעדכנים כל הזמן וזמינים למחקר מיידי.
                 </p>
              </div>

              {/* Column 3: Value */}
              <div className="flex flex-col gap-6 relative">
                <div className="absolute inset-y-0 -right-6 w-px bg-gray-100 hidden md:block"></div>
                <div className="w-12 h-12 bg-gray-50 text-[#0F1C2E] rounded-xl flex items-center justify-center mb-2">
                   <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#0F1C2E]">מה זה מאפשר</h3>
                <ul className="text-lg text-gray-600 space-y-4 font-medium">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F1C2E]"></div> עומק של מכון מחקר
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F1C2E]"></div> מהירות של AI
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F1C2E]"></div> הבנה מתמשכת של השוק
                  </li>
                </ul>
              </div>

            </div>
          </div>
        );

      // 🟦 שקף 2 (Refined): מה אנחנו נותנים
      case 2:
        return (
          <div className="h-full px-16 py-12 flex flex-col bg-gray-50/30" dir="rtl">
             <div className="text-center mb-16">
               <h2 className="text-4xl font-bold text-[#0F1C2E] mb-4">
                 מה Harmony מאפשרת לכם לעשות — בשניות
               </h2>
               <p className="text-gray-500 text-lg">פלטפורמה אחת שמרכזת את כל צרכי המחקר הארגוניים</p>
             </div>

             <div className="grid grid-cols-3 gap-8 flex-grow items-stretch">
                {/* Card 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                   <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center text-[#4DA3FF] mb-6">
                      <Activity size={28} strokeWidth={2} />
                   </div>
                   <h3 className="text-xl font-bold text-[#0F1C2E] mb-4">להבין צרכנים בזמן אמת</h3>
                   <p className="text-[17pt] text-gray-600 leading-relaxed font-light">
                     Harmony קוראת שיח צרכני חי (רשתות, תגובות, פורומים) ומייצרת תמונה עדכנית של צרכים, חסמים ומגמות.
                   </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                   <div className="bg-teal-50 w-14 h-14 rounded-full flex items-center justify-center text-[#3CC4C7] mb-6">
                      <MessageSquare size={28} strokeWidth={2} />
                   </div>
                   <h3 className="text-xl font-bold text-[#0F1C2E] mb-4">לשאול הכל, לקבל תשובה</h3>
                   <div className="text-[17pt] text-gray-600 leading-relaxed font-light">
                     שילוב עוצמתי של דאטה חי, מודלים וקהלים מלאכותיים המאפשר לבצע מחקר כמותי ואיכותני מיידי על כל שאלה עסקית.
                   </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                   <div className="bg-gray-50 w-14 h-14 rounded-full flex items-center justify-center text-[#0F1C2E] mb-6">
                      <Compass size={28} strokeWidth={2} />
                   </div>
                   <h3 className="text-xl font-bold text-[#0F1C2E] mb-4">לקבל החלטות ללא ניחושים</h3>
                   <p className="text-[17pt] text-gray-600 leading-relaxed font-light">
                     ניתוח חסמים והזדמנויות, סגמנטציה, בדיקות קונספט וניתוח מתחרים — הכול במקום אחד, בלי לחכות שבועות למחקר.
                   </p>
                </div>
             </div>
          </div>
        );

      // 🟦 שקף 3 (Was 1): מקורות הדאטה
      case 3:
        return (
          <div className="h-full p-12 flex flex-col" dir="rtl">
            <div className="flex items-center gap-4 mb-10">
              <Database className="text-harmonyBlue" size={32} />
              <h2 className="text-4xl font-bold text-harmonyDark">בסיס הנתונים: תמונת מצב מקיפה מכל זירות השיח</h2>
            </div>
            
            <div className="flex gap-12 h-full">
              <div className="flex-grow">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-harmonyDark text-white">
                      <th className="p-4 rounded-tr-lg">מקור</th>
                      <th className="p-4">כמות תגובות</th>
                      <th className="p-4 rounded-tl-lg">מאפייני השיח</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg">
                    {[
                      { src: 'TikTok', count: '1,167', desc: 'צעירים, טעימות, ויזואליות' },
                      { src: 'Facebook', count: '954', desc: 'ויכוחים, פוליטיקה, דת, בריאות' },
                      { src: 'Instagram', count: '235', desc: 'נראות וטרנדים' },
                      { src: 'טוקבקים', count: '136', desc: 'דעות קצה ופחדים' },
                      { src: 'YouTube', count: '214', desc: 'תגובות לפרסומות' },
                      { src: 'סקר טבעונים', count: '72', desc: 'חדשנות וסקרנות' },
                    ].map((row, i) => (
                      <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100`}>
                        <td className="p-4 font-semibold">{row.src}</td>
                        <td className="p-4 font-mono text-harmonyBlue">{row.count}</td>
                        <td className="p-4 text-gray-600">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                     <tr className="bg-gray-100 font-bold">
                       <td className="p-4">סה״כ</td>
                       <td className="p-4 text-harmonyDark">2,706</td>
                       <td className="p-4">יחידות טקסט אמיתיות</td>
                     </tr>
                  </tfoot>
                </table>
              </div>
              <div className="flex flex-col gap-6 justify-center">
                <div className="w-[180px] h-[180px] border border-gray-200 rounded bg-gray-50 flex items-center justify-center relative overflow-hidden">
                   <img src="https://picsum.photos/180/180?random=1" alt="TikTok" className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
                   <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">TikTok</div>
                </div>
                <div className="w-[180px] h-[180px] border border-gray-200 rounded bg-gray-50 flex items-center justify-center relative overflow-hidden">
                   <img src="https://picsum.photos/180/180?random=2" alt="Facebook" className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
                   <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">Facebook</div>
                </div>
                <div className="w-[180px] h-[180px] border border-gray-200 rounded bg-gray-50 flex items-center justify-center relative overflow-hidden">
                   <img src="https://picsum.photos/180/180?random=3" alt="Talkback" className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
                   <div className="absolute bottom-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded">Talkback</div>
                </div>
              </div>
            </div>
          </div>
        );

      // 🟦 שקף 4 (Was 2): נפח שיח לפי מותג
      case 4:
        const volData = [
          { name: 'Cowfree', count: 1703, fill: COLORS.cowfree },
          { name: 'Remilk', count: 1392, fill: COLORS.remilk },
        ];
        return (
          <div className="h-full p-12 flex" dir="rtl">
            <div className="w-3/5 h-full relative p-8">
              <h2 className="text-3xl font-bold mb-8 text-harmonyDark">נפח שיח: Cowfree שולטת בוידאו הוויראלי, Remilk בשיח העומק</h2>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={volData} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 18, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                    <LabelList dataKey="count" position="top" fill="#0F1C2E" fontSize={26} fontWeight="bold" formatter={(value) => value.toLocaleString()} />
                    {volData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-2/5 flex items-center justify-center p-8">
              <div className="bg-gray-50 p-8 rounded-xl border-r-4 border-harmonyBlue shadow-sm">
                <h3 className="text-xl font-bold text-harmonyBlue mb-4">תובנה מרכזית</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#3CC4C7] mt-2 shrink-0"></span>
                    <span><strong>Cowfree</strong> ← שליטה מוחלטת ב־TikTok (נראות)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#0F1C2E] mt-2 shrink-0"></span>
                    <span><strong>Remilk</strong> ← שליטה בפייסבוק וטוקבקים (אידיאולוגיה)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      // 🟦 שקף 5 (Was 3): פילוח לפי פלטפורמות
      case 5:
        const platData = [
          { name: 'Cowfree', Facebook: 23.3, TikTok: 54.7, YouTube: 12.3, Talkbacks: 9.7 },
          { name: 'Remilk', Facebook: 56.5, TikTok: 16.9, YouTube: 11.4, Talkbacks: 9.8 },
        ];
        return (
          <div className="h-full p-12 flex flex-col">
            <h2 className="text-3xl font-bold mb-2 text-harmonyDark">הפלטפורמה היא המסר: ויזואליה מול אידיאולוגיה</h2>
            <h3 className="text-xl text-harmonyBlue mb-8">היכן מתרחש השיח עבור כל מותג?</h3>

            <div className="flex-grow flex flex-col gap-8">
               {platData.map((brand, idx) => (
                 <div key={idx} className="flex items-center gap-8">
                   <div className="w-32 font-bold text-2xl text-right">{brand.name}</div>
                   <div className="flex-grow h-16 rounded-lg overflow-hidden flex text-white font-bold text-sm">
                      <div style={{width: `${brand.TikTok}%`, background: COLORS.tiktok}} className="flex items-center justify-center">{brand.TikTok > 10 && 'TikTok'} {brand.TikTok}%</div>
                      <div style={{width: `${brand.Facebook}%`, background: COLORS.facebook}} className="flex items-center justify-center">{brand.Facebook > 10 && 'FB'} {brand.Facebook}%</div>
                      <div style={{width: `${brand.YouTube}%`, background: COLORS.youtube}} className="flex items-center justify-center">{brand.YouTube > 10 && 'YT'} {brand.YouTube}%</div>
                      <div style={{width: `${brand.Talkbacks}%`, background: COLORS.talkbacks}} className="flex items-center justify-center">Other</div>
                   </div>
                   <div className="w-[120px] h-[80px] border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden rounded">
                      <img src={`https://picsum.photos/200/200?random=${idx + 10}`} alt="Platform" className="opacity-70" />
                   </div>
                 </div>
               ))}
            </div>

             <div className="mt-8 p-6 bg-gray-50 border border-gray-100 rounded-lg flex items-center gap-6">
                <Lightbulb className="text-yellow-500" size={32} />
                <div className="text-lg">
                  <span className="font-bold text-[#3CC4C7]">Cowfree</span> = "משהו טעים שמראים בוידאו" <br/>
                  <span className="font-bold text-[#0F1C2E]">Remilk</span> = "דיון ציבורי כבד ואידיאולוגי"
                </div>
             </div>
          </div>
        );

      // 🟦 שקף 6 (Was 4): סנטימנט צרכני
      case 6:
        const sentData = [
          { name: 'Remilk', Positive: 58, Neutral: 1111, Negative: 94 },
          { name: 'Cowfree', Positive: 77, Neutral: 1523, Negative: 103 },
        ];
        return (
          <div className="h-full p-12 flex flex-col" dir="rtl">
            <h2 className="text-3xl font-bold mb-8 text-harmonyDark">סנטימנט: Cowfree נהנית מאהדה, Remilk מעוררת מחלוקת</h2>
            
            <div className="flex-grow w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 20, fontWeight: 'bold'}} />
                  <YAxis />
                  <Tooltip />
                  <Legend iconType="circle" />
                  <Bar dataKey="Positive" name="חיובי" fill={COLORS.positive} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Neutral" name="ניטרלי" fill={COLORS.neutral} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Negative" name="שלילי" fill={COLORS.negative} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 flex justify-center">
               <div className="border border-harmonyDark px-8 py-4 rounded bg-white shadow-sm flex items-center gap-4">
                 <div className="bg-harmonyDark text-white p-2 rounded-full"><Info size={20} /></div>
                 <span className="text-xl font-medium">השוק עוד לא מגובש → הרוב עדיין תגובות ניטרליות ולא דעות נחרצות.</span>
               </div>
            </div>
          </div>
        );

      // 🟦 שקף 7 (Was 5): מניעים לקנות
      case 7:
        const radarDataUpdated = [
          { subject: 'טעם', Remilk: 30, Cowfree: 50, fullMark: 50 },
          { subject: 'חדשנות', Remilk: 48, Cowfree: 10, fullMark: 50 },
          { subject: 'בעלי חיים', Remilk: 45, Cowfree: 10, fullMark: 50 },
          { subject: 'נראות/מותג', Remilk: 15, Cowfree: 45, fullMark: 50 },
          { subject: 'עתידנות', Remilk: 42, Cowfree: 5, fullMark: 50 },
        ];
        return (
          <div className="h-full p-12 relative" dir="rtl">
             {/* Header */}
             <div className="absolute top-12 right-12 flex items-center gap-4">
               <h2 className="text-4xl font-bold text-harmonyDark">מניעים לקנות</h2>
               <Utensils className="text-harmonyDark" size={40} strokeWidth={1.5} />
             </div>

             <div className="flex h-full mt-16">
                 {/* Left Panel - Cards & Quote */}
                 <div className="w-1/3 flex flex-col justify-center gap-6 pr-4 relative z-10">
                    
                    {/* Cowfree Card */}
                    <div className="bg-[#E0F7FA]/50 border-r-4 border-[#3CC4C7] p-6 rounded-l-xl relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-[#3CC4C7] mb-1">Cowfree</h3>
                                <p className="text-gray-700 font-medium leading-snug">מוביל משמעותית בשיח על טעם וחוויה (46)</p>
                            </div>
                            <Utensils className="text-[#3CC4C7]" size={28} />
                        </div>
                    </div>

                    {/* Remilk Card */}
                    <div className="bg-[#E3F2FD]/50 border-r-4 border-[#0F1C2E] p-6 rounded-l-xl relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-[#0F1C2E] mb-1">Remilk</h3>
                                <p className="text-gray-700 font-medium leading-snug">מוביל בחדשנות, גאווה ישראלית ועתידנות</p>
                            </div>
                            <Atom className="text-[#0F1C2E]" size={28} />
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="mt-12 text-gray-500 italic text-lg leading-relaxed px-2 bg-gray-50 p-4 rounded-lg">
                        "הטעם של Cowfree פשוט הפתיע אותי, זה בול כמו הדבר האמיתי"
                    </div>

                 </div>

                 {/* Right Panel - Radar Chart */}
                 <div className="w-2/3 h-full relative -ml-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarDataUpdated}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#0F1C2E', fontSize: 16, fontWeight: 'bold' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 50]} tick={false} axisLine={false} />
                        <Radar name="Cowfree" dataKey="Cowfree" stroke="#3CC4C7" strokeWidth={2} fill="#3CC4C7" fillOpacity={0.5} />
                        <Radar name="Remilk" dataKey="Remilk" stroke="#0F1C2E" strokeWidth={2} fill="#0F1C2E" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                 </div>
             </div>
          </div>
        );

      // 🟦 שקף 8 (Was 6): חסמים חזקים
      case 8:
        return (
          <div className="h-full p-12 flex flex-col" dir="rtl">
            <h2 className="text-3xl font-bold mb-10 text-center text-harmonyDark">מפת החסמים: פחד מהותי (רגשי) מול תסכול לוגיסטי (פרקטי)</h2>
            
            <div className="flex flex-grow gap-8">
              {/* Remilk Side */}
              <div className="w-1/2 bg-gray-50 rounded-lg p-6 relative">
                 <div className="flex items-center gap-2 mb-6 text-[#0F1C2E]">
                   <AlertTriangle size={28} />
                   <h3 className="text-2xl font-bold">Remilk (רגשיים)</h3>
                 </div>
                 <div className="space-y-4">
                   {[
                     { l: 'פחד "מעבדה"', v: 60 },
                     { l: 'גועל', v: 17 },
                     { l: 'חשש בריאותי', v: 12 },
                     { l: '"לא טבעי"', v: 30 }
                   ].map((item, i) => (
                     <div key={i}>
                       <div className="flex justify-between text-sm font-semibold mb-1">
                         <span>{item.l}</span>
                         <span>{item.v}</span>
                       </div>
                       <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                         <div style={{width: `${(item.v / 60) * 100}%`}} className="h-full bg-red-800 rounded-full"></div>
                       </div>
                     </div>
                   ))}
                 </div>
                 <div className="absolute bottom-6 w-[calc(100%-3rem)] text-center font-bold text-red-900 bg-white/50 p-2 rounded">
                   החסם: פחד מהותי מהמוצר עצמו
                 </div>
              </div>

              {/* Cowfree Side */}
              <div className="w-1/2 bg-gray-50 rounded-lg p-6 relative">
                 <div className="flex items-center gap-2 mb-6 text-[#3CC4C7]">
                   <ShoppingCart size={28} />
                   <h3 className="text-2xl font-bold">Cowfree (פרקטיים)</h3>
                 </div>
                 <div className="space-y-4">
                   {[
                     { l: 'זמינות נמוכה', v: 155 },
                     { l: 'יקר', v: 15 },
                     { l: 'מרקם', v: 7 },
                     { l: 'בלבול', v: 14 }
                   ].map((item, i) => (
                     <div key={i}>
                       <div className="flex justify-between text-sm font-semibold mb-1">
                         <span>{item.l}</span>
                         <span>{item.v}</span>
                       </div>
                       <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                         <div style={{width: `${(item.v / 155) * 100}%`}} className="h-full bg-[#3CC4C7] rounded-full"></div>
                       </div>
                     </div>
                   ))}
                 </div>
                 <div className="absolute bottom-6 w-[calc(100%-3rem)] text-center font-bold text-teal-800 bg-white/50 p-2 rounded">
                   החסם: בעיות לוגיסטיות בהשגה
                 </div>
              </div>
            </div>
          </div>
        );

      // 🟦 שקף 9 (Was 7): אלרגיות
      case 9:
        const allergyData = [
          { name: 'Remilk', value: 140, fill: '#EF4444' },
          { name: 'Cowfree', value: 36, fill: COLORS.cowfree }
        ];
        return (
          <div className="h-full p-12 flex flex-col" dir="rtl">
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="text-red-600" size={36} />
              <h2 className="text-3xl font-bold">אלרגיות: הבלבול המסוכן שחוסם רכישה (176 אזכורים)</h2>
            </div>
            <h3 className="text-2xl text-red-800 font-semibold mb-8">״רגישות ללקטוז״ מול ״אלרגיה לחלב״</h3>

            <div className="flex flex-grow gap-12">
               <div className="w-1/2 h-full">
                 <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={allergyData}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{fontSize: 20}} />
                      <YAxis />
                      <Tooltip 
                        cursor={{fill: 'rgba(0,0,0,0.05)'}} 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                        {allergyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
               </div>
               
               <div className="w-1/2 flex flex-col justify-center gap-6">
                 <div className="bg-red-50 p-6 rounded-lg border-r-4 border-red-500 text-lg text-gray-700">
                   <span className="italic">"זה לא מתאים לאלרגיים!!!"</span>
                 </div>
                 <div className="bg-red-50 p-6 rounded-lg border-r-4 border-red-500 text-lg text-gray-700">
                   <span className="italic">"למה זה לא כתוב על האריזה?"</span>
                 </div>
                 <div className="bg-red-50 p-6 rounded-lg border-r-4 border-red-500 text-lg text-gray-700">
                   <span className="italic">"אני רגישה ללקטוז – זה בטוח לי?"</span>
                 </div>
                 
                 <div className="border-2 border-harmonyBlue p-4 rounded-lg mt-4 font-bold text-harmonyDark bg-white">
                   תובנה: הבלבול בין "ללא לקטוז" ל"לא מזיק לאלרגיים" = חסם קנייה עצום.
                 </div>
               </div>
            </div>
          </div>
        );

      // 🟦 שקף 10 (Was 8): כשרות/דת
      case 10:
        const kosherData = [
           { name: 'Remilk', value: 150, fill: COLORS.remilk },
           { name: 'Cowfree', value: 25, fill: COLORS.cowfree },
        ];
        return (
          <div className="h-full p-12 flex flex-col" dir="rtl">
             <div className="flex items-center gap-3 mb-8">
               <Star className="text-yellow-600" fill="currentColor" size={32} />
               <h2 className="text-3xl font-bold">הזווית היהודית: כשרות פרווה כשובר שוויון אסטרטגי (242 הופעות)</h2>
             </div>

             <div className="flex gap-12 items-center flex-grow">
               <div className="w-1/2 h-full relative">
                 <ResponsiveContainer>
                   <PieChart>
                     <Pie 
                        data={kosherData} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={120} 
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                          const RADIAN = Math.PI / 180;
                          const radius = outerRadius * 1.2;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <text 
                              x={x} 
                              y={y} 
                              fill="#0F1C2E" 
                              textAnchor={x > cx ? 'start' : 'end'} 
                              dominantBaseline="central" 
                              fontSize={28} 
                              fontWeight="bold"
                            >
                              {value}
                            </text>
                          );
                        }}
                     >
                        {kosherData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                     </Pie>
                     <Legend verticalAlign="bottom" height={36}/>
                   </PieChart>
                 </ResponsiveContainer>
               </div>
               
               <div className="w-1/2 space-y-6">
                 <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                   <h4 className="font-bold text-xl mb-4 text-harmonyDark">השאלות שחוזרות בקהל המסורתי/דתי:</h4>
                   <ul className="space-y-4 text-lg text-gray-700">
                     <li className="flex flex-col"><span className="italic">"זה פרווה?"</span></li>
                     <li className="flex flex-col"><span className="italic">"מותר עם בשר?"</span></li>
                     <li className="flex flex-col"><span className="italic">"הבד״ץ יאשר?"</span></li>
                     <li className="flex flex-col"><span className="italic">"זה נחשב חלב לפי הלכה?"</span></li>
                   </ul>
                 </div>
                 <p className="text-xl font-medium text-harmonyBlue bg-blue-50 p-4 rounded-lg">
                   Remilk פוגע עמוק בשיח דתי–הלכתי.<br/>
                   זו הזדמנות עצומה אם יאושר כפרווה.
                 </p>
               </div>
             </div>
          </div>
        );

      // 🟦 שקף 11 (Was 9): בריאות/סכנות
      case 11:
        const healthWords = [
          { text: 'סרטן', size: 'text-5xl', color: 'text-red-600', w: 'font-black' },
          { text: 'מסוכן', size: 'text-4xl', color: 'text-red-500', w: 'font-bold' },
          { text: 'כימי', size: 'text-4xl', color: 'text-orange-500', w: 'font-bold' },
          { text: 'ניסויי מעבדה', size: 'text-3xl', color: 'text-red-400', w: 'font-semibold' },
          { text: '"מי בדק את זה?"', size: 'text-3xl', color: 'text-orange-400', w: 'font-medium' },
          { text: 'בריאות', size: 'text-2xl', color: 'text-gray-400', w: 'font-normal' },
          { text: 'תעשייתי', size: 'text-2xl', color: 'text-red-300', w: 'font-medium' },
        ];
        return (
          <div className="h-full p-8 flex flex-col">
            <h2 className="text-3xl font-bold mb-2 border-b pb-2 w-full text-harmonyDark">תפיסת הבריאות: Remilk מתמודדת עם פחדים, Cowfree עם שאלות</h2>
            
            <div className="text-lg text-[#343434] font-medium mb-2 text-right w-full">
                פיצול לפי מותג: Remilk מול Cowfree
            </div>

            <div className="flex gap-8 mb-4 w-full">
                 {/* Remilk Box */}
                 <div className="w-1/2 bg-[#F5F7FA] border border-[#4DA3FF] rounded-xl p-4 flex flex-col shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-[#0F1C2E]">Remilk</h3>
                        <div className="flex gap-2 text-[#0F1C2E]">
                             <FlaskConical size={20} />
                             <AlertTriangle size={20} />
                        </div>
                    </div>
                    <div className="text-lg font-semibold mb-2 text-gray-800">143 הופעות של תמות בריאות:</div>
                    <ul className="space-y-1 text-lg text-gray-600">
                        <li className="flex justify-between items-center border-b border-gray-100 pb-1"><span>כימי/מעבדה:</span> <span className="font-bold text-[#0F1C2E]">~110</span></li>
                        <li className="flex justify-between items-center border-b border-gray-100 pb-1"><span>"מסוכן":</span> <span className="font-bold text-[#0F1C2E]">~18</span></li>
                        <li className="flex justify-between items-center border-b border-gray-100 pb-1"><span>סרטן:</span> <span className="font-bold text-[#0F1C2E]">~7</span></li>
                        <li className="flex justify-between items-center"><span>בריאות כללית/חשש:</span> <span className="font-bold text-[#0F1C2E]">~8</span></li>
                    </ul>
                 </div>

                 {/* Cowfree Box */}
                 <div className="w-1/2 bg-[#F5F7FA] border border-[#3CC4C7] rounded-xl p-4 flex flex-col shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-[#3CC4C7]">Cowfree</h3>
                         <div className="flex gap-2 text-[#3CC4C7]">
                             <Leaf size={20} />
                             <Info size={20} />
                        </div>
                    </div>
                    <div className="text-lg font-semibold mb-2 text-gray-800">23 הופעות של תמות בריאות:</div>
                     <ul className="space-y-1 text-lg text-gray-600">
                        <li className="flex justify-between items-center border-b border-gray-100 pb-1"><span>כימי/מעבדה:</span> <span className="font-bold text-[#3CC4C7]">12</span></li>
                        <li className="flex justify-between items-center border-b border-gray-100 pb-1"><span>"לא טבעי":</span> <span className="font-bold text-[#3CC4C7]">6</span></li>
                        <li className="flex justify-between items-center border-b border-gray-100 pb-1"><span>בריאות כללית:</span> <span className="font-bold text-[#3CC4C7]">5</span></li>
                        <li className="flex justify-between items-center"><span>סרטן:</span> <span className="font-bold text-[#3CC4C7]">0</span></li>
                    </ul>
                 </div>
            </div>

            <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-xl p-4 mb-2">
                <div className="flex flex-wrap justify-center items-center content-center gap-8 w-full max-w-5xl">
                  {healthWords.map((word, i) => (
                    <span key={i} className={`${word.size} ${word.color} ${word.w}`}>{word.text}</span>
                  ))}
                </div>
            </div>

            <div className="mt-4 text-lg text-center text-harmonyDark leading-relaxed">
              <span className="font-bold">תובנה:</span> Remilk יוצר כמות עצומה של פחדי בריאות וסכנות (פי 6 יותר מקאופריי).<br/>
              רוב הפחד נובע מדימוי "מעבדתי/כימי" ולא מעובדות.
            </div>
          </div>
        );

      // 🟦 שקף 12 (Was 10): פילוח מגדרי
      case 12:
        const genderRemilk = [
          { name: 'גברים', value: 62, fill: '#4DA3FF' },
          { name: 'נשים', value: 31, fill: '#3CC4C7' },
          { name: 'לא מזוהה', value: 7, fill: '#DADADA' }
        ];
        const genderCowfree = [
          { name: 'גברים', value: 38, fill: '#4DA3FF' },
          { name: 'נשים', value: 55, fill: '#3CC4C7' },
          { name: 'לא מזוהה', value: 7, fill: '#DADADA' }
        ];

        return (
          <div className="h-full p-8 flex flex-col items-center" dir="rtl">
            <h2 className="text-3xl font-bold mb-12 self-start w-full text-harmonyDark">הפער המגדרי: טכנולוגיה גברית מול לייף–סטייל נשי</h2>
            
            <div className="flex justify-center gap-24 w-full mb-8">
              {/* Remilk Chart */}
              <div className="flex flex-col items-center">
                <div className="relative flex justify-center items-center" style={{ width: 260, height: 260 }}>
                  <PieChart width={260} height={260}>
                    <Pie
                      data={genderRemilk}
                      innerRadius={104}
                      outerRadius={130}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                    >
                      {genderRemilk.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="absolute text-[36pt] font-semibold text-[#1A1A1A]">62%</div>
                </div>
                
                <h3 className="text-2xl font-bold text-[#0F1C2E] mt-6 mb-2">Remilk</h3>
                <ul className="text-[18pt] space-y-1 text-gray-700">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#4DA3FF]"></div> גברים: 62 אחוז</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#3CC4C7]"></div> נשים: 31 אחוז</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#DADADA]"></div> לא מזוהה: 7 אחוז</li>
                </ul>
              </div>

              {/* Cowfree Chart */}
              <div className="flex flex-col items-center">
                <div className="relative flex justify-center items-center" style={{ width: 260, height: 260 }}>
                   <div className="absolute top-0 right-[-40px] flex flex-col gap-2">
                      <Mars size={24} color="#4DA3FF" strokeWidth={1.5} />
                      <Venus size={24} color="#3CC4C7" strokeWidth={1.5} />
                      <HelpCircle size={24} color="#DADADA" strokeWidth={1.5} />
                   </div>
                  <PieChart width={260} height={260}>
                    <Pie
                      data={genderCowfree}
                      innerRadius={104}
                      outerRadius={130}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                    >
                      {genderCowfree.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="absolute text-[36pt] font-semibold text-[#1A1A1A]">55%</div>
                </div>
                
                <h3 className="text-2xl font-bold text-[#3CC4C7] mt-6 mb-2">Cowfree</h3>
                <ul className="text-[18pt] space-y-1 text-gray-700">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#4DA3FF]"></div> גברים: 38 אחוז</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#3CC4C7]"></div> נשים: 55 אחוז</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#DADADA]"></div> לא מזוהה: 7 אחוז</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#F5F7FA] border border-[#4DA3FF] px-8 py-6 rounded text-center mt-auto w-2/3">
              <p className="text-[18pt] text-gray-800 font-medium">
                Remilk – משך יותר גברים ושיח טכנולוגי/אידאולוגי<br/>
                Cowfree – משך יותר נשים ושיח של טעם, חוויה ונראות
              </p>
            </div>
          </div>
        );

      // 🟦 שקף 13 (Was 11): סינתטי/מעבדה
      case 13:
        const syntheticData = [
          { name: 'מעבדה', remilk: 85, cowfree: 6 },
          { name: 'כימי', remilk: 40, cowfree: 8 },
          { name: 'מהונדס', remilk: 31, cowfree: 6 },
          { name: 'לא טבעי', remilk: 33, cowfree: 9 },
          { name: 'מסוכן', remilk: 18, cowfree: 3 },
          { name: 'סרטן', remilk: 7, cowfree: 0 },
        ];
        return (
          <div className="h-full px-6 py-4 flex flex-col" dir="rtl">
            <div className="flex items-center justify-end gap-3 mb-3">
              <h2 className="text-3xl font-bold text-[#1A1A1A]">מיתוג ה'מעבדה': המכשול הפסיכולוגי הגדול של Remilk</h2>
              <FlaskConical size={36} className="text-[#0F1C2E]" />
            </div>

            {/* Top comparison boxes */}
            <div className="flex gap-6 mb-3 h-[150px]">
               {/* Remilk Box */}
               <div className="w-1/2 bg-[#F5F7FA] border border-[#0F1C2E] rounded-xl p-3 relative shadow-sm">
                   <div className="absolute top-3 left-3"><FlaskConical size={28} className="text-[#0F1C2E]" /></div>
                   <h3 className="text-xl font-bold text-[#0F1C2E] mb-1 text-right pr-2">Remilk</h3>
                   <div className="text-base font-bold text-gray-600 mb-1 text-right pr-2">143 הופעות (58%)</div>
                   <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 text-base text-right pr-2">
                       <div className="flex justify-between"><span>85</span> <span>מעבדה:</span></div>
                       <div className="flex justify-between"><span>33</span> <span>לא טבעי:</span></div>
                       <div className="flex justify-between"><span>40</span> <span>כימי:</span></div>
                       <div className="flex justify-between"><span>18</span> <span>מסוכן:</span></div>
                       <div className="flex justify-between"><span>31</span> <span>מהונדס/GMO:</span></div>
                       <div className="flex justify-between"><span>7</span> <span>סרטן:</span></div>
                   </div>
                   <div className="mt-1 text-[#0F1C2E] font-bold text-xs text-right pr-2">אטמוספירה: "סיכון מדומיין"</div>
               </div>

               {/* Cowfree Box */}
               <div className="w-1/2 bg-[#F5F7FA] border border-[#3CC4C7] rounded-xl p-3 relative shadow-sm">
                   <div className="absolute top-3 left-3"><Leaf size={28} className="text-[#3CC4C7]" /></div>
                   <h3 className="text-xl font-bold text-[#3CC4C7] mb-1 text-right pr-2">Cowfree</h3>
                   <div className="text-base font-bold text-gray-600 mb-1 text-right pr-2">29 הופעות (17%)</div>
                   <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 text-base text-right pr-2">
                       <div className="flex justify-between"><span>8</span> <span>כימי:</span></div>
                       <div className="flex justify-between"><span>0</span> <span>GMO:</span></div>
                       <div className="flex justify-between"><span>6</span> <span>מעבדה/מהונדס:</span></div>
                       <div className="flex justify-between"><span>0</span> <span>סרטן:</span></div>
                       <div className="flex justify-between"><span>9</span> <span>לא טבעי:</span></div>
                   </div>
                   <div className="mt-1 text-[#3CC4C7] font-bold text-xs text-right pr-2">אטמוספירה: "בלבול קל, לא פחד"</div>
               </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 w-full mb-2 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={syntheticData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{fontSize: 16, fontWeight: 'bold'}} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="remilk" name="Remilk" fill="#0F1C2E" radius={[4, 4, 0, 0]} >
                         <LabelList dataKey="remilk" position="top" fill="#0F1C2E" fontSize={14} fontWeight="bold" />
                      </Bar>
                      <Bar dataKey="cowfree" name="Cowfree" fill="#3CC4C7" radius={[4, 4, 0, 0]} >
                         <LabelList dataKey="cowfree" position="top" fill="#3CC4C7" fontSize={14} fontWeight="bold" />
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Insight Box */}
            <div className="bg-[#FFF7E6] border-2 border-orange-200 rounded-xl p-3 text-center shadow-sm mt-auto">
               <div className="text-base leading-tight text-gray-800">
                  <span className="font-bold">תובנה אסטרטגית:</span> Remilk מזוהה חזק עם שפה של כימיה ומעבדה. הפחד אינו מבוסס מדע – זה מיתוג.
               </div>
            </div>
          </div>
        );

      // 🟦 שקף 14 (Was 12): סקרנות והתלהבות
      case 14:
        const curiosityChartData = [
          { name: 'Cowfree', value: 46, fill: '#3CC4C7' }, 
          { name: 'Remilk', value: 22, fill: '#0F1C2E' },
        ];
        return (
          <div className="h-full p-6 flex flex-col" dir="rtl">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#1A1A1A]">מנוע הסקרנות: התיאבון של Cowfree מול העניין של Remilk</h2>
              <h3 className="text-xl text-gray-500 font-medium">פירוק לפי מותג ותתי תמות (68 הופעות)</h3>
            </div>

            {/* Upper Section: Chart and Table */}
            <div className="flex gap-8 mb-6 h-[220px]">
              {/* Chart */}
              <div className="w-1/2">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={curiosityChartData} layout="vertical" margin={{top: 0, right: 60, left: 120, bottom: 0}} barSize={40}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" tick={{fontSize: 18, fontWeight: 'bold', fill: '#1A1A1A'}} width={110} axisLine={false} tickLine={false} />
                     <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                       <LabelList dataKey="value" position="right" fontSize={18} fontWeight="bold" fill="#1A1A1A" offset={10} />
                        {curiosityChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
              </div>

              {/* Table */}
              <div className="w-1/2 bg-[#F5F7FA] rounded-xl p-4 flex items-center">
                 <table className="w-full text-center">
                   <thead className="text-gray-500 border-b border-gray-200">
                     <tr>
                       <th className="pb-2 text-right">תת תמה</th>
                       <th className="pb-2 text-[#3CC4C7]">Cowfree</th>
                       <th className="pb-2 text-[#0F1C2E]">Remilk</th>
                     </tr>
                   </thead>
                   <tbody className="text-lg font-medium text-gray-800">
                     {[
                       { theme: 'מסקרן לנסות', c: 29, r: 11 },
                       { theme: '"רוצה לטעום"', c: 14, r: 4 },
                       { theme: 'חידוש/חדשנות', c: 3, r: 7 },
                     ].map((row, i) => (
                       <tr key={i} className="border-b border-gray-100 last:border-0">
                         <td className="py-3 text-right">{row.theme}</td>
                         <td className="py-3 text-[#3CC4C7] font-bold">{row.c}</td>
                         <td className="py-3 text-[#0F1C2E] font-bold">{row.r}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
              </div>
            </div>

            {/* Quotes Section */}
            <div className="flex gap-8 mb-6 flex-grow">
               {/* Cowfree Quotes */}
               <div className="w-1/2 bg-teal-50/50 border-r-4 border-[#3CC4C7] p-4 rounded-lg">
                  <h4 className="text-xl font-bold text-[#3CC4C7] mb-3">Cowfree</h4>
                  <div className="space-y-2 text-[16pt] italic text-gray-700">
                     <p>"וואי רוצה לטעום את זה"</p>
                     <p>"מסקרן ברמות, נראה טעים"</p>
                     <p>"בא לי לנסות עכשיו"</p>
                  </div>
               </div>
               {/* Remilk Quotes */}
               <div className="w-1/2 bg-blue-50/50 border-r-4 border-[#0F1C2E] p-4 rounded-lg">
                  <h4 className="text-xl font-bold text-[#0F1C2E] mb-3">Remilk</h4>
                  <div className="space-y-2 text-[16pt] italic text-gray-700">
                     <p>"מעניין טכנולוגית"</p>
                     <p>"מסקרן לראות אם זה באמת עובד"</p>
                  </div>
               </div>
            </div>

            {/* Insight Box */}
            <div className="bg-[#FFF7E6] border-2 border-orange-200 rounded-xl p-4 text-center mt-auto">
               <div className="text-[18pt] leading-tight text-gray-800">
                  <span className="font-bold">הבייס של Cowfree מונע על ידי סקרנות וטעם.</span><br/>
                  Remilk מונע על ידי עניין טכנולוגי ולא על ידי טעם.
               </div>
            </div>
          </div>
        );

      // 🟦 שקף 15 (Was 13): בקשות לטעמים חדשים
      case 15:
        const flavorData = [
          { name: 'קפה', val: 7, icon: '☕' },
          { name: 'וניל', val: 5, icon: '🍦' },
          { name: 'שוקולד', val: 3, icon: '🍫' },
          { name: 'בננה', val: 2, icon: '🍌' },
          { name: 'תות', val: 1, icon: '🍓' },
        ];
        return (
          <div className="h-full p-6 flex flex-col" dir="rtl">
            <h2 className="text-2xl font-bold mb-4 text-harmonyDark">ביקוש למוצר: הצרכן מחכה לטעמים של Cowfree</h2>
            <div className="flex-grow bg-gray-50 rounded-xl p-6 flex items-end justify-around pb-8">
               {flavorData.map((f, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 group">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{f.icon}</div>
                    <div className="w-16 bg-harmonyBlue rounded-t-lg transition-all duration-700 ease-out" style={{height: `${f.val * 30}px`}}></div>
                    <div className="font-bold text-harmonyDark">{f.name}</div>
                    <div className="text-sm text-gray-500">{f.val}</div>
                 </div>
               ))}
            </div>
            <div className="mt-8 border-t pt-4 text-center">
              Cowfree נתפס כמוצר שאפשר לפתח ולגוון.<br/>
              <span className="text-gray-500">Remilk כמעט ללא בקשות → עדיין נתפס כטכנולוגיה ולא כחווית טעימה.</span>
            </div>
          </div>
        );

      // 🟦 שקף 16 (Was 14): פחדי הורים
      case 16:
        return (
          <div className="h-full flex overflow-hidden" dir="rtl">
             {/* Left Side: Images Strip */}
             <div className="w-1/3 h-full bg-[#FFF7F0] border-l border-red-50 p-4 grid grid-rows-3 gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-sm group">
                   <img src="https://picsum.photos/400/600?random=201" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Parent" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-sm group">
                   <img src="https://picsum.photos/400/600?random=202" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Parent" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-sm group">
                   <img src="https://picsum.photos/400/600?random=203" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Parent" />
                </div>
             </div>

             {/* Right Side: Content */}
             <div className="w-2/3 p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                   <Baby className="text-[#7C1E18]" size={32} />
                   <h2 className="text-3xl font-bold text-[#0F1C2E]">פחדי הורים</h2>
                </div>
                <h3 className="text-lg text-gray-500 font-medium mb-6">קבוצה קטנה (5 הופעות) עם השפעה גדולה — 80% מהפחד מכוון ל-Remilk</h3>

                {/* Quotes List */}
                <div className="flex flex-col gap-3 mb-6 flex-grow">
                   {[
                     '"לא נותנת לילדים שלי."',
                     '"מסוכן לילדים."',
                     '"לא מתאים לילדים בכלל."'
                   ].map((text, i) => (
                     <div key={i} className="bg-white border border-red-100 p-4 rounded-xl shadow-sm flex items-center gap-3">
                        <div className="bg-red-50 p-2 rounded-full text-[#7C1E18]"><ShieldAlert size={18} /></div>
                        <p className="text-xl font-bold text-gray-800">{text}</p>
                     </div>
                   ))}
                </div>

                 {/* Brand Bars - HIGHLY VISIBLE */}
                 <div className="mb-6">
                    <div className="flex justify-between text-base font-bold text-gray-700 mb-3">
                       <span>Remilk (4)</span>
                       <span>Cowfree (1)</span>
                    </div>
                    <div className="h-16 w-full bg-gray-200 rounded-xl overflow-hidden flex shadow-lg border-2 border-gray-300">
                       <div className="h-full bg-[#0F1C2E] flex items-center justify-center text-white font-bold text-2xl" style={{width: '80%'}}>4</div>
                       <div className="h-full bg-[#3CC4C7] flex items-center justify-center text-white font-bold text-2xl" style={{width: '20%'}}>1</div>
                    </div>
                 </div>

                {/* Insight Box */}
                <div className="bg-[#FFF7F0] border-l-4 border-[#ffb3b3] p-4 rounded-r-xl shadow-sm mt-auto">
                    <p className="text-base leading-relaxed text-[#7C1E18]">
                      <span className="font-bold">תובנה:</span> תגובות קיצוניות שמייצרות אפקט של "סכנה לילדים". הפחד הזה מופיע כמעט רק מול Remilk ומזין את תמת הכימיות.
                    </p>
                </div>
             </div>
          </div>
        );

      // 🟦 שקף 17 (Was 15): גאווה ישראלית
      case 17:
        return (
          <div className="h-full flex overflow-hidden" dir="rtl">
             {/* Left Side: Images Strip */}
             <div className="w-1/3 h-full bg-gray-50 border-l border-gray-100 p-4 grid grid-rows-3 gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-sm group">
                   <img src="https://picsum.photos/400/600?random=101" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Person" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-sm group">
                   <img src="https://picsum.photos/400/600?random=102" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Person" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-sm group">
                   <img src="https://picsum.photos/400/600?random=103" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Person" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
             </div>

             {/* Right Side: Content */}
             <div className="w-2/3 p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                   <Flag className="text-[#0F1C2E]" size={28} />
                   <h2 className="text-3xl font-bold text-[#0F1C2E]">גאווה ישראלית</h2>
                </div>
                <h3 className="text-lg text-gray-500 font-medium mb-6">29 הופעות של פטריוטיות: הצרכנים רואים ב–Remilk "הובלה ישראלית לעולם"</h3>

                {/* Quotes List - Cleaner Layout */}
                <div className="flex flex-col gap-3 mb-6 flex-grow">
                   {[
                     '"חדשנות ישראלית!"',
                     '"כחול־לבן."',
                     '"ישראל מובילה את העולם!"'
                   ].map((text, i) => (
                     <div key={i} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center gap-3 hover:border-[#4DA3FF] transition-colors">
                        <div className="bg-blue-50 p-2 rounded-full text-[#4DA3FF]"><Quote size={18} fill="currentColor" /></div>
                        <p className="text-xl font-bold text-gray-800">{text}</p>
                     </div>
                   ))}
                </div>

                {/* Brand Comparison Bar */}
                <div className="mb-6">
                   <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
                      <span>Remilk (25)</span>
                      <span>Cowfree (4)</span>
                   </div>
                   <div className="h-10 w-full bg-gray-100 rounded-lg overflow-hidden flex shadow-inner">
                      <div className="h-full bg-[#0F1C2E] flex items-center justify-center text-white font-bold text-lg" style={{width: '86%'}}>25</div>
                      <div className="h-full bg-[#3CC4C7] flex items-center justify-center text-white font-bold text-lg" style={{width: '14%'}}>4</div>
                   </div>
                </div>

                {/* Insight Box */}
                <div className="bg-[#E3F2FD] border-l-4 border-[#4DA3FF] p-4 rounded-r-xl shadow-sm">
                    <p className="text-base leading-relaxed text-[#0F1C2E]">
                      <span className="font-bold">תובנה אסטרטגית:</span> Remilk יכול לבנות את הנרטיב 'ישראל מייצרת את העתיד', אך כיום הוא נתפס כחדשנות טכנולוגית ולא כחוויית טעם.
                    </p>
                </div>
             </div>
          </div>
        );

      // 🟦 שקף 18 (Was 16): דיסאינפורמציה
      case 18:
        return (
          <div className="h-full p-8 flex flex-col items-center justify-center" dir="rtl">
             <div className="text-center space-y-8 w-full max-w-4xl">
               <ShieldAlert className="mx-auto text-gray-700" size={80} strokeWidth={1} />
               <h2 className="text-4xl font-bold text-harmonyDark">המאבק על האמת: דיסאינפורמציה כחסם אימון</h2>
               
               <div className="flex flex-col gap-6 justify-center items-center">
                 <div className="bg-gray-100 px-8 py-4 rounded-lg w-full flex justify-between items-center">
                    <span className="text-2xl text-gray-700 line-through">פייק</span>
                 </div>
                 <div className="bg-gray-100 px-8 py-4 rounded-lg w-full flex justify-between items-center">
                    <span className="text-2xl text-gray-700 line-through">משקרים לכם</span>
                 </div>
                 <div className="bg-gray-100 px-8 py-4 rounded-lg w-full flex justify-between items-center">
                    <span className="text-2xl text-gray-700 line-through">מרמים אותנו</span>
                 </div>
               </div>

               <div className="text-3xl font-bold text-harmonyBlue mt-12 bg-blue-50 p-6 rounded-xl">
                 נדרש מהלך של Myth Busting (ניפוץ מיתוסים) אקטיבי.
               </div>
             </div>
          </div>
        );

      // 🟦 שקף 19 (Was 17): Head-to-Head סופי
      case 19:
        const compareData = [
          { theme: 'מחיר', r: 234, c: 234 },
          { theme: 'כשרות', r: 150, c: 25 },
          { theme: 'אלרגיות', r: 140, c: 36 },
          { theme: 'סינתטי', r: 172, c: 59 },
          { theme: 'טעמים', r: 2, c: 18 },
          { theme: 'טעם טוב', r: 31, c: 47 },
          { theme: 'סקרנות', r: 22, c: 46 },
        ];
        const maxValue = Math.max(...compareData.map(d => Math.max(d.r, d.c)));
        return (
          <div className="h-full p-6 flex flex-col bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center text-harmonyDark">סיכום השוואתי: שתי קטגוריות שונות בתודעת הצרכן</h2>
            <div className="flex-1 flex items-center justify-center overflow-auto">
              <div className="w-full max-w-6xl px-4">
                {/* Header Row */}
                <div className="grid grid-cols-[2fr_1.5fr_2fr] gap-6 mb-4 pb-3 border-b-2 border-gray-200">
                   <div className="text-right text-xl font-bold text-[#0F1C2E]">Remilk</div>
                   <div className="text-center text-xl font-bold text-gray-700">נושא</div>
                   <div className="text-left text-xl font-bold text-[#3CC4C7]">Cowfree</div>
                </div>
                
                {/* Data Rows */}
                <div className="space-y-2">
                  {compareData.map((row, i) => (
                    <div key={i} className="grid grid-cols-[2fr_1.5fr_2fr] gap-6 items-center py-3">
                      {/* Left: Remilk */}
                      <div className="flex items-center justify-end gap-3">
                         <span className="text-lg font-bold text-[#0F1C2E] min-w-[3rem] text-right">{row.r}</span>
                         <div 
                           className="h-8 bg-[#0F1C2E] rounded-md shadow-sm" 
                           style={{width: `${Math.max((row.r / maxValue) * 100, 5)}%`}}
                         ></div>
                      </div>
                      
                      {/* Center: Theme */}
                      <div className="text-center font-bold text-gray-800 text-lg">{row.theme}</div>

                      {/* Right: Cowfree */}
                      <div className="flex items-center justify-start gap-3">
                         <div 
                           className="h-8 bg-[#3CC4C7] rounded-md shadow-sm" 
                           style={{width: `${Math.max((row.c / maxValue) * 100, 5)}%`}}
                         ></div>
                         <span className="text-lg font-bold text-[#3CC4C7] min-w-[3rem] text-left">{row.c}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      // 🟦 שקף 20 (Was 18): WHAT → SO WHAT → NOW WHAT
      case 20:
        return (
          <div className="h-full px-6 py-5 flex flex-col overflow-hidden" dir="rtl">
            <h2 className="text-3xl font-bold mb-4 text-center text-harmonyDark">מפת דרכים אסטרטגית: שני מותגים, שני נתיבים להצלחה</h2>
            
            <div className="grid grid-cols-2 gap-6 flex-grow overflow-auto">
              
              {/* Remilk Column */}
              <div className="flex flex-col gap-3 border-l-4 border-[#0F1C2E] pl-4">
                <div className="flex items-center gap-2 text-[#0F1C2E] mb-1">
                  <div className="bg-[#0F1C2E] text-white p-1.5 rounded-lg"><Atom size={24}/></div>
                  <h3 className="text-2xl font-bold">Remilk</h3>
                </div>
                
                {/* Status */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                   <h4 className="flex items-center gap-2 font-bold text-base text-gray-700 mb-1.5">
                     <Map size={16}/> הסטטוס הנוכחי
                   </h4>
                   <p className="text-base font-medium leading-relaxed">
                     נתפסת כחברת טכנולוגיה עילית ("הסטארט-אפ של החלב"). נהנית מגאווה ישראלית ושיח אידיאולוגי עמוק.
                   </p>
                </div>

                {/* Challenge */}
                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                   <h4 className="flex items-center gap-2 font-bold text-base text-red-800 mb-1.5">
                     <AlertTriangle size={16}/> האתגר המרכזי
                   </h4>
                   <p className="text-base font-medium leading-relaxed text-red-900">
                     "מחסום המעבדה". הפחד הפסיכולוגי ממוצר שנתפס כ"לא טבעי", "כימי" או "מהונדס" חוסם אימוץ המוני.
                   </p>
                </div>

                {/* Action Plan */}
                <div className="bg-[#0F1C2E] p-4 rounded-xl text-white mt-auto">
                   <h4 className="flex items-center gap-2 font-bold text-base text-blue-200 mb-1.5">
                     הפעולה הנדרשת <ArrowLeft size={16}/>
                   </h4>
                   <ul className="space-y-1.5 text-sm leading-relaxed">
                     <li>• <strong>Rebranding לשפה:</strong> מעבר מ"חלב מעבדה" ל"חלב נקי" / "חלב העתיד".</li>
                     <li>• <strong>מינוף הכשרות:</strong> הדגשת יתרון ה"פרווה" לקהל מסורתי.</li>
                     <li>• <strong>מיתוג הפטריוטיות:</strong> שימוש בנרטיב "גאווה ישראלית" לביסוס אמון.</li>
                   </ul>
                </div>
              </div>

              {/* Cowfree Column */}
              <div className="flex flex-col gap-3 border-l-4 border-[#3CC4C7] pl-4" dir="rtl">
                <div className="flex items-center gap-2 text-[#3CC4C7] mb-1">
                  <div className="bg-[#3CC4C7] text-white p-1.5 rounded-lg"><Utensils size={24}/></div>
                  <h3 className="text-2xl font-bold">Cowfree</h3>
                </div>

                {/* Status */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                   <h4 className="flex items-center gap-2 font-bold text-base text-gray-700 mb-1.5">
                     <Map size={16}/> הסטטוס הנוכחי
                   </h4>
                   <p className="text-base font-medium leading-relaxed">
                     נתפסת כחוויית מזון טעימה, נגישה וטרנדית. מובילה בויזואליה בטיקטוק ובקרב קהל נשי שמחפש לייף-סטייל.
                   </p>
                </div>

                {/* Challenge */}
                <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                   <h4 className="flex items-center gap-2 font-bold text-base text-teal-800 mb-1.5">
                     <ShoppingCart size={16}/> האתגר המרכזי
                   </h4>
                   <p className="text-base font-medium leading-relaxed text-teal-900">
                     לוגיסטיקה ובלבול. זמינות נמוכה במדפים וחוסר בהירות קריטי לגבי אלרגנים (לקטוז vs חלבון חלב).
                   </p>
                </div>

                {/* Action Plan */}
                <div className="bg-[#3CC4C7] p-4 rounded-xl text-white mt-auto">
                   <h4 className="flex items-center gap-2 font-bold text-base text-teal-100 mb-1.5">
                     הפעולה הנדרשת <ArrowLeft size={16}/>
                   </h4>
                   <ul className="space-y-1.5 text-sm leading-relaxed">
                     <li>• <strong>הפצה ונגישות:</strong> פתרון הבעיה הלוגיסטית להגעה למדפים.</li>
                     <li>• <strong>הרחבת טעמים:</strong> מענה לביקוש הקיים (קפה, וניל, שוקולד).</li>
                     <li>• <strong>הסברה רפואית:</strong> חידוד המסר לאלרגיים לחלב למניעת אכזבה/סכנה.</li>
                   </ul>
                </div>

              </div>

            </div>
          </div>
        );

      // 🟦 שקף 21 (Was 19): ערך Harmony
      case 21:
        return (
          <div className="h-full p-12 flex flex-col items-center justify-center bg-gray-50" dir="rtl">
             <h2 className="text-4xl font-bold text-harmonyBlue mb-12">הערך המוסף של Harmony AI</h2>
             <div className="grid grid-cols-2 gap-8 max-w-4xl">
               {[
                 'מודיעין צרכני בזמן אמת',
                 'איתור תמות עומק נסתרות',
                 'המלצות שיווק ומוצר אופרטיביות',
                 'דשבורד חי ומתעדכן'
               ].map((item, i) => (
                 <div key={i} className="bg-white p-8 rounded-lg shadow border-b-4 border-harmonyDark flex items-center gap-4 text-xl font-bold text-gray-700">
                   <div className="w-3 h-3 bg-harmonyTurquoise rounded-full"></div>
                   {item}
                 </div>
               ))}
             </div>
          </div>
        );

      // 🟦 שקף 22 (Was 20): הצעת פיילוט / Ask Harmony
      case 22:
        return (
          <div className="h-full w-full flex bg-[#F8FAFC] overflow-hidden relative" dir="rtl">
            
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/20 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-200/20 rounded-full blur-3xl z-0"></div>

            {/* Left Side: High-End UI Simulation (Glassmorphism Card) */}
            <div className="w-1/2 h-full flex items-center justify-center relative p-12 z-10">
               <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden transform transition-all hover:scale-[1.01] duration-700">
                  
                  {/* UI Header */}
                  <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                     <div className="flex items-center gap-2 text-gray-800 font-bold text-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                           <Zap size={18} fill="currentColor" />
                        </div>
                        Harmony
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"><Layers size={16} /></div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"><User size={16} /></div>
                     </div>
                  </div>

                  {/* UI Body */}
                  <div className="p-8 flex flex-col items-center text-center h-[400px] justify-center relative">
                      {/* Greeting */}
                      <div className="mb-8">
                         <h3 className="text-2xl font-semibold text-gray-800 mb-1">Good morning, Alex</h3>
                         <p className="text-gray-400 text-sm">Ready to uncover some insights?</p>
                      </div>

                      {/* Search Bar */}
                      <div className="w-full relative group">
                         <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                         <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center gap-3">
                            <Search className="text-blue-500" size={20} />
                            <div className="flex-grow text-left text-gray-400 text-lg font-light">
                               Why are consumers abandoning...
                            </div>
                            <div className="flex gap-2">
                               <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                               <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-75"></div>
                               <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-150"></div>
                            </div>
                         </div>
                      </div>

                      {/* Suggested Chips */}
                      <div className="flex flex-wrap gap-2 justify-center mt-6">
                         <span className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full text-xs text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors">Sustainable Trends</span>
                         <span className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full text-xs text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors">Competitor Analysis</span>
                         <span className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full text-xs text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors">Price Sensitivity</span>
                      </div>
                  </div>
               </div>
            </div>

            {/* Right Side: Elegant Marketing Message */}
            <div className="w-1/2 h-full flex flex-col justify-center px-16 text-right z-10">
               <h2 className="text-[40pt] font-semibold text-[#0F1C2E] leading-none mb-6 tracking-tight">
                 רוצים לגלות את מה<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-[#0F1C2E]">שהצרכנים שלכם</span><br/>
                 באמת חושבים?
               </h2>
               <p className="text-xl font-light text-gray-500 leading-relaxed mb-12 max-w-md ml-auto border-r-2 border-gray-200 pr-6">
                 עם Harmony תוכלו לשאול כל שאלה ולקבל<br/>תשובה מבוססת־דאטה תוך שניות.
               </p>
               
               <div className="flex justify-end">
                 <button className="group bg-[#0F1C2E] hover:bg-gray-900 text-white text-lg font-medium px-10 py-4 rounded-xl shadow-2xl shadow-gray-900/20 flex items-center gap-4 transition-all transform hover:-translate-y-1">
                   Start Pilot 
                   <span className="bg-white/10 p-1 rounded-full group-hover:translate-x-1 transition-transform"><ArrowRight size={18} /></span>
                 </button>
               </div>
            </div>
          </div>
        );

      default:
        return <div>Slide not found</div>;
    }
  };

  return (
    <div className="h-full w-full animate-fadeIn transition-opacity duration-500 ease-in-out">
      {renderSlide()}
    </div>
  );
}
