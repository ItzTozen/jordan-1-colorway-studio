# Rule.md — Air Jordan 1 «Colorway Studio II» (نسخهٔ مینیمال Nike-Style)

> برادر دوقلوی پروژهٔ اصلی (`X:\Jordan 1 site`) با همان موتور و داده، ولی زبان بصری مینیمال‌تر. این فایل پرامپت کامل بازسازی است؛ بخش‌های مشترک (پایپ‌لاین عکس، باگ‌ها، امنیت LAN) کامل اینجا تکرار شده تا هر AI مستقل بتواند بسازد.

---

## ۱) تفاوت‌های طراحی با پروژهٔ اصلی

| بخش | اصلی (5173) | این نسخه (5174) |
|---|---|---|
| فونت تیتر | Oswald Italic | **Anton** (یالاتِ راست، حس Futura Condensed خود نایک) |
| سوییچر رنگ‌وی در هیرو | کارت‌های عکس‌دار | همان کارت‌های عکس‌دار شناور (طبق درخواست کاربر یکسان شد) |
| سکشن کالکشن | گرید ۳ کارت شیشه‌ای | **«COLORWAY INDEX»** — استریپ افقی scroll-snap با پوسترهای تخت، شماره‌های outline بزرگ، تگ «WEARING / WEAR IT»، فلش‌های ← → |
| زبان کلی | شیشه‌ای/گرادیانی | تخت، خط ۱px، فاصله‌های بیشتر |

بقیه یکسان است: پس‌زمینهٔ گرادیان رادیال رنگ‌وی‌محور با کراس‌فید، grain، پارالاکس موس، تیکر، Anatomy، Drop List، سبد drawer، ۶ رنگ‌وی.

## ۲) استک و اجرا

- React 19 + Vite 8، بدون TypeScript. `npm install` → `npm run dev` (**پورت 5174** در `vite.config.js` با `host: true`).
- Production: `npm run build` سپس `npm start` (`server.mjs`، پورت پیش‌فرض **3001**، env `PORT`).
- اسکریپت‌های عکس: `npm run keyout` و `npm run recolor` (کپی‌شده از پروژهٔ اصلی).

## ۳) ساختار

```
src/
  data/colorways.js      ← ۶ رنگ‌وی (BRED, PINE GREEN, HYPER PINK, ROYAL BLUE, BLACKOUT, POLLEN)
  hooks/useSmoothPointer.js  ← پارالاکس موس (rAF+lerp → CSS vars --px/--py/--sy)
  hooks/useReveal.js     ← ریویل rect-based با interval ضامن
  components/            ← Navbar, Hero (سواچ‌ها), Ticker, Details, Collection (استریپ),
                            Newsletter, Footer, CartDrawer
public/assets/           ← عکس‌های شفاف/رنگ‌سازی‌شده
server.mjs               ← سرور production پورت 3001
```

## ۴) سیستم طراحی

- توکن‌ها روی `:root`: `--bg`, `--accent` (با تعویض رنگ‌وی از JS ست می‌شوند)، `--muted`, `--faint`, `--line` (۱px سفید ۱۶٪), `--disp: 'Anton'`, `--ease: cubic-bezier(.22,1,.36,1)`.
- فونت‌ها از Google Fonts: `family=Anton&family=Inter:wght@400;500;600;800`. **Anton فقط وزن ۴۰۰ دارد و ایتالیک ندارد** — هیچ‌جا `font-style: italic` روی `--disp` نگذار (سینتتیک زشت می‌شود). تأکید با `-webkit-text-stroke` outline (مثل `COLORWAY <em>INDEX</em>`) انجام می‌شود.
- پوسترها/پس‌زمینه با `color-mix(in srgb, var(--c-glow) 34%, var(--c-bg))` در radial-gradient.
- ریویل: کلاس `.r` + اتریبیوت `data-in` (هرگز کلاس اضافه نکن — بخش ۶).

## ۵) رفتارهای کلیدی (که باید دقیقاً همین باشد)

1. **سوییچر هیرو (کارت‌های شناور):** `.thumbs` با ۶ کارت عکس‌دار (عرض 108px، شیشه‌ای backdrop-blur، active با border سفید). هر کارت `animation: floaty 6.5s ease-in-out infinite` با delay پلکانی `nth-child(n)*0.7s` — keyframes روی پراپرتی `translate` (نه transform) تا با hover-transform تداخل نکند. در موبایل overflow-x auto + اسکرول‌بار مخفی.
2. **استریپ کالکشن:**
   - `grid-auto-flow: column; grid-auto-columns: min(420px,78vw); overflow-x:auto; scroll-snap-type:x mandatory; scroll-padding-inline: max(6vw, calc((100vw - 1240px)/2))`، اسکرول‌بار مخفی.
   - **سینک با state:** در `useEffect([idx])` با `strip.scrollTo({left: el.offsetLeft - (str.clientWidth - el.clientWidth)/2, behavior:'smooth'})`.
   - **هرگز از `scrollIntoView` برای سینک استفاده نکن** — دوبار: (الف) در لود اولیه صفحه را به سکشن می‌پراند، (ب) در StrictMode effect دوبار اجرا می‌شود و گارد «بار اول» را دور می‌زند. `scrollTo` داخل خود کانتینر فقط استریپ را حرکت می‌دهد و صفحه دست نمی‌خورد.
   - فلش‌ها: `onBrowse(idx±1)` (فقط تعویض رنگ، بدون jump به هیرو). تگ «WEAR IT» → `onSelect(i)` = تعویض + smooth scroll به `#home`.
3. **سبد:** مثل اصلی — `cartItems` در App، drawer با Esc/backdrop/قفل اسکرول، استپر تعداد، ردیف جدا برای هر (رنگ‌وی، سایز)، جمع، Checkout کانسپتی.
4. **پارالاکس:** همان سیستم CSS-var (`--px/--py/--sy`) با rAF+lerp؛ tilt استیج: `rotateY(calc(var(--px)*16deg)) rotateX(calc(var(--py)*-11deg))`.
5. متن تیکر و eyebrow کالکشن باید با تعداد واقعی رنگ‌وی‌ها سینک باشد («SIX COLORWAYS»، «06 Colorways»).

## ۶) باگ‌ها و دام‌ها (همهٔ اینها واقعاً خوردیم — تکرار نشود)

1. **عکس‌های خام JPEG هستن با پسوند `.png`** (باکت اول فایل `FF D8`). دیکود با `jpeg-js`.
2. **pngjs constructor**: `new PNG({width,height,data})` داده را نادیده می‌گیرد → بافر صفر → کل عکس شفاف می‌شود. روی `img.data` کار کن و `png.data = buffer` را دستی ست کن.
3. **keyout مشکی:** flood-fill از لبه‌ها با آستانهٔ `max(r,g,b)<26` + feather لبه (`lum<64`). سیاهِ داخل کفش حفظ می‌شود چون به لبه وصل نیست.
4. **recolor:** فقط پیکسل‌های سرخ (`(h<=20 || h>=328) && s>0.18 && v>0.09`) در HSV بازرنگ می‌شوند؛ پارامترها: آبی `222/0.95/1.0`، مشکی `240/0.05/0.2`، زرد `47/1.0/1.0`.
5. **React className را بازنویسی می‌کند** → علامت ریویل حتماً `data-in` attribute باشد نه کلاس دستی.
6. **IntersectionObserver** در وب‌ویو/اسکرول سریع گاهی fire نمی‌شود → ریویل rect-based با interval ۹۰۰ms (کد در `useReveal.js`).
7. **scrollIntoView برای سینک استریپ ممنون** (بند ۵-۲ بالا).
8. **ریلود مرورگر اسکرول را restore می‌کند** — باگ نیست؛ برای تست لود تازه `/?fresh=1` بزن.
9. وسط توسعه HMR ممکن است state ریست کند — «کلیک کار نکرد» حتماً باگ نیست؛ اول reload کامل و تست دوباره.

## ۷) دسترسی LAN روی وایفای «Free+» و امنیت

- آدرس شبکه: **http://192.168.1.5:5174** (و پروژهٔ اصلی: 5173). تست شده — هر دو 200 می‌دهند.
- امنیت لایهٔ اول: پسورد وایفای. لایهٔ دوم اختیاری، **یک بار در ترمینال Run as Administrator**:

```bat
netsh advfirewall firewall add rule name="ZCode Dev LAN Only (5173-5174)" dir=in action=allow protocol=TCP localport=5173,5174 remoteip=192.168.1.0/24
```

- سرورها فقط وقتی روشن‌اند در دسترس‌اند؛ روی وای‌فای عمومی اجرا نکن؛ Vite `fs.allow` پیش‌فرض دارد؛ `server.mjs` فقط `dist` را سرو می‌کند.

## ۸) چک‌لیست تست‌شده

لود تازه از صفر (بدون jump)، سواچ‌ها (۶ رنگ، کراس‌فید bg)، استریپ (اسنپ، فلش‌ها، سینک از هیرو/کیبورد، Wear it + اسکرول به هیرو)، سبد (ردیف‌های جدا، تعداد، جمع، checkout)، موبایل ۳۹۰px (drawer، استریپ با پوسترهای همسایه در لبه، سایزها در یک ردیف)، بیلد production.
