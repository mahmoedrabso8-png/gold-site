// مقالات الموقع التعليمية (عربي) — محتوى دائم بدون أسعار مباشرة
// كل مقال: slug, title (عنوان SEO), h1, desc, teaser, intro, body (HTML جوه .prose), faq
export const ARTICLES = [
  {
    slug: 'how-gold-price-is-calculated',
    title: 'كيف يُحسب سعر الذهب؟ من الأونصة العالمية إلى سعر الغرام في الخليج',
    h1: 'كيف يُحسب سعر الذهب؟',
    desc: 'شرح مبسط لطريقة حساب سعر غرام الذهب من سعر الأونصة العالمي بالدولار: التحويل للغرام، وسعر الصرف، ونسب العيارات 24 و22 و21 و18، مع مثال حسابي كامل.',
    teaser: 'من الأونصة العالمية إلى سعر الغرام في بلدك، خطوة بخطوة',
    intro: 'من سعر الأونصة العالمي إلى الرقم الذي تراه في محل الذهب — المعادلة كاملة بمثال عملي',
    body: `
<p>عندما تقرأ أن «سعر الذهب ارتفع اليوم» فالمقصود عادةً <strong>السعر العالمي للأونصة بالدولار</strong> (XAU/USD)، وهو السعر الذي تتداول به الأسواق العالمية في لندن ونيويورك. كل الأسعار المحلية في الخليج — بالدرهم أو الريال أو الدينار — تُشتق من هذا الرقم بثلاث خطوات بسيطة.</p>
<h3>الخطوة 1: من الأونصة إلى الغرام</h3>
<p>الأونصة المستخدمة في الذهب هي <strong>الأونصة الترويسية</strong> وتساوي <strong>31.1035 غرام</strong>. فإذا كان سعر الأونصة مثلًا 2,600 دولار، يكون سعر الغرام من الذهب الخالص (عيار 24) بالدولار:</p>
<p><bdi>2,600 ÷ 31.1035 = 83.6 دولارًا للغرام</bdi></p>
<h3>الخطوة 2: التحويل إلى العملة المحلية</h3>
<p>يُضرب سعر الغرام بالدولار في سعر صرف عملتك. معظم عملات الخليج <strong>مربوطة بالدولار بسعر ثابت</strong>: الدرهم الإماراتي عند 3.6725، والريال السعودي عند 3.75، والريال القطري عند 3.64. وبنفس المثال:</p>
<p><bdi>83.6 × 3.6725 = 307 دراهم إماراتية للغرام عيار 24</bdi></p>
<p>أما العملات غير المربوطة بشكل كامل مثل <strong>الدينار الكويتي</strong>، فيُستخدم سعر الصرف اليومي لها، ولذلك قد يتحرك السعر بالكويت قليلًا حتى لو ثبت السعر العالمي.</p>
<h3>الخطوة 3: حساب العيارات المختلفة</h3>
<p>العيار يعبر عن نسبة الذهب الخالص في القطعة، ويُحسب سعره بضرب سعر عيار 24 في نسبة النقاء:</p>
<ul>
<li><a href="/gold-24k/"><strong>عيار 24</strong></a> = 99.9% — السعر الكامل</li>
<li><a href="/gold-22k/"><strong>عيار 22</strong></a> = 91.7% — سعر عيار 24 × 0.917</li>
<li><a href="/gold-21k/"><strong>عيار 21</strong></a> = 87.5% — سعر عيار 24 × 0.875</li>
<li><a href="/gold-18k/"><strong>عيار 18</strong></a> = 75% — سعر عيار 24 × 0.75</li>
</ul>
<h3>لماذا يختلف سعر المحل عن هذا الحساب؟</h3>
<p>الرقم الناتج هو <strong>سعر الذهب الخام</strong>. في المحل تُضاف <strong>المصنعية</strong> (أجرة الصياغة) و<strong>ضريبة القيمة المضافة</strong> حيث تُطبق، وقد تضيف بعض المحلات هامشًا صغيرًا. كذلك تعلن بعض الدول سعرًا رسميًا يوميًا للصاغة يتبع السعر العالمي مع فرق بسيط.</p>
<p>لتجربة الحساب بنفسك بالمصنعية والضريبة استخدم <a href="/gold-calculator/">حاسبة الذهب</a>، ولمتابعة السعر العالمي مباشرة بالدولار راجع صفحة <a href="/gold-price-usd/">سعر الذهب العالمي</a>.</p>`,
    faq: [
      ['كم غرامًا في أونصة الذهب؟', 'أونصة الذهب الترويسية تساوي 31.1035 غرام، وهي الوحدة المستخدمة في تسعير الذهب عالميًا بالدولار.'],
      ['كيف أحسب سعر غرام عيار 21 من السعر العالمي؟', 'اقسم سعر الأونصة بالدولار على 31.1035 لتحصل على سعر الغرام عيار 24 بالدولار، اضربه في سعر صرف عملتك (مثل 3.6725 للدرهم)، ثم اضرب الناتج في 0.875.'],
      ['لماذا يتحرك سعر الذهب في الخليج مع الدولار؟', 'لأن الذهب يُسعّر عالميًا بالدولار، ومعظم عملات الخليج مربوطة بالدولار بسعر ثابت، فأي حركة في السعر العالمي تنتقل مباشرة إلى السعر المحلي.']
    ]
  },
  {
    slug: 'gold-karats-difference',
    title: 'الفرق بين عيارات الذهب 24 و22 و21 و18: أيهما تختار؟',
    h1: 'الفرق بين عيارات الذهب 24 و22 و21 و18',
    desc: 'جدول وشرح للفروق بين عيارات الذهب: نسبة النقاء والأختام (999 و916 و875 و750) والاستخدامات المناسبة لكل عيار، وأيهما أفضل للادخار وأيهما للمجوهرات اليومية.',
    teaser: 'النقاء والأختام والاستخدامات — وأي عيار يناسب غرضك',
    intro: 'النسب والأختام والاستخدامات في جدول واحد، وكيف تختار العيار المناسب لغرضك',
    body: `
<p>«العيار» هو مقياس نسبة الذهب الخالص في القطعة من 24 جزءًا. فكلما ارتفع العيار زادت نسبة الذهب وارتفع سعر الغرام، وفي المقابل أصبح المعدن أطرى وأسهل في الخدش. هذه هي العيارات الأربعة الأكثر تداولًا في الخليج:</p>
<div class="table-wrap"><table class="data-table">
<thead><tr><th>العيار</th><th>نسبة الذهب</th><th>الختم</th><th>الاستخدام الأشهر</th></tr></thead>
<tbody>
<tr><td><a href="/gold-24k/"><strong>عيار 24</strong></a></td><td class="n">99.9%</td><td class="n"><bdi>999</bdi></td><td>السبائك والعملات الذهبية والادخار</td></tr>
<tr><td><a href="/gold-22k/"><strong>عيار 22</strong></a></td><td class="n">91.7%</td><td class="n"><bdi>916</bdi></td><td>المجوهرات الهندية والأساور والأطقم</td></tr>
<tr><td><a href="/gold-21k/"><strong>عيار 21</strong></a></td><td class="n">87.5%</td><td class="n"><bdi>875</bdi></td><td>المجوهرات الخليجية والعربية والشبكة</td></tr>
<tr><td><a href="/gold-18k/"><strong>عيار 18</strong></a></td><td class="n">75%</td><td class="n"><bdi>750</bdi></td><td>مجوهرات الألماس والتصاميم الأوروبية</td></tr>
</tbody></table></div>
<h3>عيار 24: للادخار والاستثمار</h3>
<p>أنقى أنواع الذهب المتداولة، لكنه طري جدًا ويتشوه بسهولة، لذلك نادرًا ما يُستخدم في مجوهرات الاستخدام اليومي. إذا كان هدفك الادخار فهو الخيار الأول، وتُباع منه <a href="/gold-bars/">السبائك</a> بأوزان من غرام واحد حتى كيلوغرام.</p>
<h3>عيار 22: مجوهرات تحتفظ بقيمتها</h3>
<p>يجمع بين لون ذهبي غني قريب من الخالص وصلابة مقبولة، وهو المفضل في المجوهرات الهندية وأطقم العرائس. عند البيع تسترد نسبة عالية من قيمة الذهب لأن نسبة النقاء مرتفعة.</p>
<h3>عيار 21: الأكثر انتشارًا في الخليج</h3>
<p>الخيار الأشهر في المجوهرات الخليجية والعربية لأنه يوازن بين القيمة والصلابة ولونه الأصفر المفضل خليجيًا. أغلب الشبك والخواتم والأطقم في أسواق الخليج من عيار 21.</p>
<h3>عيار 18: للألماس والتصاميم العصرية</h3>
<p>صلابته الأعلى تجعله مثاليًا لتثبيت الأحجار الكريمة، ويتوفر بألوان أصفر وأبيض وروز. لكن انتبه: في قطع الألماس يكون الجزء الأكبر من السعر للأحجار والتصميم لا للذهب، وعند إعادة البيع تُقيَّم القطعة غالبًا بوزن الذهب فقط.</p>
<h3>كيف تختار؟</h3>
<ul>
<li><strong>للادخار والاستثمار:</strong> عيار 24 سبائك، أو عيار 22 كحد أدنى.</li>
<li><strong>لمجوهرات يومية تحتفظ بقيمتها:</strong> عيار 21 أو 22.</li>
<li><strong>لقطعة ألماس أو تصميم عصري:</strong> عيار 18، وتقبّل أن جزءًا من سعرها لن يُسترد عند البيع.</li>
</ul>
<p>مهما كان اختيارك، تأكد من وجود <strong>الختم</strong> على القطعة واطلب فاتورة توضح الوزن والعيار والمصنعية كل بند على حدة. ويمكنك مقارنة أسعار العيارات الأربعة لحظة بلحظة في <a href="/">الصفحة الرئيسية</a>.</p>`,
    faq: [
      ['ما أفضل عيار ذهب للاستثمار؟', 'عيار 24 على شكل سبائك أو عملات ذهبية، لأنه الأنقى والأقل مصنعية، ويُباع ويُشترى بأقرب سعر للسعر العالمي.'],
      ['هل عيار 18 ذهب حقيقي؟', 'نعم، هو ذهب حقيقي بنسبة 75% مخلوط بمعادن أخرى تزيد الصلابة وتغير اللون، وهو المعيار العالمي في مجوهرات الألماس.'],
      ['كيف أتأكد من عيار القطعة؟', 'ابحث عن الختم المحفور على القطعة: 999 لعيار 24، و916 لعيار 22، و875 لعيار 21، و750 لعيار 18، واطلب فاتورة تذكر العيار صراحة.']
    ]
  },
  {
    slug: 'making-charges-guide',
    title: 'ما هي المصنعية في الذهب؟ وكيف تدفع أقل عند الشراء',
    h1: 'المصنعية في الذهب: ما هي وكيف تدفع أقل؟',
    desc: 'ما معنى المصنعية في الذهب وكيف تُحسب (للغرام أو للقطعة)، وكم تكون عادة في الخليج، ونصائح عملية للتفاوض وتقليل ما تدفعه فوق سعر الذهب الخام عند شراء المشغولات.',
    teaser: 'البند الأهم في فاتورتك بعد سعر الذهب — وكيف تقلله',
    intro: 'البند الذي يفرّق بين فاتورة عادلة وأخرى مبالغ فيها — كيف تُحسب وكيف تتفاوض عليها',
    body: `
<p>عندما تشتري مشغولات ذهبية فأنت تدفع شيئين: <strong>سعر الذهب الخام</strong> حسب الوزن والعيار، و<strong>المصنعية</strong> وهي أجرة الصياغة والتصميم. فهم المصنعية هو أهم مهارة توفّر بها مئات الدراهم أو الريالات في كل عملية شراء.</p>
<h3>كيف تُحسب المصنعية؟</h3>
<p>طريقتان شائعتان:</p>
<ul>
<li><strong>بالغرام:</strong> مبلغ ثابت لكل غرام (مثلًا 5 أو 10 أو 15 درهمًا للغرام)، وتزيد كلما زادت تعقيدات التصميم.</li>
<li><strong>للقطعة:</strong> مبلغ مقطوع على القطعة كاملة، ويكثر في القطع الخفيفة كثيرة النقوش ومجوهرات الألماس.</li>
</ul>
<p>وعلى الإجمالي تُضاف <strong>ضريبة القيمة المضافة</strong> حيث تُطبق (5% في الإمارات على المشغولات مثلًا). السبائك الاستثمارية عالية النقاء تكون مصنعيتها ضئيلة وقد تكون معفاة من الضريبة.</p>
<h3>مثال عملي</h3>
<p>سوار عيار 21 وزنه 20 غرامًا، وسعر غرام عيار 21 الخام 270 درهمًا، ومصنعية 12 درهمًا للغرام:</p>
<ul>
<li>سعر الذهب الخام: <bdi>20 × 270 = 5,400 درهم</bdi></li>
<li>المصنعية: <bdi>20 × 12 = 240 درهمًا</bdi></li>
<li>الإجمالي قبل الضريبة: <bdi>5,640 درهمًا</bdi>، وبعد ضريبة 5%: <bdi>نحو 5,922 درهمًا</bdi></li>
</ul>
<p>جرّب أرقامك بنفسك في <a href="/gold-calculator/">حاسبة الذهب بالمصنعية والضريبة</a>.</p>
<h3>ست نصائح لتدفع مصنعية أقل</h3>
<ul>
<li><strong>اسأل عن سعر الغرام أولًا</strong> قبل المصنعية، وتأكد أنه مطابق للسعر المعلن في نفس اليوم — يمكنك التحقق منه هنا في صفحة <a href="/gold-21k/">سعر عيار 21</a> أو العيار الذي تشتريه.</li>
<li><strong>قارن بين 3 محلات على الأقل</strong>؛ المصنعية على التصميم نفسه قد تختلف بالضعف بين محل وآخر.</li>
<li><strong>المصنعية قابلة للتفاوض</strong> بخلاف سعر الذهب الخام — اطلب خصمًا خاصة في القطع الكبيرة.</li>
<li><strong>القطع الخفيفة كثيرة النقوش</strong> تكون مصنعيتها أعلى نسبة إلى وزنها؛ القطع السادة أوفر.</li>
<li><strong>اطلب فاتورة مفصلة</strong>: الوزن، العيار، سعر الغرام، المصنعية، الضريبة — كل بند منفصلًا.</li>
<li><strong>تذكّر عند البيع:</strong> المصنعية لا تُسترد؛ التاجر يشتري الذهب بوزنه بسعر الخام تقريبًا، فكلما قلّت المصنعية التي دفعتها قلّت خسارتك عند البيع.</li>
</ul>
<p>إذا كان هدفك الادخار أكثر من الزينة، فالسبائك توفّر عليك المصنعية كلها تقريبًا — قارن الأسعار في صفحة <a href="/gold-bars/">أسعار سبائك الذهب</a>.</p>`,
    faq: [
      ['كم المصنعية الطبيعية في الذهب؟', 'تبدأ من دراهم أو ريالات قليلة للغرام في القطع البسيطة والسبائك الصغيرة، وتصل إلى 15 درهمًا أو أكثر للغرام في التصاميم المعقدة، وقد تُحسب مبلغًا مقطوعًا للقطعة في مجوهرات الألماس.'],
      ['هل المصنعية قابلة للتفاوض؟', 'نعم في الغالب، بعكس سعر الذهب الخام الثابت. التفاوض أنجح في القطع الكبيرة وعند مقارنة عروض أكثر من محل.'],
      ['هل تسترد المصنعية عند بيع الذهب؟', 'لا. عند البيع يشتري التاجر الذهب بوزنه بسعر الخام تقريبًا، وتخسر المصنعية والضريبة التي دفعتها عند الشراء.']
    ]
  },
  {
    slug: 'gold-bars-vs-jewellery',
    title: 'الاستثمار في الذهب: السبائك أم المشغولات؟',
    h1: 'السبائك أم المشغولات؟ دليل المبتدئ للاستثمار في الذهب',
    desc: 'مقارنة عملية بين شراء سبائك الذهب والمشغولات الذهبية للادخار والاستثمار: فرق السعر والمصنعية والضريبة وسهولة البيع والأوزان المناسبة لكل ميزانية.',
    teaser: 'أيهما يحتفظ بقيمته أكثر عند البيع — ولماذا؟',
    intro: 'لماذا يخسر مشتري المشغولات جزءًا من قيمتها لحظة الشراء، ومتى تكون السبائك الخيار الأذكى',
    body: `
<p>كثيرون يشترون «شبكة» أو أساور بقصد الزينة والادخار معًا، ثم يتفاجؤون عند البيع أن القطعة تساوي أقل مما دفعوا. السبب بسيط: <strong>المشغولات تشتريها بسعر الذهب زائد المصنعية والضريبة، وتبيعها بسعر الذهب الخام فقط</strong>. فهم هذا الفرق هو أساس الاختيار بين السبائك والمشغولات.</p>
<h3>مقارنة سريعة</h3>
<div class="table-wrap"><table class="data-table">
<thead><tr><th></th><th>السبائك (عيار 24)</th><th>المشغولات (عيار 21/22)</th></tr></thead>
<tbody>
<tr><td>المصنعية</td><td class="n">ضئيلة جدًا</td><td class="n">مرتفعة نسبيًا</td></tr>
<tr><td>الضريبة</td><td class="n">معفاة غالبًا (نقاء 99%+)</td><td class="n">تُطبق (مثل 5% في الإمارات)</td></tr>
<tr><td>الفرق عند البيع</td><td class="n">صغير جدًا عن السعر العالمي</td><td class="n">تخسر المصنعية والضريبة</td></tr>
<tr><td>الاستخدام</td><td class="n">ادخار واستثمار فقط</td><td class="n">زينة + قيمة</td></tr>
<tr><td>سهولة البيع</td><td class="n">عالية مع الشهادة والتغليف</td><td class="n">عالية لكن بسعر الخام</td></tr>
</tbody></table></div>
<h3>متى تختار السبائك؟</h3>
<p>إذا كان هدفك الادخار أو حماية أموالك من التضخم، فالسبائك هي الطريق الأقصر: مصنعية شبه معدومة، وسعر بيع قريب جدًا من السعر العالمي، وأوزان تناسب كل ميزانية من غرام واحد حتى كيلوغرام. تابع الأسعار الحالية في صفحة <a href="/gold-bars/">أسعار السبائك</a>.</p>
<h3>نصائح عند شراء السبائك</h3>
<ul>
<li>اشترِ من <strong>جهة معروفة</strong> واطلب شهادة بالوزن والنقاء والرقم التسلسلي.</li>
<li><strong>السبائك الكبيرة أوفر</strong>: سبيكة 50 غرامًا فرق سعرها عن السعر العالمي أقل نسبيًا من 50 سبيكة صغيرة بوزن غرام.</li>
<li><strong>احتفظ بالتغليف الأصلي</strong> المختوم؛ فتحه قد يقلل سعر إعادة البيع.</li>
<li>فكّر في <strong>التخزين الآمن</strong>: خزنة منزلية مؤمّنة أو خزنة بنكية للكميات الكبيرة.</li>
</ul>
<h3>ومتى تكون المشغولات منطقية؟</h3>
<p>إذا كنت سترتدي القطعة فعلًا — هدية زواج أو استخدام يومي — فالمشغولات خيار معقول بشرط أن تتعامل مع المصنعية على أنها «ثمن الزينة» لا استثمارًا. ولتقليل الخسارة: اختر عيارًا مرتفعًا (21 أو 22)، وتفاوض على المصنعية، وتجنب القطع المرصّعة بالأحجار إن كان همّك القيمة، لأن الأحجار لا تُحسب عند البيع.</p>
<h3>قاعدة بسيطة للتلخيص</h3>
<p><strong>للادخار: سبائك عيار 24. للزينة مع احتفاظ معقول بالقيمة: مشغولات عيار 21 أو 22 بمصنعية منخفضة.</strong> وفي الحالتين تابع <a href="/">سعر الذهب اليوم</a> قبل الشراء، وقارن تطور السعر عبر <a href="/history/">أرشيف الأسعار</a> لتعرف إن كنت تشتري في قمة أم في هبوط.</p>
<p>هذا المحتوى تعليمي فقط وليس نصيحة استثمارية؛ قرار الشراء مسؤوليتك وحدك.</p>`,
    faq: [
      ['هل شراء الذهب من المحل يعتبر استثمارًا جيدًا؟', 'المشغولات تخسر مصنعيتها وضريبتها عند البيع، لذلك لا تُعد استثمارًا كامل الكفاءة. السبائك عيار 24 أقرب للاستثمار الحقيقي لأن فرق الشراء والبيع فيها صغير.'],
      ['ما أفضل وزن لسبيكة الذهب للمبتدئ؟', 'حسب الميزانية: السبائك من 5 إلى 20 غرامًا شائعة للمبتدئين، لكن كلما كبرت السبيكة قلّ الفرق النسبي عن السعر العالمي. السبائك الصغيرة جدًا (1 غرام) مصنعيتها أعلى نسبيًا.'],
      ['كيف أبيع سبيكة ذهب؟', 'تبيعها لمحلات الذهب أو شركات المعادن النفيسة بسعر قريب من السعر العالمي في نفس اليوم، ووجود الشهادة والتغليف الأصلي يسهّل البيع ويحسّن السعر.']
    ]
  },
  {
    slug: 'gold-zakat-guide',
    title: 'زكاة الذهب: متى تجب وكيف تحسبها بالطريقة الصحيحة',
    h1: 'زكاة الذهب: متى تجب وكيف تحسبها',
    desc: 'شرح نصاب زكاة الذهب (85 غرامًا من عيار 24) وشروط وجوبها ونسبتها 2.5%، مع أمثلة حسابية للعيارات المختلفة وطريقة حساب زكاة الحلي المستعمل حسب أقوال العلماء.',
    teaser: 'النصاب والحول والنسبة — مع أمثلة حسابية جاهزة',
    intro: 'النصاب 85 غرامًا والنسبة 2.5% — أمثلة عملية للعيارات المختلفة وطريقة الحساب خطوة بخطوة',
    body: `
<p>الذهب من الأموال التي تجب فيها الزكاة إذا بلغ <strong>النصاب</strong> وحال عليه <strong>الحول</strong> (مرت سنة قمرية وهو في ملكك). وهذا ملخص عملي للقواعد مع أمثلة حسابية.</p>
<h3>ما هو نصاب زكاة الذهب؟</h3>
<p>نصاب الذهب <strong>85 غرامًا من الذهب الخالص (عيار 24)</strong>. فإذا كان ما تملكه أقل من 85 غرامًا خالصًا فلا زكاة فيه (عند جمهور العلماء ما لم تضمه إلى أموال أخرى). ولأن العيارات الأقل تحتوي ذهبًا أقل، يُحسب ما يقابلها من الذهب الخالص:</p>
<ul>
<li><a href="/gold-22k/">عيار 22</a>: النصاب نحو <strong>92.7 غرام</strong> (85 ÷ 0.917)</li>
<li><a href="/gold-21k/">عيار 21</a>: النصاب نحو <strong>97.1 غرام</strong> (85 ÷ 0.875)</li>
<li><a href="/gold-18k/">عيار 18</a>: النصاب نحو <strong>113.3 غرام</strong> (85 ÷ 0.75)</li>
</ul>
<h3>كم نسبة زكاة الذهب؟</h3>
<p>النسبة <strong>ربع العشر أي 2.5%</strong> من القيمة السوقية للذهب يوم إخراج الزكاة. تُخرج عينًا (غرامات من الذهب) أو نقدًا بقيمتها، والأشهر اليوم إخراجها نقدًا.</p>
<h3>مثال حسابي</h3>
<p>تملك سوارًا عيار 21 وزنه 100 غرام، ومر عليه الحول:</p>
<ul>
<li>ما يعادل الذهب الخالص: <bdi>100 × 0.875 = 87.5 غرام</bdi> ← بلغ النصاب</li>
<li>قيمة الذهب: <bdi>100 غرام × سعر غرام عيار 21 اليوم</bdi> (تجد السعر المحدث في صفحة <a href="/gold-21k/">سعر عيار 21</a>)</li>
<li>الزكاة المستحقة: <bdi>القيمة × 2.5%</bdi></li>
</ul>
<p>لتوفير الحساب استخدم <a href="/zakat-calculator/">حاسبة زكاة الذهب</a>: أدخل الوزن والعيار وستحسب لك بلوغ النصاب والقيمة والزكاة المستحقة بسعر اليوم مباشرة.</p>
<h3>هل في حلي الاستعمال زكاة؟</h3>
<p>اختلف العلماء في الذهب المعدّ للاستعمال الشخصي (الحلي المباح): فالجمهور يرون <strong>وجوب الزكاة فيه</strong> إذا بلغ النصاب وحال عليه الحول، بينما يرى الحنابلة ومن وافقهم أنه <strong>لا زكاة فيه</strong> ما دام معدًّا للاستعمال لا للادخار. أما الذهب المعدّ للادخار أو التجارة ففيه الزكاة بلا خلاف. إخراج الزكاة في حلي الاستعمال هو <strong>الأحوط</strong> ويبرئ الذمة عند جميع العلماء، ومن أراد التفصيل فليرجع إلى مفتٍ موثوق في بلده.</p>
<h3>ملاحظات عملية</h3>
<ul>
<li><strong>الحول يبدأ من يوم بلوغ النصاب</strong>؛ من اشترى ذهبًا على دفعات يحسب لكل دفعة حولها، أو يوحّد الحول تسهيلًا ويخرج عن الجميع.</li>
<li><strong>الأحجار الكريمة لا تُزكّى</strong>؛ تُخصم قيمتها ويُزكّى وزن الذهب وحده.</li>
<li>يُحسب بالسعر يوم الإخراج لا يوم الشراء.</li>
</ul>`,
    faq: [
      ['كم نصاب زكاة الذهب بالغرام؟', '85 غرامًا من الذهب الخالص عيار 24. وما يعادلها: نحو 92.7 غرام من عيار 22، و97.1 غرام من عيار 21، و113.3 غرام من عيار 18.'],
      ['كيف أحسب زكاة ذهبي؟', 'اضرب وزن الذهب في نسبة العيار لتعرف الذهب الخالص؛ فإن بلغ 85 غرامًا ومر عليه الحول، اضرب قيمة الذهب بسعر اليوم في 2.5%. حاسبة زكاة الذهب في الموقع تفعل ذلك تلقائيًا.'],
      ['هل تجب الزكاة في الذهب المستعمل للزينة؟', 'محل خلاف: جمهور العلماء يوجبونها إذا بلغ النصاب وحال عليه الحول، والحنابلة لا يوجبونها في حلي الاستعمال المباح. الإخراج هو الأحوط.']
    ]
  },
  {
    slug: 'when-to-buy-gold',
    title: 'متى أفضل وقت لشراء الذهب؟ دليل قراءة السوق للمبتدئين',
    h1: 'متى أفضل وقت لشراء الذهب؟',
    desc: 'كيف تقرأ اتجاه سعر الذهب قبل الشراء: العوامل التي تحرك السعر (الفائدة والدولار والتضخم)، واستراتيجية الشراء التدريجي، وكيف تستخدم الأرشيف والرسوم لتتجنب الشراء في القمة.',
    teaser: 'لا أحد يتوقع القاع والقمة — لكن يمكنك الشراء بذكاء',
    intro: 'لا أحد يعرف القاع أو القمة مسبقًا، لكن هذه القواعد تقلل مخاطرة توقيت الشراء',
    body: `
<p>سؤال يتكرر مع كل ارتفاع: «هل أشتري الآن أم أنتظر؟» الإجابة الصادقة أن <strong>لا أحد يستطيع توقع القاع والقمة بيقين</strong>، لكن فهم ما يحرك السعر واتباع أسلوب شراء منضبط يقللان مخاطرة التوقيت كثيرًا.</p>
<h3>ما الذي يحرك سعر الذهب؟</h3>
<ul>
<li><strong>أسعار الفائدة:</strong> الذهب لا يدر عائدًا، فكلما ارتفعت الفائدة قلّت جاذبيته نسبيًا، والعكس صحيح. قرارات البنوك المركزية وعلى رأسها الفيدرالي الأمريكي من أقوى المحركات.</li>
<li><strong>قوة الدولار:</strong> الذهب يُسعّر بالدولار، فضعف الدولار يجعله أرخص لحملة العملات الأخرى فيرتفع الطلب عليه.</li>
<li><strong>التضخم والأزمات:</strong> الذهب ملاذ آمن تقليدي؛ يميل للصعود مع التضخم المرتفع والتوترات الجيوسياسية وأزمات الأسواق.</li>
<li><strong>الطلب الموسمي:</strong> مواسم الأعراس في الهند والخليج والأعياد ترفع الطلب على المشغولات.</li>
</ul>
<h3>قاعدة الشراء التدريجي (متوسط التكلفة)</h3>
<p>بدلًا من شراء كل الكمية في يوم واحد، قسّم ميزانيتك على دفعات شهرية أو أسبوعية متساوية. بهذا تشتري في الصعود وفي الهبوط، ويكون متوسط سعرك معقولًا مهما تحرك السوق. هذه الطريقة مناسبة خصوصًا لمن يدخر في <a href="/gold-bars/">السبائك الصغيرة</a> بانتظام.</p>
<h3>كيف تستفيد من بيانات الموقع قبل الشراء؟</h3>
<ul>
<li>تابع <a href="/">السعر الحالي</a> ونسبة التغير اليومي في أعلى الصفحة الرئيسية.</li>
<li>راجع <a href="/gold-price-yesterday/">سعر الذهب أمس وآخر 10 أيام</a> لتعرف اتجاه الأسبوع.</li>
<li>قارن الشهر الحالي بالشهور السابقة في <a href="/history/">أرشيف الأسعار اليومي</a> — هل السعر قريب من أعلى مستوياته التاريخية أم في موجة هبوط؟</li>
<li>اقرأ صفحة <a href="/gold-forecast/">توقعات الذهب</a> لفهم السيناريوهات والعوامل المؤثرة في الفترة الحالية.</li>
</ul>
<h3>قواعد عملية للمشتري العادي</h3>
<ul>
<li><strong>حدد هدفك أولًا:</strong> ادخار طويل؟ زينة؟ هدية؟ الهدف يحدد العيار والشكل (راجع مقال <a href="/articles/gold-bars-vs-jewellery/">السبائك أم المشغولات</a>).</li>
<li><strong>لا تشتري كمية كبيرة في يوم ارتفاع حاد</strong> دفعة واحدة؛ الهدوء بعد القفزات أشهر من استمرارها.</li>
<li><strong>للادخار طويل المدى التوقيت أقل أهمية</strong> من الاستمرارية؛ فرق بضعة دراهم في الغرام يبهت أثره مع السنين.</li>
<li><strong>للمشغولات</strong> تفاوض على المصنعية يوفر عليك أكثر مما توفره محاولة اصطياد يوم هبوط — راجع <a href="/articles/making-charges-guide/">دليل المصنعية</a>.</li>
</ul>
<p>هذا المحتوى تعليمي فقط وليس توصية بشراء أو بيع؛ أسعار الذهب متقلبة وقرارك مسؤوليتك وحدك.</p>`,
    faq: [
      ['هل ينخفض سعر الذهب في وقت معين من السنة؟', 'لا توجد قاعدة ثابتة، لكن الطلب يرتفع موسميًا في مواسم الأعراس والأعياد الكبرى في الهند والخليج. العوامل الاقتصادية (الفائدة والدولار) أقوى أثرًا من الموسم.'],
      ['ما هي استراتيجية متوسط التكلفة في الذهب؟', 'تقسيم مبلغ الشراء على دفعات دورية متساوية بدل شراء الكل دفعة واحدة، فتشتري في الصعود والهبوط ويصبح متوسط سعرك معتدلًا مهما تذبذب السوق.'],
      ['هل الآن وقت مناسب لشراء الذهب؟', 'لا أحد يجزم بالتوقيت المثالي. قارن السعر الحالي بأرشيف الشهور الماضية في الموقع، وحدد هدفك، وفكر في الشراء التدريجي بدل انتظار قاع قد لا يأتي.']
    ]
  },
  {
    slug: 'why-dollar-rises-egypt',
    title: 'ليه سعر الدولار بيزيد في مصر؟ الأسباب الحقيقية وراء ارتفاعه',
    h1: 'ليه سعر الدولار بيزيد في مصر؟',
    desc: 'شرح مبسط للأسباب الحقيقية وراء ارتفاع سعر الدولار في مصر: العرض والطلب على العملة، الواردات والصادرات، التضخم، الدَّين الخارجي، والتحويلات والسياحة — بلغة بسيطة.',
    teaser: 'العرض والطلب والتضخم والدَّين — القصة كاملة ببساطة',
    intro: 'وراء كل ارتفاع في سعر الدولار أسباب اقتصادية واضحة — هنا القصة كاملة بلغة بسيطة',
    body: `
<p>سعر الدولار في مصر — مثل أي سلعة — يتحدد <strong>بالعرض والطلب</strong>: كلما زاد الطلب على الدولار عن المعروض منه، ارتفع سعره مقابل الجنيه. لفهم لماذا يميل السعر للصعود بمرور الوقت، نحتاج أن نعرف من أين يأتي الدولار لمصر وأين يُنفق.</p>
<h3>من أين يأتي الدولار؟</h3>
<ul>
<li><strong>تحويلات المصريين في الخارج</strong> — أكبر مصدر للعملة الصعبة.</li>
<li><strong>الصادرات</strong> — بضائع ومنتجات تُباع بالخارج.</li>
<li><strong>السياحة</strong> — إيرادات تتأثر بالأمن والاقتصاد العالمي.</li>
<li><strong>قناة السويس</strong> — رسوم مرور السفن بالدولار.</li>
<li><strong>الاستثمار الأجنبي</strong> — شراء أصول وأذون خزانة («الأموال الساخنة»).</li>
</ul>
<h3>وأين يُنفق؟</h3>
<p>مصر تستورد قسمًا كبيرًا من احتياجاتها الأساسية — قمح ووقود وأدوية ومواد خام — وكلها تُدفع بالدولار. وكلما زادت فاتورة الواردات عن حصيلة الصادرات، اتسع العجز في العملة الصعبة وازداد الضغط على الجنيه.</p>
<h3>الأسباب الخمسة وراء ارتفاع الدولار</h3>
<ul>
<li><strong>عجز الميزان التجاري:</strong> استيراد أكثر من تصدير يعني طلبًا دائمًا على الدولار أكبر من المعروض.</li>
<li><strong>التضخم:</strong> عندما ترتفع الأسعار محليًا أسرع من أمريكا، تفقد العملة المحلية قوتها الشرائية ويُعاد تسعير الدولار بأرقام أكبر.</li>
<li><strong>الدَّين الخارجي:</strong> أقساط وفوائد بالدولار تخرج من الاحتياطي باستمرار.</li>
<li><strong>خروج الأموال الساخنة:</strong> عندما ترفع أمريكا الفائدة أو يقلق المستثمرون، يبيعون أذون الخزانة المصرية ويحولون أرباحهم للخارج.</li>
<li><strong>التوقعات:</strong> إذا توقع الناس ارتفاع الدولار، يقبلون على شرائه وتحويل مدخراتهم إليه — ويتحقق التوقع بنفسه.</li>
</ul>
<h3>وليه البنك المركزي يسمح بتحرك السعر؟</h3>
<p>جربت مصر تثبيت السعر رسميًا لفترات طويلة، فنشأت سوق موازية واتسعت الفجوة بين السعرين. ومنذ تعويم 2016 ثم التحريرات اللاحقة (2022، 2023، ومارس 2024) يعتمد البنك المركزي نظام <strong>سعر صرف مرن</strong>: السعر يتحرك مع العرض والطلب، مع تدخلات عند الحاجة. الهدف أن يبقى السعر الرسمي قريبًا من السوق الحقيقية فتختفي السوق الموازية وتعود التحويلات للبنوك.</p>
<h3>وماذا يعني ذلك لمدخراتك؟</h3>
<p>عندما يرتفع الدولار ترتفع معه أسعار السلع المستوردة، وترتفع <a href="/egypt/">أسعار الذهب في مصر</a> لأن الذهب يُسعَّر عالميًا بالدولار. لهذا يلجأ كثيرون للذهب كمخزن للقيمة — راجع <a href="/dollar-egypt/">سعر الدولار اليوم في مصر</a> و<a href="/articles/official-vs-parallel-dollar-rate/">الفرق بين السعر الرسمي والسوق الموازية</a> لمتابعة الصورة كاملة.</p>
<p>هذا المحتوى تعليمي فقط وليس نصيحة استثمارية.</p>`,
    faq: [
      ['لماذا يرتفع سعر الدولار في مصر؟', 'لأن الطلب على الدولار (للواردات والدَّين الخارجي) أكبر من المعروض (من التحويلات والصادرات والسياحة)، ومع ارتفاع التضخم محليًا تفقد العملة قوتها فيُعاد تسعير الدولار بأرقام أعلى.'],
      ['هل سعر الدولار في مصر مثبت أم مرن؟', 'منذ 2016 تعتمد مصر نظام سعر صرف مرن يتحرك مع العرض والطلب، مع تدخلات من البنك المركزي عند الحاجة، بعد تحريرات متتالية أبرزها مارس 2024.'],
      ['كيف يؤثر ارتفاع الدولار على سعر الذهب في مصر؟', 'الذهب يُسعَّر عالميًا بالدولار، فأي ارتفاع في سعر صرف الدولار مقابل الجنيه يرفع سعر الذهب بالجنيه تلقائيًا حتى لو ثبت السعر العالمي.']
    ]
  },
  {
    slug: 'official-vs-parallel-dollar-rate',
    title: 'الفرق بين سعر الدولار الرسمي وسعر السوق الموازية في مصر',
    h1: 'الفرق بين سعر الدولار الرسمي وسعر السوق الموازية',
    desc: 'ما الفرق بين سعر الدولار في البنوك وسعر السوق الموازية (السوداء)؟ لماذا يظهر سعران، وماذا يعني اتساع الفجوة بينهما، ولماذا التعامل في السوق الموازية مخاطرة؟',
    teaser: 'سعر البنك وسعر السوق — لماذا يوجد اثنان أصلًا؟',
    intro: 'سعران للدولار في نفس البلد؟ هذه هي الحكاية كاملة: لماذا يظهران، وماذا يعني الفرق بينهما',
    body: `
<p>في فترات شح العملة الصعبة يظهر للدولار سعران في مصر: <strong>سعر رسمي</strong> في البنوك وشركات الصرافة المرخصة، و<strong>سعر موازٍ</strong> في السوق غير الرسمية. الفرق بينهما ليس تفصيلًا صغيرًا — إنه مؤشر على حالة الاقتصاد كله.</p>
<h3>السعر الرسمي</h3>
<p>هو السعر الذي تتعامل به البنوك وشركات الصرافة المرخصة تحت إشراف البنك المركزي. السعر المعروض في <a href="/dollar-egypt/">صفحة سعر الدولار في مصر</a> هو سعر السوق المتوسط اللحظي، وهو المرجع الذي تُبنى عليه أسعار البنوك مع هامش بسيط للبيع والشراء.</p>
<h3>السوق الموازية</h3>
<p>تظهر عندما لا يكفي الدولار المعروض في القنوات الرسمية لتغطية الطلب — فمن يحتاج الدولار ولا يجده في البنك يلجأ للسوق غير الرسمية ويدفع سعرًا أعلى. وتنمو هذه السوق عادة عندما يكون السعر الرسمي «متأخرًا» عن التوازن الحقيقي بين العرض والطلب.</p>
<h3>ماذا تعني الفجوة بين السعرين؟</h3>
<ul>
<li><strong>فجوة صغيرة أو معدومة</strong> (كما كان الحال بعد تحرير مارس 2024): السعر الرسمي قريب من السوق، والتحويلات تعود للبنوك.</li>
<li><strong>فجوة واسعة</strong>: مؤشر على شح الدولار وضغط متراكم، وتوقعات بأن السعر الرسمي سيلحق بالسوق — وهو ما يشجع مزيدًا من الطلب على الدولار كمخزن قيمة.</li>
</ul>
<h3>لماذا التعامل في السوق الموازية مخاطرة؟</h3>
<ul>
<li><strong>مخالفة قانونية:</strong> الاتجار في العملة خارج القنوات المرخصة جريمة يعاقب عليها القانون.</li>
<li><strong>الاحتيال:</strong> أوراق مزورة وعمليات نصب بلا أي حماية أو مرجع.</li>
<li><strong>لا وثيقة ولا مصدر:</strong> لا يمكن إثبات مصدر الأموال عند الحاجة.</li>
</ul>
<h3>كيف تختفي السوق الموازية؟</h3>
<p>تخفت عندما يزيد المعروض من الدولار (تحويلات وسياحة وصادرات واستثمارات) ويصبح السعر الرسمي قريبًا من التوازن الحقيقي. لهذا تراقب الأسواق الفجوة بين السعرين كمقياس لصحة الاقتصاد. لمتابعة السعر الرسمي لحظة بلحظة راجع <a href="/dollar-egypt/">سعر الدولار اليوم</a>، ولفهم أسباب ارتفاعه أصلًا اقرأ <a href="/articles/why-dollar-rises-egypt/">ليه الدولار بيزيد في مصر؟</a></p>`,
    faq: [
      ['ما الفرق بين سعر البنك وسعر السوق الموازية للدولار؟', 'سعر البنك هو السعر الرسمي تحت إشراف البنك المركزي، وسعر السوق الموازية هو سعر غير رسمي يظهر عند شح الدولار في القنوات الرسمية، وعادة يكون أعلى. التعامل في السوق الموازية مخالف للقانون ومحفوف بالمخاطر.'],
      ['ماذا يعني اتساع الفجوة بين السعر الرسمي والسوق الموازية؟', 'يعني أن المعروض من الدولار في البنوك لا يغطي الطلب، وأن السوق تتوقع تحركًا قادمًا في السعر الرسمي باتجاه سعر السوق الموازية.'],
      ['هل السعر المعروض في الموقع هو سعر البنك أم السوق الموازية؟', 'هو سعر السوق المتوسط (mid-market) اللحظي من مصادر الصرف العالمية، وهو مرجع تُبنى عليه أسعار البنوك ولا يعكس السوق الموازية.']
    ]
  },
  {
    slug: 'dollar-forecast-egypt',
    title: 'توقعات سعر الدولار في مصر: كيف تقرأها وتفهم العوامل المحركة؟',
    h1: 'توقعات سعر الدولار في مصر: العوامل والسيناريوهات',
    desc: 'لا أحد يجزم بسعر الدولار القادم، لكن يمكن متابعة العوامل التي تحركه: التضخم والفائدة والاحتياطي وبرنامج صندوق النقد والتحويلات — وسيناريوهات الصعود والاستقرار والهبوط.',
    teaser: 'بدل ما تسأل «هيوصل لكام؟» — افهم العوامل اللي بتحركه',
    intro: 'بدلًا من أرقام لا يجزم بها أحد — هذه هي العوامل الحقيقية التي تحدد اتجاه الدولار والسيناريوهات المحتملة',
    body: `
<p>أكثر سؤال يتكرر: «الدولار هيوصل لكام؟». والإجابة الصادقة: <strong>لا أحد يعرف على وجه اليقين</strong> — لا بنك ولا محلل ولا خبير. ما يمكن فعله هو متابعة العوامل التي تحرك السعر وقراءة السيناريوهات المحتملة بهدوء.</p>
<h3>العوامل التي تحدد اتجاه الدولار</h3>
<ul>
<li><strong>التضخم:</strong> الفرق بين معدل التضخم في مصر وأمريكا يحدد الاتجاه طويل المدى؛ تضخم أعلى يعني ضغطًا على الجنيه.</li>
<li><strong>سعر الفائدة:</strong> فائدة أعلى على الجنيه تجذب الأموال الساخنة وتدعم العملة، وخفضها المبكر قد يدفعها للخروج.</li>
<li><strong>الاحتياطي النقدي:</strong> تغطية الاحتياطي لعدة أشهر من الواردات تعطي البنك المركزي قدرة أكبر على تهدئة السوق.</li>
<li><strong>برنامج صندوق النقد الدولي:</strong> مراجعات الصندوق والشرائح القادمة تضيف للمعروض الدولاري وتدعم الثقة.</li>
<li><strong>التحويلات والسياحة وقناة السويس:</strong> المصادر الأساسية للعملة الصعبة؛ أي قفزة فيها تخفف الضغط.</li>
<li><strong>قوة الدولار عالميًا:</strong> عندما يصعد الدولار أمام كل العملات (مؤشر الدولار)، تتأثر الجنيه مع باقي عملات الأسواق الناشئة.</li>
</ul>
<h3>ثلاثة سيناريوهات بدلًا من رقم واحد</h3>
<ul>
<li><strong>سيناريو الاستقرار:</strong> استمرار تحسن التحويلات والسياحة مع التزام إصلاحي — يبقى السعر في نطاق ضيق مع حركة بطيئة تعكس فرق التضخم.</li>
<li><strong>سيناريو الصعود:</strong> خروج أموال ساخنة أو صدمة في الإيرادات الدولارية — يتحرك السعر لأعلى حتى يستعيد توازنه، كما حدث في موجات 2022-2024.</li>
<li><strong>سيناريو الهبوط:</strong> حصيلة دولارية كبيرة مفاجئة (صفقات استثمار ضخمة أو قفزة في التحويلات) — وقد رأينا مثالها بعد اتفاق رأس الحكمة في 2024 عندما هبط السعر بقوة قبل أن يستقر.</li>
</ul>
<h3>كيف تحمي مدخراتك مهما كان السيناريو؟</h3>
<p>بدلًا من الرهان على اتجاه واحد، يوزع الحذر مدخراته: جزء بالجنيه للمصاريف الجارية، وجزء في أصول تحفظ القيمة مع صعود الدولار مثل <a href="/egypt/">الذهب</a> الذي يرتفع سعره بالجنيه تلقائيًا مع ارتفاع الدولار ويُباع بسهولة عند الحاجة. راجع <a href="/articles/gold-bars-vs-jewellery/">السبائك أم المشغولات للادخار</a> وتابع <a href="/dollar-egypt/">سعر الدولار لحظة بلحظة</a> من صفحتنا المباشرة.</p>
<p>هذا المحتوى تعليمي فقط وليس توصية بشراء أو بيع عملة أو ذهب.</p>`,
    faq: [
      ['هل يمكن التنبؤ بسعر الدولار في مصر؟', 'لا، لا يجزم أحد بالسعر القادم. الصحيح هو متابعة العوامل المحركة (التضخم والفائدة والاحتياطي والتحويلات) وقراءة السيناريوهات بدلًا من تصديق أرقام قاطعة.'],
      ['ما أكثر عامل يؤثر في سعر الدولار مقابل الجنيه؟', 'على المدى الطويل فرق التضخم بين البلدين، وعلى المدى القصير تدفقات العملة الصعبة (التحويلات والاستثمار الأجنبي) والتوقعات.'],
      ['هل الذهب حماية من ارتفاع الدولار؟', 'تاريخيًا يرتفع سعر الذهب بالجنيه مع ارتفاع الدولار لأنه مُسعَّر عالميًا بالدولار، فيحفظ القوة الشرائية للمدخرات، لكنه يظل متقلبًا وقرار الشراء مسؤوليتك.']
    ]
  }
];

// English country articles — one localized SEO guide per major market
export const ARTICLES_EN = [
  {
    slug: 'why-gold-rises-india',
    title: 'Why Is the Gold Price Rising in India? Rupee, Duty and Demand',
    h1: 'Why is the gold price rising in India?',
    desc: 'The real reasons gold keeps rising in India: global spot price, weaker rupee, import duty and GST, and wedding demand — plus what it means for 22K buyers.',
    teaser: 'Rupee, import duty and wedding demand, explained simply',
    intro: 'Every record high has the same three engines behind it — here is how they work',
    body: `
<p>Gold in India has set record after record, and the reason is never one thing. The price you pay at the jeweller is built in three layers: the <strong>global spot price</strong>, the <strong>rupee exchange rate</strong>, and <strong>Indian taxes and demand</strong>. When all three push the same way, prices jump fast.</p>
<h3>1. The global price keeps climbing</h3>
<p>Gold is priced worldwide in US dollars per troy ounce (31.1035 g). Central banks buying gold, investors hedging inflation, and expectations of lower interest rates have pushed the spot price to historic highs. Every Indian price starts from this number — see the live <a href="/en/gold-price-usd/">gold price in USD</a>.</p>
<h3>2. The rupee multiplies the move</h3>
<p>Because gold is bought in dollars, a weaker rupee raises the Indian price even when the global price is flat. The rule: <strong>local price = global price × USD/INR ÷ 31.1035</strong>. If gold rises 5% globally and the rupee slips 3%, Indian buyers feel roughly 8%. Check today's rate on the <a href="/en/india/">gold rate in India</a> page.</p>
<h3>3. Duty, GST and demand</h3>
<p>India imports nearly all its gold, so taxes land directly in the retail price: import duty (cut to 6% in the 2024 budget) plus <strong>3% GST</strong> on the gold value and 5% GST on making charges. On top of that, wedding and festival seasons (Diwali, Akshaya Tritiya) create waves of physical demand that widen local premiums.</p>
<h3>What it means for buyers</h3>
<p>Nobody can time the exact top or bottom. What you can control: buy <strong>BIS-hallmarked 22K</strong> (the <a href="/en/gold-22k/">22K rate</a> is what jewellers quote for jewellery), compare making charges between shops, and consider buying in parts rather than waiting for a crash that may not come. For savings, coins and bars in <a href="/en/gold-24k/">24K</a> track the raw price most closely.</p>
<p>This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why does the gold price increase in India?', 'Three combined drivers: the global dollar price of gold, the USD/INR exchange rate (a weaker rupee raises local prices), and Indian import duty plus 3% GST. Wedding-season demand adds local premiums on top.'],
      ['Does a weak rupee make gold costlier in India?', 'Yes. Gold is imported and priced in US dollars, so when the rupee falls against the dollar, the Indian price rises even if the global price is unchanged.'],
      ['Is gold still a good investment in India?', 'Gold has preserved purchasing power in India over decades and hedges rupee weakness, but it is volatile in the short term. Many households combine jewellery for use with 24K coins or bars for savings.']
    ]
  },
  {
    slug: 'why-gold-rises-usa',
    title: 'Why Is the Gold Price Rising in the US? Fed, Inflation and Demand',
    h1: 'Why is the gold price rising in the US?',
    desc: 'What drives the US gold price: Fed rate expectations and real yields, inflation hedging, central-bank buying and ETF flows — and what record prices mean for buyers.',
    teaser: 'Fed rates, inflation and central-bank buying, in plain English',
    intro: 'Gold is priced in dollars — so American buyers watch the purest version of the story',
    body: `
<p>In the US, gold is priced directly in dollars, so the <a href="/en/usa/">gold price in the USA</a> is the global spot price itself. When it hits record highs, four forces are usually at work.</p>
<h3>1. Fed rate expectations</h3>
<p>Gold pays no interest, so its biggest rival is the yield on safe Treasury bonds. When markets expect the <strong>Federal Reserve to cut rates</strong> — or when real (after-inflation) yields fall — holding gold gets cheaper by comparison and demand rises. Rate-cut cycles have historically been strong periods for gold.</p>
<h3>2. Inflation hedging</h3>
<p>Every inflation scare revives gold's oldest pitch: an ounce buys roughly what it always has. After the 2021–2023 inflation surge, both retail buyers and funds increased their gold allocations, and that demand has stayed sticky.</p>
<h3>3. Central banks and ETFs</h3>
<p>Central banks — especially in Asia — have been buying gold at record pace to diversify reserves away from the dollar. Add Western ETF inflows and you get a deep, steady bid under the price that did not exist a decade ago.</p>
<h3>4. The dollar itself</h3>
<p>Gold and the dollar usually move in opposite directions. A softer dollar makes gold cheaper for the rest of the world, lifting global demand — which feeds straight back into the US price.</p>
<h3>What it means for you</h3>
<p>American buyers meet this price in three forms: <strong>bullion</strong> (coins and bars, sold close to spot plus a premium), <strong>jewellery</strong> (usually <a href="/en/gold-18k/">14K or 18K</a>, where workmanship matters more than metal), and <strong>paper gold</strong> (ETFs). For bullion, compare dealer premiums over the live <a href="/en/gold-price-usd/">spot price</a>; for jewellery, know the karat before the price. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why is gold going up in the US?', 'Mainly expectations of lower Fed rates, inflation hedging, record central-bank buying and ETF inflows. Because gold is priced in dollars, the US price is the global spot price.'],
      ['Does a strong dollar push gold down?', 'Usually, yes — gold and the dollar tend to move inversely. A weaker dollar makes gold cheaper abroad, raising global demand and lifting the dollar price.'],
      ['Is it too late to buy gold after record highs?', 'No one can time the market. Buyers who want exposure often build it gradually (dollar-cost averaging) rather than waiting for a specific dip.']
    ]
  },
  {
    slug: 'why-gold-rises-canada',
    title: 'Why Is the Gold Price Rising in Canada? CAD, Rates and Demand',
    h1: 'Why is the gold price rising in Canada?',
    desc: 'Why gold keeps climbing in Canadian dollars: the global spot price, USD/CAD, Bank of Canada policy, and what it means for Maple Leaf and jewellery buyers.',
    teaser: 'The loonie effect: why CAD gold outruns USD gold',
    intro: 'Canadian gold buyers watch two charts at once — the metal and the dollar',
    body: `
<p>The <a href="/en/canada/">gold price in Canada</a> is the global US-dollar price translated through USD/CAD — and that translation is why Canadian gold charts often look even stronger than American ones.</p>
<h3>The loonie effect</h3>
<p>Gold is bought worldwide in US dollars. The formula is simple: <strong>CAD price = USD spot × USD/CAD</strong>. When the Canadian dollar weakens — as it has through much of the recent rate cycle — the CAD gold price rises even if the global price is flat. A 5% global rally plus a 4% weaker loonie is roughly a 9% Canadian gain.</p>
<h3>The Bank of Canada factor</h3>
<p>Gold competes with interest-bearing savings. When the Bank of Canada cuts rates, the opportunity cost of holding gold falls, and Canadian investors historically add exposure through ETFs and bullion dealers.</p>
<h3>A gold-producing country buying its own metal</h3>
<p>Canada is one of the world's top gold producers, yet domestic retail demand is strong: the Royal Canadian Mint's <strong>Maple Leaf</strong> coins (99.99% pure) are a global benchmark, and local dealers price them off the live CAD spot plus a premium of a few percent.</p>
<h3>What it means for buyers</h3>
<p>For bullion, compare dealer premiums over the live price — Maple Leafs usually carry lower premiums than foreign coins in Canada. For jewellery, know that most Canadian pieces are 10K–18K; the raw value follows <a href="/en/gold-18k/">18K</a> and 24K rates converted to CAD. Try the <a href="/en/gold-calculator/">gold calculator</a> with CAD selected. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why is gold rising in Canadian dollars?', 'The global price has climbed on rate-cut expectations and central-bank buying, and a weaker Canadian dollar amplifies every global move for CAD buyers.'],
      ['Does USD/CAD affect the gold price in Canada?', 'Directly. The Canadian price equals the US-dollar spot price times USD/CAD, so a weaker loonie raises the local price even when the global price is unchanged.'],
      ['Are Maple Leaf coins a good way to buy gold in Canada?', 'They are 99.99% pure, globally recognized and usually carry modest premiums in Canada, which makes them a popular bullion choice. Premiums vary by dealer, so compare.']
    ]
  },
  {
    slug: 'why-gold-rises-australia',
    title: 'Why Is Gold Rising in Australia? AUD and Global Demand',
    h1: 'Why is the gold price rising in Australia?',
    desc: 'Why gold sets records in Australian dollars: the global spot cycle, the AUD/USD rate, RBA expectations, and what it means for Perth Mint and jewellery buyers.',
    teaser: 'AUD gold has outrun USD gold — here is why',
    intro: 'Australia digs the metal up — and still pays the world price for it, in AUD',
    body: `
<p>Australia is the world's third-biggest gold producer, yet the <a href="/en/australia/">gold price in Australia</a> is set by the same global auction as everywhere else — translated into AUD.</p>
<h3>The AUD amplifier</h3>
<p>The local formula is <strong>AUD price = USD spot × AUD/USD</strong>. The Australian dollar has spent long stretches weaker against the US dollar, so AUD gold has repeatedly hit record highs even in periods when the USD price was only steady. For Australian savers, gold has been both a global asset and a currency hedge.</p>
<h3>Global cycle, local rates</h3>
<p>Worldwide demand — central-bank buying, ETF inflows, inflation hedging — drives the spot price. Locally, Reserve Bank of Australia rate expectations matter too: lower expected rates reduce the appeal of cash and term deposits relative to gold.</p>
<h3>The Perth Mint channel</h3>
<p>Most Australian retail buyers meet gold through <strong>Perth Mint</strong> products: Kangaroo coins (99.99%), minted bars, and depository accounts. Prices are the live AUD spot plus a premium that shrinks as size grows — a 1 oz coin carries a noticeably lower percentage premium than a 1 g bar.</p>
<h3>What it means for buyers</h3>
<p>For bullion, compare premiums over the live AUD price and buy sizes that keep the percentage premium low. For jewellery — mostly 9K and <a href="/en/gold-18k/">18K</a> in Australia — the metal value follows the karat rate, with workmanship on top. The <a href="/en/gold-calculator/">gold calculator</a> works with AUD. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why is gold at record highs in Australia?', 'The global price has climbed on rate-cut expectations and central-bank demand, and a softer Australian dollar has amplified the move in AUD terms.'],
      ['Does the AUD/USD rate change the local gold price?', 'Yes — the Australian price is the US-dollar spot price converted at AUD/USD. A weaker AUD means a higher local price for the same global market.'],
      ['Is Perth Mint gold a good buy?', 'Perth Mint coins and bars are government-backed, 99.99% pure and easy to resell in Australia. Compare dealer premiums over the live spot price before buying.']
    ]
  },
  {
    slug: 'gold-karats-uk',
    title: 'Gold Karats in the UK: 9K, 18K, 22K and 24K Explained',
    h1: 'Gold karats in the UK: 9K, 18K, 22K and 24K explained',
    desc: 'What 9K, 18K, 22K and 24K gold mean in the UK: purity, hallmarks and Assay offices, sovereign coins, and which karat suits jewellery versus investment.',
    teaser: 'Hallmarks, sovereigns and which karat to buy',
    intro: 'Britain is a 9K country with a 22K coin at its heart — here is how the karats fit together',
    body: `
<p>Walk into a British jeweller and most pieces are <strong>9 karat</strong>; ask for investment gold and you will be offered <strong>sovereigns and Britannias</strong>. Both are "real gold" — the karat just tells you how much.</p>
<h3>What the karats mean</h3>
<p>Karat measures pure gold content out of 24 parts: <strong>9K = 37.5%</strong> (hallmark 375), <strong>18K = 75%</strong> (750), <strong>22K = 91.7%</strong> (916) and <strong>24K = 99.9%</strong> (999). The rest is alloy — copper, silver, zinc — added for hardness and colour. See live rates for <a href="/en/gold-18k/">18K</a>, <a href="/en/gold-22k/">22K</a> and <a href="/en/gold-24k/">24K</a> in pounds.</p>
<h3>Why 9K rules the high street</h3>
<p>At 37.5% gold, 9K is harder, cheaper and more scratch-resistant — suited to everyday rings and chains. The trade-off: lower resale value per gram and a paler colour. 18K (75%) is the premium choice for engagement rings and fine pieces, richer in colour and value.</p>
<h3>Hallmarks are the law</h3>
<p>In the UK, any gold item over 1 gram sold as gold must carry a hallmark from one of the four Assay offices (London, Birmingham, Sheffield, Edinburgh). The stamp shows the fineness number (375, 750, 916, 999) — check it before you buy, and keep it visible when you sell.</p>
<h3>22K and 24K: the investor's karats</h3>
<p>The <strong>sovereign</strong> (22K, 7.99 g) and the <strong>Britannia</strong> (24K) are the classic British investment coins — legal tender, which makes them exempt from Capital Gains Tax for UK residents, and free of VAT as investment gold. South Asian communities in the UK also favour 22K jewellery, priced per gram off the live rate plus making charges.</p>
<h3>Which karat should you buy?</h3>
<p>Daily-wear jewellery: 9K or 18K. Jewellery as savings: 22K. Pure investment: sovereigns, Britannias or 24K bars bought close to the <a href="/en/uk/">live UK gold price</a>. Compare dealer premiums, and use the <a href="/en/gold-calculator/">gold calculator</a> to check gram values in GBP. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Is 9K gold real gold?', 'Yes — 9K is 37.5% pure gold with the rest alloy, and it is the UK high-street standard because it is hard-wearing and affordable. It simply contains less gold per gram than 18K or 22K.'],
      ['What does a 375 hallmark mean?', '375 means 375 parts of pure gold per 1,000 — 37.5%, i.e. 9 karat. UK law requires a hallmark from a British Assay office on gold items over 1 gram.'],
      ['Why are sovereign coins popular in the UK?', 'They are 22K legal-tender gold coins: VAT-free as investment gold, exempt from Capital Gains Tax for UK residents, and easy to sell back to dealers at small spreads.']
    ]
  },
  {
    slug: '21k-vs-24k-gold-philippines',
    title: "21K vs 24K Gold: What 'Saudi Gold' Means in the Philippines",
    h1: "21K vs 24K gold: what 'Saudi gold' means in the Philippines",
    desc: "Why Filipinos call 21K jewellery 'Saudi gold', how 18K, 21K and 24K differ in purity and price per gram, and how pawnshops value each karat.",
    teaser: "Purity, pawnshop value and the OFW favourite, explained",
    intro: "The karat decides the price — and in the Philippines, 21K has a story",
    body: `
<p>In Filipino jewellery shops, <strong>"Saudi gold"</strong> means 21-karat jewellery — pieces historically brought home by OFWs from the Gulf, where 21K is the standard. It is prized for its rich colour and high melt value, and pawnshops appraise it higher than the local standard, 18K.</p>
<h3>The purity ladder</h3>
<p><strong>18K = 75%</strong> pure (the everyday standard in Philippine shops), <strong>21K = 87.5%</strong> (Saudi gold — deeper yellow, higher value, slightly softer), and <strong>24K = 99.9%</strong> (pure gold — bars and coins, too soft for daily jewellery). Check the live <a href="/en/philippines/">gold price in the Philippines</a> per gram for each karat.</p>
<h3>How the price difference works</h3>
<p>Gold value scales with purity: if 24K is ₱X per gram, 21K is about 87.5% of that and 18K about 75%. So a gram of Saudi gold is worth roughly <strong>17% more</strong> than a gram of 18K in raw metal — before workmanship. That is why karat is the first question any buyer or pawnbroker asks.</p>
<h3>Pawnshops and resale</h3>
<p>The Philippines has one of the world's most active gold-pawning markets — Cebuana Lhuillier, Palawan and local pawnshops appraise by karat against the day's rate. Higher karat means a higher appraisal per gram. Keep receipts and know your piece's karat and weight before you pawn or sell.</p>
<h3>Which should you buy?</h3>
<p>For jewellery you will wear daily, 18K balances durability and value. For jewellery as savings — the OFW tradition — 21K keeps more metal value per peso. For pure investment, 24K bars and coins track the <a href="/en/gold-price-usd/">world price</a> most closely, converted to pesos at the day's USD/PHP rate. Try values in the <a href="/en/gold-calculator/">gold calculator</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['What is Saudi gold in the Philippines?', "Filipino shorthand for 21-karat gold jewellery (87.5% pure), traditionally brought home by OFWs from Saudi Arabia and the Gulf, where 21K is the jewellery standard."],
      ['Is 21K better than 18K?', 'In metal value, yes: 21K is 87.5% pure versus 75% for 18K, so it is worth about 17% more per gram and appraises higher at pawnshops. 18K is harder and better for daily wear.'],
      ['How much is Saudi gold per gram in the Philippines?', 'It follows the live 21K rate: the world gold price converted to pesos, times 0.875. The Philippines gold price page shows the current 21K and 24K gram rates in PHP.']
    ]
  }
];
