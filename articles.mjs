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

// ── Wave 2 batch A: South Asia + Turkey + Malaysia ──
ARTICLES_EN.push(
  {
    slug: 'why-gold-rises-pakistan',
    title: 'Why Is the Gold Price Rising in Pakistan? Rupee and Tola',
    h1: 'Why is the gold price rising in Pakistan?',
    desc: 'Why gold keeps climbing in Pakistan: the global spot price, the falling rupee, and wedding-season demand — plus how the tola rate is calculated and what buyers can do.',
    teaser: 'The rupee effect behind every record tola price',
    intro: 'Every record tola rate has the same engines behind it — here is how they work',
    body: `
<p>Gold in Pakistan is quoted per <strong>tola (11.664 g)</strong>, and the tola rate has broken record after record. Three forces drive it: the global price, the rupee, and local demand.</p>
<h3>1. The global price</h3>
<p>Everything starts with the world <a href="/en/gold-price-usd/">gold price in USD</a> per ounce (31.1035 g). Central-bank buying, inflation hedging and expectations of lower interest rates have pushed it to historic highs, and Pakistan's prices follow mechanically.</p>
<h3>2. The rupee multiplies every move</h3>
<p>The formula is <strong>tola price = USD per ounce × USD/PKR × 11.664 ÷ 31.1035</strong>. Because the rupee has depreciated sharply over the years, Pakistani gold rises even when the world price is flat. A 5% global rally with a 5% weaker rupee feels like a 10% jump at the jeweller. Watch the <a href="/en/dollar-pakistan/">dollar rate in Pakistan</a> alongside gold.</p>
<h3>3. Local demand and the sarafa market</h3>
<p>Pakistan's sarafa bazaars (Karachi, Lahore, Rawalpindi) announce daily rates that follow the formula plus a small local premium. Wedding seasons bring waves of buying in <strong>22K jewellery</strong> — the local standard — which widens premiums further.</p>
<h3>What buyers can do</h3>
<p>You cannot time the market, but you can control how you buy: always ask for the day's per-tola rate and the making charges separately, buy hallmarked 22K from a known shop, and consider building savings in small coins or bars rather than waiting for a crash. Track the live <a href="/en/pakistan/">gold rate in Pakistan</a> per tola and gram. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why does gold keep getting expensive in Pakistan?', 'The global dollar price is rising and the rupee has weakened over time, so the rupee price of gold rises on both fronts. Wedding-season demand adds local premiums.'],
      ['How is the per-tola gold rate calculated in Pakistan?', 'Tola rate = world ounce price in USD × USD/PKR rate × 11.664 ÷ 31.1035. Sarafa markets then add a small local premium.'],
      ['Is gold a good investment in Pakistan?', 'Gold has historically protected savings against rupee depreciation, which is why households hold it. It is still volatile short-term, so many buy gradually rather than all at once.']
    ]
  },
  {
    slug: 'why-gold-rises-bangladesh',
    title: 'Why Is the Gold Price Rising in Bangladesh? Taka and Demand',
    h1: 'Why is the gold price rising in Bangladesh?',
    desc: 'Why gold keeps climbing in Bangladesh: the global price, the weaker taka, and BAJUS rate-setting — plus how the bhori (11.664 g) price works and what buyers can do.',
    teaser: 'Taka, BAJUS rates and the bhori, explained simply',
    intro: 'The bhori keeps setting records — the reasons are the same every time',
    body: `
<p>In Bangladesh gold is priced per <strong>bhori (also called vori, 11.664 g)</strong>, and the Bangladesh Jewellers' Association (BAJUS) announces official rates that keep setting records. Here is why.</p>
<h3>1. The world price leads</h3>
<p>Bangladesh imports almost all its gold, so the local price starts from the global <a href="/en/gold-price-usd/">spot price in dollars</a>. Record global prices translate directly into record bhori rates.</p>
<h3>2. The taka decides the size of the jump</h3>
<p>The math: <strong>bhori price = USD ounce price × USD/BDT × 11.664 ÷ 31.1035</strong>. The taka has weakened steadily against the dollar, so Bangladeshi buyers feel global rallies amplified. Follow the <a href="/en/dollar-bangladesh/">dollar rate in Bangladesh</a> to understand the gold move.</p>
<h3>3. How BAJUS sets the daily rate</h3>
<p>BAJUS publishes per-bhori rates for 22K, 21K, 18K and traditional (sanatan) gold, adjusted for import costs and local supply. Jewellers then add making charges — often 8–15% for ornaments — on top of the metal value.</p>
<h3>What buyers can do</h3>
<p>Compare the BAJUS rate with what the shop quotes, negotiate making charges, and always take a detailed invoice showing weight, purity and charges. For savings, 22K coins and bars track the metal value most closely. Check today's <a href="/en/bangladesh/">gold price in Bangladesh</a> per bhori and gram. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why is gold so expensive in Bangladesh now?', 'Global gold is at record highs and the taka has weakened, so the bhori price rises on both fronts. BAJUS adjusts official rates as import costs change.'],
      ['What is a bhori of gold?', 'A bhori (vori) is the traditional South Asian gold weight used in Bangladesh, equal to 11.664 grams — the same as a tola.'],
      ['Who sets gold prices in Bangladesh?', 'BAJUS (the Bangladesh Jewellers\' Association) announces daily per-bhori rates by karat, based on the international price, the exchange rate and import costs.']
    ]
  },
  {
    slug: 'why-gold-rises-nepal',
    title: 'Why Is the Gold Price Rising in Nepal? INR Peg and Demand',
    h1: 'Why is the gold price rising in Nepal?',
    desc: 'Why gold keeps climbing in Nepal: the global price, the rupee peg to the Indian currency, and festival demand — plus how the per-tola rate in NPR is formed.',
    teaser: 'How the Indian-rupee peg shapes Nepal\'s gold price',
    intro: 'Nepali gold follows two markets at once — the world and India',
    body: `
<p>Nepal prices gold per <strong>tola (11.664 g)</strong>, and the Federation of Nepal Gold and Silver Dealers announces daily rates that keep climbing. The drivers are global and regional at once.</p>
<h3>1. The world price in dollars</h3>
<p>Like everywhere, the base is the global <a href="/en/gold-price-usd/">gold price in USD</a> — at record highs on central-bank buying and rate-cut expectations.</p>
<h3>2. The INR peg passes India's gold inflation through</h3>
<p>The Nepali rupee is <strong>pegged to the Indian rupee</strong> at 1.6 NPR per INR. India imports gold in dollars, so when the Indian price rises — global price plus rupee weakness — Nepal's price follows through the peg, plus local import duty and taxes.</p>
<h3>3. Festival and wedding demand</h3>
<p>Dashain, Tihar and the wedding season bring surges of physical buying in 22K and 24K jewellery, and demand from Nepali households treats gold as the family reserve. Local premiums widen in peak season.</p>
<h3>What buyers can do</h3>
<p>Check the federation's daily rate before shopping, ask for making charges separately, and buy hallmark-certified pieces. For savings, small 24K bars and coins track the metal value best. See today's <a href="/en/nepal/">gold price in Nepal</a> per tola and gram. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why is the gold price increasing in Nepal?', 'The global price is at record highs, and because the Nepali rupee is pegged to the Indian rupee, rises in India\'s gold price pass straight through, plus local duty.'],
      ['Who announces gold prices in Nepal?', 'The Federation of Nepal Gold and Silver Dealers publishes daily per-tola rates for fine (24K) and standard gold, which shops across the country follow.'],
      ['How many grams are in one tola?', 'One tola equals 11.664 grams. Gold in Nepal is traditionally quoted per tola, with gram prices derived from it.']
    ]
  },
  {
    slug: 'why-gold-rises-srilanka',
    title: 'Why Is the Gold Price Rising in Sri Lanka? Rupee and Crisis',
    h1: 'Why is the gold price rising in Sri Lanka?',
    desc: 'Why gold keeps climbing in Sri Lanka: the global price, the rupee\'s collapse and recovery, and what it means for 22K jewellery buyers and savers.',
    teaser: 'What the currency crisis did to Sri Lankan gold',
    intro: 'Sri Lankan gold tells the story of the rupee itself',
    body: `
<p>Few countries show the link between currency and gold as clearly as Sri Lanka. The <a href="/en/srilanka/">gold price in Sri Lanka</a> has multiplied over recent years — and most of that move is the rupee.</p>
<h3>1. The global price</h3>
<p>The base layer is the world <a href="/en/gold-price-usd/">spot price in USD</a>, at record highs on central-bank buying and rate-cut expectations.</p>
<h3>2. The rupee's collapse — and what it taught savers</h3>
<p>During the 2022 crisis the Sri Lankan rupee lost nearly half its value against the dollar, and gold prices in LKR roughly doubled even where the world price moved little. The lesson stuck: many households now treat gold as their hedge against currency risk. Track the <a href="/en/dollar-srilanka/">dollar rate in Sri Lanka</a> next to gold.</p>
<h3>3. Local market habits</h3>
<p>Sri Lankan jewellers work mostly in <strong>22K</strong>, quoting per gram and per pound (8 sovereigns = 1 pound in local usage for coins). Making charges vary widely between Colombo's Sea Street shops and smaller towns, and sovereign coins remain a popular savings form.</p>
<h3>What buyers can do</h3>
<p>Ask for the day's rate and making charges separately, compare Sea Street quotes, and keep invoices with weight and purity. For savings, sovereigns and small bars are the most liquid. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why did gold prices jump so much in Sri Lanka?', 'The 2022 currency crisis cut the rupee\'s value sharply, and since gold is priced in dollars, the LKR price roughly doubled. Global record prices have added more since.'],
      ['Is gold a good hedge in Sri Lanka?', 'It protected savers through the currency collapse, which is why demand stays strong. It is still volatile short-term, so gradual buying is the common approach.'],
      ['What karat do Sri Lankan jewellers use?', 'Mostly 22K (91.6% pure) for jewellery, with 24K for coins and bars. Sovereign coins are a traditional savings unit.']
    ]
  },
  {
    slug: 'why-gold-rises-turkey',
    title: 'Why Is the Gold Price Rising in Turkey? Lira and Inflation',
    h1: 'Why is the gold price rising in Turkey?',
    desc: 'Why gram altın keeps breaking records in Turkey: the global price, lira depreciation, high inflation, and how Turks use çeyrek and gram gold to protect savings.',
    teaser: 'Gram altın, çeyrek and the lira story',
    intro: 'In Turkey, gold is not a luxury — it is the household savings account',
    body: `
<p>Turkey is one of the world's most gold-loving countries, and the <a href="/en/turkey/">gold price in Turkey</a> has risen relentlessly in lira terms. The drivers are global and domestic at once.</p>
<h3>1. The world price</h3>
<p>The base is the global <a href="/en/gold-price-usd/">spot price in USD</a>, at record highs. Turkish prices convert it at the day's USD/TRY rate.</p>
<h3>2. Lira depreciation and inflation</h3>
<p>The lira has depreciated for years while inflation ran high, so gold in TRY rises on both the global price and the exchange rate. For Turkish savers, <strong>gram altın</strong> has outpaced bank deposits for a generation — which is exactly why demand never fades. Watch the <a href="/en/dollar-turkey/">dollar rate in Turkey</a> beside gold.</p>
<h3>3. How Turks buy: gram and çeyrek</h3>
<p>Retail gold comes in familiar units: <strong>gram altın</strong> (24K), <strong>çeyrek</strong> (quarter, 1.6 g), yarım (half) and tam (full, ~7 g) coins, plus 22K bracelets and 18K jewellery. The çeyrek is the standard wedding gift — millions change hands every season, creating steady physical demand.</p>
<h3>What buyers can do</h3>
<p>Buy from jewelers or banks with transparent buy-sell spreads, prefer 24K gram or coins for savings, and compare the spread, not just the price. Grand Bazaar rates set the national tone. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why does gram altın keep rising in Turkey?', 'The global price is at record highs and the lira keeps depreciating with high inflation, so the lira price of gold rises on both fronts year after year.'],
      ['What is a çeyrek coin?', 'A çeyrek is a 22K gold quarter coin weighing about 1.6 grams — Turkey\'s most popular small gold unit and the traditional wedding gift.'],
      ['Is gold a good savings tool in Turkey?', 'It has protected purchasing power through lira depreciation for decades, which is why Turkish households hold so much of it. Spreads between buy and sell prices matter, so compare sellers.']
    ]
  },
  {
    slug: 'emas-916-vs-999-malaysia',
    title: 'Emas 916 vs 999: How to Buy Gold in Malaysia',
    h1: 'Emas 916 vs 999: how to buy gold in Malaysia',
    desc: 'What emas 916 and emas 999 mean in Malaysia, how jewellers price per gram in ringgit, and which purity suits jewellery versus savings.',
    teaser: 'The two purities every Malaysian buyer meets',
    intro: 'Malaysian gold talk starts with two numbers: 916 and 999',
    body: `
<p>Walk into any kedai emas and you will hear two numbers: <strong>916</strong> and <strong>999</strong>. They are fineness marks — and choosing between them is the main decision in Malaysian gold buying.</p>
<h3>What the numbers mean</h3>
<p><strong>Emas 999</strong> is 99.9% pure gold — the same as <a href="/en/gold-24k/">24K</a> — sold as bars, coins and some jewellery. <strong>Emas 916</strong> is 91.6% pure, the same as <a href="/en/gold-22k/">22K</a>, and it is the standard for Malaysian jewellery: hard enough for daily wear, high enough to keep most of the metal value. (Emas 750 = <a href="/en/gold-18k/">18K</a> appears in modern and diamond pieces.)</p>
<h3>How prices are quoted</h3>
<p>Malaysian jewellers display a daily price <strong>per gram in ringgit</strong> for 999 and 916, based on the world <a href="/en/gold-price-usd/">USD price</a> converted at USD/MYR, plus association margins. On top comes the <strong>upah</strong> (workmanship fee) per piece — always ask for it separately. See today's <a href="/en/malaysia/">gold price in Malaysia</a>.</p>
<h3>Which should you buy?</h3>
<p>For savings: 999 bars and dinars from dealers or banks, with the tightest spreads. For jewellery you will wear: 916 — the resale market is deep, and pawnshops (pajak gadai) appraise it readily. For fashion pieces with stones: 750 is fine, but know you are paying for design more than metal.</p>
<p>This guide is educational, not investment advice.</p>`,
    faq: [
      ['What is emas 916?', 'Emas 916 is gold of 91.6% purity — the same as 22 karat — and the standard for Malaysian jewellery, balancing durability with high metal value.'],
      ['Is emas 999 better than 916?', 'For savings, yes: 999 is pure gold with the tightest spreads on bars and coins. For daily-wear jewellery, 916 is more practical because pure gold is soft.'],
      ['How is gold priced in Malaysia?', 'Per gram in ringgit, from the world USD price converted at USD/MYR, plus a workmanship fee (upah) per piece. Always ask for the upah separately.']
    ]
  }
);

// ── Wave 2 batch B: Southeast & East Asia ──
ARTICLES_EN.push(
  {
    slug: 'why-gold-rises-indonesia',
    title: 'Why Is the Gold Price Rising in Indonesia? Antam and Rupiah',
    h1: 'Why is the gold price rising in Indonesia?',
    desc: 'Why Antam gold keeps breaking records in Indonesia: the world price, the rupiah, and steady retail demand — plus how Antam pricing and buyback work.',
    teaser: 'Antam, the rupiah and Indonesia\'s gold habit',
    intro: 'When Antam raises its price, the whole country notices — here is what moves it',
    body: `
<p>In Indonesia, one company sets the national mood on gold: <strong>Antam</strong>. Its daily price list is the reference for millions of savers, and it has kept climbing.</p>
<h3>1. The world price</h3>
<p>Antam's list starts from the global <a href="/en/gold-price-usd/">gold price in USD</a>, which is at record highs on central-bank buying and rate-cut expectations.</p>
<h3>2. The rupiah layer</h3>
<p>The formula is <strong>IDR price = USD price × USD/IDR</strong>. The rupiah has weakened gradually for years, so Indonesian gold rises even in flat global markets. Follow the <a href="/en/dollar-indonesia/">dollar rate in Indonesia</a> next to gold prices.</p>
<h3>3. How Antam pricing works</h3>
<p>Antam sells 99.99% bars from 0.5 g to 1 kg. Smaller bars carry much higher premiums per gram — a 1 g bar can cost 8–10% over the metal value while 100 g bars sit close to spot. Antam also publishes a <strong>buyback price</strong> daily, lower than the selling price; the spread between them is the real cost of owning gold. Pegadaian and e-commerce gold accounts follow the same pattern.</p>
<h3>What buyers can do</h3>
<p>Buy sizes that keep premiums low (25 g and up where possible), buy from Antam's official channels or Pegadaian, and hold for years rather than trading the spread. See today's <a href="/en/indonesia/">gold price in Indonesia</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why does Antam gold keep getting more expensive?', 'The world gold price is at record highs and the rupiah has weakened over time, so the rupiah price rises on both fronts.'],
      ['What is the Antam buyback price?', 'The price Antam pays to buy its bars back, published daily. It is lower than the selling price, and the spread is the effective cost of owning the gold.'],
      ['Are small Antam bars worth it?', 'They are convenient, but premiums per gram are much higher on 0.5–5 g bars. Larger bars (25–100 g) track the metal price far more closely.']
    ]
  },
  {
    slug: 'thai-gold-baht-purity-guide',
    title: 'Thai Gold Explained: Baht Weight, 96.5% Purity and Prices',
    h1: 'Thai gold explained: baht weight, 96.5% purity and prices',
    desc: 'How gold works in Thailand: the baht weight (15.244 g), 96.5% purity, gold-bar versus jewellery prices, and how Thai shops quote the daily rate.',
    teaser: 'One baht of gold is not one baht of money',
    intro: 'Thailand has its own gold system — weight, purity and pricing all unique',
    body: `
<p>Thailand's gold market confuses every newcomer because it uses its own unit and its own purity. Once you know both, the system is beautifully simple.</p>
<h3>The baht weight</h3>
<p>One <strong>baht of gold = 15.244 grams</strong> (about half a troy ounce) — unrelated to the currency of the same name. Shops quote the daily price per baht, with smaller units: 1 salung = ¼ baht (3.81 g), 2 salung = ½ baht, and so on.</p>
<h3>96.5% purity</h3>
<p>Standard Thai gold is <strong>96.5% pure</strong> — slightly above 23K — a tradition enforced by the gold traders' association. It gives the deep yellow colour Thai buyers expect while staying workable for jewellery. Pure 99.99% bars exist mainly for investors.</p>
<h3>Two prices: bar and jewellery</h3>
<p>The Gold Traders Association announces two daily prices: <strong>gold bar</strong> (the investment benchmark, bought back with a tiny spread) and <strong>gold ornament</strong> (jewellery, which includes workmanship and sells at a discount when you resell). Smart savers buy bars; buyers who want wearable value accept the ornament spread.</p>
<h3>What moves the price</h3>
<p>The global <a href="/en/gold-price-usd/">USD gold price</a> times USD/THB — so both record world prices and a weaker baht push Thai prices up. See today's <a href="/en/thailand/">gold price in Thailand</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['How many grams is one baht of gold?', 'One baht of gold equals 15.244 grams — a traditional Thai weight unit, separate from the Thai currency of the same name.'],
      ['Why is Thai gold 96.5% pure?', 'It is the national standard set by the Gold Traders Association — a deep-yellow alloy slightly above 23 karat, traditional for both jewellery and bars.'],
      ['What is the difference between bar and ornament prices in Thailand?', 'The bar price is the investment benchmark with a tiny buy-sell spread; the ornament (jewellery) price includes workmanship and resells at a discount.']
    ]
  },
  {
    slug: 'vietnam-gold-sjc-tael-guide',
    title: 'Gold in Vietnam: SJC Bars, Tael Weight and Prices Explained',
    h1: 'Gold in Vietnam: SJC bars, tael weight and prices',
    desc: 'How gold works in Vietnam: the tael (37.5 g) and chỉ, why SJC bars trade at a premium, and how to read the daily gold price in dong.',
    teaser: 'SJC, tael and chỉ — Vietnam\'s own gold language',
    intro: 'Vietnamese gold has its own units and its own star brand',
    body: `
<p>Vietnam's gold market runs on two things foreigners rarely expect: the <strong>tael</strong> as the unit, and <strong>SJC</strong> as the brand everyone wants.</p>
<h3>Tael, lượng and chỉ</h3>
<p>Gold is quoted per <strong>tael (also called lượng, 37.5 g)</strong>. One tael = 10 <strong>chỉ</strong> (3.75 g each) = 100 phân. Daily prices are quoted per lượng or per chỉ in millions of dong.</p>
<h3>The SJC premium</h3>
<p>SJC bars — produced by the state-licensed Saigon Jewelry Company — are Vietnam's reference gold. Because the government tightly controls SJC supply, these bars trade at a persistent <strong>premium</strong> over world prices that has sometimes reached millions of dong per tael. Plain 9999 rings (nhẫn trơn) and 24K jewellery track world prices more closely.</p>
<h3>What moves the price</h3>
<p>The world <a href="/en/gold-price-usd/">USD price</a> × USD/VND, plus the SJC supply premium. A weaker dong lifts everything; changes in State Bank of Vietnam gold policy move the premium itself. Follow the <a href="/en/dollar-vietnam/">dollar rate in Vietnam</a> beside gold.</p>
<h3>What buyers can do</h3>
<p>For savings with the tightest link to world prices, 9999 rings often beat premium-laden SJC bars. Buy from licensed dealers (SJC, PNJ, DOJI), keep receipts, and check today's <a href="/en/vietnam/">gold price in Vietnam</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['What is a tael of gold in Vietnam?', 'A tael (lượng) is 37.5 grams — the standard gold weight in Vietnam. One tael equals 10 chỉ of 3.75 grams each.'],
      ['Why are SJC bars more expensive than world gold?', 'SJC supply is tightly controlled by the State Bank of Vietnam, so the bars trade at a premium over world prices that can reach millions of dong per tael.'],
      ['What is the cheapest way to own gold in Vietnam?', 'Plain 9999 rings (nhẫn trơn) usually track world prices more closely than SJC bars because they avoid the supply premium.']
    ]
  },
  {
    slug: 'buying-gold-singapore-gst-free',
    title: 'Buying Gold in Singapore: GST-Free Investment Gold Explained',
    h1: 'Buying gold in Singapore: GST-free investment gold explained',
    desc: 'Why Singapore is a global gold hub: no GST on investment precious metals, tight dealer spreads, and how to buy bars and coins in SGD.',
    teaser: 'The GST rule that made Singapore a gold hub',
    intro: 'Singapore built itself into Asia\'s gold vault — on purpose',
    body: `
<p>Singapore deliberately made itself one of the best places on earth to buy gold. One policy did most of the work.</p>
<h3>No GST on investment gold</h3>
<p>Since 2012, <strong>Investment Precious Metals (IPM)</strong> — gold of 99.5%+ purity in bar, wafer or coin form — is <strong>exempt from GST</strong> in Singapore. Jewellery still carries 9% GST, but bullion trades tax-free, which keeps dealer prices among the tightest in Asia.</p>
<h3>What you can buy</h3>
<p>Bars from PAMP and local refiners, Maples, Kangaroos and the Singapore Mint's own pieces — all priced off the live <a href="/en/gold-price-usd/">USD spot</a> converted at USD/SGD, plus a premium of roughly 1–3% for larger bars. Dealers like BullionStar, GoldSilver Central and bank channels compete hard on spreads.</p>
<h3>Storage is part of the plan</h3>
<p>Singapore's real specialty is vaulted storage: allocated, insured vaulting from dealers, plus the purpose-built Silver Bullion vault. Many regional investors buy and store in Singapore without ever taking delivery.</p>
<h3>What moves the SGD price</h3>
<p>World price × USD/SGD. The Singapore dollar is managed against a trade basket and is relatively stable, so local gold mostly follows the global cycle. See today's <a href="/en/singapore/">gold price in Singapore</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Is gold tax-free in Singapore?', 'Investment-grade gold (99.5%+ purity bars, wafers and coins) is GST-exempt. Jewellery is not — it carries the standard 9% GST.'],
      ['Why is Singapore popular for buying gold?', 'No GST on investment gold, tight dealer spreads, strong property rights and world-class vaulting make it a regional bullion hub.'],
      ['What premium do gold bars carry in Singapore?', 'Typically around 1–3% over spot for larger bars from competitive dealers; small bars and coins cost more per gram.']
    ]
  },
  {
    slug: 'why-gold-rises-japan',
    title: 'Why Is the Gold Price Rising in Japan? The Weak Yen Effect',
    h1: 'Why is the gold price rising in Japan?',
    desc: 'Why gold keeps hitting records in Japan: the global price, the historically weak yen, and safe-haven demand — plus how Tanaka and retail bars are priced.',
    teaser: 'The yen turned a gold rally into a gold boom',
    intro: 'In yen terms, gold has never looked stronger — currency is the reason',
    body: `
<p>Japanese gold prices have set record after record — and the biggest driver is not gold itself but the yen.</p>
<h3>1. The world price</h3>
<p>The base is the global <a href="/en/gold-price-usd/">USD spot price</a>, at record highs on central-bank buying and rate-cut expectations.</p>
<h3>2. The historically weak yen</h3>
<p>The formula is <strong>JPY price = USD price × USD/JPY</strong>. The yen weakened to multi-decade lows, so Japanese gold rose much faster than the world price. For Japanese savers, gold became the clearest hedge against their own currency. Watch the <a href="/en/dollar-japan/">dollar rate in Japan</a> beside gold.</p>
<h3>3. How Japan buys gold</h3>
<p>Retail gold flows through <strong>Tanaka Kikinzoku</strong> and other refiners: bars from 5 g up, coins like the Maple Leaf, and accumulation plans (monthly gold savings). Department-store and jewelry-counter sales of 18K pieces follow the same daily rate plus workmanship.</p>
<h3>What buyers can do</h3>
<p>Compare dealer premiums (they widen on small bars), consider accumulation plans for gradual buying, and remember the yen risk cuts both ways: a stronger yen would pull yen-gold prices down even if world gold is flat. See today's <a href="/en/japan/">gold price in Japan</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why is gold at record highs in Japan?', 'Record global prices plus a historically weak yen: the yen price equals the dollar price times USD/JPY, and both have risen.'],
      ['Does the yen exchange rate change Japanese gold prices?', 'Directly. A weaker yen raises the yen price of gold even when the world price is unchanged — and a stronger yen lowers it.'],
      ['How do people buy gold in Japan?', 'Through refiners like Tanaka Kikinzoku: bars, coins and monthly accumulation plans, plus 18K jewellery at department stores.']
    ]
  },
  {
    slug: 'gold-china-999-shanghai-premium',
    title: 'Gold in China: 999 Gold, the Shanghai Premium and Prices',
    h1: 'Gold in China: 999 gold, the Shanghai premium and prices',
    desc: 'How gold works in China: 999 and 9999 purity, the Shanghai Gold Exchange benchmark, the premium over world prices, and how Chinese buyers purchase gold.',
    teaser: 'Why Chinese gold sometimes costs more than world gold',
    intro: 'China is the world\'s biggest gold buyer — with its own price system',
    body: `
<p>China is the largest gold consumer on the planet, and its market runs on its own benchmark: the <strong>Shanghai Gold Exchange (SGE)</strong>.</p>
<h3>999 and 9999 purity</h3>
<p>Chinese gold jewellery and bars are typically <strong>999</strong> (99.9%, "qian zu jin") or <strong>9999</strong> (99.99%) — the same as <a href="/en/gold-24k/">24K</a>. Unlike Western markets, low-karat jewellery is rare; buyers expect near-pure gold, priced per gram in yuan.</p>
<h3>The Shanghai premium</h3>
<p>SGE prices usually track the world <a href="/en/gold-price-usd/">USD price</a> × USD/CNY — but when Chinese demand outruns import quotas, SGE trades at a <strong>premium</strong> over London, sometimes $10–30 per ounce. The premium is a live signal of Chinese demand: it widened during festival seasons and whenever households rushed to hedge the yuan.</p>
<h3>How Chinese buyers purchase gold</h3>
<p>Through banks (investment bars and accumulation plans), jewellers like Chow Tai Fook and Lao Feng Xiang (per-gram pricing plus workmanship), and increasingly gold ETFs and exchange products. Spring Festival and wedding seasons drive visible demand waves.</p>
<h3>What moves the price</h3>
<p>World price × USD/CNY ± the SGE premium. Follow the <a href="/en/dollar-china/">dollar rate in China</a> and today's <a href="/en/china/">gold price in China</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['What is 999 gold in China?', 'Gold of 99.9% purity (24K) — the standard for Chinese jewellery and investment bars, sold per gram in yuan.'],
      ['What is the Shanghai gold premium?', 'The gap between Shanghai Gold Exchange prices and world prices. When Chinese demand outruns import supply, SGE gold trades above the international price.'],
      ['How do Chinese households buy gold?', 'Bank investment bars, jewellery chains selling 999/9999 pieces per gram, and gold ETFs — with demand peaking around Spring Festival and weddings.']
    ]
  }
);

// ── Wave 2 batch C: Europe + Nigeria ──
ARTICLES_EN.push(
  {
    slug: 'buying-gold-germany-vat-free',
    title: 'Buying Gold in Germany: VAT-Free Bullion and 999 Bars',
    h1: 'Buying gold in Germany: VAT-free bullion and 999 bars',
    desc: 'How to buy gold in Germany: VAT-exempt investment gold, popular coins like the Krugerrand and Philharmoniker, dealer premiums, and the 999 purity standard.',
    teaser: 'VAT rules, coins and German buying habits',
    intro: 'Germans are Europe\'s biggest private gold buyers — the rules favour them',
    body: `
<p>Germans hold more private gold than the Bundesbank — and the tax rules are a big reason why.</p>
<h3>Investment gold is VAT-free</h3>
<p>Under EU rules, <strong>investment gold</strong> — bars and wafers of 99.5%+ purity and a list of qualifying coins — is <strong>exempt from VAT</strong> in Germany. Jewellery carries the normal 19% VAT, so serious buyers stick to bullion. Even better: private gains on gold held longer than one year are tax-free in Germany.</p>
<h3>What Germans buy</h3>
<p>The classics: <strong>Krugerrand</strong> (1 oz, 22K but priced as bullion), <strong>Philharmoniker</strong>, <strong>Maple Leaf</strong>, and 999.9 bars from 1 g to 1 kg from refiners like Heraeus and Degussa. Banks, dealers (pro aurum, ESG) and online shops all quote off the live <a href="/en/gold-price-usd/">USD price</a> converted to EUR.</p>
<h3>Premiums and spreads</h3>
<p>1 oz coins typically carry 2–4% over spot; bars over 100 g get close to 1%. Tiny 1 g bars cost 10%+ — fine as gifts, poor as savings. Compare the dealer's buyback spread, not just the selling price.</p>
<h3>What moves the EUR price</h3>
<p>World price × USD/EUR. A weaker euro lifts German gold even in flat world markets — see the <a href="/en/dollar-germany/">dollar rate in Germany</a> and today's <a href="/en/germany/">gold price in Germany</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Is gold taxed in Germany?', 'Investment gold (99.5%+ bars and qualifying coins) is VAT-exempt, and private gains are tax-free after a one-year holding period. Jewellery carries 19% VAT.'],
      ['Which gold coin is most popular in Germany?', 'The Krugerrand is the historical favourite; the Philharmoniker and Maple Leaf are close behind. All trade at small premiums over spot.'],
      ['What purity is German investment gold?', 'Bars are 999.9 (99.99%); classic coins like the Krugerrand are 22K but contain a full ounce of pure gold and trade as bullion.']
    ]
  },
  {
    slug: 'gold-france-napoleon-18k',
    title: 'Gold in France: Napoleon Coins, 18K Jewellery and Prices',
    h1: 'Gold in France: Napoleon coins, 18K jewellery and prices',
    desc: 'How gold works in France: the beloved 20-franc Napoleon, 18K (750) jewellery as the legal standard, premiums, and how the daily price in euros is formed.',
    teaser: 'The coin French families pass down generations',
    intro: 'France saves in Napoleons and wears 18K — here is the system',
    body: `
<p>France has a gold tradition like no other: millions of families keep <strong>Napoleon coins</strong> at home, and French jewellery is legally anchored to 18K.</p>
<h3>The 20-franc Napoleon</h3>
<p>The 20-franc gold Napoleon (5.81 g of 90% pure gold) is France's savings coin, minted since 1803 and still traded daily. Dealers quote its price off the live <a href="/en/gold-price-usd/">USD spot</a> in EUR plus a small premium that widens whenever savers rush in — the premium itself is a French fear gauge.</p>
<h3>18K by law and by taste</h3>
<p>French jewellery is overwhelmingly <strong>18 karat (750)</strong> — the traditional legal standard for "or" in France, stamped with the eagle's head hallmark. Anything below 750 cannot be marketed simply as gold. See the live <a href="/en/gold-18k/">18K rate</a>.</p>
<h3>Taxes</h3>
<p>Investment gold (bars 995+, listed coins) is VAT-free; sales of bullion carry a flat precious-metals tax (around 11.5%) unless you document the purchase and opt for the capital-gains regime. Keep every invoice.</p>
<h3>What moves the EUR price</h3>
<p>World price × USD/EUR. Follow the <a href="/en/dollar-france/">dollar rate in France</a> and today's <a href="/en/france/">gold price in France</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['What is a Napoleon gold coin?', 'A French 20-franc gold coin (5.81 g, 90% pure) first minted under Napoleon Bonaparte — still the standard savings coin traded by French dealers.'],
      ['Why is French jewellery 18K?', '18K (750) is the traditional legal standard for gold jewellery in France, marked with the eagle\'s head hallmark — a balance of colour, value and durability.'],
      ['Is gold taxed in France?', 'Investment gold is VAT-free when bought. On resale there is a flat precious-metals tax (about 11.5%) or, with proof of purchase, the capital-gains regime.']
    ]
  },
  {
    slug: 'gold-italy-18k-standard',
    title: 'Gold in Italy: Why 18K (750) Is the National Standard',
    h1: 'Gold in Italy: why 18K (750) is the national standard',
    desc: 'Why Italian jewellery is 18K (750): the hallmark system, Italy\'s goldsmith tradition, and how the daily gold price in euros works for buyers and sellers.',
    teaser: 'The 750 stamp behind Italian gold',
    intro: 'Italy makes the world\'s finest jewellery — almost all of it 18K',
    body: `
<p>Italy is a global jewellery powerhouse — Vicenza, Arezzo, Valenza — and nearly everything it makes is stamped <strong>750</strong>.</p>
<h3>Why 18K rules</h3>
<p>Italian law and tradition settled on <strong>18 karat (75% pure)</strong> for jewellery: high enough to hold real value, hard enough for the intricate chains, mesh and cameos Italian workshops are famous for. Every piece carries the hallmark "750" with the maker's registered mark. See the live <a href="/en/gold-18k/">18K rate</a>.</p>
<h3>Buying and selling</h3>
<p>Jewellers price pieces as metal weight (at the day's 750 rate, from the world <a href="/en/gold-price-usd/">USD price</a> × USD/EUR) plus lavorazione — workmanship — which is where Italian craft commands its premium. When selling, "compro oro" shops pay for metal value only, so keep design value in mind when buying.</p>
<h3>Investment gold</h3>
<p>For pure saving, Italians buy VAT-free investment gold: 999.9 bars and coins (Krugerrand, Marengo 20 lire). Italy's old 20-lira Marengo coin is the local classic, like France's Napoleon.</p>
<h3>What moves the EUR price</h3>
<p>World price × USD/EUR — see the <a href="/en/dollar-italy/">dollar rate in Italy</a> and today's <a href="/en/italy/">gold price in Italy</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['What does 750 mean on Italian gold?', '750 means 75% pure gold — 18 karat — the legal and traditional standard for Italian jewellery, always stamped with the maker\'s registered hallmark.'],
      ['Is 18K gold a good store of value?', 'It keeps 75% of the pure-gold value per gram, but when reselling you are paid for metal only. For savings, VAT-free bars and coins track the price better.'],
      ['What is the Marengo coin?', 'The Italian 20-lira gold coin (about 6.45 g, 90% pure) — the classic Italian savings coin, comparable to the French Napoleon.']
    ]
  },
  {
    slug: 'gold-spain-oro-18k',
    title: 'Gold in Spain: Oro de 18 Kilates, Prices and Taxes',
    h1: 'Gold in Spain: oro de 18 kilates, prices and taxes',
    desc: 'How gold works in Spain: 18K (750) as the jewellery standard, contraste hallmarks, VAT-free investment gold, and how the daily price in euros is formed.',
    teaser: 'Oro de ley and the contraste stamp',
    intro: 'Spanish gold runs on 18K jewellery and VAT-free bullion',
    body: `
<p>In Spain, "oro de primera ley" means one thing: <strong>18 karat</strong>. The system is simple once you know the stamps.</p>
<h3>18K is the standard</h3>
<p>Spanish jewellery is traditionally <strong>18K (750)</strong> — "oro de ley" — hallmarked with the piece's purity and the official contraste (assay) mark. Lower-karat pieces exist (9K in fashion chains) but 18K keeps the resale value. Check the live <a href="/en/gold-18k/">18K rate</a>.</p>
<h3>Investment gold is VAT-free</h3>
<p>Bars of 99.5%+ and qualifying coins trade <strong>without IVA</strong> in Spain, making bullion far more efficient than jewellery for savings. Spreads at Madrid dealers run a few percent on 1 oz coins, less on larger bars.</p>
<h3>How prices are formed</h3>
<p>Everything derives from the world <a href="/en/gold-price-usd/">USD price</a> × USD/EUR. Jewellers quote the day's 18K gram price and add workmanship per piece; "compro oro" shops buy back at metal value minus a margin. Follow the <a href="/en/dollar-spain/">dollar rate in Spain</a> beside today's <a href="/en/spain/">gold price in Spain</a>.</p>
<h3>What buyers can do</h3>
<p>Check the contraste hallmark, ask for the gram price and workmanship separately, and keep invoices — reselling documented pieces is far easier. This guide is educational, not investment advice.</p>`,
    faq: [
      ['What is oro de ley in Spain?', '"Oro de ley" is 18-karat gold (75% pure) — Spain\'s traditional standard for quality jewellery, hallmarked with the purity and contraste marks.'],
      ['Is gold taxed in Spain?', 'Investment gold (99.5%+ bars and listed coins) is exempt from IVA; jewellery carries the standard 21% IVA, so savers prefer bullion.'],
      ['What is the contraste mark?', 'The official Spanish assay hallmark guaranteeing the stated purity — always check it when buying or selling gold in Spain.']
    ]
  },
  {
    slug: 'buying-gold-switzerland-pamp',
    title: 'Buying Gold in Switzerland: PAMP Bars, Vaults and Prices',
    h1: 'Buying gold in Switzerland: PAMP bars, vaults and prices',
    desc: 'Why Switzerland is the world\'s gold refinery: PAMP and Valcambi bars, VAT-free investment gold, bank vaults, and how prices in francs are formed.',
    teaser: 'Where most of the world\'s gold gets refined',
    intro: 'Switzerland refines most of the world\'s gold — buying there is a craft',
    body: `
<p>Switzerland refines the majority of the world's mined gold. If you buy a 999.9 bar anywhere on earth, odds are it passed through Ticino.</p>
<h3>The refinery capital</h3>
<p><strong>PAMP</strong>, <strong>Valcambi</strong>, Argor-Heraeus and Metalor — four of the world's great refiners — are Swiss. Their 999.9 bars, especially the PAMP Lady Fortuna, are global benchmarks and buyable in Switzerland at tight premiums.</p>
<h3>Taxes and the Vreneli</h3>
<p>Investment gold is <strong>VAT-free</strong> in Switzerland (one reason the trade concentrates there); jewellery carries 8.1% VAT. The national coin is the 20-franc <strong>Goldvreneli</strong> (5.81 g, 90%) — the Swiss answer to the Napoleon.</p>
<h3>Vaulting culture</h3>
<p>Swiss banks and private vaults (including alpine facilities outside the banking system) store gold for clients worldwide. Allocated storage typically costs 0.5–1% per year; some buyers combine purchase and vaulting in one contract.</p>
<h3>What moves the CHF price</h3>
<p>World <a href="/en/gold-price-usd/">USD price</a> × USD/CHF. The strong franc historically dampened local gold moves — see the <a href="/en/dollar-switzerland/">dollar rate in Switzerland</a> and today's <a href="/en/switzerland/">gold price in Switzerland</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why is Switzerland famous for gold?', 'It refines most of the world\'s mined gold (PAMP, Valcambi, Argor-Heraeus, Metalor) and combines VAT-free investment gold with world-class vaulting.'],
      ['What is a PAMP bar?', 'A 999.9 fine gold bar made by PAMP in Ticino — the Lady Fortuna design is the world\'s best-known retail gold bar.'],
      ['What is the Goldvreneli?', 'The Swiss 20-franc gold coin (5.81 g, 90% pure) — the classic Swiss savings coin, traded by every dealer.']
    ]
  },
  {
    slug: 'why-gold-rises-nigeria',
    title: 'Why Is the Gold Price Rising in Nigeria? Naira and Inflation',
    h1: 'Why is the gold price rising in Nigeria?',
    desc: 'Why gold keeps climbing in Nigeria: the global price, naira devaluation, and inflation hedging — plus how Nigerians buy gold in grams, coins and jewellery.',
    teaser: 'What naira devaluation does to gold prices',
    intro: 'In Nigeria, gold is a dollar asset — and the naira keeps proving it',
    body: `
<p>Gold in Nigeria has become dramatically more expensive in naira terms. The story is mostly the currency.</p>
<h3>1. The world price</h3>
<p>The base is the global <a href="/en/gold-price-usd/">USD spot price</a> — at record highs on central-bank buying and rate-cut expectations.</p>
<h3>2. Naira devaluation multiplies it</h3>
<p>The formula: <strong>NGN price = USD price × USD/NGN</strong>. Repeated naira devaluations — including the sharp 2023–2024 slide — multiplied local gold prices even where the world market moved little. For Nigerian savers, gold is effectively a way to hold dollars. Watch the <a href="/en/dollar-nigeria/">dollar rate in Nigeria</a> beside gold.</p>
<h3>3. How Nigerians buy gold</h3>
<p>Through jewellery (18K and 22K, priced per gram with workmanship), gold coins and bars from dealers in Lagos and Abuja, and increasingly digital gold platforms. Nigeria is also a gold producer — artisanal and industrial mining in states like Osun and Zamfara — but most refined gold still follows import pricing.</p>
<h3>What buyers can do</h3>
<p>Verify purity (ask for 18K/22K stamps), buy from registered dealers with receipts, and compare per-gram prices across sellers — spreads are wide. See today's <a href="/en/nigeria/">gold price in Nigeria</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why is gold so expensive in Nigeria now?', 'Record global prices plus repeated naira devaluation: gold is priced in dollars, so each naira slide raises the local price even in flat world markets.'],
      ['Is gold a good hedge in Nigeria?', 'It has protected savings against naira depreciation, which is why demand keeps growing. Prices remain volatile, so gradual buying is the common approach.'],
      ['What karat gold is sold in Nigeria?', 'Mostly 18K and 22K jewellery priced per gram, plus investment coins and bars from registered dealers.']
    ]
  }
);

// ── Wave 2 batch D: Ghana, Kenya, Mexico, Brazil + Saudi, Kuwait ──
ARTICLES_EN.push(
  {
    slug: 'gold-ghana-prices-cedi',
    title: 'Gold in Ghana: Prices, the Cedi and the Gold Coast Legacy',
    h1: 'Gold in Ghana: prices, the cedi and the Gold Coast legacy',
    desc: 'How gold works in Ghana: Africa\'s top producer, prices in cedis, the dollar link, and how Ghanaians buy jewellery, coins and small bars.',
    teaser: 'Africa\'s biggest producer buys gold in cedis',
    intro: 'The Gold Coast still lives up to its name',
    body: `
<p>Ghana — the historic Gold Coast — is Africa's largest gold producer. Yet local buyers pay the world price like everyone else, in cedis.</p>
<h3>Producer country, import pricing</h3>
<p>Ghanaian gold prices are formed from the world <a href="/en/gold-price-usd/">USD price</a> × USD/GHS. The cedi's long depreciation means local prices have climbed steeply even in years when world gold was quiet. Watch the <a href="/en/dollar-ghana/">dollar rate in Ghana</a> beside today's <a href="/en/ghana/">gold price in Ghana</a>.</p>
<h3>How Ghanaians buy</h3>
<p>Mostly jewellery — 22K and 18K chains, rings and beads priced per gram plus workmanship — through the goldsmiths of Accra and Kumasi (Kejetia market is a hub). Investment buying in coins and small bars is growing through licensed dealers and banks.</p>
<h3>Mining money</h3>
<p>Gold is Ghana's top export earner, and the Bank of Ghana has run a gold-for-reserves programme to strengthen the cedi — an unusual case of a central bank buying its own mine output to stabilize the currency.</p>
<h3>What buyers can do</h3>
<p>Buy hallmarked pieces from licensed goldsmiths, ask for the per-gram rate and workmanship separately, and keep receipts. For savings, coins and small bars from licensed dealers track the metal value best. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why are gold prices rising in Ghana?', 'World prices are at record highs and the cedi has depreciated for years, so the cedi price of gold rises on both fronts.'],
      ['Is gold cheap in Ghana because it is mined there?', 'No — local prices follow the world price converted at USD/GHS. Mining does not create a local discount for buyers.'],
      ['How do people buy gold in Ghana?', 'Mostly 22K and 18K jewellery from goldsmiths in Accra and Kumasi, plus coins and small bars from licensed dealers and banks.']
    ]
  },
  {
    slug: 'why-gold-rises-kenya',
    title: 'Why Is the Gold Price Rising in Kenya? Shilling and Demand',
    h1: 'Why is the gold price rising in Kenya?',
    desc: 'Why gold keeps climbing in Kenya: the world price, the shilling\'s moves, and rising middle-class demand — plus how Kenyans buy gold in Nairobi.',
    teaser: 'The shilling, the dollar and Nairobi\'s gold shops',
    intro: 'Kenyan gold follows the dollar — and the shilling decides the rest',
    body: `
<p>Kenya's gold market is small but growing fast, and its prices have climbed steeply in shilling terms.</p>
<h3>1. The world price</h3>
<p>Kenyan dealers price off the global <a href="/en/gold-price-usd/">USD spot price</a>, at record highs on central-bank buying and rate-cut expectations.</p>
<h3>2. The shilling sets the local number</h3>
<p>The formula: <strong>KES price = USD price × USD/KES</strong>. The shilling's swings — sharp weakness in 2022–2023, then a strong rebound — passed straight into gold prices. Follow the <a href="/en/dollar-kenya/">dollar rate in Kenya</a> next to gold.</p>
<h3>3. How Kenyans buy</h3>
<p>Through Nairobi's jewellers (mostly 18K and 22K, per gram plus workmanship), a growing number of bullion dealers selling coins and small bars, and M-Pesa-era digital gold products. Gold is increasingly seen as a hedge alongside dollars and land.</p>
<h3>What buyers can do</h3>
<p>Buy hallmarked pieces, compare per-gram rates between shops, and prefer coins or bars for savings — jewellery workmanship is not recoverable on resale. See today's <a href="/en/kenya/">gold price in Kenya</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Why is gold getting expensive in Kenya?', 'Record world prices plus shilling moves: gold is priced in dollars, so a weaker shilling raises the local price directly.'],
      ['Where do Kenyans buy gold?', 'Nairobi jewellers for 18K and 22K pieces, licensed bullion dealers for coins and bars, and digital gold platforms for small savings.'],
      ['Is gold a good investment in Kenya?', 'It has hedged shilling weakness over time. For savings, coins and bars beat jewellery because workmanship costs are lost on resale.']
    ]
  },
  {
    slug: 'gold-mexico-centenario',
    title: 'Gold in Mexico: The Centenario Coin, Prices and the Peso',
    h1: 'Gold in Mexico: the Centenario coin, prices and the peso',
    desc: 'How gold works in Mexico: the 50-peso Centenario (37.5 g of pure gold), 14K and 18K jewellery, and how the price in pesos follows the dollar.',
    teaser: 'One of the world\'s great gold coins is Mexican',
    intro: 'Mexico minted its savings habit into a coin: the Centenario',
    body: `
<p>Mexico's relationship with gold is centuries old, and it crystallized into one of the world's great bullion coins.</p>
<h3>The Centenario</h3>
<p>The <strong>Centenario</strong> — 50 pesos gold, 37.5 g of 90% pure gold (1.2057 oz pure) — was minted from 1921 and reissued for decades. It is Mexico's standard savings coin: every casa de cambio and bank quotes it daily, at the world <a href="/en/gold-price-usd/">USD price</a> × USD/MXN plus a small premium.</p>
<h3>Jewellery: 14K and 18K</h3>
<p>Mexican jewellery is mostly <strong>14K</strong> and <strong>18K</strong> (oro de 14 y 18 quilates), priced per gram with workmanship. For value retention, coins beat jewellery because workmanship is lost on resale.</p>
<h3>The peso link</h3>
<p>Gold in pesos = world price × USD/MXN. The peso's swings against the dollar pass straight through — Mexicans watched peso gold rise even in calm world markets whenever the peso weakened. Track the <a href="/en/dollar-mexico/">dollar rate in Mexico</a> beside today's <a href="/en/mexico/">gold price in Mexico</a>.</p>
<h3>What buyers can do</h3>
<p>Buy Centenarios or fractional coins (½, ¼, 1/10) from Banco Azteca, casas de cambio or reputable dealers; compare premiums and keep certificates. This guide is educational, not investment advice.</p>`,
    faq: [
      ['What is the Centenario gold coin?', 'Mexico\'s 50-peso gold coin containing 37.5 grams of 90% pure gold (1.2057 oz) — the country\'s standard savings coin, quoted daily by banks and exchange houses.'],
      ['How is the Centenario priced?', 'At the world gold price in dollars times USD/MXN, plus a small dealer premium that varies by house and demand.'],
      ['Is 14K gold common in Mexico?', 'Yes — most Mexican jewellery is 14K or 18K, priced per gram plus workmanship. For savings, coins hold value better than jewellery.']
    ]
  },
  {
    slug: 'gold-brazil-ouro-750',
    title: 'Gold in Brazil: Ouro 750, Prices and the Real',
    h1: 'Gold in Brazil: ouro 750, prices and the real',
    desc: 'How gold works in Brazil: why jewellery is 18K (ouro 750), how the price in reais follows the dollar, and where Brazilians buy bars and coins.',
    teaser: 'Why Brazilian jewellery is almost all 18K',
    intro: 'Brazil settled on one karat for jewellery: 750',
    body: `
<p>Brazil's gold tradition runs from colonial mines to today's jewellers — and modern Brazil standardized on <strong>18K</strong>.</p>
<h3>Ouro 750</h3>
<p>Brazilian jewellery is overwhelmingly <strong>18K (ouro 750, 75% pure)</strong>, hallmarked and priced per gram at the day's rate plus workmanship. Lower karats were long considered non-standard for fine pieces. See the live <a href="/en/gold-18k/">18K rate</a>.</p>
<h3>The real and the dollar</h3>
<p>Gold in reais = world <a href="/en/gold-price-usd/">USD price</a> × USD/BRL. The real's swings are famous, so Brazilian gold often rises on currency alone. Brazilians know this well — gold is a classic inflation and devaluation hedge there. Track the <a href="/en/dollar-brazil/">dollar rate in Brazil</a> beside today's <a href="/en/brazil/">gold price in Brazil</a>.</p>
<h3>Where Brazilians buy</h3>
<p>Jewellery from the big chains (H.Stern, Vivara) and local ourives; investment gold as 999.9 bars and coins from dealers like Ourominas and Parmetal; and exchange-traded gold funds (GOLD11) for brokerage accounts.</p>
<h3>What buyers can do</h3>
<p>For savings, choose bars, coins or the gold ETF rather than jewellery — workmanship and retail margins are not recovered on resale. Always buy hallmarked 750 with an invoice. This guide is educational, not investment advice.</p>`,
    faq: [
      ['What is ouro 750?', 'Brazilian 18-karat gold (75% pure) — the national jewellery standard, hallmarked and priced per gram.'],
      ['Why does gold rise in reais when the world price is flat?', 'Because local prices equal the dollar price times USD/BRL — a weaker real raises the Brazilian price by itself.'],
      ['How can Brazilians invest in gold?', 'Through 999.9 bars and coins from dealers, or the GOLD11 exchange-traded fund in a brokerage account; jewellery is the least efficient savings form.']
    ]
  },
  {
    slug: 'buying-gold-saudi-arabia',
    title: 'Buying Gold in Saudi Arabia: 21K, VAT and the Riyal Peg',
    h1: 'Buying gold in Saudi Arabia: 21K, VAT and the riyal peg',
    desc: 'How to buy gold in Saudi Arabia: 21K as the jewellery standard, 15% VAT on jewellery, making charges, and why the pegged riyal keeps prices tracking the world market.',
    teaser: '21K, VAT and the pegged riyal',
    intro: 'Saudi gold buying is simple once you know three things',
    body: `
<p>Saudi Arabia is the Gulf's biggest gold market, and its system has three keys: 21K, VAT, and the dollar peg.</p>
<h3>21K is the standard</h3>
<p>Saudi jewellery is traditionally <strong>21K (875)</strong> — the rich yellow karat of Gulf weddings and gifts — with <a href="/en/gold-22k/">22K</a> for some communities and <a href="/en/gold-18k/">18K</a> for diamond and modern pieces. Shops quote the day's gram rate for each karat.</p>
<h3>The pegged riyal</h3>
<p>The riyal is fixed at <strong>3.75 per US dollar</strong>, so Saudi gold prices track the world <a href="/en/gold-price-usd/">USD price</a> directly — no currency noise. What you pay = world price in SAR + workmanship + VAT.</p>
<h3>VAT and making charges</h3>
<p>Jewellery carries <strong>15% VAT</strong> on the full value (gold + workmanship); investment gold of 99%+ purity is treated differently. Making charges (أجرة الصياغة) vary hugely — from a few riyals per gram on plain bangles to much more on sets — so negotiate them separately from the gold rate.</p>
<h3>What buyers can do</h3>
<p>Shop in the gold souks (Balad in Jeddah, Batha in Riyadh) on the day's rate, compare making charges across shops, and take a detailed invoice. For pure savings, 24K bars and coins avoid workmanship entirely. See today's <a href="/en/saudi/">gold price in Saudi Arabia</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['What karat is Saudi gold jewellery?', 'Traditionally 21K (87.5% pure), with 22K and 18K also common. Bars and coins for savings are 24K.'],
      ['Is there VAT on gold in Saudi Arabia?', 'Yes — 15% VAT applies to gold jewellery on the full value including workmanship. Investment-grade gold of 99%+ is treated differently.'],
      ['Why do Saudi gold prices track the world market exactly?', 'Because the riyal is pegged to the US dollar at 3.75, so there is no exchange-rate movement between the world price and the local price.']
    ]
  },
  {
    slug: 'buying-gold-kuwait',
    title: 'Buying Gold in Kuwait: Prices in Dinars and the Souk',
    h1: 'Buying gold in Kuwait: prices in dinars and the souk',
    desc: 'How to buy gold in Kuwait: 22K and 21K jewellery in the gold souk, no VAT, making charges, and why dinar prices move with the world market.',
    teaser: 'No VAT, a strong dinar and a famous souk',
    intro: 'Kuwait\'s gold souk is one of the Gulf\'s great markets',
    body: `
<p>Kuwait's gold market is one of the oldest in the Gulf — and one of the simplest to buy in, because there is no VAT.</p>
<h3>The souk and the karats</h3>
<p>Kuwait's gold souk (Mubarakiya and the gold centre) prices jewellery per gram at the day's rate for each karat: <strong>22K</strong> and <strong>21K</strong> dominate traditional pieces, <a href="/en/gold-18k/">18K</a> covers diamond and modern designs, and <a href="/en/gold-24k/">24K</a> bars serve savers. Making charges are quoted separately and are always negotiable.</p>
<h3>No VAT, strong dinar</h3>
<p>Kuwait applies <strong>no VAT</strong> on gold, and the dinar — the world's highest-valued currency — is managed against a basket but tracks the dollar closely. So Kuwaiti prices follow the world <a href="/en/gold-price-usd/">USD price</a> with almost no currency noise.</p>
<h3>What buyers can do</h3>
<p>Check the day's per-gram rate before entering the souk, compare making charges across at least two shops, and insist on an itemized invoice showing weight, karat and charges. For savings, 24K bars and coins avoid workmanship entirely. See today's <a href="/en/kuwait/">gold price in Kuwait</a>. This guide is educational, not investment advice.</p>`,
    faq: [
      ['Is there VAT on gold in Kuwait?', 'No — Kuwait does not apply VAT, so the shop price is the gold value plus workmanship only.'],
      ['What karat is Kuwaiti gold jewellery?', 'Mostly 22K and 21K for traditional pieces, 18K for modern and diamond jewellery, and 24K for bars and coins.'],
      ['Why do Kuwaiti gold prices follow the world market closely?', 'The dinar is managed against a currency basket dominated by the dollar, so exchange-rate noise is minimal and prices track the world USD price.']
    ]
  }
);
