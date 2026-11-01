# موقع أسعار الذهب — maelumatii.com

## الطريقة السريعة (رفع يدوي زي كل مرة)
ارفع محتويات ملف `maelumatii-site.zip` على Cloudflare Pages. الموقع هيشتغل فوراً والأسعار هتتحمّل من المتصفح.
العيب: الأسعار مش مكتوبة جوه الـ HTML والأرشيف اليومي مش هيتبني. عشان كده الأفضل تعمل الطريقة التلقائية تحت مرة واحدة.

## الطريقة التلقائية (مرة واحدة وبعدها الموقع يحدّث نفسه كل 3 ساعات)
1. اعمل حساب على GitHub واعمل Repository جديد (Private عادي) وارفع فيه كل ملفات `maelumatii-project.zip`.
2. من Cloudflare: My Profile → API Tokens → Create Token → اختار قالب **Edit Cloudflare Workers** (فيه صلاحية Pages). انسخ التوكن.
3. من Cloudflare الصفحة الرئيسية للحساب: انسخ **Account ID**.
4. في GitHub: Settings → Secrets and variables → Actions:
   - Secret باسم `CLOUDFLARE_API_TOKEN` = التوكن
   - Secret باسم `CLOUDFLARE_ACCOUNT_ID` = الـ Account ID
   - Variable باسم `CF_PAGES_PROJECT` = اسم مشروعك في Cloudflare Pages (لو مش `mahmoedrabso`)
5. Actions → Build & deploy → Run workflow. من هنا ورايح هيشتغل لوحده كل 3 ساعات.

## قاعدة البيانات (مرة واحدة)
افتح Supabase → SQL Editor والصق محتوى `supabase.sql` واضغط Run. ده بيمنع مسح أو تعديل الأسعار، ويرفض الأسعار المزيفة، ويعمل الملخص اليومي للأرشيف.

## بعد الرفع
- Google Search Console: أضف `https://www.maelumatii.com/sitemap.xml`.
- فعّل Cloudflare Email Routing وخلّي `contact@maelumatii.com` يتحوّل لإيميلك (موجود في صفحة اتصل بنا).
- لو تعرف روابط صفحات الوظائف القديمة، اعمل ملف `static/_redirects` فيه سطر لكل رابط:
  `/old-page/  /  301`

## الملفات
- `build.mjs` — المولّد (يجيب السعر ويبني الصفحات و sitemap)
- `content.mjs` — نصوص كل الصفحات (عربي + إنجليزي)
- `assets/` — التصميم والسكريبت المشترك
- `static/` — الأيقونات، manifest، sw.js، ads.txt، _headers
