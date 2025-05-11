
import { Job, Worker, Employer, Message, Conversation } from "@/types";

// Mock jobs data
export const mockJobs: Job[] = [
  {
    id: "job1",
    title: "Skilled Plumber Needed",
    description: "We are looking for an experienced plumber for our residential construction project. Must have at least 5 years of experience in plumbing installation and repairs.",
    skillsRequired: ["Plumbing", "Pipe Fitting", "Water Heater Installation"],
    location: {
      city: "Mumbai",
      state: "Maharashtra"
    },
    salary: {
      min: 20000,
      max: 30000,
      period: "monthly"
    },
    employerId: "emp1",
    employerName: "BuildRight Construction",
    employerLogo: "https://picsum.photos/seed/buildright/200",
    createdAt: new Date(2023, 4, 15),
    status: "open"
  },
  {
    id: "job2",
    title: "Electrician for Commercial Project",
    description: "Immediate opening for electrician with experience in commercial wiring. Knowledge of electrical codes and safety regulations required.",
    skillsRequired: ["Electrical", "Wiring", "Circuit Installation"],
    location: {
      city: "Bangalore",
      state: "Karnataka"
    },
    salary: {
      min: 25000,
      max: 35000,
      period: "monthly"
    },
    employerId: "emp2",
    employerName: "TechBuild Solutions",
    employerLogo: "https://picsum.photos/seed/techbuild/200",
    createdAt: new Date(2023, 4, 20),
    status: "open"
  },
  {
    id: "job3",
    title: "Carpenter for Furniture Workshop",
    description: "Looking for skilled carpenters to join our furniture making workshop. Experience with both traditional and modern techniques required.",
    skillsRequired: ["Carpentry", "Furniture Making", "Wood Finishing"],
    location: {
      city: "Jaipur",
      state: "Rajasthan"
    },
    salary: {
      min: 18000,
      max: 28000,
      period: "monthly"
    },
    employerId: "emp3",
    employerName: "Creative Woodworks",
    employerLogo: "https://picsum.photos/seed/woodworks/200",
    createdAt: new Date(2023, 5, 5),
    status: "open"
  },
  {
    id: "job4",
    title: "HVAC Technician",
    description: "Hiring HVAC technicians for installation and maintenance of heating, ventilation, and air conditioning systems in residential buildings.",
    skillsRequired: ["HVAC", "Air Conditioning", "Ventilation Systems"],
    location: {
      city: "Delhi",
      state: "Delhi"
    },
    salary: {
      min: 22000,
      max: 32000,
      period: "monthly"
    },
    employerId: "emp4",
    employerName: "Cool Comfort Systems",
    employerLogo: "https://picsum.photos/seed/coolcomfort/200",
    createdAt: new Date(2023, 5, 10),
    status: "open"
  },
  {
    id: "job5",
    title: "Driver for Logistics Company",
    description: "We need experienced drivers with valid licenses for our logistics operations. Good knowledge of local routes required.",
    skillsRequired: ["Driving", "Logistics", "Route Planning"],
    location: {
      city: "Chennai",
      state: "Tamil Nadu"
    },
    salary: {
      min: 16000,
      max: 24000,
      period: "monthly"
    },
    employerId: "emp5",
    employerName: "FastTrack Logistics",
    employerLogo: "https://picsum.photos/seed/fasttrack/200",
    createdAt: new Date(2023, 5, 15),
    status: "open"
  }
];

// Mock workers data
export const mockWorkers: Worker[] = [
  {
    id: "worker1",
    name: "Raj Kumar",
    email: "raj.kumar@example.com",
    role: "worker",
    phone: "+91 9876543210",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: ["Plumbing", "Pipe Fitting", "Water Heater Installation"],
    experience: "7 years",
    location: {
      city: "Mumbai",
      state: "Maharashtra"
    },
    videoResume: "https://example.com/video1.mp4",
    certifications: [
      {
        name: "Certified Plumber",
        verified: true,
        url: "https://example.com/cert1.pdf"
      }
    ],
    availability: "immediate",
    ratings: 4.7
  },
  {
    id: "worker2",
    name: "Amir Khan",
    email: "amir.khan@example.com",
    role: "worker",
    phone: "+91 9876543211",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    skills: ["Electrical", "Wiring", "Circuit Installation", "Solar Panel Installation"],
    experience: "5 years",
    location: {
      city: "Delhi",
      state: "Delhi"
    },
    certifications: [
      {
        name: "Licensed Electrician",
        verified: true,
        url: "https://example.com/cert2.pdf"
      }
    ],
    availability: "within_week",
    ratings: 4.5
  },
  {
    id: "worker3",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    role: "worker",
    phone: "+91 9876543212",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    skills: ["Carpentry", "Furniture Making", "Wood Carving"],
    experience: "8 years",
    location: {
      city: "Jaipur",
      state: "Rajasthan"
    },
    videoResume: "https://example.com/video3.mp4",
    certifications: [
      {
        name: "Master Carpenter",
        verified: false,
        url: "https://example.com/cert3.pdf"
      }
    ],
    availability: "within_month",
    ratings: 4.9
  },
  {
    id: "worker4",
    name: "Vishnu Patel",
    email: "vishnu.patel@example.com",
    role: "worker",
    phone: "+91 9876543213",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    skills: ["HVAC", "Air Conditioning", "Ventilation Systems", "Refrigeration"],
    experience: "6 years",
    location: {
      city: "Bangalore",
      state: "Karnataka"
    },
    certifications: [
      {
        name: "HVAC Technician",
        verified: true,
        url: "https://example.com/cert4.pdf"
      }
    ],
    availability: "immediate",
    ratings: 4.6
  },
  {
    id: "worker5",
    name: "Sunil Verma",
    email: "sunil.verma@example.com",
    role: "worker",
    phone: "+91 9876543214",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    skills: ["Driving", "Logistics", "Vehicle Maintenance"],
    experience: "10 years",
    location: {
      city: "Chennai",
      state: "Tamil Nadu"
    },
    videoResume: "https://example.com/video5.mp4",
    certifications: [
      {
        name: "Commercial Driver's License",
        verified: true,
        url: "https://example.com/cert5.pdf"
      }
    ],
    availability: "immediate",
    ratings: 4.8
  }
];

// Mock employers data
export const mockEmployers: Employer[] = [
  {
    id: "emp1",
    name: "Anita Sharma",
    email: "anita.sharma@example.com",
    role: "employer",
    phone: "+91 9876543220",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    companyName: "BuildRight Construction",
    industry: "Construction",
    location: {
      city: "Mumbai",
      state: "Maharashtra"
    },
    description: "Leading construction company specializing in residential projects.",
    website: "https://buildright.example.com",
    logo: "https://picsum.photos/seed/buildright/200"
  },
  {
    id: "emp2",
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    role: "employer",
    phone: "+91 9876543221",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    companyName: "TechBuild Solutions",
    industry: "IT Infrastructure",
    location: {
      city: "Bangalore",
      state: "Karnataka"
    },
    description: "IT company building state-of-the-art tech facilities.",
    website: "https://techbuild.example.com",
    logo: "https://picsum.photos/seed/techbuild/200"
  },
  {
    id: "emp3",
    name: "Deepak Singh",
    email: "deepak.singh@example.com",
    role: "employer",
    phone: "+91 9876543222",
    avatar: "https://randomuser.me/api/portraits/men/63.jpg",
    companyName: "Creative Woodworks",
    industry: "Furniture Manufacturing",
    location: {
      city: "Jaipur",
      state: "Rajasthan"
    },
    description: "Custom furniture design and manufacturing workshop.",
    website: "https://creativewood.example.com",
    logo: "https://picsum.photos/seed/woodworks/200"
  }
];

// Mock conversations data
export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participants: ["worker1", "emp1"],
    createdAt: new Date(2023, 5, 10),
    updatedAt: new Date(2023, 5, 15)
  },
  {
    id: "conv2",
    participants: ["worker2", "emp2"],
    createdAt: new Date(2023, 5, 12),
    updatedAt: new Date(2023, 5, 16)
  },
  {
    id: "conv3",
    participants: ["worker3", "emp3"],
    createdAt: new Date(2023, 5, 14),
    updatedAt: new Date(2023, 5, 17)
  }
];

// Mock messages data
export const mockMessages: Message[] = [
  {
    id: "msg1",
    senderId: "worker1",
    receiverId: "emp1",
    content: "Hello, I'm interested in the plumbing job. Could you provide more details?",
    createdAt: new Date(2023, 5, 10, 10, 30),
    read: true
  },
  {
    id: "msg2",
    senderId: "emp1",
    receiverId: "worker1",
    content: "Hi Raj, thanks for your interest. The job involves installing plumbing in a new residential building. Could we schedule a call to discuss?",
    createdAt: new Date(2023, 5, 10, 11, 15),
    read: true
  },
  {
    id: "msg3",
    senderId: "worker1",
    receiverId: "emp1",
    content: "That sounds good. I'm available tomorrow afternoon for a call.",
    createdAt: new Date(2023, 5, 10, 11, 45),
    read: true
  },
  {
    id: "msg4",
    senderId: "emp1",
    receiverId: "worker1",
    content: "Great! Let's talk at 2 PM tomorrow. I'll send you the details.",
    createdAt: new Date(2023, 5, 10, 12, 0),
    read: false
  }
];

// Helper functions to get data
export const getJobs = () => mockJobs;
export const getJob = (id: string) => mockJobs.find(job => job.id === id);
export const getWorkers = () => mockWorkers;
export const getWorker = (id: string) => mockWorkers.find(worker => worker.id === id);
export const getEmployers = () => mockEmployers;
export const getEmployer = (id: string) => mockEmployers.find(employer => employer.id === id);
export const getConversations = (userId: string) => 
  mockConversations.filter(conv => conv.participants.includes(userId));
export const getMessages = (conversationId: string) => 
  mockMessages.filter(msg => msg.senderId === conversationId || msg.receiverId === conversationId);
