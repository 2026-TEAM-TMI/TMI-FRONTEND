export interface User {
  id?: string;
  name: string;
  role: string;
  company?: string;
  bio?: string;
  avatar: string;
  color: string;
  matchScore?: number;
  followers?: string;
  projects?: string;
  hashtags?: string[];
}
