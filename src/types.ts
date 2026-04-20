export type SectionId =
  | 'home'
  | 'block-diagrams'
  | 'stability'
  | 'routh'
  | 'errors'
  | 'practice';

export interface NavItem {
  readonly id: SectionId;
  readonly label: string;
  readonly short: string;
  readonly emoji: string;
}
