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
        ui: { router: () => "/career-coaching" },
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
        ui: { router: () => "/numerology" },
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
        ui: { router: () => "/resources" },
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
