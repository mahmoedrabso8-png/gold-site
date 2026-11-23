# Quality checks

Run with Node 20 or newer from the repository root:

```sh
node build.mjs
node tests/site-quality.mjs
node tests/quality-selftest.mjs
node tests/finance.mjs
```

Do not set `WRITE_DB` for test builds. The normal build reads live public sources and can take longer when a source fails. These tests never need database writes, messaging credentials, or a production deploy.

## Coverage

- `site-quality.mjs`: all generated HTML, unique metadata, canonical URLs, main navigation count, reciprocal hreflang, internal links/assets/fragments, structured data, article dates, sitemap coverage and article discovery.
- `quality-selftest.mjs`: makes disposable build copies and proves the checker catches four deliberately introduced faults. It does not edit the source build.
- `finance.mjs`: isolates the actual production purchase calculator and alert module without network traffic. Compares 1,980 manual purchase combinations across the 44 current country options, five karats, three making modes and three tax bases. Uses currency display precision. Also tests invalid purchase inputs, automatic karat/FX arithmetic, same-day history conversion/gaps, and alert freshness/once-only behavior.

## Limits

Passing does not establish tax law, source accuracy, live FX freshness, database RLS, service availability, real-device push delivery, accessibility beyond these checks, or field Core Web Vitals. Browser regression tests and visual review remain necessary before a UI release. This separate CI job reports quality; it does not gate or change the existing deployment workflow. Scheduled Telegram/X jobs are untouched.

The calculator harness uses a minimal DOM and the production function body. A rename or structural change can require updating the harness. Alerts use an in-memory local-storage substitute and do not request notification permission.
