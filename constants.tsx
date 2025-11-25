
import { Github, Mail } from 'lucide-react';
import { Project, SocialLink, StackItem } from './types';
import { ALL_ARTICLES } from './articles/index';

export const SOCIALS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/mathis-mm', icon: Github },
  { name: 'Email', url: 'mailto:contact@mmaa.dev', icon: Mail },
];

export const STACK: StackItem[] = [
  // Languages
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  
  // Cloud & DevOps
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Cloudflare', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  
  // Databases
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'DynamoDB', icon: 'https://cdn.worldvectorlogo.com/logos/aws-dynamodb.svg' }, 
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  
  // IDEs
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Neovim', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neovim/neovim-original.svg' },
  { name: 'IntelliJ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nebula',
    description: 'AI-driven analytics dashboard designed for scale. Real-time data processing with aesthetic visualizations.',
    tags: ['React', 'D3.js', 'Python'],
    imageUrl: 'https://picsum.photos/800/600?grayscale',
    link: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'VulnTrack',
    description: 'Automated vulnerability scanning pipeline for CI/CD workflows.',
    tags: ['Security', 'Go', 'Docker'],
    imageUrl: 'https://picsum.photos/400/300?blur=2',
    link: '#',
    featured: false,
  },
  {
    id: '3',
    title: 'EtherWallet',
    description: 'Non-custodial crypto wallet with social recovery features.',
    tags: ['Web3', 'Solidity'],
    imageUrl: 'https://picsum.photos/400/300?random=3',
    link: '#',
    featured: false,
  }
];

export const ARTICLES = ALL_ARTICLES;

export const PGP_PUBLIC_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=fnU2
-----END PGP PUBLIC KEY BLOCK-----`;
