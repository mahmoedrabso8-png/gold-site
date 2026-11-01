-- شغّل الملف ده مرة واحدة في Supabase → SQL Editor

-- 1) منع أي حد من تعديل أو مسح الأسعار من المتصفح
revoke update, delete, truncate on table public.gold_prices from anon, authenticated;

-- 2) رفض أي سعر غير منطقي (حماية من البيانات المزيفة)
alter table public.gold_prices
  add constraint gold_prices_sane check (price_24k between 100 and 3000) not valid;

-- 3) فهرس لتسريع الرسم البياني والأرشيف
create index if not exists gold_prices_fetched_at_idx on public.gold_prices (fetched_at desc);

-- 4) ملخص يومي جاهز للأرشيف (افتتاح / إغلاق / أعلى / أدنى) بتوقيت دبي
create or replace view public.gold_daily
with (security_invoker = true) as
select
  (fetched_at at time zone 'Asia/Dubai')::date as day,
  (array_agg(price_24k order by fetched_at asc))[1]  as open_24k,
  (array_agg(price_24k order by fetched_at desc))[1] as close_24k,
  max(price_24k) as high_24k,
  min(price_24k) as low_24k,
  count(*)       as n
from public.gold_prices
where price_24k between 100 and 3000
group by 1;

grant select on public.gold_daily to anon;
