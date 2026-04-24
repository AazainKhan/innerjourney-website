// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "home",
        label: "Home Page",
        path: "content/pages",
        match: { include: "home" },
        format: "json",
        ui: { router: () => "/" },
        fields: [
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "heroCTALabel", label: "Hero CTA Button Label", type: "string" },
          { name: "heroBottomCTALabel", label: "Hero Secondary CTA Label", type: "string" },
          { name: "ctaHeading", label: "Mid-CTA Heading", type: "string" },
          { name: "ctaLine1", label: "Mid-CTA Line 1", type: "string" },
          { name: "ctaLine2", label: "Mid-CTA Line 2", type: "string" },
          { name: "ctaLine3", label: "Mid-CTA Line 3", type: "string" },
          { name: "ctaMessage1", label: "Mid-CTA Message 1", type: "string", ui: { component: "textarea" } },
          { name: "ctaMessage2", label: "Mid-CTA Message 2", type: "string", ui: { component: "textarea" } },
          { name: "aboutHeading", label: "About Section Heading", type: "string" },
          { name: "aboutCredentialTitle", label: "About Credential Subtitle", type: "string" },
          { name: "aboutParagraph1", label: "About Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "aboutParagraph2", label: "About Paragraph 2", type: "string", ui: { component: "textarea" } },
          { name: "feelLikeYouHeading", label: '"Feel Like YOU Again" Heading', type: "string" },
          { name: "feelLikeYouTagline", label: '"Feel Like YOU Again" Tagline', type: "string" },
          { name: "feelLikeYouQuestion1", label: '"Feel Like YOU" Question 1', type: "string" },
          { name: "feelLikeYouQuestion2", label: '"Feel Like YOU" Question 2', type: "string" },
          { name: "feelLikeYouQuestion3", label: '"Feel Like YOU" Question 3', type: "string" },
          { name: "feelLikeYouQuestion4", label: '"Feel Like YOU" Question 4', type: "string" },
          { name: "servicesHeading", label: "Services Section Heading", type: "string" },
          { name: "servicesSubtext", label: "Services Section Subtext", type: "string", ui: { component: "textarea" } },
          { name: "bottomCTAText", label: "Bottom CTA Text", type: "string", ui: { component: "textarea" } }
        ]
      },
      {
        name: "about",
        label: "About Page",
        path: "content/pages",
        match: { include: "about" },
        format: "json",
        ui: { router: () => "/about" },
        fields: [
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "storyHeading", label: "Story Section Heading", type: "string" },
          { name: "storyParagraph1", label: "Story Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "storyParagraph2", label: "Story Paragraph 2", type: "string", ui: { component: "textarea" } },
          { name: "credentialsHeading", label: "Credentials Heading", type: "string" },
          { name: "credentialsSubtext", label: "Credentials Subtext", type: "string", ui: { component: "textarea" } },
          {
            name: "credentials",
            label: "Credentials",
            type: "object",
            list: true,
            fields: [
              { name: "icon", label: "Font Awesome Icon Class", type: "string" },
              { name: "title", label: "Title", type: "string" },
              { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
              { name: "gradient", label: "Gradient CSS Classes", type: "string" }
            ]
          },
          { name: "valuesHeading", label: "Values Heading", type: "string" },
          { name: "valuesSubtext", label: "Values Subtext", type: "string", ui: { component: "textarea" } },
          {
            name: "values",
            label: "Values",
            type: "object",
            list: true,
            fields: [
              { name: "icon", label: "Font Awesome Icon Class", type: "string" },
              { name: "title", label: "Title", type: "string" },
              { name: "description", label: "Description", type: "string", ui: { component: "textarea" } }
            ]
          },
          { name: "ctaHeading", label: "CTA Section Heading", type: "string" },
          { name: "ctaSubtext", label: "CTA Section Subtext", type: "string", ui: { component: "textarea" } },
          { name: "ctaButtonLabel", label: "CTA Button Label", type: "string" }
        ]
      },
      {
        name: "clarityCoaching",
        label: "Clarity Coaching Page",
        path: "content/pages",
        match: { include: "clarity-coaching" },
        format: "json",
        ui: { router: () => "/clarity-coaching" },
        fields: [
          { name: "heroBadge", label: "Hero Badge", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "heroCTALabel", label: "Hero CTA Button", type: "string" },
          { name: "heroSideEmoji", label: "Hero Side Emoji", type: "string" },
          { name: "heroSideWeeks", label: "Hero Side Weeks", type: "string" },
          { name: "heroSideSubtext", label: "Hero Side Subtext", type: "string" },
          { name: "resultsHeadingPrefix", label: "Results Heading", type: "string" },
          { name: "resultsHeadingHighlight", label: "Results Heading Highlight", type: "string" },
          { name: "resultsSubtext", label: "Results Subtext", type: "string", ui: { component: "textarea" } },
          { name: "perhapsLabel", label: `"Perhaps you're\u2026" Label`, type: "string" },
          {
            name: "perhapsItems",
            label: `"Perhaps you're\u2026" Items`,
            type: "object",
            list: true,
            fields: [
              { name: "emoji", label: "Emoji", type: "string" },
              { name: "text", label: "Text", type: "string" },
              { name: "borderColor", label: "Border Color (border-carrot / border-azure)", type: "string" }
            ]
          },
          { name: "bannerText", label: "Banner Text", type: "string", ui: { component: "textarea" } },
          { name: "bannerHighlight", label: "Banner Highlight", type: "string" },
          { name: "missingPieceHeadingPrefix", label: "Missing Piece Heading", type: "string" },
          { name: "missingPieceHeadingHighlight", label: "Missing Piece Heading Highlight", type: "string" },
          { name: "problemTitle", label: "Problem Card Title", type: "string" },
          { name: "problemParagraph1", label: "Problem Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "problemQuestion", label: 'Problem Question (e.g. "Why?")', type: "string" },
          { name: "problemParagraph2", label: "Problem Paragraph 2", type: "string", ui: { component: "textarea" } },
          { name: "problemParagraph3", label: "Problem Paragraph 3", type: "string", ui: { component: "textarea" } },
          { name: "solutionTitle", label: "Solution Card Title", type: "string" },
          { name: "solutionParagraph1", label: "Solution Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "solutionEmphasis", label: "Solution Emphasis", type: "string" },
          { name: "solutionParagraph2", label: "Solution Paragraph 2", type: "string", ui: { component: "textarea" } },
          { name: "solutionWord", label: "Solution Big Word", type: "string" },
          { name: "philosophyLabel", label: "Philosophy Label", type: "string" },
          { name: "philosophyHeadingPrefix", label: "Philosophy Heading", type: "string" },
          { name: "philosophyHeadingHighlight", label: "Philosophy Heading Highlight", type: "string" },
          { name: "philosophyQuote", label: "Philosophy Quote", type: "string", ui: { component: "textarea" } },
          { name: "philosophyParagraph1", label: "Philosophy Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "philosophyParagraph2", label: "Philosophy Paragraph 2", type: "string", ui: { component: "textarea" } },
          { name: "philosophyBannerPrefix", label: "Philosophy Banner", type: "string", ui: { component: "textarea" } },
          { name: "philosophyBannerHighlight", label: "Philosophy Banner Highlight", type: "string" },
          { name: "philosophyClosingPrefix", label: "Philosophy Closing", type: "string", ui: { component: "textarea" } },
          { name: "philosophyClosingHighlight", label: "Philosophy Closing Highlight", type: "string" },
          { name: "timelineLabel", label: "Timeline Label", type: "string" },
          { name: "timelineHeadingPrefix", label: "Timeline Heading", type: "string" },
          { name: "timelineHeadingHighlight", label: "Timeline Heading Highlight", type: "string" },
          { name: "timelineSubtext", label: "Timeline Subtext", type: "string", ui: { component: "textarea" } },
          {
            name: "timelineSteps",
            label: "Timeline Steps",
            type: "object",
            list: true,
            fields: [
              { name: "number", label: "Step Number", type: "string" },
              { name: "weeks", label: "Weeks Label", type: "string" },
              { name: "title", label: "Title", type: "string" },
              { name: "subtitle", label: "Subtitle", type: "string" },
              { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
              { name: "accent", label: "Accent (carrot / azure)", type: "string" }
            ]
          },
          { name: "timelineCTALabel", label: "Timeline CTA Button", type: "string" },
          { name: "experienceLabel", label: "Experience Label", type: "string" },
          { name: "experienceHeadingPrefix", label: "Experience Heading", type: "string" },
          { name: "experienceHeadingHighlight", label: "Experience Heading Highlight", type: "string" },
          {
            name: "experienceItems",
            label: "Experience Items",
            type: "object",
            list: true,
            fields: [
              { name: "emoji", label: "Emoji", type: "string" },
              { name: "title", label: "Title", type: "string" },
              { name: "subtitle", label: "Subtitle", type: "string" },
              { name: "bg", label: "Background Class (bg-carrot/10 or bg-azure/10)", type: "string" }
            ]
          },
          { name: "bonusEmoji", label: "Bonus Emoji", type: "string" },
          { name: "bonusPrefix", label: "Bonus Prefix", type: "string" },
          { name: "bonusText", label: "Bonus Text", type: "string" },
          { name: "ctaSectionHeadingPrefix", label: "Bottom CTA Heading", type: "string" },
          { name: "ctaSectionHeadingHighlight", label: "Bottom CTA Heading Highlight", type: "string" },
          { name: "ctaSectionParagraph1", label: "Bottom CTA Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "ctaSectionParagraph2", label: "Bottom CTA Paragraph 2", type: "string" },
          { name: "ctaButtonLabel", label: "Bottom CTA Button", type: "string" }
        ]
      },
      {
        name: "careerCoaching",
        label: "Career Coaching Page",
        path: "content/pages",
        match: { include: "career-coaching" },
        format: "json",
        ui: { router: () => "/career-coaching" },
        fields: [
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtextPrefix", label: "Hero Subtext", type: "string" },
          { name: "heroSubtextHighlight", label: "Hero Subtext Highlight", type: "string" },
          { name: "heroCTALabel", label: "Hero CTA Button", type: "string" },
          { name: "resultsHeadingPrefix", label: "Results Heading", type: "string" },
          { name: "resultsHeadingHighlight", label: "Results Heading Highlight", type: "string" },
          { name: "resultsSubtext", label: "Results Subtext", type: "string", ui: { component: "textarea" } },
          { name: "perhapsLabel", label: `"Perhaps you're\u2026" Label`, type: "string" },
          { name: "situations", label: "Situations", type: "string", list: true },
          { name: "bannerPrefix", label: "Banner Prefix", type: "string" },
          { name: "bannerHighlight", label: "Banner Highlight", type: "string" },
          { name: "clarityHeadingPrefix", label: "Clarity Heading", type: "string" },
          { name: "clarityHeadingHighlight", label: "Clarity Heading Highlight", type: "string" },
          { name: "clarityParagraph1", label: "Clarity Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "clarityQuestion", label: "Clarity Question", type: "string" },
          { name: "clarityParagraph2", label: "Clarity Paragraph 2", type: "string" },
          { name: "clarityParagraph3", label: "Clarity Paragraph 3", type: "string", ui: { component: "textarea" } },
          { name: "clarityEmphasis", label: "Clarity Emphasis", type: "string" },
          { name: "clarityParagraph4", label: "Clarity Paragraph 4", type: "string", ui: { component: "textarea" } },
          { name: "clarityParagraph5", label: "Clarity Paragraph 5", type: "string", ui: { component: "textarea" } },
          { name: "clarityBigWord", label: "Clarity Big Word", type: "string" },
          { name: "philosophyHeadingPrefix", label: "Philosophy Heading", type: "string" },
          { name: "philosophyHeadingHighlight", label: "Philosophy Heading Highlight", type: "string" },
          { name: "philosophyParagraph1", label: "Philosophy Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "philosophyParagraph2Prefix", label: "Philosophy Paragraph 2", type: "string", ui: { component: "textarea" } },
          { name: "philosophyParagraph2Highlight", label: "Philosophy Paragraph 2 Highlight", type: "string" },
          { name: "philosophyParagraph3", label: "Philosophy Paragraph 3", type: "string", ui: { component: "textarea" } },
          { name: "philosophyEmphasis", label: "Philosophy Emphasis", type: "string" },
          { name: "philosophyClosing", label: "Philosophy Closing", type: "string", ui: { component: "textarea" } },
          { name: "imagineHeadingHighlight", label: "Imagine Heading Highlight", type: "string" },
          {
            name: "imagineItems",
            label: "Imagine Items",
            type: "object",
            list: true,
            fields: [
              { name: "emoji", label: "Emoji", type: "string" },
              { name: "text", label: "Text", type: "string" },
              { name: "borderColor", label: "Border Color (border-carrot / border-azure)", type: "string" },
              { name: "bg", label: "Background Gradient (from-x to-y)", type: "string" }
            ]
          },
          { name: "roadmapHeadingPrefix", label: "Roadmap Heading", type: "string" },
          { name: "roadmapHeadingHighlight", label: "Roadmap Heading Highlight", type: "string" },
          { name: "roadmapSubtext1", label: "Roadmap Subtext 1", type: "string" },
          { name: "roadmapSubtext2", label: "Roadmap Subtext 2", type: "string" },
          {
            name: "roadmapSteps",
            label: "Roadmap Steps",
            type: "object",
            list: true,
            fields: [
              { name: "number", label: "Step Number", type: "string" },
              { name: "weeks", label: "Weeks Label", type: "string" },
              { name: "title", label: "Title", type: "string" },
              { name: "subtitle", label: "Subtitle", type: "string" },
              { name: "subtitleColor", label: "Subtitle Color Class", type: "string" },
              { name: "description", label: "Description", type: "string", ui: { component: "textarea" } }
            ]
          },
          { name: "roadmapCTALabel", label: "Roadmap CTA Button", type: "string" },
          { name: "experienceHeadingPrefix", label: "Experience Heading", type: "string" },
          { name: "experienceHeadingHighlight", label: "Experience Heading Highlight", type: "string" },
          { name: "experienceSubtext", label: "Experience Subtext", type: "string" },
          { name: "experienceItems", label: "Experience Items", type: "string", list: true },
          { name: "ctaSectionHeadingPrefix", label: "Bottom CTA Heading", type: "string" },
          { name: "ctaSectionHeadingHighlight", label: "Bottom CTA Heading Highlight", type: "string" },
          { name: "ctaSectionParagraph1", label: "Bottom CTA Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "ctaSectionParagraph2", label: "Bottom CTA Paragraph 2", type: "string" },
          { name: "ctaButtonLabel", label: "Bottom CTA Button", type: "string" }
        ]
      },
      {
        name: "numerology",
        label: "Numerology Page",
        path: "content/pages",
        match: { include: "numerology" },
        format: "json",
        ui: { router: () => "/numerology" },
        fields: [
          { name: "heroBadge", label: "Hero Badge", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroTagline", label: "Hero Tagline", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "heroCTALabel", label: "Hero CTA Button", type: "string" },
          { name: "selfDiscoveryHeadingPrefix", label: "Self-Discovery Heading", type: "string" },
          { name: "selfDiscoveryHeadingHighlight", label: "Self-Discovery Heading Highlight", type: "string" },
          { name: "selfDiscoverySubtext", label: "Self-Discovery Subtext", type: "string", ui: { component: "textarea" } },
          {
            name: "selfDiscoveryItems",
            label: "Self-Discovery Items",
            type: "object",
            list: true,
            fields: [
              { name: "emoji", label: "Emoji", type: "string" },
              { name: "text", label: "Text", type: "string", ui: { component: "textarea" } },
              { name: "borderColor", label: "Border Color Class (border-carrot / border-azure)", type: "string" }
            ]
          },
          { name: "selfDiscoveryStatementPrefix", label: "Self-Discovery Statement", type: "string" },
          { name: "selfDiscoveryStatementHighlight", label: "Self-Discovery Statement Highlight", type: "string" },
          { name: "whatIsLabel", label: '"What Is" Section Label', type: "string" },
          { name: "whatIsHeadingPrefix", label: '"What Is" Heading', type: "string" },
          { name: "whatIsHeadingHighlight", label: '"What Is" Heading Highlight', type: "string" },
          { name: "whatIsIsntParagraph", label: `"What It Isn't" Paragraph`, type: "string", ui: { component: "textarea" } },
          { name: "whatIsIsParagraph1", label: '"What It Is" Paragraph 1', type: "string", ui: { component: "textarea" } },
          { name: "whatIsIsParagraph2", label: '"What It Is" Paragraph 2', type: "string", ui: { component: "textarea" } },
          { name: "processLabel", label: "Process Section Label", type: "string" },
          { name: "processHeadingPrefix", label: "Process Heading", type: "string" },
          { name: "processHeadingHighlight", label: "Process Heading Highlight", type: "string" },
          {
            name: "processSteps",
            label: "Process Steps",
            type: "object",
            list: true,
            fields: [
              { name: "emoji", label: "Emoji", type: "string" },
              { name: "stepLabel", label: "Step Label (e.g. Step One)", type: "string" },
              { name: "title", label: "Title", type: "string" },
              { name: "description", label: "Description", type: "string", ui: { component: "textarea" } }
            ]
          },
          { name: "includesLabel", label: `"What You'll Receive" Label`, type: "string" },
          { name: "includesHeadingPrefix", label: `"What You'll Receive" Heading`, type: "string" },
          { name: "includesHeadingHighlight", label: `"What You'll Receive" Heading Highlight`, type: "string" },
          { name: "includesSubtext", label: `"What You'll Receive" Subtext`, type: "string" },
          {
            name: "includes",
            label: "Includes Items",
            type: "object",
            list: true,
            fields: [
              { name: "emoji", label: "Emoji", type: "string" },
              { name: "title", label: "Title", type: "string" },
              { name: "description", label: "Description", type: "string", ui: { component: "textarea" } }
            ]
          },
          { name: "philosophyLabel", label: "Philosophy Section Label", type: "string" },
          { name: "philosophyHeadingPrefix", label: "Philosophy Heading", type: "string" },
          { name: "philosophyHeadingHighlight", label: "Philosophy Heading Highlight", type: "string" },
          { name: "philosophyQuote", label: "Philosophy Quote", type: "string", ui: { component: "textarea" } },
          { name: "philosophyParagraph1", label: "Philosophy Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "philosophyParagraph2", label: "Philosophy Paragraph 2", type: "string", ui: { component: "textarea" } },
          { name: "philosophyBanner", label: "Philosophy Banner Text", type: "string", ui: { component: "textarea" } },
          { name: "philosophyClosingPrefix", label: "Philosophy Closing Text", type: "string", ui: { component: "textarea" } },
          { name: "philosophyClosingHighlight", label: "Philosophy Closing Highlight", type: "string" },
          { name: "ctaSectionHeading", label: "Bottom CTA Heading", type: "string" },
          { name: "ctaButtonLabel", label: "Bottom CTA Button", type: "string" }
        ]
      },
      {
        name: "resources",
        label: "Resources Page",
        path: "content/pages",
        match: { include: "resources" },
        format: "json",
        ui: { router: () => "/resources" },
        fields: [
          { name: "heroBadge", label: "Hero Badge Text", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroHeadingHighlight", label: "Hero Heading Highlight", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "featuredHeading", label: "Featured Section Heading", type: "string" },
          { name: "featuredBlogCategory", label: "Featured Category Tag", type: "string" },
          { name: "featuredBlogStatus", label: "Featured Status Tag", type: "string" },
          { name: "featuredBlogTitle", label: "Featured Blog Title", type: "string" },
          { name: "featuredBlogExcerpt", label: "Featured Blog Excerpt", type: "string", ui: { component: "textarea" } },
          { name: "featuredBlogReadTime", label: "Featured Read Time", type: "string" },
          { name: "featuredBlogCTA", label: "Featured CTA Label", type: "string" },
          { name: "blogSectionHeading", label: "Blog Section Heading", type: "string" },
          {
            name: "blogPosts",
            label: "Blog Posts",
            type: "object",
            list: true,
            fields: [
              { name: "title", label: "Title", type: "string" },
              { name: "excerpt", label: "Excerpt", type: "string", ui: { component: "textarea" } },
              { name: "status", label: "Status", type: "string" },
              { name: "icon", label: "Icon (fa-...)", type: "string" },
              { name: "iconColor", label: "Icon Color Class", type: "string" },
              { name: "gradient", label: "Card Gradient Class", type: "string" },
              { name: "badgeColor", label: "Badge Color Class", type: "string" }
            ]
          },
          { name: "podcastSectionHeading", label: "Podcast Section Heading", type: "string" },
          {
            name: "podcasts",
            label: "Podcasts",
            type: "object",
            list: true,
            fields: [
              { name: "episode", label: "Episode Label", type: "string" },
              { name: "title", label: "Title", type: "string" },
              { name: "excerpt", label: "Excerpt", type: "string", ui: { component: "textarea" } },
              { name: "status", label: "Status", type: "string" },
              { name: "icon", label: "Icon (fa-...)", type: "string" },
              { name: "gradient", label: "Background Gradient Class", type: "string" },
              { name: "badgeColor", label: "Badge Color Class", type: "string" }
            ]
          },
          { name: "newsletterHeading", label: "Newsletter Heading", type: "string" },
          { name: "newsletterSubtext", label: "Newsletter Subtext", type: "string", ui: { component: "textarea" } },
          { name: "newsletterPlaceholder", label: "Newsletter Email Placeholder", type: "string" },
          { name: "newsletterButton", label: "Newsletter Button Label", type: "string" },
          { name: "ctaSectionHeading", label: "Bottom CTA Heading", type: "string" },
          { name: "ctaSectionSubtext", label: "Bottom CTA Subtext", type: "string", ui: { component: "textarea" } },
          { name: "ctaButtonLabel", label: "Bottom CTA Button Label", type: "string" }
        ]
      },
      {
        name: "contact",
        label: "Contact Page",
        path: "content/pages",
        match: { include: "contact" },
        format: "json",
        ui: { router: () => "/contact" },
        fields: [
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "sectionHeading", label: "Form Section Heading", type: "string" },
          { name: "sectionSubtext", label: "Form Section Subtext", type: "string", ui: { component: "textarea" } },
          { name: "email", label: "Email Address", type: "string" },
          { name: "phone", label: "Phone Number", type: "string" },
          { name: "videoText", label: "Video Sessions Text", type: "string" },
          { name: "location", label: "Location", type: "string" },
          { name: "bookingCTALabel", label: "Book a Call Button Label", type: "string" },
          { name: "formHeading", label: 'Form Heading ("Send me a message")', type: "string" }
        ]
      },
      {
        name: "testimonials",
        label: "Testimonials",
        path: "content",
        match: { include: "testimonials" },
        format: "json",
        ui: { router: () => "/" },
        fields: [
          {
            name: "items",
            label: "Testimonials",
            type: "object",
            list: true,
            fields: [
              { name: "quote", label: "Quote", type: "string", ui: { component: "textarea" } },
              { name: "author", label: "Author (name + role)", type: "string" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
