// tina/config.ts
import { defineConfig } from "tinacms";
import React from "react";
function ThemeStudioIcon() {
  return React.createElement(
    "svg",
    { viewBox: "0 0 24 24", width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("circle", { cx: 13.5, cy: 6.5, r: ".5", fill: "currentColor" }),
    React.createElement("circle", { cx: 17.5, cy: 10.5, r: ".5", fill: "currentColor" }),
    React.createElement("circle", { cx: 8.5, cy: 7.5, r: ".5", fill: "currentColor" }),
    React.createElement("circle", { cx: 6.5, cy: 12.5, r: ".5", fill: "currentColor" }),
    React.createElement("path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" })
  );
}
function ThemeStudioScreen() {
  return React.createElement("iframe", {
    src: "/theme-studio",
    style: { width: "100%", height: "100%", border: 0, display: "block" },
    title: "Theme Studio"
  });
}
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  // Register a fullscreen "Theme Studio" screen accessible from the Tina admin
  // sidebar under the "Site" category. Opens the existing /theme-studio page in
  // an iframe so the editor stays a single source of truth.
  cmsCallback: (cms) => {
    cms.plugins.add({
      __type: "screen",
      name: "Theme Studio",
      Icon: ThemeStudioIcon,
      layout: "fullscreen",
      navCategory: "Site",
      Component: ThemeStudioScreen
    });
    return cms;
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
      static: false
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
        ui: { router: () => "/", allowedActions: { create: false, delete: false } },
        fields: [
          { name: "heroImage", label: "Hero Background Image", type: "image" },
          { name: "heroHeading", label: "Hero Heading", type: "rich-text" },
          { name: "heroSubtext", label: "Hero Subtext", type: "rich-text" },
          { name: "heroCTALabel", label: 'Hero Primary Button Label ("Start Your Journey")', type: "string" },
          { name: "heroBottomCTALabel", label: 'Bottom CTA Button Label ("Book a Consultation")', type: "string" },
          { name: "ctaHeading", label: "Mid-CTA Heading", type: "string" },
          { name: "ctaBody", label: "Mid-CTA Body", type: "rich-text" },
          { name: "aboutHeading", label: "About Section Heading", type: "string" },
          { name: "aboutImage", label: "About Section Image", type: "image" },
          { name: "aboutCredentialTitle", label: "About Credential Subtitle", type: "string" },
          { name: "aboutBody", label: "About Body", type: "rich-text" },
          { name: "feelLikeYouHeading", label: '"Feel Like YOU Again" Heading', type: "string" },
          { name: "feelLikeYouTagline", label: '"Feel Like YOU Again" Tagline', type: "string" },
          {
            name: "feelLikeYouQuestions",
            label: '"Feel Like YOU" Questions',
            type: "string",
            ui: { component: "textarea" }
          },
          { name: "servicesHeading", label: "Services Section Heading", type: "string" },
          { name: "servicesSubtext", label: "Services Section Subtext", type: "string", ui: { component: "textarea" } },
          {
            name: "services",
            label: "Service Cards",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: typeof item === "object" && item && "title" in item ? String(item.title || "Service") : "Service"
              })
            },
            fields: [
              { name: "title", label: "Title", type: "string" },
              { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
              { name: "icon", label: "Icon (Font Awesome class, e.g. fa-lightbulb)", type: "string" },
              { name: "href", label: "Link URL (e.g. /mindset-coaching)", type: "string" },
              { name: "buttonLabel", label: "Button Label", type: "string" },
              {
                name: "colorScheme",
                label: "Color Scheme",
                type: "string",
                options: [
                  { value: "oxford", label: "Dark navy card (light text)" },
                  { value: "orange", label: "Warm peach card (dark text)" }
                ]
              }
            ]
          },
          { name: "bottomCTAText", label: "Bottom CTA Heading Text", type: "string", ui: { component: "textarea" } }
        ]
      },
      {
        name: "services",
        label: "Services Page",
        path: "content/pages",
        match: { include: "services" },
        format: "json",
        ui: { router: () => "/services", allowedActions: { create: false, delete: false } },
        fields: [
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "rich-text" },
          {
            name: "services",
            label: "Service Cards",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: typeof item === "object" && item && "title" in item ? String(item.title || "Service") : "Service"
              })
            },
            fields: [
              { name: "title", label: "Title", type: "string" },
              { name: "duration", label: 'Duration / Subtitle (e.g. "12-Week Programme")', type: "string" },
              { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
              { name: "icon", label: "Icon (Font Awesome class, e.g. fa-lightbulb)", type: "string" },
              { name: "href", label: "Link URL (e.g. /mindset-coaching)", type: "string" },
              { name: "buttonLabel", label: "Button Label", type: "string" },
              { name: "highlights", label: "Highlights (one per line)", type: "string", ui: { component: "textarea" } },
              { name: "isThisForYou", label: '"Is this for you?" Paragraph', type: "string", ui: { component: "textarea" } },
              {
                name: "colorScheme",
                label: "Color Scheme",
                type: "string",
                options: [
                  { value: "oxford", label: "Dark navy card (light text)" },
                  { value: "orange", label: "Warm peach card (dark text)" }
                ]
              }
            ]
          },
          { name: "ctaHeading", label: "Bottom CTA Heading", type: "string" },
          { name: "ctaSubtext", label: "Bottom CTA Subtext", type: "string", ui: { component: "textarea" } },
          { name: "ctaButtonLabel", label: "Bottom CTA Button Label", type: "string" }
        ]
      },
      {
        name: "about",
        label: "About Page",
        path: "content/pages",
        match: { include: "about" },
        format: "json",
        ui: { router: () => "/about", allowedActions: { create: false, delete: false } },
        fields: [
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "rich-text" },
          { name: "storyHeading", label: "Story Section Heading", type: "string" },
          { name: "storyBody", label: "Story Body", type: "rich-text" },
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
          }
        ]
      },
      {
        name: "clarityCoaching",
        label: "Mindset Coaching Page",
        path: "content/pages",
        match: { include: "clarity-coaching" },
        format: "json",
        ui: { router: () => "/mindset-coaching", allowedActions: { create: false, delete: false } },
        fields: [
          { name: "heroBadge", label: "Hero Badge", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "rich-text" },
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
          { name: "problemBody", label: "Problem Card Body", type: "rich-text" },
          { name: "solutionTitle", label: "Solution Card Title", type: "string" },
          { name: "solutionBody", label: "Solution Card Body", type: "rich-text" },
          { name: "solutionWord", label: "Solution Big Word", type: "string" },
          { name: "philosophyLabel", label: "Philosophy Label", type: "string" },
          { name: "philosophyHeadingPrefix", label: "Philosophy Heading", type: "string" },
          { name: "philosophyHeadingHighlight", label: "Philosophy Heading Highlight", type: "string" },
          { name: "philosophyQuote", label: "Philosophy Quote", type: "string", ui: { component: "textarea" } },
          { name: "philosophyBody", label: "Philosophy Body", type: "rich-text" },
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
          { name: "ctaSectionBody", label: "Bottom CTA Body", type: "rich-text" },
          { name: "ctaButtonLabel", label: "Bottom CTA Button", type: "string" }
        ]
      },
      {
        name: "careerCoaching",
        label: "Career Coaching Page",
        path: "content/pages",
        match: { include: "career-coaching" },
        format: "json",
        ui: { router: () => "/career-coaching", allowedActions: { create: false, delete: false } },
        fields: [
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "rich-text" },
          { name: "heroCTALabel", label: "Hero CTA Button", type: "string" },
          { name: "resultsHeadingPrefix", label: "Results Heading", type: "string" },
          { name: "resultsHeadingHighlight", label: "Results Heading Highlight", type: "string" },
          { name: "resultsSubtext", label: "Results Subtext", type: "string", ui: { component: "textarea" } },
          { name: "perhapsLabel", label: `"Perhaps you're\u2026" Label`, type: "string" },
          { name: "situations", label: "Situations (one per line)", type: "string", ui: { component: "textarea" } },
          { name: "bannerPrefix", label: "Banner Prefix", type: "string" },
          { name: "bannerHighlight", label: "Banner Highlight", type: "string" },
          { name: "clarityHeadingPrefix", label: "Clarity Heading", type: "string" },
          { name: "clarityHeadingHighlight", label: "Clarity Heading Highlight", type: "string" },
          { name: "clarityBody", label: "Clarity Body", type: "rich-text" },
          { name: "clarityBigWord", label: "Clarity Big Word", type: "string" },
          { name: "philosophyHeadingPrefix", label: "Philosophy Heading", type: "string" },
          { name: "philosophyHeadingHighlight", label: "Philosophy Heading Highlight", type: "string" },
          { name: "philosophyBody", label: "Philosophy Body", type: "rich-text" },
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
          { name: "experienceItems", label: "Experience Items (one per line)", type: "string", ui: { component: "textarea" } },
          { name: "ctaSectionHeadingPrefix", label: "Bottom CTA Heading", type: "string" },
          { name: "ctaSectionHeadingHighlight", label: "Bottom CTA Heading Highlight", type: "string" },
          { name: "ctaSectionBody", label: "Bottom CTA Body", type: "rich-text" },
          { name: "ctaButtonLabel", label: "Bottom CTA Button", type: "string" }
        ]
      },
      {
        name: "numerology",
        label: "Numerology Page",
        path: "content/pages",
        match: { include: "numerology" },
        format: "json",
        ui: { router: () => "/numerology", allowedActions: { create: false, delete: false } },
        fields: [
          { name: "heroBadge", label: "Hero Badge", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroTagline", label: "Hero Tagline", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "rich-text" },
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
          { name: "whatIsIsBody", label: '"What It Is" Body', type: "rich-text" },
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
          { name: "philosophyBody", label: "Philosophy Body", type: "rich-text" },
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
        ui: { router: () => "/resources", allowedActions: { create: false, delete: false } },
        fields: [
          { name: "heroBadge", label: "Hero Badge Text", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroHeadingHighlight", label: "Hero Heading Highlight", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "featuredHeading", label: "Featured Section Heading", type: "string" },
          {
            name: "featuredPosts",
            label: "Featured Blog Posts",
            description: "Pick one or many blog posts to promote at the top of the page. Order matters. Leave empty to hide the featured section for blogs.",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                const ref = item?.post;
                if (typeof ref === "string") {
                  const m = ref.match(/(?:^|\/)([^/]+)\.md$/);
                  return { label: m ? m[1] : ref };
                }
                return { label: "Pick a blog post" };
              }
            },
            fields: [
              { name: "post", label: "Blog Post", type: "reference", collections: ["post"] }
            ]
          },
          {
            name: "featuredPodcasts",
            label: "Featured Podcast Episodes",
            description: "Pick one or many podcast episodes to promote at the top of the page. Order matters. Leave empty to hide the featured section for podcasts.",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                const ref = item?.podcast;
                if (typeof ref === "string") {
                  const m = ref.match(/(?:^|\/)([^/]+)\.md$/);
                  return { label: m ? m[1] : ref };
                }
                return { label: "Pick an episode" };
              }
            },
            fields: [
              { name: "podcast", label: "Podcast Episode", type: "reference", collections: ["podcast"] }
            ]
          },
          { name: "blogLibraryHeading", label: "Blog Library Heading", type: "string" },
          { name: "podcastLibraryHeading", label: "Podcast Library Heading", type: "string" },
          { name: "newsletterHeading", label: "Newsletter Heading", type: "string" },
          { name: "newsletterSubtext", label: "Newsletter Subtext", type: "string", ui: { component: "textarea" } },
          { name: "newsletterPlaceholder", label: "Newsletter Email Placeholder", type: "string" },
          { name: "newsletterButton", label: "Newsletter Button Label", type: "string" },
          { name: "newsletterSuccessMessage", label: "Newsletter Success Message", type: "string" }
        ]
      },
      {
        name: "contact",
        label: "Contact Page",
        path: "content/pages",
        match: { include: "contact" },
        format: "json",
        ui: { router: () => "/contact", allowedActions: { create: false, delete: false } },
        fields: [
          { name: "heroImage", label: "Hero Background Image", type: "image" },
          { name: "heroHeading", label: "Hero Heading", type: "rich-text" },
          { name: "heroSubtext", label: "Hero Subtext", type: "rich-text" },
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
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "md",
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) => {
              const title = values.title || "untitled";
              return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            }
          }
        },
        defaultItem: () => ({
          title: "New Blog Post",
          publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
          status: "Draft",
          excerpt: "Write a short excerpt for the preview card\u2026",
          icon: "fa-pen-fancy",
          iconColor: "text-carrot/40",
          gradient: "from-orange-100 to-orange-200",
          badgeColor: "bg-carrot"
        }),
        fields: [
          { name: "title", label: "Title", type: "string", isTitle: true, required: true },
          { name: "publishedAt", label: "Published Date", type: "datetime" },
          { name: "status", label: "Status", type: "string", options: ["Coming Soon", "Published", "Draft"] },
          { name: "excerpt", label: "Excerpt (shown on card)", type: "string", ui: { component: "textarea" } },
          { name: "image", label: "Cover Image (shown on the card + post hero \u2014 leave blank to use the icon below)", type: "image" },
          { name: "icon", label: "Fallback Icon (fa-class) \u2014 only used when no Cover Image is set", type: "string" },
          { name: "iconColor", label: "Fallback Icon Color Class", type: "string" },
          { name: "gradient", label: "Fallback Card Gradient Class", type: "string" },
          { name: "badgeColor", label: "Card Badge Color Class", type: "string" },
          { name: "body", label: "Body", type: "rich-text", isBody: true }
        ]
      },
      {
        name: "podcast",
        label: "Podcast Episodes",
        path: "content/podcasts",
        format: "md",
        // Podcast episodes don't have an internal page — the listing cards on
        // /resources link directly to the external Listen URL (Spotify / Apple
        // / YouTube). Preview against /resources so edits show in the library.
        ui: {
          router: () => "/resources#podcast-library",
          filename: {
            readonly: false,
            slugify: (values) => {
              const title = values.title || "untitled";
              return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            }
          }
        },
        defaultItem: () => ({
          title: "New Episode",
          episode: "Episode XX",
          publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
          status: "Coming Soon",
          excerpt: "Write a short excerpt\u2026",
          icon: "fa-microphone-alt",
          gradient: "from-carrot/30 to-orange-500/30",
          badgeColor: "bg-carrot"
        }),
        fields: [
          { name: "title", label: "Title", type: "string", isTitle: true, required: true },
          { name: "episode", label: 'Episode Label (e.g. "Episode 01")', type: "string" },
          { name: "publishedAt", label: "Published Date", type: "datetime" },
          { name: "status", label: "Status", type: "string", options: ["Coming Soon", "Published", "Draft"] },
          { name: "audioUrl", label: "Listen URL (Spotify / Apple / YouTube)", type: "string" },
          { name: "excerpt", label: "Excerpt (shown on card)", type: "string", ui: { component: "textarea" } },
          { name: "image", label: "Cover Image (shown on the card + episode hero \u2014 leave blank to use the icon below)", type: "image" },
          { name: "icon", label: "Fallback Icon (fa-class) \u2014 only used when no Cover Image is set", type: "string" },
          { name: "gradient", label: "Fallback Background Gradient Class", type: "string" },
          { name: "badgeColor", label: "Card Badge Color Class", type: "string" },
          { name: "body", label: "Show Notes / Description", type: "rich-text", isBody: true }
        ]
      },
      {
        name: "navbar",
        label: "Navbar (Site-Wide)",
        path: "content",
        match: { include: "navbar" },
        format: "json",
        // Site-wide chrome — preview against the home page so edits update live alongside the form
        ui: { router: () => "/", allowedActions: { create: false, delete: false } },
        fields: [
          { name: "brandLabel", label: "Brand Label (next to logo)", type: "string" },
          { name: "ctaLabel", label: "Sticky CTA Button Label", type: "string" },
          {
            name: "links",
            label: "Top-level Links",
            type: "object",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { name: "label", label: "Label", type: "string" },
              { name: "href", label: "URL", type: "string" },
              { name: "showDropdown", label: "Has dropdown?", type: "boolean" }
            ]
          },
          {
            name: "workWithMeDropdown",
            label: "Work-with-me Dropdown",
            type: "object",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { name: "label", label: "Label", type: "string" },
              { name: "href", label: "URL", type: "string" }
            ]
          }
        ]
      },
      {
        name: "bookingForm",
        label: "Booking Form (Site-Wide)",
        path: "content",
        match: { include: "booking-form" },
        format: "json",
        // The booking form lives in a modal — preview opens it automatically via ?previewBooking=1
        ui: { router: () => "/contact?previewBooking=1", allowedActions: { create: false, delete: false } },
        fields: [
          { name: "overlayTitle", label: "Overlay Title", type: "string" },
          { name: "firstNameLabel", label: "First Name Label", type: "string" },
          { name: "lastNameLabel", label: "Last Name Label", type: "string" },
          { name: "emailLabel", label: "Email Label", type: "string" },
          { name: "countryCodeLabel", label: "Country Code Label", type: "string" },
          { name: "phoneLabel", label: "Phone Number Label", type: "string" },
          { name: "serviceLabel", label: "Service Field Label", type: "string" },
          { name: "messageLabel", label: "Message Label", type: "string" },
          { name: "messagePlaceholder", label: "Message Placeholder", type: "string" },
          { name: "submitLabel", label: "Submit Button Label", type: "string" },
          { name: "submittingLabel", label: "Submit Button (sending\u2026)", type: "string" },
          { name: "successMessage", label: "Success Message", type: "string", ui: { component: "textarea" } },
          { name: "errorMessage", label: "Error Message (fallback)", type: "string", ui: { component: "textarea" } },
          {
            name: "services",
            label: "Services in Dropdown",
            type: "string",
            list: true
          }
        ]
      },
      {
        name: "footer",
        label: "Footer (Site-Wide)",
        path: "content",
        match: { include: "footer" },
        format: "json",
        // Footer is on every page — preview against home; scroll down inside the iframe to see edits live
        ui: { router: () => "/", allowedActions: { create: false, delete: false } },
        fields: [
          { name: "brandHeading", label: "Brand Heading", type: "string" },
          { name: "brandDescription", label: "Brand Description", type: "string", ui: { component: "textarea" } },
          { name: "quickLinksHeading", label: "Quick Links Heading", type: "string" },
          {
            name: "quickLinks",
            label: "Quick Links",
            type: "object",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { name: "label", label: "Label", type: "string" },
              { name: "href", label: "Link URL", type: "string" }
            ]
          },
          { name: "servicesHeading", label: "Services Heading", type: "string" },
          {
            name: "serviceLinks",
            label: "Service Links",
            type: "object",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { name: "label", label: "Label", type: "string" },
              { name: "href", label: "Link URL", type: "string" }
            ]
          },
          { name: "connectHeading", label: "Connect Heading", type: "string" },
          {
            name: "socialLinks",
            label: "Social Links",
            type: "object",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { name: "label", label: "Label", type: "string" },
              { name: "icon", label: "Font Awesome Icon Class (fa-...)", type: "string" },
              { name: "href", label: "URL", type: "string" }
            ]
          },
          { name: "emailLabel", label: "Email Label", type: "string" },
          { name: "email", label: "Email Address", type: "string" },
          { name: "phoneLabel", label: "Phone Label", type: "string" },
          { name: "phone", label: "Phone Number", type: "string" },
          { name: "copyright", label: "Copyright Text", type: "string" }
        ]
      },
      {
        name: "typography",
        label: "Site Typography",
        path: "content",
        match: { include: "typography" },
        format: "json",
        // Typography applies globally — preview against home where text variety is richest
        ui: { router: () => "/", allowedActions: { create: false, delete: false } },
        fields: [
          {
            name: "headingFont",
            label: "Heading Font Family",
            type: "string",
            options: [
              { value: "caslon", label: "Libre Caslon (current \u2014 elegant serif)" },
              { value: "dancing", label: "Dancing Script (cursive)" },
              { value: "titillium", label: "Titillium Web (clean sans-serif)" }
            ],
            description: "Used for h2/h3 across the site"
          },
          {
            name: "headingWeight",
            label: "Heading Weight",
            type: "string",
            options: [
              { value: "400", label: "Regular" },
              { value: "600", label: "Semibold" },
              { value: "700", label: "Bold" }
            ]
          },
          {
            name: "headingStyle",
            label: "Heading Style",
            type: "string",
            options: [
              { value: "normal", label: "Normal" },
              { value: "italic", label: "Italic" }
            ]
          },
          {
            name: "bodyFont",
            label: "Body Font Family",
            type: "string",
            options: [
              { value: "titillium", label: "Titillium Web (current)" },
              { value: "caslon", label: "Libre Caslon" }
            ]
          },
          {
            name: "bodyWeight",
            label: "Body Weight",
            type: "string",
            options: [
              { value: "300", label: "Light" },
              { value: "400", label: "Regular" },
              { value: "600", label: "Semibold" }
            ]
          },
          {
            name: "baseFontSize",
            label: "Base Font Size (px)",
            type: "number",
            description: "Affects body text only. Default: 16"
          }
        ]
      },
      // Theme is intentionally NOT registered as a Tina collection — theme
      // editing lives exclusively in the Theme Studio screen (registered via
      // cmsCallback above). content/theme.json is still the source of truth
      // and is loaded directly by app/layout.tsx via the static import.
      {
        name: "testimonials",
        label: "Testimonials",
        path: "content",
        match: { include: "testimonials" },
        format: "json",
        // Testimonials section lives on the home page — preview there
        ui: { router: () => "/", allowedActions: { create: false, delete: false } },
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
