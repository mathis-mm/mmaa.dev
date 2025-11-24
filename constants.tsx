
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
