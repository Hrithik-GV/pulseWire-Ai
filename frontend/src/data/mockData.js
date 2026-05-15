export const workflows = [
  {
    id: "wf-1",
    name: "Global Tech Breakdown",
    status: "active",
    progress: 65,
    agent: "DeepResearch v2",
    lastStep: "Verifying primary sources",
    timestamp: "2 minutes ago",
    type: "news-analysis",
    metrics: { sources: 12, verification: 0.98, articles: 1 }
  },
  {
    id: "wf-2",
    name: "Market Volatility Alert",
    status: "completed",
    progress: 100,
    agent: "FinanceAgent",
    lastStep: "Published to Telegram, Discord",
    timestamp: "15 minutes ago",
    type: "alert",
    metrics: { sources: 45, verification: 1.0, articles: 3 }
  },
  {
    id: "wf-3",
    name: "AI Policy Update",
    status: "processing",
    progress: 32,
    agent: "LegalObserver",
    lastStep: "Analyzing draft regulations",
    timestamp: "Just now",
    type: "compliance",
    metrics: { sources: 5, verification: 0.85, articles: 0 }
  }
];

export const agents = [
  { id: "ag-1", name: "NewsScanner", role: "Detection", status: "online", load: 24 },
  { id: "ag-2", name: "SourceVerifier", role: "Verification", status: "online", load: 12 },
  { id: "ag-3", name: "DeepResearcher", role: "Research", status: "busy", load: 88 },
  { id: "ag-4", name: "ContentGenie", role: "Generation", status: "online", load: 45 },
  { id: "ag-5", name: "PubMaster", role: "Publishing", status: "idle", load: 0 }
];

export const articles = [
  {
    id: "art-1",
    title: "The Rise of Autonomous AI Agents in Newsrooms",
    summary: "A deep dive into how newsrooms are adopting AI to automate breaking news detection and source verification.",
    platforms: ["telegram", "discord", "reddit"],
    publishedAt: "2024-05-15T14:30:00Z",
    sources: ["TechCrunch", "Wired", "Reuters"],
    sentiment: "positive",
    reach: "12.4k"
  },
  {
    id: "art-2",
    title: "Global Supply Chain Disruptions: A 2024 Outlook",
    summary: "AI agents analyze satellite data and shipping logs to predict major bottlenecks in the coming quarters.",
    platforms: ["telegram", "reddit"],
    publishedAt: "2024-05-15T12:00:00Z",
    sources: ["Bloomberg", "FT", "Maersk"],
    sentiment: "neutral",
    reach: "8.2k"
  }
];

export const publishingLogs = [
  { id: "log-1", platform: "telegram", channel: "@PulseWireTech", status: "success", timestamp: "10 mins ago", message: "Published: Tech Trends 2024" },
  { id: "log-2", platform: "discord", channel: "Breaking News", status: "success", timestamp: "12 mins ago", message: "Published: Market Alert" },
  { id: "log-3", platform: "reddit", channel: "r/technology", status: "pending", timestamp: "Just now", message: "Queued for submission" },
  { id: "log-4", platform: "telegram", channel: "@PulseWireTech", status: "error", timestamp: "1 hour ago", message: "Rate limit exceeded" }
];
