
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Home,
  Briefcase,
  Users,
  User,
  MessageSquare,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavBar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-700">{t("app.name")}</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <Home size={18} />
                {t("nav.home")}
              </Button>
            </Link>

            <Link to="/jobs">
              <Button
                variant={isActive("/jobs") ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <Briefcase size={18} />
                {t("nav.jobs")}
              </Button>
            </Link>

            <Link to="/workers">
              <Button
                variant={isActive("/workers") ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <Users size={18} />
                {t("nav.workers")}
              </Button>
            </Link>

            {user && (
              <Link to="/messages">
                <Button
                  variant={isActive("/messages") ? "default" : "ghost"}
                  className="flex items-center gap-2"
                >
                  <MessageSquare size={18} />
                  {t("nav.messages")}
                </Button>
              </Link>
            )}

            {user && user.role === "employer" && (
              <Link to="/post-job">
                <Button
                  variant={isActive("/post-job") ? "default" : "ghost"}
                  className="flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600"
                >
                  {t("nav.post_job")}
                </Button>
              </Link>
            )}

            <div className="ml-4">
              <LanguageSwitcher />
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      {t("nav.profile")}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline">{t("nav.login")}</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default">{t("nav.register")}</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <div className="mr-4">
              <LanguageSwitcher />
            </div>
            <Button variant="ghost" onClick={toggleMobileMenu}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={closeMobileMenu}>
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Home className="mr-2 h-5 w-5" />
                {t("nav.home")}
              </Button>
            </Link>

            <Link to="/jobs" onClick={closeMobileMenu}>
              <Button
                variant={isActive("/jobs") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                {t("nav.jobs")}
              </Button>
            </Link>

            <Link to="/workers" onClick={closeMobileMenu}>
              <Button
                variant={isActive("/workers") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Users className="mr-2 h-5 w-5" />
                {t("nav.workers")}
              </Button>
            </Link>

            {user && (
              <>
                <Link to="/messages" onClick={closeMobileMenu}>
                  <Button
                    variant={isActive("/messages") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    {t("nav.messages")}
                  </Button>
                </Link>

                <Link to="/profile" onClick={closeMobileMenu}>
                  <Button
                    variant={isActive("/profile") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <User className="mr-2 h-5 w-5" />
                    {t("nav.profile")}
                  </Button>
                </Link>

                {user.role === "employer" && (
                  <Link to="/post-job" onClick={closeMobileMenu}>
                    <Button
                      variant="default"
                      className="w-full justify-start bg-orange-500 hover:bg-orange-600"
                    >
                      {t("nav.post_job")}
                    </Button>
                  </Link>
                )}

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  {t("nav.logout")}
                </Button>
              </>
            )}

            {!user && (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMobileMenu}>
                  <Button className="w-full">{t("nav.register")}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
