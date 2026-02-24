
export type Urgency = 'High' | 'Medium' | 'Low' | 'None';

export interface Organiser {
  name: string;
  url: string;
  location: string;
}

export interface Pattern {
  text: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  organiser: Organiser;
  category: string;
  craft: string[];
  equipment: string[];
  materials: { type: string; amount: string }[];
  approximateTime: string;
  need?: Urgency;
  community?: string;
  lastUpdated: string;
  pattern: Pattern;
  deadline: string;
  image: string;
  donationInstructions: string;
}

export interface FilterState {
  need: string[];
  craft: string[];
  materialType: string[];
  category: string[];
  location: string[];
  approximateTime: string[];
}
