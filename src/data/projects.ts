import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    id: 'guardify',
    title: 'Guardify',
    summary:
      'Chrome extension prototype that detects risky Shopify listings using page-signal heuristics and optional ML scoring. It combines a React popup, content-script scanning, and a FastAPI scoring backend to surface real-time risk alerts.',
    iconText: 'GU',
    imageUrl: '/projects/scam-chrome-detection/Guardify.png',
    technologies: ['React', 'Python', 'FastAPI', 'scikit-learn'],
    repoUrl: 'https://github.com/patrickxChen/Shopify-Scam-detection-Extension',
    featured: true,
  },
  {
    id: 'parsar',
    title: 'ParsAR',
    summary:
      'AR social-practice companion built at UofTHacks that enables voice-based interaction rehearsal in realistic environments. It integrates ElevenLabs speech synthesis and Google Cloud NLP to deliver contextual conversational responses.',
    iconText: 'PA',
    imageUrl: '/projects/parsAR/parsAR.png',
    technologies: ['Unity', 'C#', 'AR Foundation', 'ElevenLabs API', 'Google Cloud NLP'],
    repoUrl: 'https://github.com/patrickxChen/ParsAR',
    liveUrl: 'https://devpost.com/software/parsar',
  },
  {
    id: 'pacman-game',
    title: 'Pac-Man Game',
    summary:
      'Arcade game implementation featuring deterministic grid movement, precise collisions, and BFS-driven ghost AI with dynamic difficulty scaling. Deployed as a production web build using Vite and Vercel.',
    iconText: 'PM',
    imageUrl: '/projects/pacmangame/Pacman.png',
    technologies: ['Java', 'TypeScript', 'HTML5 Canvas', 'Vite', 'Vercel'],
    repoUrl: 'https://github.com/patrickxChen/PacMan-Game',
  },
]
