export interface TechItem {
  id: string;
  icon: string;
  name: string;
}

export interface TechGroup {
  id: string;
  label: string;
  color: string;
  open: boolean;
  items: TechItem[];
}

export const techmap: TechGroup[] = [
  {
    id: 'frontend', label: 'Frontend', color: '#6366f1', open: true,
    items: [
      { id: 'react',      icon: '⚛',  name: 'React' },
      { id: 'nextjs',     icon: '▲',  name: 'Next.js' },
      { id: 'typescript', icon: 'TS', name: 'TypeScript' },
      { id: 'tailwind',   icon: '💨', name: 'Tailwind' },
      { id: 'astro',      icon: '🚀', name: 'Astro' },
    ],
  },
  {
    id: 'backend', label: 'Backend', color: '#10b981', open: true,
    items: [
      { id: 'nodejs',     icon: '⬡',  name: 'Node.js' },
      { id: 'fastapi',    icon: 'FA', name: 'FastAPI' },
      { id: 'postgresql', icon: 'PG', name: 'PostgreSQL' },
      { id: 'redis',      icon: '⚡', name: 'Redis' },
    ],
  },
  {
    id: 'infra', label: 'Infra', color: '#f59e0b', open: true,
    items: [
      { id: 'docker',    icon: '🐳', name: 'Docker' },
      { id: 'nginx',     icon: 'NX', name: 'Nginx' },
      { id: 'ghactions', icon: '⚙',  name: 'GitHub Actions' },
    ],
  },
  {
    id: 'ai', label: 'AI / Tools', color: '#ec4899', open: true,
    items: [
      { id: 'claude',     icon: '◆',  name: 'Claude API' },
      { id: 'gemini',     icon: '✦',  name: 'Gemini API' },
      { id: 'playwright', icon: '🎭', name: 'Playwright' },
    ],
  },
];
