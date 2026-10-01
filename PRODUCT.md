# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** women navigating change at work and at home. Typical clients are at a crossroads: a stalled or unsatisfying career, redundancy, a big life transition (a new baby, a move, a relationship), or a quiet sense of being "meant for more" while having it all on paper. They arrive unsure which kind of help they need, and they are deciding whether this coach, and which offer, is right for them.

Women in leadership roles are an important segment of that audience, not the whole of it. Past clients also include homemakers, students, graduates and career changers across the UK, the UAE, Canada, the USA and India. Coaching is delivered online, so location is not a filter.

## Product Purpose

Inner Journey with Shanila is the practice website of Shanila Khan, a certified Confidence and Mindset Coach based in Leeds, UK, who works with clients in the UK and online. The site explains her three offers, builds trust in her as a person and a practitioner, and turns visitors into booked **Free Discovery Calls**. The Discovery Call is the primary conversion, and a contact message is the secondary one. The blog and podcast support credibility and give people who are not ready yet a reason to come back.

Success means a visitor understands which offer fits her situation, trusts Shanila enough to book, and does so without being chased by repeated calls to action.

## Positioning

The core idea is: "Success in your outer journey starts with your inner journey." Shanila works inward first, through curiosity, self‑compassion and powerful questioning, rather than with CV rewrites, generic advice or hustle. She combines ICF‑accredited coaching and NLP with Vedic Numerology in one practice, so a client can choose structured 12‑week change or a single focused session of insight from the same trusted practitioner.

## Operating Context

- Visitors land on the Home page, a service page, a blog post or a podcast episode, usually from social media (Facebook, Instagram, YouTube, WhatsApp) or by referral.
- Booking happens in an in-page modal: an email-based form by default, or a Cal.com embed when `NEXT_PUBLIC_CAL_USERNAME` is set. The form asks which service she is interested in and includes a "Not sure yet, just exploring" option.
- Sessions take place on Zoom, Google Meet or the client's preferred platform.
- Shanila replies to booking requests within one business day.

## Capabilities and Constraints

- **Offers (all three are equal peers):**
  - **Mindset Coaching:** a 12-week, one-to-one signature programme. The CMS file and collection are still named `clarity-coaching` / `clarityCoaching`, but the route is `/mindset-coaching`.
  - **Career Coaching:** a 12-week programme. It is the career edition of the mindset coaching.
  - **Numerology:** a 1-hour Vedic Numerology session. It is presented as a reflective tool, and the site says outright that it is "not a magic wand that can predict your future."
- **Content ownership:** Shanila, who is not technical, edits copy and images herself in TinaCMS. Every surface must stay editable in Tina, with a working side-by-side preview. Don't hard-code copy that belongs in content.
- **Stack in place:** Next.js 15 App Router, React 19, TinaCMS (Tina Cloud in production), Tailwind v3 plus CSS variables, nodemailer, and hosting on Vercel. Tailwind utilities that live in content must be safelisted.
- **Theming:** Theme Studio (`/theme-studio`) sets four role colours in `content/theme.json`, with automatic contrast for text. It is an existing feature, but the user has not said it must stay the source of brand colour.
- **Terminology:** use "Confidence and Mindset Coach", "Mindset Coaching" (not "Clarity Coaching"), "Numerology" and "Free Discovery Call". "Clarity" stays as a concept word in the copy on purpose; don't remove it without asking.
- **Undecided:** no pricing is published anywhere. Don't invent prices.

## Brand Commitments

- Name: **Inner Journey with Shanila**. Practitioner: Shanila Khan. A logo exists (`images/logo_transparent*`).
- Voice: warm, direct, second person, first-person coach. It asks questions of the reader ("Does your spark feel dimmed?") and uses plain British English (programme, recognised).
- Her values, as stated on the site: Compassion, Curiosity, Clarity, Confidence.

## Evidence on Hand

- **Credentials** (`content/pages/about.json`): ICF Associate Certified Coach, Master Practitioner in NLP, Certified Emotional Intelligence Practitioner, and Vedic Numerologist. She was trained and mentored by coach Vikram Dhar. The site claims more than ten years of experience.
- **Testimonials** (`content/testimonials.json`): 9 real, attributed quotes. Some are about coaching and some about numerology, and the clients are in Dubai, the USA, Canada, the UK and India. Several involve sensitive life events (cancer, bereavement, separation).
- **Photography:** a hero image, an about portrait, and service, contact and blog images, in `images/` and `public/images/`.
- **Content:** 6 blog posts in `content/posts/` and 1 podcast episode in `content/podcasts/`.
- **Contact:** innerjourneywithshanila@gmail.com, +44 7387 973 382, Leeds, United Kingdom.
- **Absent, and not to be invented:** prices, client counts or outcome statistics, press mentions, logos of organisations she has coached, and video testimonials.

## Product Principles

1. **One gentle next step.** Every page leads to the Free Discovery Call without piling on calls to action. An earlier cleanup cut them from about 5 per page to 2 or 3, and that restraint should hold.
2. **Help her choose.** Visitors often don't know which offer they need, so the three offers must be easy to tell apart, and "not sure" should always have a clear path to a Discovery Call.
3. **Trust through the person.** Shanila's credentials, her own story and real client words carry the persuasion. Never use invented proof or pressure tactics.
4. **Respect the weight of what people bring.** Clients come through grief, illness, separation and redundancy, so the tone stays compassionate and never flippant.
5. **Owner-editable by default.** If Shanila can't change something in Tina, it isn't finished.
