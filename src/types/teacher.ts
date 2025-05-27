export interface Teacher {
  id: number;
  name: string;
  gender: string;
  age: number;
  contact: string;
  email: string;
  education: string;
  teachingExperience: string;
  city: string;
  subjects: string[];
  rating: number; // from 0 to 5
  slug: string;
  photo: string;
  about: string;
}
