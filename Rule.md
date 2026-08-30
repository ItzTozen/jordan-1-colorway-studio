# Rule.md — Air Jordan 1 «Colorway Studio» (پروژهٔ اصلی)

> این فایل «پرامپت کامل بازسازی» است. به هر AI ای که این فایل داده شود، باید بتواند دقیقاً همین سایت را از صفر بسازد — بدون تکرار خطاهایی که قبلاً خورده‌ایم.

---

## ۱) هدف و سبک

لندینگ پیج تک‌صفحه‌ای تعاملی برای **Air Jordan 1 High OG** با سبک «پوستر محصول» (Product Poster):

- پس‌زمینهٔ تمام‌صفحه از نوع **گرادیان رادیال + وینیت تیره** (نور ملایم مرکز، لبه‌های تاریک — مثل عکس رفرنس: قرمز تیره با هالهٔ مرکزی).
- پس‌زمینه با تعویض رنگ‌وی **کراس‌فید** می‌شود (هر رنگ‌وی یک لایهٔ fixed جدا با opacity).
- تایپوگرافی درشت ایتالیک **Oswald** برای تیترها + **Inter** برای بدنه.
- دانه‌های فیلم (grain) با SVG feTurbulence روی کل صفحه (opacity ~6%، mix-blend overlay).
- سه‌بعدی: tilt کفش با موس (lerp در rAF، بدون re-render — از طریق CSS variables `--px` / `--py` / `--sy` روی `:root`).
- مینیمال، بدون فریم‌ورک CSS، همه‌چیز CSS خالص در `src/index.css`.

**۶ رنگ‌وی:** BRED (قرمز)، PINE GREEN، HYPER PINK، ROYAL BLUE، BLACKOUT، POLLEN (زرد). همه روی یک عکس پایه — رنگ‌های جدید با recolor برنامه‌ای ساخته شده‌اند (بخش ۵).

## ۲) استک و اجرا

- **React 19 + Vite 8** (بدون TypeScript، بدون کتابخانهٔ انیمیشن — همه با CSS/rAF).
- `npm install` → `npm run dev` (پورت 5173، `host: true` برای دسترسی LAN).
- Production: `npm run build` و بعد `npm start` = `server.mjs` (سرور Node خالص بدون وابستگی، SPA fallback دارد، پورت پیش‌فرض 3000 با env `PORT`).
- اسکریپت‌های پردازش تصویر: `npm run keyout` و `npm run recolor`.

## ۳) ساختار

```
assets/                 ← عکس‌های خام کاربر (دقت: JPEG با پسوند .png و پس‌زمینهٔ مشکی!)
scripts/keyout.mjs      ← حذف پس‌زمینهٔ مشکی → public/assets/*.png (شفاف)
scripts/recolor.mjs     ← ساخت رنگ‌وی‌های جدید از Shoe-Red.png
public/assets/          ← Shoe-Red/Green/Pink/Blue/Black/Yellow.png + Logo.png
src/data/colorways.js   ← دیتای رنگ‌وی‌ها (id, name, full, code, price, bg, glow, accent, img)
src/hooks/useSmoothPointer.js ← پارالاکس موس (rAF + lerp → CSS vars)
src/hooks/useReveal.js  ← ریویل اسکرول (rect-based، بخش ۶)
src/components/         ← Navbar, Hero, Ticker, Details, Collection, Newsletter, Footer, CartDrawer
server.mjs              ← سرور production
```

## ۴) سیستم رنگ و داده

هر رنگ‌وی سه رنگ دارد: `bg` (پس‌زمینهٔ پوستر)، `glow` (هالهٔ مرکزی/هایلایت)، `accent` (نقطهٔ eyebrow، ستاره‌های تیکر، بج سبد). روی `:root` ست می‌شوند (`--bg`, `--accent`) و لایه‌های bg مقدار `--c-bg` / `--c-glow` خودشان را inline دارند.

پس‌زمینهٔ پوستر (هم لایهٔ فول‌اسکرین هم کارت‌ها) با این دستور ساخته می‌شود:

```css
radial-gradient(95% 75% at 50% 40%,
  color-mix(in srgb, var(--c-glow) 26%, var(--c-bg)) 0%,
  var(--c-bg) 48%,
  color-mix(in srgb, var(--c-bg) 58%, black 42%) 100%);
```

## ۵) پایپ‌لاین عکس‌ها (مهم‌ترین بخش فنی)

1. **عکس‌های خام JPEG هستن با پسوند `.png`** و پس‌زمینهٔ مشکی توپر دارند. `pngjs` مستقیم نمی‌خواندشان؛ اول با `jpeg-js` دیکود شو (`buf[0]===0xFF && buf[1]===0xD8` → JPEG).
2. **keyout (حذف مشکی):** flood-fill از همهٔ پیکسل‌های لبه با آستانهٔ `lum = max(r,g,b) < 26`؛ بعد feather لبه‌ها (پیکسل‌های چسبیده به پس‌زمینه با `lum<64` آلفای گرادیانی می‌گیرند). سیاهِ خودِ کفش چون به لبه وصل نیست حفظ می‌شود.
   - **دام خیلی مهم:** `new PNG({width,height,data})` در pngjs آرایهٔ داده را نادیده می‌گیرد و بافر صفر می‌سازد (همه‌چیز سیاه دیده می‌شود و کل عکس شفاف می‌شود!). روی خودِ `img.data` کار کن و آخرش `png.data = buffer` را دستی ست کن.
3. **recolor (ساخت رنگ‌وی جدید):** از `Shoe-Red.png` شفاف‌شده شروع کن. هر پیکسل را به HSV ببر؛ اگر سرخ‌فام بود (`h<=20 یا h>=328` و `s>0.18` و `v>0.09`) hue به رنگ هدف می‌رود:
   - آبی رویال: `hue:222, sat:0.95, val:1.0`
   - مشکی: `hue:240, sat:0.05, val:0.2`
   - زرد pollen: `hue:47, sat:1.0, val:1.0`
   - چرم مشکی، بند، زیرهٔ سفید و لوگو دست نمی‌خورند.
4. برای رنگ‌وی جدید: اول با recolor عکس بساز، بعد یک آیتم به `colorways.js` اضافه کن و **متن‌های شمارشی را آپدیت کن** (تیکر: «SIX COLORWAYS»، eyebrow کالکشن: «06 Colorways»).

## ۶) باگ‌هایی که خوردیم و راه‌حل نهایی (دوباره نکن!)

1. **ریویل اسکرول نامطمئن (سکشن‌ها گاهی بالا نمی‌آمدند):** IntersectionObserver در وب‌ویو/اسکرول سریع unreliable بود. راه‌حل نهایی: `useReveal` با چک مستقیم `getBoundingClientRect` روی اسکرول/ریسایز (rAF-throttle) + `setInterval` ۹۰۰ms به‌عنوان ضامن اطمینان. عنصر با اتریبیوت `data-in` علامت می‌خورد.
2. **اتریبیوت، نه کلاس!** React موقع رندر مجدد، کل `className` را بازنویسی می‌کند و کلاسی که دستی (توسط observer) اضافه شده را پاک می‌کند — با تعویض رنگ‌وی، کارت‌های کالکشن محو می‌شدند. پس علامت ریویل **حتماً `data-in` attribute** باشد نه class.
3. **pngjs constructor** — بخش ۵.
4. **JPEG با پسوند png** — بخش ۵.
5. **اسکرول‌بار اتوماتیک موقع ریلود ≠ باگ:** Chromium بعد از F5 اسکرول را restore می‌کند. برای تست لود تازه از کوئری استرینگ (`/?fresh=1`) استفاده کن.
6. حین توسعه با HMR، state گاهی ریست می‌شود — «کلیک‌ها کار نکردن» در تست، ممکن است مال reload وسط تست باشد، نه باگ کد.

## ۷) سبد خرید

State در `App.jsx`: `cartItems = [{key:'cwId-size', cwId, size, qty}]`. `addToCart(colorway, size)` از هیرو (با سایز انتخابی) → drawer باز می‌شود. `CartDrawer`: backdrop (Esc/کلیک می‌بندد، اسکرول body قفل)، ردیف‌ها با thumb، استپر تعداد (−/+)، Remove، Subtotal، Checkout (حالت «Order placed ✓» کانسپتی). بج تعداد در Navbar با انیمیشن pop.

## ۸) دسترسی LAN روی وایفای «Free+» و امنیت

- هر دو پروژه با `server.host: true` بالا می‌آیند → روی وایفای خانه از **http://192.168.1.5:5173** (این پروژه) قابل بازشدن‌اند.
- امنیت واقعی = پسورد وایفای (WPA2). لایهٔ دوم اختیاری — محدودکردن پورت‌ها به ساب‌نت خانه در فایروال ویندوز (**یک بار با ترمینال Run as Administrator**):

```bat
netsh advfirewall firewall add rule name="ZCode Dev LAN Only (5173-5174)" dir=in action=allow protocol=TCP localport=5173,5174 remoteip=192.168.1.0/24
```

- نکات: سرور dev فقط وقتی روشن است در دسترس است؛ Vite به‌صورت پیش‌فرض سرو کردن خارج از ریشهٔ پروژه را نمی‌دهد (`server.fs.allow`)؛ پورت‌ها را در публич وای‌فای باز نکن؛ `server.mjs` فقط فایل‌های `dist` را سرو می‌کند و path traversal را normalize می‌کند.

## ۹) چک‌لیست پذیرش (چیزهایی که تست شده)

تعویض رنگ‌وی از ۳ راه (سواچ/کارت/کیبورد ←→)، کراس‌فید پس‌زمینه، سینک شمارنده 01/06، سبد (افزودن با سایز، ردیف جدا برای سایز متفاوت، تعداد، حذف، جمع، پرداخت کانسپتی)، ریویل همهٔ سکشن‌ها در دسکتاپ و موبایل، ریسپانسیو 390px تا 1440px، بیلد production و سرور Node.

> پروژهٔ خواهر: `X:\Jordan 1 site\new air jordan site` (پورت 5174) — همان موتور، ولی فونت Anton، سوییچر سواچی مینیمال و سکشن «COLORWAY INDEX» استریپ افقی.
