export const MOCK_WORKFLOWS = [
  {
    id: 'wf-001',
    topic: 'Apple Vision Pro Gen 2 Leaks',
    status: 'running',
    current_agent: 'Research Agent',
    progress: 35,
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    steps: [
      { name: 'Planner', status: 'completed', duration: '12s' },
      { name: 'Research', status: 'running', duration: 'ongoing' },
      { name: 'FactCheck', status: 'pending', duration: '-' },
      { name: 'Article', status: 'pending', duration: '-' },
      { name: 'Social', status: 'pending', duration: '-' },
      { name: 'Publishing', status: 'pending', duration: '-' },
    ]
  },
  {
    id: 'wf-002',
    topic: 'SpaceX Starship IFT-4 Success',
    status: 'completed',
    current_agent: 'Finished',
    progress: 100,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    steps: [
      { name: 'Planner', status: 'completed', duration: '8s' },
      { name: 'Research', status: 'completed', duration: '45s' },
      { name: 'FactCheck', status: 'completed', duration: '30s' },
      { name: 'Article', status: 'completed', duration: '55s' },
      { name: 'Social', status: 'completed', duration: '40s' },
      { name: 'Publishing', status: 'completed', duration: '20s' },
    ]
  },
  {
    id: 'wf-003',
    topic: 'OpenAI GPT-5 Rumors',
    status: 'failed',
    current_agent: 'FactCheck Agent',
    progress: 45,
    error: 'Source verification failed: Conflicting reports detected',
    created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    steps: [
      { name: 'Planner', status: 'completed', duration: '10s' },
      { name: 'Research', status: 'completed', duration: '120s' },
      { name: 'FactCheck', status: 'failed', duration: '15s' },
      { name: 'Article', status: 'pending', duration: '-' },
      { name: 'Social', status: 'pending', duration: '-' },
      { name: 'Publishing', status: 'pending', duration: '-' },
    ]
  }
];

export const MOCK_ARTICLES = [
  {
    id: 'art-001',
    workflow_id: 'wf-002',
    title: 'SpaceX Starship IFT-4: A Giant Leap for Reusability',
    summary: 'SpaceX successfully completed its fourth integrated flight test of Starship, achieving soft splashdowns for both the Super Heavy booster and the Ship.',
    content: 'Full article content here...',
    sources: ['SpaceX.com', 'Twitter/ElonMusk', 'Reuters'],
    published_at: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
  },
  {
    id: 'art-002',
    workflow_id: 'wf-004',
    title: 'NVIDIA Hits $3 Trillion Market Cap',
    summary: 'The AI chip giant has overtaken Apple to become the world’s second most valuable company.',
    content: 'Full article content here...',
    sources: ['Bloomberg', 'CNBC', 'Yahoo Finance'],
    published_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  }
];

export const MOCK_POSTS = [
  {
    id: 'post-001',
    article_id: 'art-001',
    platform: 'Telegram',
    content: '🚀 Starship IFT-4 was a massive success! Both stages achieved soft landing. #SpaceX #Starship',
    status: 'published',
    url: 'https://t.me/pulsewire/123'
  },
  {
    id: 'post-002',
    article_id: 'art-001',
    platform: 'Discord',
    content: 'SpaceX Starship IFT-4 Live Update: Soft splashdown confirmed!',
    status: 'published',
    url: 'https://discord.com/channels/...'
  },
  {
    id: 'post-003',
    article_id: 'art-001',
    platform: 'Reddit',
    content: 'Starship IFT-4 Megathread: Success!',
    status: 'failed',
    error: 'Rate limit exceeded'
  }
];
