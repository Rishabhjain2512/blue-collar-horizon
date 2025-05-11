
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, AuthContextType } from "@/types";
import { useToast } from "@/components/ui/use-toast";

// Mock functions for authentication - to be replaced with real API calls
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "worker@example.com" && password === "password") {
        resolve({
          id: "1",
          name: "Ravi Kumar",
          email: "worker@example.com",
          role: "worker",
          phone: "+91 9876543210",
        });
      } else if (email === "employer@example.com" && password === "password") {
        resolve({
          id: "2",
          name: "Anita Sharma",
          email: "employer@example.com",
          role: "employer",
          phone: "+91 9876543211",
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};

const mockRegister = async (userData: Partial<User>, password: string): Promise<User> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
      } as User;
      resolve(newUser);
    }, 1000);
  });
};

const mockUpdateUser = async (userData: Partial<User>): Promise<User> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...(userData as User),
      });
    }, 1000);
  });
};

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await mockLogin(email, password);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: (error as Error).message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>, password: string) => {
    try {
      setLoading(true);
      const user = await mockRegister(userData, password);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast({
        title: "Registration successful",
        description: `Welcome, ${user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: (error as Error).message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      const updatedUser = await mockUpdateUser({
        ...user,
        ...userData,
      });
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: (error as Error).message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
