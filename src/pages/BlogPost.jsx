import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { posts, isPublished } from "../blog/posts.js";
import { siteConfig } from "../siteConfig.js";
import CTA from "../components/CTA.jsx";

const CATEGORY_GRADIENT = {
  "Web Design":      "linear-gradient(135deg, #1a0a10 0%, #3d0a1a 40%, #7a1030 100%)",
  "AI Tools":        "linear-gradient(135deg, #08101a 0%, #0a2040 40%, #0d3a6e 100%)",
  "Lead Generation": "linear-gradient(135deg, #0a100a 0%, #143a14 40%, #1a5c1a 100%)",
  "Case Study":      "linear-gradient(135deg, #100d00 0%, #3a2800 40%, #6b4a00 100%)",
  default:           "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
};

export default function BlogPost() {
  const { slug } = useParams();
  const today = new Date();
  const idx  = posts.findIndex((p) => p.slug === slug);
  const post = posts[idx];
  const live = post && isPublished(post, today);

  if (!post || !live) {
    return (
      <div className="pageMinHeight">
        {/* This branch had no Helmet at all, so a bad or not-yet-published
            slug fell through to index.html's bare "RubyxQube" title, and was
            indexable. Both matter more than they look: 20 of the 34 posts are
            future-dated, so this is the live response for every scheduled
            post's URL until its date arrives. */}
        <Helmet>
          <title>Post not found. RubyxQube Blog</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <section className="surface heroSurface">
          <div className="heroSection">
            <h1 className="h1 heroTitle">Post not found.</h1>
            <p className="p" style={{ marginBottom: 24 }}>That article doesn't exist or may have moved.</p>
            <Link className="btn primary" to="/blog">Back to Blog</Link>
          </div>
        </section>
      </div>
    );
  }

  const { Component, title, description, dateDisplay, readTime, category, coverImage, coverAlt } = post;
  const prev = posts.slice(idx + 1).find(p => isPublished(p, today));
  const next = posts.slice(0, idx).findLast(p => isPublished(p, today));

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>{title}. RubyxQube Blog</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title}. RubyxQube`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={coverImage ? `${siteConfig.siteUrl}${coverImage}` : `${siteConfig.siteUrl}/og-default.png`} />
        <meta property="og:url" content={`${siteConfig.siteUrl}/blog/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={coverImage ? `${siteConfig.siteUrl}${coverImage}` : `${siteConfig.siteUrl}/og-default.png`} />
        <meta property="article:published_time" content={post.date} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/blog/${slug}`} />
      </Helmet>

      {/* ── Article header ── */}
      <section className="surface heroSurface">
        <div className="heroSection" style={{ textAlign: "left", alignItems: "flex-start" }}>
          <Link
            to="/blog"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 28 }}
            onMouseOver={e => e.currentTarget.style.color = "var(--text)"}
            onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}
          >
            <ArrowLeft size={13} /> Back to Blog
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 18 }}>
            <span className="badge">{category}</span>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>{dateDisplay} · {readTime}</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 20px", maxWidth: "22ch" }}>{title}</h1>
          <p style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.65, maxWidth: 560, margin: "0 0 32px" }}>{description}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/boyd_cu.webp" alt="Boyd Querubin" loading="lazy" width="36" height="36" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: "var(--text)" }}>Boyd Querubin</p>
              <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>{siteConfig.brand} · Boise, ID</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover image / gradient banner ── */}
      <section className="surface proseSection" style={{ paddingTop: 32, paddingBottom: 0 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          {coverImage ? (
            <img
              src={coverImage}
              alt={coverAlt || title}
              loading="lazy"
              style={{ width: "100%", borderRadius: "var(--radius)", display: "block", maxHeight: 420, objectFit: "cover", aspectRatio: "21/9" }}
            />
          ) : (
            <div style={{
              width: "100%",
              borderRadius: "var(--radius)",
              aspectRatio: "21/9",
              background: CATEGORY_GRADIENT[category] || CATEGORY_GRADIENT.default,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}>
              <span style={{ fontSize: "clamp(13px, 2vw, 15px)", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{category}</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Article body ── */}
      <section className="surface proseSection">
        <div className="section">
          <div className="prose" style={{ maxWidth: 740, margin: "0 auto" }}>
            <Component />
          </div>
        </div>
      </section>

      {/* ── Post navigation ── */}
      {(prev || next) && (
        <section className="surface">
          <div className="section" style={{ paddingTop: 20 }}>
            <div className="hr" style={{ marginBottom: 32 }} />
            <div className="grid cols-2" style={{ gap: 20 }}>
              {next ? (
                <Link to={`/blog/${next.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ height: "100%" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Newer</p>
                    <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 6px", color: "var(--text)" }}>{next.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)", fontWeight: 700, fontSize: 13, marginTop: 8 }}>
                      Read <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              ) : <div />}
              {prev ? (
                <Link to={`/blog/${prev.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ height: "100%", textAlign: "right" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Older</p>
                    <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 6px", color: "var(--text)" }}>{prev.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)", fontWeight: 700, fontSize: 13, marginTop: 8, justifyContent: "flex-end" }}>
                      Read <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      )}

      <CTA
        title="Want this for your Boise business?"
        subtitle="Start with a free audit. No commitment, just an honest look at what your site is doing (and not doing) for you."
      />
    </div>
  );
}
