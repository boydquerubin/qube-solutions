/**
 * api/sitemap.js
 * Serves /sitemap.xml (see the rewrite in vercel.json).
 *
 * Why this is a function and not a file in public/:
 *
 * Blog posts publish by date, not by deploy. posts.js holds every scheduled
 * article and BlogPost.jsx serves "Post not found" with a noindex tag until
 * the publish date arrives. The hand-maintained public/sitemap.xml listed all
 * 34 of them, so on 2026-09-06 it was submitting 19 URLs that answered "do not
 * index me" — which is exactly what Google Search Console emailed about
 * ("Excluded by 'noindex' tag"). Telling Google to index a page that refuses
 * to be indexed is a self-inflicted quality problem, and a static file could
 * only ever be right on the day someone remembered to edit it.
 *
 * Generating it per request means the sitemap is correct every Monday morning
 * with no deploy and nothing to remember.
 */
import { postMeta, isPublished } from "../src/blog/postMeta.js";

const SITE = "https://rubyxqube.com";

// Everything that is not a blog post. Keep in sync with the routes in
// src/App.jsx. Deliberately absent: /sign/:token, /project-brief,
// /payment-success, /terms and /quote — the first three are noindex by design
// and the sitemap must never contradict a page's own robots tag again.
const STATIC_ROUTES = [
  { path: "/",                 changefreq: "weekly",  priority: "1.0" },
  { path: "/contact",          changefreq: "monthly", priority: "0.9" },
  { path: "/pricing",          changefreq: "monthly", priority: "0.9" },
  { path: "/audit",            changefreq: "monthly", priority: "0.9" },
  { path: "/services",         changefreq: "monthly", priority: "0.8" },
  { path: "/ai-receptionist",  changefreq: "monthly", priority: "0.8" },
  { path: "/portfolio",        changefreq: "monthly", priority: "0.7" },
  { path: "/about",            changefreq: "monthly", priority: "0.7" },
  { path: "/designs",          changefreq: "monthly", priority: "0.7" },
  { path: "/how-it-works",     changefreq: "monthly", priority: "0.7" },
  { path: "/report",           changefreq: "monthly", priority: "0.6" },
  { path: "/privacy",          changefreq: "yearly",  priority: "0.3" },

  { path: "/blog",             changefreq: "weekly",  priority: "0.8" },

  // City landing pages
  { path: "/web-design-meridian", changefreq: "monthly", priority: "0.8" },
  { path: "/web-design-nampa",    changefreq: "monthly", priority: "0.8" },
  { path: "/web-design-caldwell", changefreq: "monthly", priority: "0.8" },
  { path: "/web-design-eagle",    changefreq: "monthly", priority: "0.8" },

  // Industry landing pages
  { path: "/web-design-hvac",        changefreq: "monthly", priority: "0.8" },
  { path: "/web-design-landscaping", changefreq: "monthly", priority: "0.8" },
  { path: "/web-design-plumbing",    changefreq: "monthly", priority: "0.8" },
  { path: "/web-design-dental",      changefreq: "monthly", priority: "0.8" },

  // Case studies
  { path: "/work/phoenix-stoneworks", changefreq: "monthly", priority: "0.6" },
];

function urlEntry({ path, changefreq, priority, lastmod }) {
  return [
    "  <url>",
    `    <loc>${SITE}${path}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].filter(Boolean).join("\n");
}

export function buildSitemap(now = new Date()) {
  const live = postMeta.filter((p) => isPublished(p, now));

  const entries = [
    ...STATIC_ROUTES.map(urlEntry),
    ...live.map((p) => urlEntry({
      path: `/blog/${p.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: p.date,
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;
}

export default function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).end();
  }

  const xml = buildSitemap();

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  // An hour is plenty. Posts publish at 9am Mountain on Mondays, so the worst
  // case is a new post showing up in the sitemap an hour late.
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  return res.status(200).send(xml);
}
