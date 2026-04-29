
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Marketing' | 'AI' | 'Design' | 'E-commerce' | 'Business';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  thumbnail: string;
  slug: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceInterested: string;
  createdAt: string;
  responded: boolean;
}

export interface Testimonial {
  id: string;
  authorName: string;
  content: string;
  position: string;
  photoUrl: string;
}
