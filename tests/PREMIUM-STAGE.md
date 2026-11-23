# Premium shell and local portfolio stage

Test branch only. No production deployment implied.

## Implemented
- Navy/white/soft-gold shell with light default and saved theme, existing five-tab navigation and logo-only mobile header.
- Home price priority, purchase/resale/zakat/portfolio shortcuts, bullion reference panel, market links, latest six articles, same ad snippet repositioned below useful content.
- Purchase calculator: fixed/percent after-tax discount, capped at invoice total, final gram cost. Tax is calculated before this discount and not recomputed. Before-tax discounts must be represented in shop rate/charges.
- Local-only portfolio in Arabic and English: purchases, date, karat, gram price, total making charges and fees; currency-separated cost, equivalent fine weight, average fine-gram cost, indicative value and unrealised gain/loss.
- Portfolio import/export, confirmed deletes/replacement, schema/size validation, no HTML interpolation of labels, corrupt-storage lock, multi-tab update/concurrent-save protection. No accounts, sync or holdings transmission.
- Valuation follows shared source-time state; missing/stale gold suppresses current value. Floating FX needs a dated snapshot no older than four days. This is metal reference value, not buyback proceeds.

## Checks
- Six AR/EN light/dark viewport layouts at360/390/768/1365: no page overflow or JS errors; tablet header overflow fixed.
- Portfolio browser: add, reload persistence, mixed currencies, label escaping, restore, invalid import unchanged, individual/all deletes and corrupt-storage lock, AR390/EN1365. Local screenshots inspected.
- Deterministic portfolio arithmetic/schema tests;1,980 calculator combinations plus discount/cap/zero-weight; structural521HTML/519sitemap; negative checker and timestamp policy.
- AdSense AD block byte-identical to baselineac7846f. Telegram/X scripts/workflows untouched.

## Limits / remaining
- Browser tests use blocked external requests and build snapshots, not a live-market verification. No claim of production push delivery, backend activation, verified RLS or field performance.
- Backend remains blocked. Earlier partial freshness commits must not be described as completed data architecture.
- Country timezone/tax metadata, complete price-copy sweep, manual shop purchase comparison, dedicated bullion calculator, Search Console and final performance checks remain.
- Local storage is not encrypted. Export is an unencrypted file. No recovery if browser data and backup are both lost. Browser quota/private mode can prevent persistence.

## Extended calculators and market templates
- Dedicated manual bullion calculator: gross weight, fineness per1,000, pure gram rate, fixed/gram/percent premium and explicit tax base. Fine-weight output retains up to6decimals.
- Manual two-shop purchase comparison: invoice and fine-gram cost ranked separately, with no quality/buyback guarantee, no implicit FX and no inferred tax.
-432comparison matrix cases and bullion premium/tax-base tests pass. AR390/EN1365 browser checks pass.
-44IANA display-zone configs, local source timestamp rendering, named-zone caveat for multi-zone markets, independent FX status, manual-invoice tax mode. Tax table additions labelled illustrations rather than universal eligibility.
- Country mobile price tables recompose into labelled per-karat cards so gram/weight/ounce/tax illustration remain visible without horizontal scrolling. Egypt and India pixels inspected after this fix.
- Static change baseline uses latest prior archived day, date shown. Runtime comparison names stored quote rather than asserting an exact24h window; baseline time is in title. These two histories remain distinct sources.
- Silver badge uses XAG source time; dollar badge/provenance names daily FX instead of gold. Unconditional core AR/EN cadence promises qualified after live mechanism verification; full multilingual and article price-copy audit remains.
-525HTML/523sitemap currently pass. Added market-time tests and reran purchase, history, alerts, resale, weight, navigation and freshness browser suites successfully.

## Outage/cache/accessibility follow-up
- Network-shaped local browser fixtures: gold HTTP500 with old saved row, row without source time, all sources unavailable, old XAG timestamp and10-day-old FX. Automatic purchase output pauses; manual remains separate; XAG/FX states do not borrow the gold badge.
- Isolated service-worker tests: old cache cleanup, cached API success not reused on gold/DB/FX failure, POST passthrough, saved document content keeps source timestamps. FX host added to network-only API rule.
- Portfolio storage/unencrypted export wording added to existing privacy policy.
- Local mobile Lighthouse lab,2026-11-23:97performance/100accessibility/73best-practices/100SEO, LCP1.7s/CLS0.007/TBT140ms in one run. Not production, field data or directly comparable with the baseline live run. Best-practices issues came from AdSense third-party cookie/report-only CSP behavior; exact ad code was not altered.
- First accessibility pass found badge/tool-number/secondary-copy contrast issues. Fixed and reran; contrast audit passes. Full real-device accessibility and production preview remain unverified.

## Five-minute mechanism correction
Production client appb54a31035b was re-read in a live browser after the user challenged the wording removal. It hasCACHE_MS=300000and an active setInterval(load/loadSilver). Initial production request successfully refreshed source/display values. The earlier removal was too broad. Gold copy now states automatic refresh every 5 minutes while the page is open and the source responds, distinct from static builds, closed-page delivery and daily FX. Stale/unavailable handling remains.
