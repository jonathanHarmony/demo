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
          <div className="h-full flex flex-col justify-between p-12 relative">
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
          <div className="h-full p-16 flex flex-col bg-white">
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
          <div className="h-full px-16 py-12 flex flex-col bg-gray-50/30">
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
          <div className="h-full p-12 flex flex-col">
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
          <div className="h-full p-12 flex">
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
          <div className="h-full p-12 flex flex-col">
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
          <div className="h-full p-12 relative">
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
          <div className="h-full p-12 flex flex-col">
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
          <div className="h-full p-12 flex flex-col">
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
          <div className="h-full p-12 flex flex-col">
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
          <div className="h-full p-12 flex flex-col items-center">
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

      // Continue with slides 13-22...
      
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
