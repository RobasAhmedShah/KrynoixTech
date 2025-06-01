export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}
// types.ts

export interface TabItem {
  id: string;
  title: string;
  icon: string;
  heading: string;
  description: string;
}

export interface ServiceData {
  id: string;
  title: string;
  imageUrl: string;
  videoUrls?: string[];
  tabs: TabItem[];
}