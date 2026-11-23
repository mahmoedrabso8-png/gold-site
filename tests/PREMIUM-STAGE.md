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
