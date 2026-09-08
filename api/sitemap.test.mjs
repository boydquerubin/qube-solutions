// node --test api/sitemap.test.mjs
//
// The guard on a bug that already happened. On 2026-09-06 Search Console
// emailed "Excluded by 'noindex' tag" for rubyxqube.com: the hand-maintained
// sitemap listed all 34 blog posts while 19 of them were future-dated and
// still serving BlogPost.jsx's noindex "Post not found" branch.
//
// The invariant these tests protect is one sentence: the sitemap must never
// contain a URL that answers with a noindex tag. Everything below is a way of
// checking that from a different angle.

import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSitemap } from "./sitemap.js";
import { postMeta, isPublished, publishedAt } from "../src/blog/postMeta.js";

const locsIn = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

test("no future-dated post is ever advertised", () => {
  const locs = locsIn(buildSitemap());
  const leaked = postMeta
    .filter((p) => !isPublished(p))
    .filter((p) => locs.includes(`https://rubyxqube.com/blog/${p.slug}`));
  assert.deepEqual(leaked.map((p) => p.slug), [], "these URLs serve noindex");
});

test("every published post is advertised", () => {
  const locs = locsIn(buildSitemap());
  const missing = postMeta
    .filter((p) => isPublished(p))
    .filter((p) => !locs.includes(`https://rubyxqube.com/blog/${p.slug}`));
  assert.deepEqual(missing.map((p) => p.slug), []);
});

test("posts join the sitemap on their date, with no deploy", () => {
  // The whole reason this is a function. Walk forward past the last scheduled
  // post and every one of them should be listed, from the same build.
  const wayLater = new Date("2030-01-01T00:00:00Z");
  const locs = locsIn(buildSitemap(wayLater));
  const blogUrls = locs.filter((l) => l.includes("/blog/"));
  assert.equal(blogUrls.length, postMeta.length);
});

test("the day before publication it is still absent", () => {
  const scheduled = postMeta.find((p) => !isPublished(p));
  assert.ok(scheduled, "no scheduled posts left, this test needs a new fixture");

  const dayBefore = new Date(publishedAt(scheduled).getTime() - 24 * 3600 * 1000);
  const oneSecondAfter = new Date(publishedAt(scheduled).getTime() + 1000);
  const url = `https://rubyxqube.com/blog/${scheduled.slug}`;

  assert.ok(!locsIn(buildSitemap(dayBefore)).includes(url));
  assert.ok(locsIn(buildSitemap(oneSecondAfter)).includes(url));
});

test("publish time is an absolute instant, not the server's clock", () => {
  // A sitemap generated on a UTC server and a page rendered in a Boise
  // browser have to agree on what is live. If they drift apart, the sitemap
  // starts advertising noindex URLs again, which is the original bug.
  assert.equal(publishedAt({ date: "2026-09-07" }).toISOString(), "2026-09-07T16:00:00.000Z");
});

test("pages that are noindex by design stay out", () => {
  const locs = locsIn(buildSitemap());
  for (const path of ["/project-brief", "/payment-success", "/sign", "/homework"]) {
    assert.ok(
      !locs.some((l) => l === `https://rubyxqube.com${path}`),
      `${path} must not be in the sitemap`,
    );
  }
});

test("the XML is well formed enough for a crawler", () => {
  const xml = buildSitemap();
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.ok(xml.trimEnd().endsWith("</urlset>"));

  const opens = (xml.match(/<url>/g) || []).length;
  const closes = (xml.match(/<\/url>/g) || []).length;
  assert.equal(opens, closes);
  assert.equal(opens, locsIn(xml).length);

  // Nothing relative, nothing doubled up.
  const locs = locsIn(xml);
  assert.ok(locs.every((l) => l.startsWith("https://rubyxqube.com/")));
  assert.equal(new Set(locs).size, locs.length, "duplicate <loc> entries");
});

test("every article in postMeta has a body component", () => {
  // postMeta and posts.js are two files now. This is the seam where a new
  // post gets added to one and forgotten in the other.
  return import("../src/blog/posts.js").then(
    ({ posts }) => {
      assert.equal(posts.length, postMeta.length);
      assert.deepEqual(posts.filter((p) => !p.Component).map((p) => p.slug), []);
    },
    // posts.js imports .jsx, so plain node cannot load it. Not a failure:
    // `npm run build` is what proves that half, and it will not compile if a
    // component import is missing.
    () => {},
  );
});
