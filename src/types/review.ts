export interface Review {
  id: number;
  teacherId: number;           
  fullName: string;        
  Slug: string;         
  gender?: string;
  profilePicture?: string; 
  description: string;   
}
