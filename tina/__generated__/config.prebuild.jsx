// tina/config.ts
import { defineConfig } from "tinacms";
import React4 from "react";

// tina/fields/index.tsx
import React3 from "react";
import { wrapFieldsWithMeta } from "tinacms";

// tina/fields/pickers.tsx
import React, { useEffect, useMemo, useState } from "react";

// lib/icons.ts
var ICON_CATEGORIES = ["Mindset", "Growth", "Work", "Connection", "Content", "Contact", "Social"];
var ICONS = [
  // Mindset
  { id: "fa-lightbulb", label: "Lightbulb / idea", category: "Mindset" },
  { id: "fa-brain", label: "Brain / mind", category: "Mindset" },
  { id: "fa-heart", label: "Heart", category: "Mindset" },
  { id: "fa-bullseye", label: "Target / focus", category: "Mindset" },
  { id: "fa-eye", label: "Eye / awareness", category: "Mindset" },
  { id: "fa-compass", label: "Compass / direction", category: "Mindset" },
  { id: "fa-key", label: "Key", category: "Mindset" },
  { id: "fa-yin-yang", label: "Balance", category: "Mindset" },
  { id: "fa-spa", label: "Calm / wellbeing", category: "Mindset" },
  { id: "fa-dove", label: "Dove / peace", category: "Mindset" },
  { id: "fa-star", label: "Star", category: "Mindset" },
  { id: "fa-gem", label: "Gem", category: "Mindset" },
  { id: "fa-infinity", label: "Infinity", category: "Mindset" },
  { id: "fa-hashtag", label: "Number / numerology", category: "Mindset" },
  { id: "fa-magic", label: "Magic wand", category: "Mindset" },
  // Growth
  { id: "fa-seedling", label: "Seedling / growth", category: "Growth" },
  { id: "fa-leaf", label: "Leaf", category: "Growth" },
  { id: "fa-sun", label: "Sun", category: "Growth" },
  { id: "fa-mountain", label: "Mountain", category: "Growth" },
  { id: "fa-route", label: "Route / journey", category: "Growth" },
  { id: "fa-road", label: "Road", category: "Growth" },
  { id: "fa-rocket", label: "Rocket", category: "Growth" },
  { id: "fa-fire", label: "Fire / energy", category: "Growth" },
  { id: "fa-feather", label: "Feather / lightness", category: "Growth" },
  { id: "fa-arrow-down", label: "Arrow down / go deeper", category: "Growth" },
  // Work
  { id: "fa-chart-line", label: "Chart / progress", category: "Work" },
  { id: "fa-briefcase", label: "Briefcase / career", category: "Work" },
  { id: "fa-graduation-cap", label: "Graduation cap", category: "Work" },
  { id: "fa-certificate", label: "Certificate", category: "Work" },
  { id: "fa-award", label: "Award", category: "Work" },
  { id: "fa-medal", label: "Medal", category: "Work" },
  { id: "fa-trophy", label: "Trophy", category: "Work" },
  { id: "fa-calendar-alt", label: "Calendar", category: "Work" },
  { id: "fa-clock", label: "Clock", category: "Work" },
  // Connection
  { id: "fa-comments", label: "Conversation", category: "Connection" },
  { id: "fa-comment-dots", label: "Speech bubble", category: "Connection" },
  { id: "fa-handshake", label: "Handshake", category: "Connection" },
  { id: "fa-hand-holding-heart", label: "Hand holding heart", category: "Connection" },
  { id: "fa-hands-helping", label: "Helping hands", category: "Connection" },
  { id: "fa-users", label: "People", category: "Connection" },
  { id: "fa-user", label: "Person", category: "Connection" },
  { id: "fa-smile", label: "Smile", category: "Connection" },
  // Content
  { id: "fa-pen-fancy", label: "Pen / writing", category: "Content" },
  { id: "fa-book-open", label: "Open book", category: "Content" },
  { id: "fa-quote-left", label: "Quote", category: "Content" },
  { id: "fa-microphone-alt", label: "Microphone", category: "Content" },
  { id: "fa-podcast", label: "Podcast", category: "Content" },
  { id: "fa-headphones", label: "Headphones", category: "Content" },
  { id: "fa-play-circle", label: "Play", category: "Content" },
  { id: "fa-video", label: "Video", category: "Content" },
  { id: "fa-envelope-open-text", label: "Newsletter", category: "Content" },
  // Contact
  { id: "fa-envelope", label: "Email", category: "Contact" },
  { id: "fa-phone", label: "Phone", category: "Contact" },
  { id: "fa-map-marker-alt", label: "Location pin", category: "Contact" },
  { id: "fa-globe", label: "Globe / online", category: "Contact" },
  // Social (Font Awesome brands)
  { id: "fa-facebook", label: "Facebook", category: "Social", brand: true },
  { id: "fa-instagram", label: "Instagram", category: "Social", brand: true },
  { id: "fa-youtube", label: "YouTube", category: "Social", brand: true },
  { id: "fa-whatsapp", label: "WhatsApp", category: "Social", brand: true },
  { id: "fa-linkedin", label: "LinkedIn", category: "Social", brand: true },
  { id: "fa-tiktok", label: "TikTok", category: "Social", brand: true },
  { id: "fa-twitter", label: "X / Twitter", category: "Social", brand: true },
  { id: "fa-pinterest", label: "Pinterest", category: "Social", brand: true },
  { id: "fa-spotify", label: "Spotify", category: "Social", brand: true },
  { id: "fa-apple", label: "Apple Podcasts", category: "Social", brand: true }
];
var BY_ID = new Map(ICONS.map((i) => [i.id, i]));
function getIcon(id) {
  return id ? BY_ID.get(id.trim()) : void 0;
}
function iconClass(id) {
  if (!id) return "";
  const bare = id.trim().split(/\s+/).find((part) => part.startsWith("fa-") && part !== "fa-solid") ?? "";
  if (!bare) return "";
  const def = BY_ID.get(bare);
  return `${def?.brand ? "fab" : "fas"} ${bare}`;
}

// lib/emojis.ts
var EMOJI_GROUPS = [
  { label: "Feelings", emojis: ["\u2728", "\u{1F60A}", "\u{1F4AD}", "\u{1F49E}", "\u{1F49D}", "\u{1F494}", "\u{1F970}", "\u{1F60C}", "\u{1F64F}", "\u{1F4AA}"] },
  { label: "Growth", emojis: ["\u{1F331}", "\u{1F31F}", "\u{1F300}", "\u{1F680}", "\u{1F3AF}", "\u{1F4A1}", "\u{1F9ED}", "\u{1F511}", "\u{1F98B}", "\u{1F308}"] },
  { label: "Life", emojis: ["\u{1F3E0}", "\u{1F492}", "\u{1F389}", "\u{1F4B0}", "\u{1F3AD}", "\u23F8\uFE0F", "\u{1F500}", "\u{1F50D}", "\u{1FA84}", "\u{1F52E}"] },
  { label: "Sessions", emojis: ["\u{1F4C5}", "\u{1F4DD}", "\u{1F4CB}", "\u{1F4CA}", "\u{1F4DC}", "\u{1F4DA}", "\u{1F91D}", "\u2615", "\u{1F4AC}", "\u23F0"] }
];

// lib/design-tokens.ts
var TONES = ["primary", "accent", "secondary"];
var TONE_LABELS = {
  primary: { label: "Warm", hint: "Your primary colour" },
  accent: { label: "Cool", hint: "Your accent colour" },
  secondary: { label: "Deep", hint: "Your dark colour" }
};
var TONE_THEME_ROLE = {
  primary: "primaryColor",
  accent: "accentColor",
  secondary: "secondaryColor"
};
function normalizeTone(value, fallback = "primary") {
  if (typeof value !== "string") return fallback;
  const v = value.trim().toLowerCase();
  if (TONES.includes(v)) return v;
  if (/(carrot|orange|amber|primary|warm)/.test(v)) return "primary";
  if (/(azure|blue|indigo|accent|cool)/.test(v)) return "accent";
  if (/(oxford|navy|purple|secondary|deep)/.test(v)) return "secondary";
  return fallback;
}
var GRADIENT_PRESETS = {
  orange: { label: "Orange", classes: "from-orange-500 to-orange-600", from: "#f97316", to: "#ea580c" },
  blue: { label: "Blue", classes: "from-blue-500 to-blue-600", from: "#3b82f6", to: "#2563eb" },
  purple: { label: "Purple", classes: "from-purple-500 to-purple-600", from: "#a855f7", to: "#9333ea" },
  amber: { label: "Amber", classes: "from-amber-500 to-amber-600", from: "#f59e0b", to: "#d97706" },
  pink: { label: "Pink", classes: "from-pink-500 to-pink-600", from: "#ec4899", to: "#db2777" },
  teal: { label: "Teal", classes: "from-teal-500 to-teal-600", from: "#14b8a6", to: "#0d9488" }
};
var GRADIENT_PRESET_KEYS = Object.keys(GRADIENT_PRESETS);
function normalizeGradient(value, fallback = "orange") {
  if (typeof value !== "string") return fallback;
  const v = value.trim().toLowerCase();
  if (v in GRADIENT_PRESETS) return v;
  const m = v.match(/from-([a-z]+)-\d+/);
  if (m && m[1] in GRADIENT_PRESETS) return m[1];
  return fallback;
}

// content/theme.json
var theme_default = {
  primaryColor: "#f2b7ab",
  secondaryColor: "#1a2742",
  accentColor: "#e89ab8",
  neutralColor: "#fdf6f0"
};

// tina/fields/pickers.tsx
var FA_HREF = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
function useFontAwesome() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector(`link[href="${FA_HREF}"]`)) return;
    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = FA_HREF;
    document.head.appendChild(link2);
  }, []);
}
var C = {
  border: "#e1ddec",
  borderStrong: "#b4acc9",
  text: "#303030",
  muted: "#6b6b80",
  selected: "#0084ff",
  selectedBg: "#e6f3ff",
  surface: "#ffffff",
  subtle: "#f6f6f9"
};
var tileBase = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  background: C.surface,
  cursor: "pointer",
  color: C.text,
  padding: 0
};
var selectedRing = (on) => on ? { borderColor: C.selected, background: C.selectedBg, boxShadow: `0 0 0 2px ${C.selected}` } : {};
var linkButton = {
  background: "none",
  border: "none",
  color: C.selected,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  padding: 0
};
function IconPicker({ value, onChange, categories, defaultOpen }) {
  useFontAwesome();
  const [open, setOpen] = useState(Boolean(defaultOpen) || !value);
  const [query, setQuery] = useState("");
  const current = getIcon(value);
  const cats = categories ?? ICON_CATEGORIES;
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cats.map((category) => ({
      category,
      icons: ICONS.filter((i) => i.category === category && (!q || i.label.toLowerCase().includes(q)))
    })).filter((g) => g.icons.length > 0);
  }, [cats, query]);
  return React.createElement("div", { style: { whiteSpace: "normal" } }, React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, React.createElement(
    "span",
    {
      "aria-hidden": "true",
      style: { ...tileBase, width: 44, height: 44, fontSize: 20, cursor: "default", background: C.subtle }
    },
    value ? React.createElement("i", { className: iconClass(value) }) : React.createElement("span", { style: { color: C.muted, fontSize: 12 } }, "None")
  ), React.createElement("span", { style: { flex: 1, fontSize: 14, color: C.text } }, current?.label ?? (value ? value : "No icon chosen")), React.createElement("button", { type: "button", style: linkButton, onClick: () => setOpen((o) => !o), "aria-expanded": open }, open ? "Done" : "Change icon")), open && React.createElement("div", { style: { marginTop: 12, border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, background: C.subtle } }, React.createElement(
    "input",
    {
      type: "search",
      placeholder: "Search icons\u2026",
      "aria-label": "Search icons",
      value: query,
      onChange: (e) => setQuery(e.target.value),
      style: { width: "100%", padding: "8px 10px", borderRadius: 6, border: `1px solid ${C.borderStrong}`, fontSize: 14, marginBottom: 8 }
    }
  ), React.createElement("div", { style: { maxHeight: 280, overflowY: "auto" } }, groups.map((g) => React.createElement("div", { key: g.category, style: { marginTop: 8 } }, React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: C.muted, marginBottom: 6 } }, g.category), React.createElement("div", { role: "listbox", "aria-label": `${g.category} icons`, style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))", gap: 6 } }, g.icons.map((icon2) => {
    const on = icon2.id === value;
    return React.createElement(
      "button",
      {
        key: icon2.id,
        type: "button",
        role: "option",
        "aria-selected": on,
        "aria-label": icon2.label,
        title: icon2.label,
        onClick: () => onChange(icon2.id),
        style: { ...tileBase, height: 44, fontSize: 18, ...selectedRing(on) }
      },
      React.createElement("i", { className: iconClass(icon2.id), "aria-hidden": "true" })
    );
  })))), groups.length === 0 && React.createElement("p", { style: { fontSize: 13, color: C.muted } }, "No icons match \u201C", query, "\u201D.")), value && React.createElement("button", { type: "button", style: { ...linkButton, marginTop: 10, color: C.muted }, onClick: () => onChange("") }, "Remove icon")));
}
function TonePicker({ value, onChange, tones = ["primary", "accent"], palette = theme_default }) {
  const current = normalizeTone(value, tones[0]);
  return React.createElement("div", { role: "radiogroup", style: { display: "grid", gridTemplateColumns: `repeat(${tones.length}, 1fr)`, gap: 8, whiteSpace: "normal" } }, tones.map((tone2) => {
    const on = tone2 === current;
    const colour = palette[TONE_THEME_ROLE[tone2]] ?? "#999";
    return React.createElement(
      "button",
      {
        key: tone2,
        type: "button",
        role: "radio",
        "aria-checked": on,
        onClick: () => onChange(tone2),
        style: { ...tileBase, flexDirection: "column", gap: 6, padding: "10px 6px", ...selectedRing(on) }
      },
      React.createElement("span", { "aria-hidden": "true", style: { width: 36, height: 36, borderRadius: "50%", background: colour, border: "1px solid rgba(0,0,0,0.1)" } }),
      React.createElement("span", { style: { fontSize: 13, fontWeight: 600 } }, TONE_LABELS[tone2].label),
      React.createElement("span", { style: { fontSize: 11, color: C.muted } }, TONE_LABELS[tone2].hint)
    );
  }));
}
function GradientPicker({ value, onChange }) {
  const current = normalizeGradient(value);
  return React.createElement("div", { role: "radiogroup", style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, whiteSpace: "normal" } }, GRADIENT_PRESET_KEYS.map((key) => {
    const preset = GRADIENT_PRESETS[key];
    const on = key === current;
    return React.createElement(
      "button",
      {
        key,
        type: "button",
        role: "radio",
        "aria-checked": on,
        onClick: () => onChange(key),
        style: { ...tileBase, flexDirection: "column", gap: 6, padding: "10px 6px", ...selectedRing(on) }
      },
      React.createElement("span", { "aria-hidden": "true", style: { width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(to right, ${preset.from}, ${preset.to})` } }),
      React.createElement("span", { style: { fontSize: 13, fontWeight: 600 } }, preset.label)
    );
  }));
}
function EmojiPicker({ value, onChange, defaultOpen }) {
  const [open, setOpen] = useState(Boolean(defaultOpen) || !value);
  return React.createElement("div", { style: { whiteSpace: "normal" } }, React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, React.createElement("span", { "aria-hidden": "true", style: { ...tileBase, width: 44, height: 44, fontSize: 24, cursor: "default", background: C.subtle } }, value || React.createElement("span", { style: { color: C.muted, fontSize: 12 } }, "None")), React.createElement("span", { style: { flex: 1 } }), React.createElement("button", { type: "button", style: linkButton, onClick: () => setOpen((o) => !o), "aria-expanded": open }, open ? "Done" : "Change emoji")), open && React.createElement("div", { style: { marginTop: 12, border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, background: C.subtle } }, EMOJI_GROUPS.map((g) => React.createElement("div", { key: g.label, style: { marginBottom: 8 } }, React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: C.muted, marginBottom: 6 } }, g.label), React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))", gap: 6 } }, g.emojis.map((emoji2) => React.createElement(
    "button",
    {
      key: emoji2,
      type: "button",
      "aria-label": `Use ${emoji2}`,
      "aria-pressed": emoji2 === value,
      onClick: () => onChange(emoji2),
      style: { ...tileBase, height: 40, fontSize: 20, ...selectedRing(emoji2 === value) }
    },
    emoji2
  ))))), React.createElement("label", { style: { display: "block", fontSize: 13, color: C.muted, marginTop: 8 } }, "Or type / paste any emoji", React.createElement(
    "input",
    {
      type: "text",
      value,
      onChange: (e) => onChange(e.target.value),
      style: { display: "block", width: 80, marginTop: 4, padding: "6px 8px", borderRadius: 6, border: `1px solid ${C.borderStrong}`, fontSize: 20 }
    }
  ))));
}

// tina/fields/LibraryManager.tsx
import React2, { useEffect as useEffect2, useState as useState2 } from "react";
import { useCMS } from "tinacms";

// lib/tina-select.ts
var PREVIEW_PREFIX = "/preview/";
function previewRoute(doc) {
  return `${PREVIEW_PREFIX}${doc}`;
}

// tina/fields/LibraryManager.tsx
var LABELS = {
  post: { one: "blog post", many: "blog posts" },
  podcast: { one: "episode", many: "episodes" }
};
function editHref(kind, filename) {
  return kind === "post" ? `#/~/blog/${filename}` : `#/~${previewRoute(`podcasts/${filename}.md`)}`;
}
function newHref(kind) {
  return `#/collections/new/${kind}`;
}
function sortNewestFirst(items) {
  return [...items].sort((a, b) => (Date.parse(b.publishedAt || "") || 0) - (Date.parse(a.publishedAt || "") || 0));
}
var box = { border: "1px solid #e1ddec", borderRadius: 8, background: "#fff", overflow: "hidden" };
var row = { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderTop: "1px solid #efedf5", fontSize: 14 };
var pill = (bg, fg) => ({ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: bg, color: fg, whiteSpace: "nowrap" });
var primaryBtn = { display: "inline-block", background: "#0084ff", color: "#fff", padding: "8px 14px", borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: "none" };
function LibraryList({ kind, items, loading, error }) {
  const label = LABELS[kind];
  return (
    // Tina's field wrapper sets white-space: nowrap; let our text wrap.
    React2.createElement("div", { style: { whiteSpace: "normal", minWidth: 0 } }, React2.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 } }, React2.createElement("span", { style: { fontSize: 13, color: "#6b6b80" } }, loading ? "Loading\u2026" : `${items.length} ${items.length === 1 ? label.one : label.many}`), React2.createElement("a", { href: newHref(kind), style: primaryBtn }, "\uFF0B New ", label.one)), error && React2.createElement("p", { style: { color: "#b42318", fontSize: 13 } }, error), !loading && items.length > 0 && React2.createElement("div", { style: box }, sortNewestFirst(items).map((item, i) => React2.createElement("div", { key: item.filename, style: { ...row, borderTop: i === 0 ? "none" : row.borderTop } }, React2.createElement("span", { style: { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, title: item.title }, item.title || item.filename), item.featured && React2.createElement("span", { style: pill("#fff4e5", "#b54708") }, "\u2605 Featured"), item.status && item.status !== "Published" && React2.createElement("span", { style: pill("#f2f4f7", "#475467") }, item.status), React2.createElement("a", { href: editHref(kind, item.filename), style: { color: "#0084ff", fontWeight: 600, fontSize: 13, textDecoration: "none" } }, "Edit")))), React2.createElement("p", { style: { fontSize: 12, color: "#6b6b80", marginTop: 8 } }, "Tip: to feature one at the top of the Resources page, open it and switch on \u201CFeature on Resources page\u201D."))
  );
}
var QUERIES = {
  post: `query { postConnection(first: 500) { edges { node { title status featured publishedAt _sys { filename } } } } }`,
  podcast: `query { podcastConnection(first: 500) { edges { node { title status featured publishedAt _sys { filename } } } } }`
};
function LibraryManager({ kind }) {
  const cms = useCMS();
  const [items, setItems] = useState2([]);
  const [loading, setLoading] = useState2(true);
  const [error, setError] = useState2("");
  useEffect2(() => {
    let alive = true;
    const api = cms.api.tina;
    if (!api) {
      setLoading(false);
      return;
    }
    api.request(QUERIES[kind], { variables: {} }).then((res) => {
      if (!alive) return;
      const conn = res[`${kind}Connection`];
      setItems((conn?.edges ?? []).map(({ node }) => ({
        title: node.title,
        status: node.status,
        featured: node.featured,
        publishedAt: node.publishedAt,
        filename: node._sys.filename
      })));
    }).catch(() => alive && setError("Couldn\u2019t load the list. Refresh the page to try again.")).finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [cms, kind]);
  return React2.createElement(LibraryList, { kind, items, loading, error });
}

// tina/fields/index.tsx
var asField = (c) => c;
function iconPickerField(categories) {
  return asField(wrapFieldsWithMeta(({ input }) => {
    const { value, onChange } = input;
    return React3.createElement(IconPicker, { value: value || "", onChange, categories });
  }));
}
function tonePickerField(tones) {
  return asField(wrapFieldsWithMeta(({ input }) => {
    const { value, onChange } = input;
    return React3.createElement(TonePicker, { value: value || "", onChange, tones });
  }));
}
var GradientPickerField = asField(wrapFieldsWithMeta(({ input }) => {
  const { value, onChange } = input;
  return React3.createElement(GradientPicker, { value: value || "", onChange });
}));
var EmojiPickerField = asField(wrapFieldsWithMeta(({ input }) => {
  const { value, onChange } = input;
  return React3.createElement(EmojiPicker, { value: value || "", onChange });
}));
function libraryManagerField(kind) {
  return asField(wrapFieldsWithMeta(() => React3.createElement(LibraryManager, { kind })));
}

// tina/shared.ts
var text = (name, label, opts = {}) => ({ type: "string", name, label, ...opts });
var textarea = (name, label, opts = {}) => ({
  type: "string",
  list: false,
  name,
  label,
  ui: { component: "textarea" },
  ...opts
});
var richText = (name, label, opts = {}) => ({ type: "rich-text", name, label, ...opts });
var image = (name, label, opts = {}) => ({ type: "image", name, label, ...opts });
var icon = (name = "icon", label = "Icon", categories) => ({
  type: "string",
  list: false,
  name,
  label,
  ui: { component: iconPickerField(categories) }
});
var tone = (name = "tone", label = "Colour", tones = ["primary", "accent"], opts = {}) => ({
  type: "string",
  list: false,
  name,
  label,
  ui: { component: tonePickerField(tones) },
  ...opts
});
var gradient = (name = "gradient", label = "Badge colour") => ({
  type: "string",
  list: false,
  name,
  label,
  ui: { component: GradientPickerField }
});
var emoji = (name = "emoji", label = "Emoji") => ({
  type: "string",
  list: false,
  name,
  label,
  ui: { component: EmojiPickerField }
});
var eyebrow = () => text("eyebrow", "Small label above heading");
var headingWithHighlight = (label = "Heading") => [
  text("heading", label),
  text("highlight", "Words to colour", {
    description: "Copy a few words from the heading above to show them in colour. Leave empty for no colour."
  })
];
var highlightedLine = (name, label, description) => ({
  type: "object",
  name,
  label,
  description,
  fields: [
    textarea("text", "Text"),
    text("highlight", "Words to colour", { description: "Copy a few words from the text above to show them in colour." })
  ]
});
var section = (name, label, fields, description) => ({
  type: "object",
  name,
  label,
  description,
  fields
});
var list = (name, label, fields, opts) => ({
  type: "object",
  name,
  label,
  list: true,
  description: opts.description,
  ui: {
    itemProps: (item) => {
      const v = item?.[opts.itemLabel];
      return { label: typeof v === "string" && v.trim() ? v : opts.fallback };
    },
    ...opts.defaultItem ? { defaultItem: opts.defaultItem } : {}
  },
  fields
});
var closingCta = (fields) => section("closingCta", "Closing call to action", fields, "The coloured band at the bottom of the page. Its button opens the booking form.");
var slugify = (values) => String(values.title || "untitled").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
var seoSection = (optional = false) => section(
  "seo",
  "Google search listing",
  [
    text("title", "Title in Google", {
      description: "The blue link in search results. Aim for about 50\u201360 characters, most important words first."
    }),
    textarea("description", "Description in Google", {
      description: "The grey text under the link. Aim for about 140\u2013160 characters that make someone want to click."
    })
  ],
  optional ? "Optional. Leave empty to use the title and short summary." : "How this page appears in Google results and when shared on social media."
);

// tina/collections/pages.ts
var singlePage = (name, label, file, route) => ({
  name,
  label,
  path: "content/pages",
  match: { include: file },
  format: "json",
  ui: { router: () => route, allowedActions: { create: false, delete: false } }
});
var home = {
  ...singlePage("home", "Home Page", "home", "/"),
  fields: [
    section("hero", "Hero (top of page)", [
      image("image", "Background image"),
      richText("heading", "Heading"),
      richText("subtext", "Subtext"),
      text("buttonLabel", "Main button", { description: "Opens the booking form." }),
      text("secondaryButtonLabel", "Second button", { description: "Scrolls down to the services." })
    ]),
    section("locations", "Where sessions happen", [
      text("inPerson", "In person line", { description: 'e.g. "In person in Leeds"' }),
      text("online", "Online line", { description: 'e.g. "Online, wherever you are in the world"' }),
      text("linkLabel", "Link to the Leeds page", { description: "Leave empty to hide the link." })
    ], "The band directly under the hero, so visitors know straight away where coaching takes place."),
    section("intro", "Introduction", [
      text("heading", "Heading"),
      richText("body", "Text"),
      text("linkLabel", "Link to services", { description: "Small link under the text that scrolls to the services." })
    ], "The first section under the hero."),
    section("about", "About Shanila", [
      text("heading", "Heading"),
      image("image", "Photo"),
      text("credential", "Credential line", { description: "Shown next to the star badge." }),
      richText("body", "Text"),
      text("buttonLabel", "Button", { description: "Links to the About page." })
    ]),
    section("reflection", "Reflection questions", [
      text("heading", "Heading"),
      text("tagline", "Tagline", { description: "Bold line under the heading." }),
      textarea("questions", "Questions", { description: "One question per line." })
    ]),
    section("services", "Services", [
      text("heading", "Heading"),
      textarea("subtext", "Subtext"),
      list("cards", "Service cards", [
        text("title", "Title"),
        textarea("description", "Description"),
        icon(),
        text("href", "Page it links to", { description: "e.g. /mindset-coaching" }),
        text("buttonLabel", "Button"),
        tone("tone", "Card colour", ["secondary", "primary"])
      ], { itemLabel: "title", fallback: "Service card", defaultItem: { title: "New service", tone: "secondary", icon: "fa-star" } })
    ]),
    closingCta([
      textarea("text", "Text"),
      text("buttonLabel", "Button")
    ]),
    seoSection()
  ]
};
var services = {
  ...singlePage("services", "Services Page", "services", "/services"),
  fields: [
    section("hero", "Hero (top of page)", [text("heading", "Heading"), richText("subtext", "Subtext")]),
    list("cards", "Service cards", [
      text("title", "Title"),
      text("duration", "Length", { description: 'Small line above the title, e.g. "12-Week Programme".' }),
      textarea("description", "Description"),
      icon(),
      textarea("highlights", "Highlights", { description: "One per line \u2014 shown as a ticked list." }),
      text("href", "Page it links to", { description: "e.g. /mindset-coaching" }),
      text("buttonLabel", "Button on the card"),
      tone("tone", "Card colour", ["secondary", "primary"]),
      text("fitHeading", "Side heading", { description: 'Heading beside the card, e.g. "Is this for you?".' }),
      textarea("fitBody", "Side text"),
      text("learnMoreLabel", "Side link", { description: "Link under the side text to the service page." })
    ], { itemLabel: "title", fallback: "Service card", defaultItem: { title: "New service", tone: "secondary", icon: "fa-star", fitHeading: "Is this for you?" } }),
    closingCta([text("heading", "Heading"), textarea("subtext", "Subtext"), text("buttonLabel", "Button")]),
    seoSection()
  ]
};
var about = {
  ...singlePage("about", "About Page", "about", "/about"),
  fields: [
    section("hero", "Hero (top of page)", [text("heading", "Heading"), richText("subtext", "Subtext")]),
    section("story", "My story", [
      text("heading", "Heading"),
      richText("body", "Text"),
      text("badge", "Tick line", { description: "Short line with a tick under the story." }),
      text("videoUrl", "Video link", { description: "A YouTube embed link (starts with https://www.youtube.com/embed/). Leave empty to hide the video." })
    ]),
    section("credentials", "Qualifications", [
      text("heading", "Heading"),
      textarea("subtext", "Subtext"),
      list("items", "Qualifications", [
        text("title", "Title"),
        textarea("description", "Description"),
        icon(),
        gradient("gradient", "Badge colour")
      ], { itemLabel: "title", fallback: "Qualification", defaultItem: { title: "New qualification", icon: "fa-certificate", gradient: "orange" } })
    ]),
    section("values", "Values", [
      text("heading", "Heading"),
      textarea("subtext", "Subtext"),
      list("items", "Values", [text("title", "Title"), textarea("description", "Description"), icon()], {
        itemLabel: "title",
        fallback: "Value",
        defaultItem: { title: "New value", icon: "fa-heart" }
      })
    ]),
    seoSection()
  ]
};
var situationItem = (textLabel = "Text") => [emoji(), textarea("text", textLabel), tone("tone", "Accent colour")];
var philosophy = (opts) => section("philosophy", "Philosophy", [
  ...opts.eyebrow ? [eyebrow()] : [],
  ...headingWithHighlight(),
  ...opts.quote ? [textarea("quote", "Quote")] : [],
  richText("body", "Text"),
  ...opts.banner ? [highlightedLine("banner", "Dark banner")] : [],
  ...opts.closing ? [highlightedLine("closing", "Closing line")] : []
]);
var bookingCta = () => closingCta([...headingWithHighlight(), richText("body", "Text"), text("buttonLabel", "Button")]);
var mindsetCoaching = {
  ...singlePage("clarityCoaching", "Mindset Coaching Page", "clarity-coaching", "/mindset-coaching"),
  fields: [
    section("hero", "Hero (top of page)", [
      eyebrow(),
      text("heading", "Heading"),
      richText("subtext", "Subtext"),
      text("buttonLabel", "Button"),
      emoji("sideEmoji", "Side emoji"),
      text("sideHeading", "Side heading", { description: 'Large text beside the hero on desktop, e.g. "12 Weeks".' }),
      text("sideSubtext", "Side subtext")
    ]),
    section("whoItsFor", "Who it's for", [
      ...headingWithHighlight(),
      textarea("subtext", "Subtext"),
      text("listIntro", "Line above the list"),
      list("items", "Situations", situationItem(), {
        itemLabel: "text",
        fallback: "Situation",
        defaultItem: { emoji: "\u2728", text: "New situation", tone: "primary" }
      }),
      highlightedLine("banner", "Banner", "The dark banner under the list. The coloured words show on their own line.")
    ]),
    section("problemSolution", "Problem and solution", [
      ...headingWithHighlight(),
      section("problem", "Problem card", [text("title", "Title"), richText("body", "Text")]),
      section("solution", "Solution card", [
        text("title", "Title"),
        richText("body", "Text"),
        text("keyword", "Big word", { description: "Large word at the bottom of the card." })
      ])
    ]),
    philosophy({ eyebrow: true, quote: true, banner: true, closing: true }),
    section("journey", "Programme timeline", [
      eyebrow(),
      ...headingWithHighlight(),
      textarea("subtext", "Subtext"),
      list("steps", "Steps", [
        text("number", "Number"),
        text("weeks", "Weeks"),
        text("title", "Title"),
        text("subtitle", "Subtitle"),
        textarea("description", "Description"),
        tone("tone", "Accent colour")
      ], { itemLabel: "title", fallback: "Step", defaultItem: { title: "New step", tone: "primary" } }),
      text("buttonLabel", "Button under the timeline")
    ]),
    section("included", "What's included", [
      eyebrow(),
      ...headingWithHighlight(),
      list("items", "Items", [emoji(), text("title", "Title"), text("subtitle", "Subtitle"), tone("tone", "Bubble colour")], {
        itemLabel: "title",
        fallback: "Item",
        defaultItem: { emoji: "\u2728", title: "New item", tone: "primary" }
      }),
      section("bonus", "Bonus line", [emoji(), text("label", "Bold start", { description: 'e.g. "Plus:"' }), text("text", "Text")])
    ]),
    bookingCta(),
    seoSection()
  ]
};
var careerCoaching = {
  ...singlePage("careerCoaching", "Career Coaching Page", "career-coaching", "/career-coaching"),
  fields: [
    section("hero", "Hero (top of page)", [text("heading", "Heading"), richText("subtext", "Subtext"), text("buttonLabel", "Button")]),
    section("whoItsFor", "Who it's for", [
      ...headingWithHighlight(),
      textarea("subtext", "Subtext"),
      text("listIntro", "Line above the list"),
      textarea("situations", "Situations", { description: "One per line." }),
      highlightedLine("banner", "Banner", "The dark banner under the list.")
    ]),
    section("approach", "The missing piece", [
      ...headingWithHighlight(),
      richText("body", "Text"),
      text("keyword", "Big word", { description: "Large word at the bottom of the card." })
    ]),
    philosophy({}),
    section("imagine", "Imagine", [
      ...headingWithHighlight(),
      list("items", "Items", situationItem(), {
        itemLabel: "text",
        fallback: "Item",
        defaultItem: { emoji: "\u2728", text: "New item", tone: "primary" }
      })
    ]),
    section("journey", "Programme roadmap", [
      ...headingWithHighlight(),
      text("lead", "Line under heading"),
      text("intro", "Intro to the steps"),
      list("steps", "Steps", [
        text("number", "Number"),
        text("weeks", "Weeks"),
        text("title", "Title"),
        text("subtitle", "Subtitle"),
        tone("tone", "Subtitle colour"),
        textarea("description", "Description")
      ], { itemLabel: "title", fallback: "Step", defaultItem: { title: "New step", tone: "primary" } }),
      text("buttonLabel", "Button under the roadmap")
    ]),
    section("included", "What's included", [
      ...headingWithHighlight(),
      text("subtext", "Subtext"),
      textarea("items", "Items", { description: "One per line \u2014 shown as a ticked list." })
    ]),
    bookingCta(),
    seoSection()
  ]
};
var numerology = {
  ...singlePage("numerology", "Numerology Page", "numerology", "/numerology"),
  fields: [
    section("hero", "Hero (top of page)", [
      eyebrow(),
      text("heading", "Heading"),
      text("tagline", "Tagline"),
      richText("subtext", "Subtext"),
      text("buttonLabel", "Button")
    ]),
    section("whoItsFor", "Who it's for", [
      ...headingWithHighlight(),
      textarea("subtext", "Subtext"),
      list("items", "Situations", situationItem(), {
        itemLabel: "text",
        fallback: "Situation",
        defaultItem: { emoji: "\u2728", text: "New situation", tone: "primary" }
      }),
      highlightedLine("statement", "Closing line")
    ]),
    section("whatItIs", "What numerology is", [
      eyebrow(),
      ...headingWithHighlight(),
      textarea("isNot", "What it isn\u2019t", { description: "The grey box." }),
      richText("isText", "What it is", { description: "The blue box." })
    ]),
    section("process", "How it works", [
      eyebrow(),
      ...headingWithHighlight(),
      list("steps", "Steps", [emoji(), text("label", "Step label", { description: 'e.g. "Step One"' }), text("title", "Title"), textarea("description", "Description")], {
        itemLabel: "title",
        fallback: "Step",
        defaultItem: { emoji: "\u2728", title: "New step" }
      })
    ]),
    section("included", "What's included", [
      eyebrow(),
      ...headingWithHighlight(),
      text("subtext", "Subtext"),
      list("items", "Items", [emoji(), text("title", "Title"), textarea("description", "Description")], {
        itemLabel: "title",
        fallback: "Item",
        defaultItem: { emoji: "\u2728", title: "New item" }
      })
    ]),
    philosophy({ eyebrow: true, quote: true, banner: true, closing: true }),
    closingCta([text("heading", "Heading"), text("buttonLabel", "Button")]),
    seoSection()
  ]
};
var contact = {
  ...singlePage("contact", "Contact Page", "contact", "/contact"),
  fields: [
    section("hero", "Hero (top of page)", [image("image", "Background image"), richText("heading", "Heading"), richText("subtext", "Subtext")]),
    section("intro", "Introduction", [text("heading", "Heading"), textarea("subtext", "Subtext")]),
    section("details", "Contact details", [
      text("emailTitle", "Email \u2014 title"),
      text("email", "Email address"),
      text("phoneTitle", "Phone \u2014 title"),
      text("phone", "Phone number"),
      text("videoTitle", "Video sessions \u2014 title"),
      text("video", "Video sessions \u2014 text"),
      text("locationTitle", "Location \u2014 title"),
      text("location", "Location"),
      text("bookingButtonLabel", "Booking button", { description: "Opens the booking form." })
    ], "The social icons come from the Footer (Site-Wide) settings."),
    section("form", "Message form", [
      text("heading", "Heading"),
      text("nameLabel", "Name \u2014 label"),
      text("namePlaceholder", "Name \u2014 hint text"),
      text("emailLabel", "Email \u2014 label"),
      text("emailPlaceholder", "Email \u2014 hint text"),
      text("phoneLabel", "Phone \u2014 label"),
      text("phonePlaceholder", "Phone \u2014 hint text"),
      text("messageLabel", "Message \u2014 label"),
      text("messagePlaceholder", "Message \u2014 hint text"),
      text("submitLabel", "Send button"),
      text("submittingLabel", "Send button while sending"),
      textarea("privacyNote", "Small print under the button")
    ]),
    seoSection()
  ]
};
var leeds = {
  ...singlePage("leeds", "Sessions in Leeds Page", "leeds", "/sessions-in-leeds"),
  fields: [
    section("hero", "Hero (top of page)", [
      eyebrow(),
      text("heading", "Heading"),
      richText("subtext", "Subtext"),
      text("buttonLabel", "Button", { description: "Opens the booking form." })
    ]),
    section("intro", "Introduction", [...headingWithHighlight(), richText("body", "Text")]),
    section("offerings", "Sessions on offer", [
      text("heading", "Heading"),
      textarea("subtext", "Subtext"),
      list("items", "Services", [
        icon(),
        text("title", "Title"),
        textarea("description", "Description"),
        text("href", "Page it links to", { description: "e.g. /mindset-coaching" }),
        text("linkLabel", "Link text")
      ], { itemLabel: "title", fallback: "Service", defaultItem: { icon: "fa-star", title: "New service" } })
    ]),
    section("whoIHelp", "Who I help", [text("heading", "Heading"), textarea("items", "Points", { description: "One per line \u2014 shown as a ticked list." })]),
    section("howItWorks", "In person or online", [
      text("heading", "Heading"),
      section("inPerson", "In person", [text("title", "Title"), textarea("body", "Text")]),
      section("online", "Online", [text("title", "Title"), textarea("body", "Text")])
    ]),
    section("whyShanila", "Why work with Shanila", [
      text("heading", "Heading"),
      textarea("points", "Points", { description: "One per line." }),
      text("linkLabel", "Link to the About page")
    ]),
    section("faq", "Questions and answers", [
      text("heading", "Heading"),
      list("items", "Questions", [text("question", "Question"), textarea("answer", "Answer")], {
        itemLabel: "question",
        fallback: "Question",
        defaultItem: { question: "New question?" }
      })
    ]),
    bookingCta(),
    seoSection()
  ]
};

// tina/collections/resources.ts
var manage = (kind, label) => ({
  type: "string",
  list: false,
  name: "manage",
  label,
  ui: { component: libraryManagerField(kind) }
});
var resources = {
  name: "resources",
  label: "Resources Page",
  path: "content/pages",
  match: { include: "resources" },
  format: "json",
  ui: { router: () => "/resources", allowedActions: { create: false, delete: false } },
  fields: [
    section("hero", "Hero (top of page)", [eyebrow(), ...headingWithHighlight(), textarea("subtext", "Subtext")]),
    list("sectionNav", "Jump buttons", [
      text("label", "Label"),
      icon(),
      {
        type: "string",
        name: "target",
        label: "Jumps to",
        options: [
          { value: "featured", label: "Featured" },
          { value: "blog", label: "Blog library" },
          { value: "podcast", label: "Podcast library" }
        ]
      }
    ], {
      itemLabel: "label",
      fallback: "Jump button",
      description: "The round buttons in the hero that jump down the page. Add, remove or drag to reorder. A button hides itself while its section is empty.",
      defaultItem: { label: "Blog Library", icon: "fa-pen-fancy", target: "blog" }
    }),
    section("featured", "Featured", [text("heading", "Badge text")], "To feature a post or episode, open it and switch on \u201CFeature on Resources page\u201D."),
    section("blogLibrary", "Blog library", [
      text("heading", "Heading"),
      manage("post", "Blog posts"),
      text("readMoreLabel", "Card link text"),
      text("backLinkLabel", "Back link on each post page"),
      text("emptyPostMessage", "Message on a post with no text yet"),
      section("postEnding", "End of each post", [
        text("serviceEyebrow", "Service card \u2014 small label"),
        text("serviceHeading", "Service card \u2014 heading", { description: 'Write {service} where the service name should go, e.g. "Ready to go further with {service}?"' }),
        textarea("serviceText", "Service card \u2014 text"),
        text("serviceButton", "Service card \u2014 button", { description: "Write {service} where the service name should go." }),
        text("relatedHeading", "Heading above related posts")
      ], 'The card suggesting a service and the "keep reading" posts shown after every blog post.')
    ]),
    section("podcastLibrary", "Podcast library", [
      text("heading", "Heading"),
      manage("podcast", "Podcast episodes"),
      text("listenLabel", "Listen button"),
      text("comingSoonLabel", "Button when there is no link yet")
    ]),
    section("newsletter", "Newsletter sign-up", [
      text("heading", "Heading"),
      textarea("subtext", "Subtext"),
      text("placeholder", "Email box hint text"),
      text("buttonLabel", "Button"),
      text("successMessage", "Thank-you message")
    ]),
    seoSection()
  ]
};
var STATUS = { type: "string", name: "status", label: "Status", options: ["Published", "Coming Soon", "Draft"] };
var featured = {
  type: "boolean",
  name: "featured",
  label: "Feature on Resources page",
  description: "Shows this at the top of the Resources page, above the library."
};
var cardStyle = (defaultIcon) => section("cardStyle", "Card look (when there\u2019s no cover image)", [
  icon("icon", "Icon"),
  tone("tone", "Colour", ["primary", "accent", "secondary"])
], `Used only when no cover image is set. Default icon: ${defaultIcon.replace("fa-", "")}.`);
var post = {
  name: "post",
  label: "Resources \u203A Blog posts",
  path: "content/posts",
  format: "md",
  ui: {
    router: ({ document: document2 }) => `/blog/${document2._sys.filename}`,
    filename: { readonly: false, slugify }
  },
  defaultItem: () => ({
    title: "New Blog Post",
    publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
    status: "Draft",
    featured: false,
    excerpt: "Write a short excerpt for the preview card\u2026",
    cardStyle: { icon: "fa-pen-fancy", tone: "primary" },
    relatedService: "mindset"
  }),
  fields: [
    { type: "string", name: "title", label: "Title", isTitle: true, required: true },
    { type: "datetime", name: "publishedAt", label: "Published date" },
    STATUS,
    featured,
    textarea("excerpt", "Short summary", { description: "Shown on the card and under the title." }),
    image("image", "Cover image", { description: "Shown on the card and behind the title." }),
    cardStyle("fa-pen-fancy"),
    {
      type: "string",
      name: "relatedService",
      label: "Service to suggest at the end",
      description: "A short card after the post invites readers to this service.",
      options: [
        { value: "mindset", label: "Mindset Coaching" },
        { value: "career", label: "Career Coaching" },
        { value: "numerology", label: "Numerology" },
        { value: "none", label: "None" }
      ]
    },
    seoSection(true),
    { type: "rich-text", name: "body", label: "Post", isBody: true }
  ]
};
var podcast = {
  name: "podcast",
  label: "Resources \u203A Podcast episodes",
  path: "content/podcasts",
  format: "md",
  // Episodes have no page of their own (cards link out to the listen URL), so
  // they preview on the Resources page with this episode's form open.
  ui: {
    router: ({ document: document2 }) => previewRoute(`podcasts/${document2._sys.filename}.md`),
    filename: { readonly: false, slugify }
  },
  defaultItem: () => ({
    title: "New Episode",
    episode: "Episode XX",
    publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
    status: "Coming Soon",
    featured: false,
    excerpt: "Write a short excerpt\u2026",
    cardStyle: { icon: "fa-microphone-alt", tone: "primary" }
  }),
  fields: [
    { type: "string", name: "title", label: "Title", isTitle: true, required: true },
    text("episode", "Episode label", { description: 'e.g. "Episode 01"' }),
    { type: "datetime", name: "publishedAt", label: "Published date" },
    STATUS,
    featured,
    text("audioUrl", "Listen link", { description: "Spotify, Apple Podcasts or YouTube link. Leave empty to show \u201CComing soon\u201D." }),
    textarea("excerpt", "Short summary", { description: "Shown on the card." }),
    image("image", "Cover image"),
    cardStyle("fa-microphone-alt"),
    { type: "rich-text", name: "body", label: "Show notes", isBody: true }
  ]
};

// tina/collections/site.ts
var siteDoc = (name, label, file) => ({
  name,
  label,
  path: "content",
  match: { include: file },
  format: "json",
  ui: {
    router: () => previewRoute(`${file}.json`),
    allowedActions: { create: false, delete: false }
  }
});
var link = () => [text("label", "Label"), text("href", "Link", { description: "A page like /about, or a full https:// address." })];
var navbar = {
  ...siteDoc("navbar", "Site \u203A Navigation bar", "navbar"),
  fields: [
    text("brandLabel", "Name next to the logo"),
    text("ctaLabel", "Booking button"),
    list("links", "Menu links", [...link(), { type: "boolean", name: "showDropdown", label: 'Show the "Work with me" dropdown on this link' }], {
      itemLabel: "label",
      fallback: "Menu link"
    }),
    list("workWithMeDropdown", '"Work with me" dropdown', link(), { itemLabel: "label", fallback: "Dropdown link" })
  ]
};
var bookingForm = {
  ...siteDoc("bookingForm", "Site \u203A Booking form", "booking-form"),
  fields: [
    text("overlayTitle", "Title"),
    text("firstNameLabel", "First name \u2014 label"),
    text("lastNameLabel", "Last name \u2014 label"),
    text("emailLabel", "Email \u2014 label"),
    text("countryCodeLabel", "Country code \u2014 label"),
    text("phoneLabel", "Phone \u2014 label"),
    text("serviceLabel", "Service \u2014 label"),
    text("servicePlaceholder", "Service \u2014 hint text"),
    { type: "string", name: "services", label: "Service choices", list: true },
    text("messageLabel", "Message \u2014 label"),
    text("messagePlaceholder", "Message \u2014 hint text"),
    text("submitLabel", "Send button"),
    text("submittingLabel", "Send button while sending"),
    textarea("successMessage", "Thank-you message"),
    textarea("errorMessage", "Error message")
  ]
};
var footer = {
  ...siteDoc("footer", "Site \u203A Footer", "footer"),
  fields: [
    text("brandHeading", "Name"),
    textarea("brandDescription", "Short description"),
    text("location", "Location line", { description: 'Shown under the description, e.g. "Leeds, UK \xB7 Coaching online worldwide".' }),
    text("quickLinksHeading", "First link column \u2014 heading"),
    list("quickLinks", "First link column", link(), { itemLabel: "label", fallback: "Link" }),
    text("servicesHeading", "Second link column \u2014 heading"),
    list("serviceLinks", "Second link column", link(), { itemLabel: "label", fallback: "Link" }),
    text("connectHeading", "Social column \u2014 heading"),
    list("socialLinks", "Social links", [text("label", "Name"), icon("icon", "Icon", ["Social"]), text("href", "Link")], {
      itemLabel: "label",
      fallback: "Social link",
      description: "Also used for the social icons on the Home and Contact pages.",
      defaultItem: { label: "Instagram", icon: "fa-instagram" }
    }),
    text("emailLabel", "Email \u2014 title"),
    text("email", "Email address"),
    text("phoneLabel", "Phone \u2014 title"),
    text("phone", "Phone number"),
    text("copyright", "Copyright line")
  ]
};
var typography = {
  ...siteDoc("typography", "Site \u203A Fonts", "typography"),
  fields: [
    {
      type: "string",
      name: "headingFont",
      label: "Heading font",
      description: "Used for section headings across the site.",
      options: [
        { value: "caslon", label: "Libre Caslon (elegant serif)" },
        { value: "dancing", label: "Dancing Script (handwritten)" },
        { value: "titillium", label: "Titillium Web (clean sans-serif)" }
      ]
    },
    {
      type: "string",
      name: "headingWeight",
      label: "Heading weight",
      options: [
        { value: "400", label: "Regular" },
        { value: "600", label: "Semibold" },
        { value: "700", label: "Bold" }
      ]
    },
    {
      type: "string",
      name: "headingStyle",
      label: "Heading style",
      options: [
        { value: "normal", label: "Normal" },
        { value: "italic", label: "Italic" }
      ]
    },
    {
      type: "string",
      name: "bodyFont",
      label: "Body font",
      options: [
        { value: "titillium", label: "Titillium Web" },
        { value: "caslon", label: "Libre Caslon" }
      ]
    },
    {
      type: "string",
      name: "bodyWeight",
      label: "Body weight",
      options: [
        { value: "300", label: "Light" },
        { value: "400", label: "Regular" },
        { value: "600", label: "Semibold" }
      ]
    },
    { type: "number", name: "baseFontSize", label: "Body text size (px)", description: "Default: 16" }
  ]
};
var testimonials = {
  ...siteDoc("testimonials", "Testimonials", "testimonials"),
  fields: [
    text("heading", "Heading"),
    list("items", "Testimonials", [textarea("quote", "Quote"), text("author", "Name and role")], {
      itemLabel: "author",
      fallback: "Testimonial"
    })
  ]
};

// tina/config.ts
function ThemeStudioIcon() {
  return React4.createElement(
    "svg",
    { viewBox: "0 0 24 24", width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
    React4.createElement("circle", { cx: 13.5, cy: 6.5, r: ".5", fill: "currentColor" }),
    React4.createElement("circle", { cx: 17.5, cy: 10.5, r: ".5", fill: "currentColor" }),
    React4.createElement("circle", { cx: 8.5, cy: 7.5, r: ".5", fill: "currentColor" }),
    React4.createElement("circle", { cx: 6.5, cy: 12.5, r: ".5", fill: "currentColor" }),
    React4.createElement("path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" })
  );
}
function ThemeStudioScreen() {
  return React4.createElement("iframe", {
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
  // Collection definitions live in tina/collections/*; shared field builders
  // and the visual pickers live in tina/shared.ts and tina/fields/*.
  // Theme colours are edited in Theme Studio (content/theme.json), not here.
  schema: {
    collections: [
      home,
      services,
      about,
      mindsetCoaching,
      careerCoaching,
      numerology,
      leeds,
      resources,
      post,
      podcast,
      contact,
      navbar,
      footer,
      testimonials,
      bookingForm,
      typography
    ]
  }
});
export {
  config_default as default
};
