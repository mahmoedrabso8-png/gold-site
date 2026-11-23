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
- Silver badge uses XAG source time; dollar badge/provenance names daily FX instead of gold. Core AR/EN cadence promises removed, but full multilingual and article price-copy audit remains.
-525HTML/523sitemap currently pass. Added market-time tests and reran purchase, history, alerts, resale, weight, navigation and freshness browser suites successfully.
