import type { NavItem } from './types';

export const NAV: readonly NavItem[] = [
  { id: 'home', label: 'Overview', short: 'Home', emoji: '🏠' },
  { id: 'block-diagrams', label: 'Block Diagrams', short: 'Blocks', emoji: '🧩' },
  { id: 'stability', label: 'Stability', short: 'Stable?', emoji: '⚖️' },
  { id: 'routh', label: 'Routh Array', short: 'Routh', emoji: '🧮' },
  { id: 'errors', label: 'Steady-State Error', short: 'Errors', emoji: '🎯' },
  { id: 'practice', label: 'Practice Problems', short: 'Quiz', emoji: '📝' },
];
