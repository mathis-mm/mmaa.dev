
import React from 'react';

export enum ContentType {
  HOME = 'HOME',
  ARTICLES = 'ARTICLES',
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; 
  date: string;
  readTime: string;
  tags: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
}

export interface StackItem {
  name: string;
  icon: string; // URL path to image/svg
}