import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface Journey {
  id: string;
  title: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
  hasDropdown?: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}