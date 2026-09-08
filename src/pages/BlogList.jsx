import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { posts, isPublished } from "../blog/posts.js";
import { siteConfig } from "../siteConfig.js";

export default function BlogList() {
  const today = new Date();
  const published = posts.filter(p => isPublished(p, today));
  const featured = published[0];
  const rest = published.slice(1);

  return (
    <div className="pageMinHeight">
      <Helmet>
        <title>Blog. Web Design & AI Insights for Boise Businesses | RubyxQube</title>
        <meta name="description" content="Web design advice, AI tools, and lead generation insights for Treasure Valley small businesses. Written by RubyxQube. Boise's AI-first web agency." />
        <meta property="og:title" content="Blog. RubyxQube | Boise Web Design & AI Insights" />
        <meta property="og:description" content="Web design advice, AI tools, and lead generation insights for Treasure Valley small businesses." />
        <meta property="og:image" content="https://rubyxqube.com/og-default.png" />
        <meta property="og:url" content="https://rubyxqube.com/blog" />
        <link rel="canonical" href={`${siteConfig.siteUrl}/blog`} />
      </Helmet>

      <section className="surface heroSurface">
        <div className="heroSection">
          <span className="badge" style={{ marginBottom: 20 }}>From the RubyxQube team</span>
          <h1 className="h1 heroTitle"><span className="accentText">Web design</span> and AI insights for {siteConfig.serviceArea} businesses.</h1>
          <p className="p" style={{ fontSize: 17, maxWidth: 520 }}>
            Honest advice on websites, lead generation, and AI tools, written for local service businesses, not tech companies.
          </p>
        </div>
      </section>

      <section className="surface">
        <div className="section">
          {/* Featured post */}
          <Link to={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block", marginBottom: 28 }}>
            <div className="card cardHighlight" style={{ padding: "32px 36px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 16 }}>
                <span className="badge">{featured.category}</span>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{featured.dateDisplay} · {featured.readTime}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Featured</span>
              </div>
              <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, margin: "0 0 14px", color: "var(--text)", lineHeight: 1.2, letterSpacing: "-0.02em" }}>{featured.title}</h2>
              <p className="p" style={{ marginBottom: 20, fontSize: 15, maxWidth: 640 }}>{featured.description}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)", fontWeight: 700, fontSize: 14 }}>
                Read article <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* Rest of posts */}
          <div className="grid cols-2" style={{ gap: 20 }}>
            {rest.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                    <span className="badge" style={{ fontSize: 11 }}>{post.category}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>{post.dateDisplay} · {post.readTime}</span>
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "var(--text)", lineHeight: 1.3, flex: 1 }}>{post.title}</h2>
                  <p className="p" style={{ marginBottom: 0, fontSize: 13 }}>{post.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--accent)", fontWeight: 700, fontSize: 13, marginTop: "auto" }}>
                    Read more <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="surface" style={{ background: "transparent" }}>
        <div className="section" style={{ paddingTop: 20 }}>
          <div className="card cardHighlight" style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 240px" }}>
              <h3 className="h3" style={{ marginBottom: 8 }}>Ready to put these ideas to work?</h3>
              <p className="p" style={{ marginBottom: 0 }}>Start with a free website audit. Boyd will tell you what your current site is missing and what it would take to fix it.</p>
            </div>
            <Link className="btn primary" to="/contact" style={{ flexShrink: 0 }}>Get a Free Audit</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

