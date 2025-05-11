
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import NavBar from "@/components/Navigation/NavBar";
import Footer from "@/components/Footer/Footer";
import Home from "@/pages/Home";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import JobsPage from "@/pages/Jobs/JobsPage";
import JobDetailsPage from "@/pages/Jobs/JobDetailsPage";
import JobFormPage from "@/pages/Jobs/JobFormPage";
import WorkersPage from "@/pages/Workers/WorkersPage";
import WorkerDetailsPage from "@/pages/Workers/WorkerDetailsPage";
import MessagesPage from "@/pages/Messages/MessagesPage";
import ProfilePage from "@/pages/Profile/ProfilePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <main className="flex-grow bg-gray-50">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/jobs/:id" element={<JobDetailsPage />} />
                  <Route path="/post-job" element={<JobFormPage />} />
                  <Route path="/workers" element={<WorkersPage />} />
                  <Route path="/workers/:id" element={<WorkerDetailsPage />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
