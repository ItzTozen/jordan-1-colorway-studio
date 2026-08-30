# Air Jordan 1 — Colorway Studio

لندینگ پیج تعاملی سه‌بعدی با سبک **پوستر محصول** برای Air Jordan 1 High OG — ساخته‌شده با React + Vite.

**۶ رنگ‌وی:** BRED (قرمز)، PINE GREEN، HYPER PINK، ROYAL BLUE، BLACKOUT، POLLEN (زرد) — سه‌تای آخر با recolor برنامه‌ای از کفش قرمز ساخته شده‌اند (بخش ۵ از [Rule.md](./Rule.md)). سبد خرید drawer هم دارد.

## اجرا

```bash
npm install        # نصب وابستگی‌ها
npm run dev        # حالت توسعه  →  http://localhost:5173
```

## بیلد و اجرای production

```bash
npm run build      # خروجی در dist/
npm start          # سرور Node بدون وابستگی (server.mjs) روی پورت 3000
```

پورت production با متغیر محیطی `PORT` قابل تغییر است.

**مستندات کامل بازسازی، باگ‌ها و نکات امنیتی: [Rule.md](./Rule.md)**
نسخهٔ مینیمال دوم: `new air jordan site` (پورت 5174) — [README](./new%20air%20jordan%20site/README.md)

## ساختار

```
assets/            ← عکس‌های اصلی (JPEG با پسوند png، پس‌زمینهٔ مشکی)
scripts/keyout.mjs ← حذف پس‌زمینهٔ مشکی و ساخت PNG شفاف در public/assets
public/assets/     ← خروجی پردازش‌شده (Shoe-*.png ، Logo.png)
src/
  data/colorways.js← پالت رنگ، کد مدل، قیمت و عکس هر رنگ‌وی
  hooks/           ← پارالاکس نرم (useSmoothPointer) و ریویل اسکرول (useReveal)
  components/      ← Navbar, Hero, Ticker, Details, Collection, Newsletter, Footer
server.mjs         ← سرور استاتیک production با Node خالص
```

## نکته‌ها

- تعویض رنگ‌وی: کلیک روی تصاویر کوچک، کلیک روی کارت‌های کالکشن، یا کلیدهای ← →
- پس‌زمینهٔ هر پوستر با `radial-gradient` + `color-mix` از پالت همان رنگ‌وی ساخته می‌شود (سبک عکس رفرنس).
- عکس‌های کفش اصلشان پس‌زمینهٔ مشکی داشتند؛ `npm run keyout` آن را به شفاف تبدیل می‌کند (یک بار اجرا شده).
- انیمیشن‌ها به `prefers-reduced-motion` احترام می‌گذارند.

> کانسپت غیررسمی طرفداری است و وابسته به Nike یا Jordan Brand نیست.
