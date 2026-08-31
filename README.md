<div align="center">

# 👟 Air Jordan 1 — Colorway Studio

**لندینگ پیج تعاملی سه‌بعدی با سبک پوستر محصول برای Air Jordan 1 High OG**

An interactive, 3D-style product-poster landing page for the Air Jordan 1 High OG — built with React 19 + Vite.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://jordan-1-colorway-studio.netlify.app)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)

![پیش‌نمایش سایت](docs/preview.jpg)

</div>

---

## ✨ امکانات

- 🎨 **۶ رنگ‌وی** با تعویض زنده‌ی تم و پس‌زمینه: BRED، PINE GREEN، HYPER PINK، ROYAL BLUE، BLACKOUT و POLLEN
  - سه رنگ‌وی آخر (Blue / Black / Yellow) با **recolor برنامه‌ای** از عکس کفش قرمز ساخته شده‌اند (بخش ۵ از [Rule.md](./Rule.md))
- 🌊 **پارالاکس نرم** با حرکت ماوس/لمس — هوک سفارشی `useSmoothPointer` با lerp
- 🎬 **ریویل اسکرول** تدریجی برای هر سکشن (`useReveal` + `IntersectionObserver`)
- 🛒 **سبد خرید** به‌صورت Drawer با مدیریت تعداد و جمع کل
- ⌨️ تعویض رنگ‌وی با **کلیدهای جهت‌دار** ← →
- 🖼 پس‌زمینه‌ی هر پوستر با `radial-gradient` + `color-mix` از پالت همان رنگ‌وی ساخته می‌شود
- ♿ احترام به `prefers-reduced-motion` برای کاربران حساس به انیمیشن
- 📱 کاملاً **ریسپانسیو**

## 🛒 سبد خرید

![سبد خرید](docs/cart.jpg)

## 🚀 اجرای محلی

```bash
npm install        # نصب وابستگی‌ها
npm run dev        # حالت توسعه  →  http://localhost:5173
```

## 📦 بیلد و اجرای production

```bash
npm run build      # خروجی در dist/
npm start          # سرور Node بدون وابستگی (server.mjs) روی پورت 3000
```

پورت production با متغیر محیطی `PORT` قابل تغییر است.

## 🧰 اسکریپت‌های پردازش تصویر

| اسکریپت | کار |
|---|---|
| `npm run keyout` | حذف پس‌زمینه‌ی مشکی عکس‌های اصلی و ساخت PNG شفاف در `public/assets` |
| `npm run recolor` | ساخت رنگ‌وی‌های Blue / Black / Yellow به‌صورت برنامه‌ای |
| `node scripts/make-preview.mjs` | ساخت پیش‌نمایش‌های سبک `docs/` از اسکرین‌شات‌ها |

عکس‌های اصلی کفش پس‌زمینه‌ی مشکی داشتند؛ `keyout` آن را به شفاف تبدیل می‌کند (یک بار اجرا شده و خروجی‌ها کامیت شده‌اند).

## 📁 ساختار پروژه

```
assets/              ← عکس‌های اصلی (JPEG با پسوند png، پس‌زمینهٔ مشکی)
scripts/
  keyout.mjs         ← حذف پس‌زمینهٔ مشکی → PNG شفاف
  recolor.mjs        ← ساخت رنگ‌وی‌های جدید از کفش قرمز
  make-preview.mjs   ← ساخت پیش‌نمایش JPEG برای README
public/assets/       ← خروجی پردازش‌شده (Shoe-*.png ، Logo.png)
src/
  data/colorways.js  ← پالت رنگ، کد مدل، قیمت و عکس هر رنگ‌وی
  hooks/             ← پارالاکس نرم (useSmoothPointer) و ریویل اسکرول (useReveal)
  components/        ← Navbar, Hero, Ticker, Details, Collection, CartDrawer, Newsletter, Footer
server.mjs           ← سرور استاتیک production با Node خالص (بدون وابستگی)
docs/                ← پیش‌نمایش‌های README
```

## 🌐 دمو و نسخه‌ی دوم

- **دموی لایو:** [jordan-1-colorway-studio.netlify.app](https://jordan-1-colorway-studio.netlify.app)
- نسخه‌ی مینیمال دوم (بدون بیلد، پورت 5174): پوشه‌ی [`new air jordan site`](./new%20air%20jordan%20site/) — [README](./new%20air%20jordan%20site/README.md)

**مستندات کامل بازسازی، باگ‌ها و نکات امنیتی: [Rule.md](./Rule.md)**

## 📝 نکته‌ها

- تعویض رنگ‌وی: کلیک روی تصاویر کوچک، کلیک روی کارت‌های کالکشن، یا کلیدهای ← →
- انیمیشن‌ها به `prefers-reduced-motion` احترام می‌گذارند.
- اسکرین‌شات‌های خام (حجم بالا) در `screenshots/` نگه‌داری می‌شوند و عمداً داخل ریپو کامیت نمی‌شوند.

---

> ⚠️ این پروژه یک **کانسپت غیررسمی و طرفداری** است و هیچ وابستگی‌ای به Nike یا Jordan Brand ندارد.

<div align="center">
ساخته‌شده با ❤️ و ☕ توسط <a href="https://github.com/ItzTozen">ItzTozen</a>
</div>
