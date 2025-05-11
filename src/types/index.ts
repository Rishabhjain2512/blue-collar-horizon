
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'worker' | 'employer' | 'admin';
  phone?: string;
  avatar?: string;
  language?: 'en' | 'hi' | 'kn';
};

export type Worker = User & {
  skills: string[];
  experience: string;
  location: {
    city: string;
    state: string;
    coordinates?: [number, number]; // [longitude, latitude]
  };
  videoResume?: string;
  certifications?: { 
    name: string;
    verified: boolean;
    url?: string;
  }[];
  availability?: 'immediate' | 'within_week' | 'within_month';
  ratings?: number;
  reviews?: {
    id: string;
    employerId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
};

export type Employer = User & {
  companyName: string;
  industry: string;
  location: {
    city: string;
    state: string;
    coordinates?: [number, number]; // [longitude, latitude]
  };
  description?: string;
  website?: string;
  logo?: string;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  skillsRequired: string[];
  location: {
    city: string;
    state: string;
    coordinates?: [number, number]; // [longitude, latitude]
  };
  salary?: {
    min: number;
    max: number;
    period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  };
  employerId: string;
  employerName: string;
  employerLogo?: string;
  createdAt: Date;
  expiresAt?: Date;
  status: 'open' | 'closed' | 'filled';
  applicants?: string[]; // Array of worker IDs
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  read: boolean;
};

export type Conversation = {
  id: string;
  participants: string[]; // Array of user IDs
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
};

export type Language = 'en' | 'hi' | 'kn';

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
};
