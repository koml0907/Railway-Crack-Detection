
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, User, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  toggleSidebar: () => void;
  unreadAlerts: number;
}

const Navbar = ({ toggleSidebar, unreadAlerts }: NavbarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getPageTitle = () => {
    switch(location.pathname) {
      case '/':
        return 'Dashboard';
      case '/stations':
        return 'Stations';
      case '/analytics':
        return 'Analytics';
      default:
        return 'Railway Monitoring';
    }
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-30 transition-all duration-300 border-b py-3 px-4 backdrop-blur-md",
      isScrolled 
        ? "bg-background/70 border-border shadow-sm" 
        : "bg-background/50 border-transparent"
    )}>
      <div className="flex items-center justify-between h-10">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        )}
        
        <div className="flex items-center gap-3">
          {!isMobile && (
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11a1 1 0 0 1 .7-.7l4.4-.9a1 1 0 0 0 .8-1.2L8.8 4a1 1 0 0 1 .7-1.3h.3L14 4l1 1" />
                  <path d="m11 9 8 8" />
                  <path d="M4 20h4v-2a3 3 0 0 1 3-3h0" />
                  <path d="M16 10a4 4 0 0 1 4 4v6h-4" />
                </svg>
              </div>
              <span className="font-bold hidden md:block">Railway Monitor</span>
            </Link>
          )}
          
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
        </div>
        
        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {isDarkMode ? 
              <Sun className="h-5 w-5" /> : 
              <Moon className="h-5 w-5" />
            }
          </Button>
          
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                {unreadAlerts > 9 ? '9+' : unreadAlerts}
              </span>
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
