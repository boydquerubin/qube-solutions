# RubyxQube — Standard Operating Procedures

> Reference this any time you're onboarding a client, building a site, or doing monthly care.  
> Update it whenever you discover a better way to do something.  
> Last updated: June 2026 — SEO and contact form standard locked in.

> **Non-negotiables on every site we ship:**
> 1. **Contact form must work** — `/api/contact.js` via Resend free tier. Never Formspree. Test a real submission before launch.
> 2. **SEO must be set** — unique title + meta description on every page, LocalBusiness JSON-LD schema, Open Graph tags. This is literally what we sell. It cannot slip.

---

## Quick Reference — Tools in Use

| Tool | Purpose | Status |
|------|---------|--------|
| Vercel | Hosting (rubyxqube.com + all client sites) | ✅ Live |
| GitHub | Code storage (one private repo per client) | ✅ Live |
| Anthropic API | AI chatbot (Claude Haiku) | ✅ Live |
| Twilio | SMS lead alerts (A2P 10DLC registered) | ✅ Live |
| Resend | Email alerts + **contact form submissions** + client emails | ✅ Live |
| GA4 | Analytics (one property per client) | ✅ Live |
| Wave | Invoicing + bookkeeping | ⬜ Set up |
| Notion | CRM + client pages | ✅ Live |
| 1Password | Credentials + API keys | ⬜ Set up |
| Cal.com | Book audit calls | ✅ Live |
| UptimeRobot | Site uptime monitoring | ⬜ Set up |
| Google Workspace | boyd@rubyxqube.com | ⬜ Set up |

---

## 1. Lead Intake

### Where leads come from
- Website contact form (Contact.jsx → `/api/contact.js` via Resend, live)
- Direct referral / warm intro
- Cold outreach (you reaching out to them)
- Google Business Profile

### What to do when a lead comes in
1. Reply within 4 hours (text or email)
2. Ask 3 qualifying questions:
   - What type of business do you run?
   - Do you currently have a website?
   - What's your main goal — get more leads, look more professional, both?
3. If qualified → book a 15-min Free Audit call (Cal.com)
4. Add to Notion CRM board: **Stage: Lead**

### Disqualify if:
- They want e-commerce or a product shop (out of scope)
- Budget under $1,500
- Outside your service area and outside your bandwidth

---

## 2. Free Audit Call (15 minutes)

**Goal:** Show them exactly what's wrong with their current situation and what you'd fix.

### Before the call
- Look up their business on Google (GBP, reviews, existing site)
- Check their site on mobile (most problems are obvious in 2 minutes)
- Note: missing CTAs, slow load, no contact info visible, outdated design

### On the call
1. "Tell me about your business and who your best customers are." (2 min)
2. Walk through their current site — "Here's what I noticed…" (5 min)
3. Explain the gap: visitors → no leads → losing jobs to faster competitors (2 min)
4. Present the right package (3 min)
5. Answer questions + next step (3 min)

### After the call
- Send a follow-up email within 1 hour:
  - Summary of what you found
  - Recommended package + price
  - Link to sign the proposal
- Move Notion stage to: **Proposal Sent**

---

## 3. Proposal & Contract

### Proposal template (Google Doc or Notion)
```
Client: [Business Name]
Package: [Launch / Autopilot / Momentum]
Setup Fee: $[amount]
Monthly: $[amount]/mo (if applicable)
Timeline: [X] weeks from signed contract + deposit
Includes: [bullet list from package]
Add-ons: [any extras quoted]

To proceed: sign this proposal + 50% deposit
```

### Generated HTML/PDF proposals and agreements
When Claude generates a proposal or agreement document, save to:
```
C:\Users\boydi\Projects\rubyxqube\clients\[client-slug]\Proposals\
```
File naming convention: `[SLUG]-[TYPE]-[DATE].html` / `.pdf`
Example: `PSW-B2B-Proposal-2026-05-28.html`

Do NOT save to Downloads — they get buried and lost.

### Contract & E-Signature
**Current process (until signing page is built):**
- Use the service agreement template (downloaded from Bonsai, customized for RubyxQube — see LEGAL.md)
- Email PDF to client, ask them to reply with "I agree" + their typed name (legally binding under E-SIGN Act + Idaho UETA)
- Save their reply as part of the contract record

**Future process (once built — see AUTOMATION.md §0):**
- Run: `node scripts/send-contract.mjs --slug "[client]" --package "[package]" --setup [price] --monthly [price]`
- Client receives email with unique `/sign/[token]` link
- They read + type their name → Puppeteer PDF generated → emailed to both parties → provisioning auto-triggers

### Payment
- 50% deposit to start (invoice via Wave)
- 50% on launch day (invoice via Wave)
- Monthly retainer: Wave auto-recurring invoice on 1st of month
- Accepted: bank transfer, Zelle (no fee), card via Wave (2.9% + 30¢)

---

## 4. Client Onboarding

Once contract is signed and deposit received:

### Automated (once provision script is built)
```
node scripts/provision-client.mjs --slug "[clientslug]" --name "[Business Name]"
```
Creates GitHub repo from template + Vercel project automatically. Until then, do manually.

### Manual setup checklist
- [ ] Create private GitHub repo: `[clientslug]-site` (fork from `client-template`)
- [ ] Create Vercel project linked to that repo
- [ ] Add env vars to Vercel: `ANTHROPIC_API_KEY`, `ALERT_PHONE_NUMBER`, Twilio vars, `RESEND_API_KEY`, `ALERT_EMAIL`
- [ ] Add all credentials to 1Password under `[Client Name]` vault
- [ ] Create client page in Notion CRM (move stage to: **Active Build**)
- [ ] Create GA4 property for client, share read access with their Google account

### Local folder structure (gitignored, lives in the project)
```
rubyxqube/
  clients/
    [client-slug]/
      Proposals/     ← generated HTML + PDF proposals and agreements
      Assets/        ← logos, photos client provides
      Copy/          ← content drafts, approved copy
      Deliverables/  ← final exports, screenshots
      Reports/       ← monthly report PDFs
  legal/             ← LLC docs, trademark receipts, master templates
```
All client and legal files are gitignored — they stay local, never pushed to GitHub.

### Notion client page should include
- Business name, owner name, contact info
- Package + add-ons + pricing
- Domain name + registrar
- Vercel project URL + GitHub repo link
- 1Password vault link
- GA4 property ID
- Timeline + milestones
- Notes from kickoff call
- Monthly report log

### Kickoff call (30–45 min)
Run through the Onboarding Questionnaire (see Section 5).  
Record the call (ask permission) — useful reference during build.  
After call: move Notion stage to **Active Build**.

---

## 5. Onboarding Questionnaire

> **Send them this instead of asking by hand:**
> ### https://rubyxqube.com/project-brief
>
> Unlisted and noindex, so it is not in the nav and will not be found by
> search. You send the link. It saves as they type so it can be done in two
> sittings on a phone, and on submit it emails you (reply-to set to them),
> emails them a copy of their own answers, and writes a row to `leads` with
> source `project_brief` so it shows up in the portal's Leads tab.
>
> Sending it BEFORE the agreement is deliberate. It is a qualification
> instrument as much as an intake form: someone who returns it inside a week is
> a good client, and someone who needs three chases will need three chases
> forever. See `MARKETING-PACKAGES.md`.
>
> Page source: `src/pages/ProjectBrief.jsx`, endpoint `api/project-brief.js`.

The questions below are what that page asks, kept here for the kickoff call and
for anyone who would rather run through it live.

**Business Basics**
- Business name (exactly as it should appear)
- Tagline (if they have one)
- City + service area (zip codes or neighborhoods?)
- Business phone + email
- Hours of operation

**Services**
- List all services you offer
- Which are the most profitable / most in-demand?
- Any services you don't want to advertise?
- Do you offer free estimates?

**Pricing** (for AI chatbot training)
- Typical price range per job or service?
- Do you charge by the hour or flat rate?
- Anything you can't quote without a site visit?

**Target Customer**
- Describe your ideal customer (homeowner, property manager, commercial, etc.)
- What's the most common question customers ask you?
- What objections do customers have before hiring you?

**Competitors**
- Who are your 2–3 main local competitors?
- What do you do better than them?

**Website Goals**
- What do you want visitors to do? (call, fill form, book?)
- Any pages you specifically want? (gallery, testimonials, FAQ?)
- Any sites you like the look of? (send 1–3 examples)

**Assets**
- Do you have a logo? (get SVG or PNG with transparent bg)
- Photos of your work? (get at least 10–15 high-res)
- Any existing reviews we can feature?

**AI Chatbot (Autopilot/Momentum only)**
- Paste your 5 most common customer questions + your answers
- What should the bot do if someone asks for pricing? (give range, or say "get a quote"?)
- What's the call-to-action — book a call, fill a form, call you directly?
- SMS number for lead alerts (can be same as business phone)

---

## 6. Website Build Process

### Week 1
- [ ] Register domain (Namecheap or Google Domains)
- [ ] Set up hosting (Vercel — free tier for static/React sites)
- [ ] Scaffold site (clone RubyxQube template or start fresh)
- [ ] Write copy from onboarding notes (or send to client for review)
- [ ] Build: Home, About, Services pages
- [ ] **SEO — set on every page before touching Week 2:**
  - Unique `<title>` tag (format: "Service | Business Name | City")
  - Unique `<meta name="description">` (120–155 chars, local keyword + CTA)
  - Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
  - LocalBusiness JSON-LD schema on Home (name, address, phone, url, openingHours, serviceArea)
  - All images have `alt` text
- [ ] First internal review — mobile check, links work, forms work

### Week 2
- [ ] Build: Gallery, Quote/Contact, Privacy pages
- [ ] Integrate Google Maps embed
- [ ] **Set up contact form** — `/api/contact.js` serverless function using `RESEND_API_KEY`. Never Formspree. Test a real submission (check inbox). Form must send to `ALERT_EMAIL` and reply-to visitor's email.
- [ ] Add Google Analytics 4
- [ ] Verify SEO from Week 1 renders correctly in production preview (view-source, check title/meta/schema)
- [ ] Deploy preview to Vercel (share preview URL with client)
- [ ] Collect Revision Round 1 feedback

### Week 3
- [ ] Apply revisions
- [ ] For Autopilot/Momentum: deploy AI chatbot (Claude API via Anthropic, train on their data)
- [ ] Test chatbot: run 10 sample conversations, verify lead capture + SMS alert
- [ ] Revision Round 2 (final round)
- [ ] DNS cutover — go live
- [ ] Post-launch check: all pages load, forms submit, phone/email links work on mobile

---

## 7. AI Chatbot Setup (Autopilot / Momentum)

### What you need before building
- Completed onboarding questionnaire (Section 5)
- Business services + pricing info
- 5–10 FAQ pairs (question + answer)
- Service area (cities, zip codes)
- SMS number for lead alerts

### Build checklist
- [ ] Confirm Anthropic API key is in Vercel env vars (ANTHROPIC_API_KEY — stored in 1Password)
- [ ] Create system prompt using client's business info
- [ ] Configure lead capture fields: name, phone, what they need
- [ ] Set up SMS alert (Twilio or similar) — fires when lead is captured
- [ ] Embed chatbot widget on client's site
- [ ] Test: visit the site as a customer, run 10 conversations
- [ ] Verify SMS alerts arrive correctly
- [ ] Document the system prompt in the client's Notion page

### System prompt structure (template)
```
You are [Business Name]'s virtual receptionist. Your job is to help website visitors
get quick answers and connect them with the team.

Business: [Business Name]
Services: [list]
Service Area: [cities]
Hours: [hours]
Phone: [phone]
Typical Pricing: [range or policy]

Common questions:
Q: [question] → A: [answer]
...

When a visitor is interested in getting a quote or booking, collect:
1. Their name
2. Their phone number (or email)
3. What service they need
4. When they need it

After collecting this info, let them know the team will be in touch shortly.
Do not make up prices you are unsure of. Offer to connect them with the team instead.
```

---

## 8. Launch Checklist

Run this before going live with every site.

**Technical**
- [ ] All pages load without errors
- [ ] No broken links (internal + external)
- [ ] Contact form sends correctly (test submission)
- [ ] Click-to-call links work on mobile
- [ ] Google Maps embed loads
- [ ] Site loads fast on mobile (test on real phone, not just Chrome DevTools)
- [ ] SSL certificate active (https://)
- [ ] 404 page exists and looks good
- [ ] Vercel SPA rewrite rule in place (if React Router)

**SEO** ← this is what we sell. Every box must be checked.
- [ ] Every page has a unique `<title>` tag ("Service | Business Name | City" format)
- [ ] Every page has a unique `<meta name="description">` (120–155 chars)
- [ ] Open Graph tags present (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] LocalBusiness JSON-LD schema on Home page (name, address, phone, openingHours, serviceArea)
- [ ] All images have descriptive `alt` text
- [ ] Google Analytics 4 installed and tracking (verify a pageview fires)
- [ ] Google Search Console verified and sitemap submitted
- [ ] sitemap.xml accessible at /sitemap.xml
- [ ] Nothing in the sitemap answers with a noindex tag. Scheduled blog posts and
      unlisted pages are the two that catch people out: submitting a URL that
      refuses to be indexed is what triggers Search Console's "Excluded by
      'noindex' tag" warning. On rubyxqube.com the sitemap is generated per
      request by api/sitemap.js so it cannot drift. npm test guards it.
- [ ] Google Business Profile updated with new website URL
- [ ] Page speed ≥ 85 on PageSpeed Insights mobile (images WebP, no render-blocking scripts)

**Contact Form** ← must work before launch, no exceptions
- [ ] Contact form submits successfully (send a real test from your phone)
- [ ] Boyd receives the email at `ALERT_EMAIL` within 60 seconds
- [ ] Reply-to on the email is the visitor's address so you can reply directly
- [ ] Form shows a success message (not a redirect to a Formspree URL)

**AI Chatbot (if applicable)**
- [ ] Chatbot loads on all pages
- [ ] Lead capture works end-to-end
- [ ] SMS alert fires correctly
- [ ] Chatbot has been tested with 10 sample conversations

**Client Handoff**
- [ ] Send client a "Here's what you now have" summary email
- [ ] Walk them through the chatbot SMS alerts (show them what it looks like)
- [ ] Confirm monthly report date (1st of month)
- [ ] Send invoice for final 50% payment
- [ ] Confirm "Built and powered by RubyxQube" footer credit is live — stored in `siteConfig.credit`, rendered conditionally in Footer. Removable for $150 one-time (delete the `credit` field from siteConfig.js when paid)
- [ ] Ask for a Google review at the bottom of the launch email — this is peak happiness. Use the template in `docs/templates/REVIEW-OUTREACH.md`. Review link: https://g.page/r/CUHmU0rIL7VhEBM/review

---

## 9. Monthly Care Routine

Do this for every Autopilot and Momentum client on the 1st of each month.

### Autopilot ($499/mo)
- [ ] Pull GA4 data: sessions, top pages, contact form submissions
- [ ] Pull GSC data: top search queries, impressions, clicks, avg position
- [ ] Check GSC Coverage report for any new indexing errors
- [ ] Pull chatbot data: conversations, leads captured
- [ ] Fill out monthly report template (GA4 + GSC + chatbot + site updates) → send to client
- [ ] Send weekly check-in text (every Monday — just "Hey [Name], site running well this week — [one highlight]")
- [ ] Work the edit request queue (unlimited requests, one active at a time)
- [ ] Check site speed (PageSpeed Insights) — flag if score drops below 80

### Autopilot blog (add after standard tasks)
- [ ] **Blog posts:** draft 4 posts for the month (use Claude, topic brief per client's industry), send to client for approval. If no response within 48 hours, default-approve and publish on schedule. One approval round per batch.

### Momentum ($999/mo, everything above plus)
- [ ] Check Google Business Profile: new reviews? Questions? Update hours/info if needed. If fewer than 10 reviews, include a gentle review ask in the report email — use template in `docs/templates/REVIEW-OUTREACH.md`
- [ ] AI receptionist tuning: pull chatbot conversation logs from Vercel, look for fumbled questions, pricing confusion, or drop-offs, update system prompt with improvements
- [ ] **Blog posts:** draft 4 posts for the month (use Claude, topic brief per client's industry), send to client for approval — if no response within 48 hours, default-approve and post on schedule. One approval round per batch, then schedule all 4.
- [ ] Note any custom tool requests or site ideas from the client — add to their backlog in Notion
- [ ] Weekly check-in calls (30–60 min, as needed) — these happen throughout the month, not just on the 1st

<!-- TODO: When you have 3+ Momentum clients, automate the AI tuning step above:
     per-client agent pulls logs, summarizes patterns, drafts system prompt improvements for your review.
     Lives in this repo under scripts/momentum-tuning/. -->


---

## 10. Offboarding

If a client cancels (30 days notice required):

- [ ] Final month billed in full
- [ ] Transfer all assets: domain (if registered under your account), hosting, GA4
- [ ] Export and send all files (site code, assets, copy docs)
- [ ] Remove AI chatbot API key from their site
- [ ] Archive their Notion page and Google Drive folder
- [ ] Send a professional farewell email — leave the door open
- [ ] Ask for a Google review before they leave

---

## Tools Stack

| Tool | Purpose | Cost | Status |
|------|---------|------|--------|
| Vercel | Hosting — rubyxqube.com + all client sites | Free (Hobby) | ✅ Live |
| GitHub | Code — one private repo per client | Free | ✅ Live |
| Anthropic API | AI chatbot — Claude Haiku per client | ~$1–3/mo/client | ✅ Live |
| Twilio | SMS lead alerts — A2P 10DLC registered | ~$1–2/mo/client | ✅ Live |
| Resend | Email alerts + contact form submissions + automated client emails | Free (3,000/mo) | ✅ Live |
| Google Analytics 4 | Site analytics — one property per client | Free | ✅ Live |
| Google Search Console | SEO monitoring per client | Free | ✅ Live |
| UptimeRobot | Uptime monitoring — all client sites | Free (50 monitors) | ⬜ Set up |
| Wave | Invoicing + bookkeeping + auto-recurring | Free | ⬜ Set up |
| Notion | CRM + client pages + SOPs | Free | ⬜ Set up |
| 1Password | Credentials + API keys — one vault per client | ~$3/mo | ⬜ Set up |
| Google Workspace | boyd@rubyxqube.com | $6/mo | ⬜ Set up |
| Cal.com | Book audit calls | Free | ✅ Live |
| Custom signing page | Contract e-signature — legally binding, $0/mo | Free (build it) | ⬜ Build |
| Google Drive | File storage per client | Free | ✅ Use now |

> See COSTS.md for full cost breakdown and margin analysis.  
> See AUTOMATION.md for what gets automated and when to build it.  
> See CLIENT_HOSTING.md for the per-client GitHub/Vercel/domain setup.
