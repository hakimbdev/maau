export interface NavLink {
  title: string;
  href: string;
  children?: NavLink[];
}

export interface ProgramType {
  id: string;
  title: string;
  description: string;
  faculty: string;
  duration: string;
  image: string;
}

export interface EventType {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

export interface NewsType {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface FacultyType {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
}

export interface TestimonialType {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface StatType {
  id: string;
  value: string;
  label: string;
  icon: string;
}