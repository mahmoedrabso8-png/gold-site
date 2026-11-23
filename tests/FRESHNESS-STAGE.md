# Freshness stage, partial implementation

Test-branch work only. This stage is not accepted for production yet.

## Implemented

- Shared deterministic `price-state.mjs` policy. LIVE <=5 minutes, DELAYED <=15 minutes, STALE otherwise. Missing/invalid source timestamp and timestamps more than 2 minutes in the future never become LIVE. No quote is UNAVAILABLE.
- Build and browser carry source/fetch/store/display times separately. Existing rows without source time are not upgraded by substituting storage time. New writes preserve the upstream timestamp inside `raw_json`, without schema changes.
- Generated hero state and browser state use the same policy. An expandable provenance panel shows source, fetch, read-row storage, display and FX timestamps separately. Gold automatic purchase/zakat output pauses when source time is stale or absent; manual shop quotes still work. FX lookup for calculator and dollar conversion rejects absent/older-than-four-day timestamps.
- Service worker no longer masks gold/Supabase API failure with an old successful response; cache version increments to remove the former API cache.
- Assistant reads the page's shared snapshot instead of fetching its own gold feed, and suppresses stale prices. Existing retrieval assistant remains, no LLM integration.
- Light-theme green/red change text contrast corrected.
- Tests cover policy boundaries, 1,980 calculator combinations, alert freshness, and browser states with explicit service-worker bypass for deterministic fixtures.

## Remaining before this stage can ship

- Visitor upstream requests and public write attempts still exist. A trusted background producer/read-only endpoint needs implementation and admin verification, not a claim that the data layer is finished.
- Build writes now check HTTP response status and log failures. Deduplication, final source/store timing and retry policy remain.
- Complete FX/silver source status display and all dollar conversion paths. Some original copy still says live; audit every occurrence rather than relying on the new badge alone.
- Country-local timestamp presentation and previous-close/24h semantic alignment remain. The provenance panel currently uses the viewer device timezone and identifies it.
- Add production-shaped database/source/cache outage browser fixtures, missing FX cases, multi-tab/service-worker update tests, and actual preview deployment checks.
- Preserve exact AdSense snippets and social workflows. No changes to these in this stage.

No database migration or destructive write was run. No production deployment from this branch. The audit PDF describes baseline before these changes and must not be relabeled as a completed implementation report.
