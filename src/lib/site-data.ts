export const SITE = {
  name: "Titan",
  brand: "Titan",
  title: "Titan",
  role: "I'm the best at anything I do.",
  location: "Web3 · Remote",
  links: {
    github: "https://github.com/Cryptotytan",
    linkedin: "https://www.linkedin.com/in/stephenig",
    x: "https://x.com/crypto_tytn",
    dune: "https://dune.com/cryptotitan",
    telegram: "https://t.me/cryptotytnn",
    tiktok: "https://www.tiktok.com/@promptedbytitan",
  },
} as const;

export const NAV = [
  { id: "work", label: "Work" },
  { id: "videos", label: "Videos" },
  { id: "writing", label: "Writing" },
  { id: "practice", label: "Practice" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const SIGNALS = [
  { value: "3+", label: "Years in Web3" },
  { value: "2", label: "Ecosystems recognized by Dune" },
  { value: "10+", label: "Teams across protocol, gaming, NFT, DAO" },
  { value: "50+", label: "On-chain queries on Dune" },
  { value: "10+", label: "AI Videos" },
  { value: "50+", label: "Written Contents" },
  { value: "10+", label: "Sealed Partnerships as a B.D" },
] as const;

export const PRACTICES = [
  { id: "community", index: "01", title: "Community operations", body: "Onboarding systems, channel architecture, moderation, and day-to-day health across Discord and Telegram.", points: ["Retention and participation strategy", "Sentiment monitoring", "Campaign coordination"] },
  { id: "analytics", index: "02", title: "On-chain analytics", body: "Dune dashboards that turn raw chain activity into something a community can actually use.", points: ["Dashboard design", "Ecosystem metrics", "Research for growth and content"] },
  { id: "partnerships", index: "03", title: "Partnerships", body: "Outreach through execution. Cross-community campaigns with projects, creators, and ecosystem teams.", points: ["Deal sourcing", "Campaign planning", "Ecosystem development"] },
  { id: "content", index: "04", title: "Content & AI video", body: "Educational and campaign writing, plus full AI video pipelines.", points: ["Technical writing for mixed audiences", "Prompt systems", "Cinematic production workflows"] },
] as const;

export type WorkKind = "Dashboard";
export type WorkItem = { id: string; kind: WorkKind; title: string; client: string; summary: string; body: string; href?: string; hrefLabel?: string; tags: string[] };
export const WORK: WorkItem[] = [
  { id: "plume", kind: "Dashboard", title: "Plume Analytics", client: "Plume Network", summary: "Transaction, wallet, and volume analysis for an RWA-focused L1.", body: "Plume dashboard — 24h/7d/30d windows for transactions, wallets, fees, and volume.", href: "https://dune.com/cryptotitan/plume-analytics", hrefLabel: "Open on Dune", tags: ["Dune", "RWA", "Wallets", "Volume"] },
  { id: "katana", kind: "Dashboard", title: "Katana Analytics", client: "Katana", summary: "Active wallets, contract heat, and six-week retention for a DeFi L2.", body: "Katana dashboard — actives, contracts, and retention.", href: "https://dune.com/cryptotitan/katana-analytics", hrefLabel: "Open on Dune", tags: ["Dune", "DeFi", "Retention"] },
  { id: "union", kind: "Dashboard", title: "Union TVL Breakdown", client: "Union", summary: "TVL composition across an interoperability stack.", body: "A readable allocation instead of a headline number.", href: "https://dune.com/cryptotitan/union-tvl-breakdown", hrefLabel: "Open on Dune", tags: ["Dune", "TVL", "Interop"] },
];

export type RoleKind = "community" | "partnerships" | "analytics" | "content";
export type Role = { id: string; kind: RoleKind; title: string; org: string; context: string; bullets: string[] };
export const ROLES: Role[] = [
  { id: "centaurus", kind: "community", title: "Lead Community Manager", org: "Centaurus Protocol", context: "DeFi & GameFi", bullets: ["Led community management and engagement.", "Designed participation and retention programs."] },
  { id: "dune-role", kind: "analytics", title: "On-chain analyst", org: "Dune Analytics", context: "Katana · Plume · Union", bullets: ["Built dashboards for on-chain activity.", "Recognized by Dune in Katana and Plume."] },
  { id: "partnerships-role", kind: "partnerships", title: "Collaboration & Partnership Manager", org: "Stars on SEI · Ghoons NFT · Battle Token", context: "Partnerships", bullets: ["Identified collaborations.", "Ran outreach through execution."] },
  { id: "content-role", kind: "content", title: "Content writer & AI video creator", org: "Independent", context: "Writing · generative video", bullets: ["Writes Web3 copy.", "Runs AI video pipelines."] },
];
export const ROLE_FILTERS: { id: "all" | RoleKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "community", label: "Community" },
  { id: "analytics", label: "Analytics" },
  { id: "partnerships", label: "Partnerships" },
  { id: "content", label: "Content" },
];
export const SKILL_GROUPS = [
  { title: "Community", items: ["Community management", "Growth strategy", "Discord & Telegram"] },
  { title: "Data", items: ["Dune Analytics", "On-chain analysis", "Dashboard design"] },
  { title: "Partnerships", items: ["Strategic partnerships", "Business development", "Outreach"] },
  { title: "Content", items: ["Content writing", "AI video", "Storytelling"] },
] as const;
export const TOOLS = ["Dune Analytics", "Discord", "Telegram", "GitHub", "AI video tools"] as const;
export const VIDEOS = [
  { id: "pnn", title: "PNN: THE BLACKOUT", href: "https://x.com/crypto_tytn/status/2093998270301233540", image: "/images/videos/pnn.jpg", clip: "/videos/pnn.mp4" },
  { id: "cade", title: "CADE MARKET", href: "https://x.com/crypto_tytn/status/2089028656530125202", image: "/images/videos/cade.jpg", clip: "/videos/cade.mp4" },
  { id: "burnie", title: "BURNIE FILM CONTEST", href: "https://x.com/crypto_tytn/status/2088124231049515364", image: "/images/videos/burnie.jpg", clip: "/videos/burnie.mp4" },
  { id: "snvr", title: "SNVR", href: "https://x.com/crypto_tytn/status/2077440758970233006", image: "/images/videos/snvr.jpg", clip: "/videos/snvr.mp4" },
  { id: "robinhood", title: "ROBINHOOD", href: "https://x.com/crypto_tytn/status/2077018294607917153", image: "/images/videos/robinhood.jpg", clip: "/videos/robinhood.mp4" },
  { id: "ansem", title: "$ANSEM", href: "https://x.com/crypto_tytn/status/2074600986220417306", image: "/images/videos/ansem.jpg", clip: "/videos/ansem.mp4" },
  { id: "qwerti-bitget", title: "QWERTI X BITGET", href: "https://x.com/crypto_tytn/status/2069489012910547406", image: "/images/videos/qwerti-bitget.jpg", clip: "/videos/qwerti-bitget.mp4" },
  { id: "qwerti", title: "QWERTI CAMPAIGN", href: "https://x.com/crypto_tytn/status/2067677738836582899", image: "/images/videos/qwerti.jpg", clip: "/videos/qwerti.mp4" },
  { id: "abyss", title: "ABYSSAL CURSE", href: "https://x.com/crypto_tytn/status/2060665742538719365", image: "/images/videos/abyss.jpg", clip: "/videos/abyss.mp4" },
] as const;
export const ARTICLES = [
  { id: "missing", title: "The Missing Piece in DeFi", href: "https://x.com/crypto_tytn/status/2034333409032688066", image: "/images/articles/missing.jpg" },
  { id: "middleman", title: "The Last Middleman", href: "https://x.com/crypto_tytn/status/2036789703131688983", image: "/images/articles/middleman.jpg" },
  { id: "god", title: "The Moment Every Crypto User Finds God", href: "https://x.com/crypto_tytn/status/2047733326065152351", image: "/images/articles/god.jpg" },
  { id: "widget", title: "The White-Label Widget", href: "https://x.com/crypto_tytn/status/2057536764152021368", image: "/images/articles/widget.jpg" },
  { id: "bridging", title: "The End of Manual Bridging", href: "https://x.com/crypto_tytn/status/2064434296551559409", image: "/images/articles/bridging.jpg" },
  { id: "hands", title: "The Hands That Painted History Were Always Empty", href: "https://x.com/crypto_tytn/status/2048784374443696425", image: "/images/articles/hands.jpg" },
  { id: "grandma", title: "Your Grandma's Secret Formula", href: "https://x.com/crypto_tytn/status/2045216667983384818", image: "/images/articles/grandma.jpg" },
] as const;
export type SystemBodyId = "sun" | Exclude<(typeof NAV)[number]["id"], "writing">;
export type SystemBody = { id: SystemBodyId; planet: string; texture: string; kind: number; glow: string; rings?: boolean; star?: boolean; href: string; kicker: string; title: string; body: string; cta: string };
export const SYSTEM_BODIES: SystemBody[] = [
  { id: "sun", planet: "The Sun", texture: "/images/planets/sun.jpg", kind: 0, glow: "#ffb347", star: true, href: "#work", kicker: "00 · Nucleus", title: "Titan at the center", body: "The whole system turns around one operator.", cta: "Enter the system" },
  { id: "work", planet: "Mercury", texture: "/images/planets/mercury.jpg", kind: 1, glow: "#c4b49a", href: "#work", kicker: "01 · Bodies", title: "Dune Dashboards", body: "On-chain work recognized inside Katana and Plume.", cta: "Open Work" },
  { id: "videos", planet: "Venus", texture: "/images/planets/venus.jpg", kind: 2, glow: "#e4c37a", href: "#videos", kicker: "02 · Reels", title: "AI Videos", body: "Nine cuts, all on X.", cta: "Open Videos" },
  { id: "practice", planet: "Earth", texture: "/images/planets/earth.jpg", kind: 3, glow: "#5b8fe8", href: "#practice", kicker: "04 · Elements", title: "Four ways the work shows up", body: "Systems first.", cta: "Open Practice" },
  { id: "experience", planet: "Mars", texture: "/images/planets/mars.jpg", kind: 4, glow: "#d56a3a", href: "#experience", kicker: "05 · Orbits", title: "Roles across the stack", body: "Protocol, gaming, NFT, DAO, and analytics.", cta: "Open Experience" },
  { id: "about", planet: "Jupiter", texture: "/images/planets/jupiter.jpg", kind: 5, glow: "#d7b48a", href: "#about", kicker: "06 · Origin", title: "Operator in public", body: "Translation is the through-line.", cta: "Open About" },
  { id: "contact", planet: "Saturn", texture: "/images/planets/saturn.jpg", kind: 6, glow: "#e6d3a2", rings: true, href: "#contact", kicker: "07 · Alignment", title: "Work with Titan", body: "The fastest path is X or LinkedIn.", cta: "Open Contact" },
];
