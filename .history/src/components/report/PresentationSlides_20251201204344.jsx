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

      // Continue with remaining slides...
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
