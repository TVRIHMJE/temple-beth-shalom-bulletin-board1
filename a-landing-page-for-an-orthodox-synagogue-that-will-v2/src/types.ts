
export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  title: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}

export interface AdminFormData {
  announcements: Announcement[];
  images: GalleryImage[];
  events: Event[];
}
