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
        fields: [
          { name: "heroBadge", label: "Hero Badge Text", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroHeadingHighlight", label: "Hero Heading Highlight", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "heroCTALabel", label: "Hero CTA Button Label", type: "string" },
          { name: "aboutBadge", label: "About Badge Text", type: "string" },
          { name: "aboutHeading", label: "About Heading", type: "string" },
          { name: "aboutParagraph1", label: "About Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "aboutParagraph2", label: "About Paragraph 2", type: "string", ui: { component: "textarea" } },
          { name: "aboutParagraph3", label: "About Paragraph 3", type: "string", ui: { component: "textarea" } },
          { name: "aboutQuote", label: "About Quote", type: "string", ui: { component: "textarea" } },
          { name: "aboutCTALabel", label: "About Section CTA Label", type: "string" },
          { name: "servicesSectionHeading", label: "Services Section Heading", type: "string" },
          { name: "servicesSectionSubtext", label: "Services Section Subtext", type: "string" },
          { name: "ctaSectionHeading", label: "CTA Section Heading", type: "string" },
          { name: "ctaSectionSubtext", label: "CTA Section Subtext", type: "string" },
          { name: "ctaButtonLabel", label: "CTA Button Label", type: "string" }
        ]
      },
      {
        name: "about",
        label: "About Page",
        path: "content/pages",
        match: { include: "about" },
        format: "json",
        fields: [
          { name: "heroBadge", label: "Hero Badge Text", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "bioParagraph1", label: "Bio Paragraph 1", type: "string", ui: { component: "textarea" } },
          { name: "bioParagraph2", label: "Bio Paragraph 2", type: "string", ui: { component: "textarea" } },
          { name: "bioParagraph3", label: "Bio Paragraph 3", type: "string", ui: { component: "textarea" } },
          { name: "bioParagraph4", label: "Bio Paragraph 4", type: "string", ui: { component: "textarea" } },
          { name: "credentialsSectionHeading", label: "Credentials Section Heading", type: "string" },
          {
            name: "credentials",
            label: "Credentials",
            type: "object",
            list: true,
            fields: [
              { name: "icon", label: "Font Awesome Icon Class", type: "string" },
              { name: "title", label: "Title", type: "string" },
              { name: "desc", label: "Description", type: "string", ui: { component: "textarea" } }
            ]
          },
          { name: "valuesSectionHeading", label: "Values Section Heading", type: "string" },
          {
            name: "values",
            label: "Values",
            type: "object",
            list: true,
            fields: [
              { name: "icon", label: "Font Awesome Icon Class", type: "string" },
              { name: "title", label: "Title", type: "string" },
              { name: "desc", label: "Description", type: "string", ui: { component: "textarea" } }
            ]
          },
          { name: "ctaSectionHeading", label: "CTA Section Heading", type: "string" },
          { name: "ctaSectionSubtext", label: "CTA Section Subtext", type: "string" },
          { name: "ctaButtonLabel", label: "CTA Button Label", type: "string" }
        ]
      },
      {
        name: "clarityCoaching",
        label: "Clarity Coaching Page",
        path: "content/pages",
        match: { include: "clarity-coaching" },
        format: "json",
        fields: [
          { name: "heroBadge", label: "Hero Badge Text", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "sectionHeading", label: '"Gets Results" Section Heading', type: "string" },
          { name: "sectionSubtext", label: '"Gets Results" Section Subtext', type: "string", ui: { component: "textarea" } },
          {
            name: "perhapsItems",
            label: `"Perhaps you're..." Items`,
            type: "object",
            list: true,
            fields: [
              { name: "emoji", label: "Emoji", type: "string" },
              { name: "text", label: "Text", type: "string" }
            ]
          },
          { name: "bannerQuote", label: "Banner Quote Text", type: "string", ui: { component: "textarea" } },
          { name: "outcomesSectionHeading", label: "Outcomes Section Heading", type: "string" },
          {
            name: "outcomes",
            label: "Outcomes",
            type: "string",
            list: true
          },
          { name: "ctaSectionHeading", label: "CTA Section Heading", type: "string" },
          { name: "ctaSectionSubtext", label: "CTA Section Subtext", type: "string" },
          { name: "ctaButtonLabel", label: "CTA Button Label", type: "string" }
        ]
      },
      {
        name: "careerCoaching",
        label: "Career Coaching Page",
        path: "content/pages",
        match: { include: "career-coaching" },
        format: "json",
        fields: [
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "heroCTALabel", label: "Hero CTA Button Label", type: "string" },
          { name: "sectionHeading", label: '"Gets Results" Section Heading', type: "string" },
          { name: "sectionSubtext", label: '"Gets Results" Section Subtext', type: "string", ui: { component: "textarea" } },
          {
            name: "situations",
            label: `"Perhaps you're..." Situations`,
            type: "string",
            list: true
          },
          { name: "bannerQuote", label: "Banner Quote Text", type: "string", ui: { component: "textarea" } },
          { name: "outcomesSectionHeading", label: "Outcomes Section Heading", type: "string" },
          {
            name: "outcomes",
            label: "Outcomes",
            type: "string",
            list: true
          },
          { name: "ctaSectionHeading", label: "CTA Section Heading", type: "string" },
          { name: "ctaSectionSubtext", label: "CTA Section Subtext", type: "string" },
          { name: "ctaButtonLabel", label: "CTA Button Label", type: "string" }
        ]
      },
      {
        name: "numerology",
        label: "Numerology Page",
        path: "content/pages",
        match: { include: "numerology" },
        format: "json",
        fields: [
          { name: "heroBadge", label: "Hero Badge Text", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroTagline", label: "Hero Tagline", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "heroCTALabel", label: "Hero CTA Button Label", type: "string" },
          { name: "whatIsHeading", label: '"What Is Vedic Numerology" Heading', type: "string" },
          { name: "whatIsSubtext", label: '"What Is Vedic Numerology" Subtext', type: "string", ui: { component: "textarea" } },
          { name: "comparisonText", label: "Unlike Western Numerology Text", type: "string", ui: { component: "textarea" } },
          { name: "powerText", label: "Power of Numbers Text", type: "string", ui: { component: "textarea" } },
          {
            name: "sessionIncludes",
            label: "Session Includes Items",
            type: "string",
            list: true
          },
          { name: "ctaSectionHeading", label: "CTA Section Heading", type: "string" },
          { name: "ctaSectionSubtext", label: "CTA Section Subtext", type: "string" },
          { name: "ctaButtonLabel", label: "CTA Button Label", type: "string" }
        ]
      },
      {
        name: "resources",
        label: "Resources Page",
        path: "content/pages",
        match: { include: "resources" },
        format: "json",
        fields: [
          { name: "heroBadge", label: "Hero Badge Text", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroHeadingHighlight", label: "Hero Heading Highlight", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "blogHeading", label: "Blog Card Heading", type: "string" },
          { name: "blogText", label: "Blog Card Text", type: "string", ui: { component: "textarea" } },
          { name: "podcastHeading", label: "Podcast Card Heading", type: "string" },
          { name: "podcastText", label: "Podcast Card Text", type: "string", ui: { component: "textarea" } },
          { name: "ctaSectionHeading", label: "CTA Section Heading", type: "string" },
          { name: "ctaSectionSubtext", label: "CTA Section Subtext", type: "string" },
          { name: "ctaButtonLabel", label: "CTA Button Label", type: "string" }
        ]
      },
      {
        name: "contact",
        label: "Contact Page",
        path: "content/pages",
        match: { include: "contact" },
        format: "json",
        fields: [
          { name: "heroBadge", label: "Hero Badge Text", type: "string" },
          { name: "heroHeading", label: "Hero Heading", type: "string" },
          { name: "heroSubtext", label: "Hero Subtext", type: "string", ui: { component: "textarea" } },
          { name: "email", label: "Email Address", type: "string" },
          { name: "location", label: "Location", type: "string" },
          { name: "responseTime", label: "Response Time Text", type: "string" },
          { name: "formHeading", label: "Form Section Heading", type: "string" },
          { name: "formSubtext", label: "Form Section Subtext", type: "string" }
        ]
      },
      {
        name: "testimonials",
        label: "Testimonials",
        path: "content",
        match: { include: "testimonials" },
        format: "json",
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
