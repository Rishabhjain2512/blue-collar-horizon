
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, AuthContextType } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

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
    // Check if the user is already authenticated with Supabase
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get user profile from Supabase
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            const userData: User = {
              id: session.user.id,
              email: session.user.email || '',
              name: profile.name || '',
              role: profile.role || 'worker',
              phone: profile.phone || '',
            };
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Get user profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: profile.name || '',
            role: profile.role || 'worker',
            phone: profile.phone || '',
          };
          setUser(userData);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      if (data.user) {
        // Get user profile data from profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw new Error(profileError.message);

        const userData: User = {
          id: data.user.id,
          email: data.user.email || '',
          name: profile.name || '',
          role: profile.role || 'worker',
          phone: profile.phone || '',
        };
        setUser(userData);

        toast({
          title: "Login successful",
          description: `Welcome back, ${profile.name}!`,
        });
      }
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

      // Register the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: userData.email || '',
        password: password,
      });

      if (error) throw new Error(error.message);

      if (data.user) {
        // Create a profile in the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: userData.email,
              name: userData.name,
              role: userData.role,
              phone: userData.phone || '',
              created_at: new Date(),
            },
          ]);

        if (profileError) throw new Error(profileError.message);

        const newUser: User = {
          id: data.user.id,
          email: userData.email || '',
          name: userData.name || '',
          role: userData.role || 'worker',
          phone: userData.phone || '',
        };

        setUser(newUser);

        toast({
          title: "Registration successful",
          description: `Welcome, ${userData.name}!`,
        });
      }
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

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      
      if (!user) throw new Error("No user is logged in");
      
      // Update the user profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name,
          phone: userData.phone,
          role: userData.role,
          // Add other fields as needed
        })
        .eq('id', user.id);

      if (error) throw new Error(error.message);

      // Update email if it's being changed
      if (userData.email && userData.email !== user.email) {
        const { error: updateEmailError } = await supabase.auth.updateUser({
          email: userData.email
        });
        
        if (updateEmailError) throw new Error(updateEmailError.message);
      }

      // Update local state
      const updatedUser = {
        ...user,
        ...userData,
      };
      
      setUser(updatedUser);
      
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
