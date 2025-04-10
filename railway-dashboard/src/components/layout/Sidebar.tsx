
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  TrainFront, 
  BarChart2, 
  Bell, 
  Settings,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  const links = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { to: '/stations', label: 'Stations', icon: <TrainFront className="h-5 w-5" /> },
    { to: '/analytics', label: 'Analytics', icon: <BarChart2 className="h-5 w-5" /> },
    { to: '/alerts', label: 'Alerts', icon: <Bell className="h-5 w-5" /> },
    { to: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11a1 1 0 0 1 .7-.7l4.4-.9a1 1 0 0 0 .8-1.2L8.8 4a1 1 0 0 1 .7-1.3h.3L14 4l1 1" />
              <path d="m11 9 8 8" />
              <path d="M4 20h4v-2a3 3 0 0 1 3-3h0" />
              <path d="M16 10a4 4 0 0 1 4 4v6h-4" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Railway Monitor</span>
            <span className="text-xs text-muted-foreground">Station Network</span>
          </div>
        </div>
        
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => cn(
                "sidebar-link",
                isActive && "active"
              )}
              onClick={isMobile ? onClose : undefined}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 mt-auto">
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex flex-col space-y-1 mb-2">
            <span className="text-sm font-medium">System Status</span>
            <span className="text-xs text-muted-foreground">All systems operational</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-status-normal w-[92%] rounded-full" />
          </div>
          <div className="mt-3 text-xs flex items-center justify-between text-muted-foreground">
            <span>Last update: 2 mins ago</span>
            <span>92% uptime</span>
          </div>
        </div>
      </div>
    </div>
  );

  return isMobile ? (
    <div className={cn(
      "fixed inset-0 z-40 transition-all duration-300 transform",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 h-full w-[280px] bg-sidebar border-r shadow-lg">
        {sidebarContent}
      </div>
    </div>
  ) : (
    <div className="h-full w-[280px] border-r shadow-sm bg-sidebar">
      {sidebarContent}
    </div>
  );
};

export default Sidebar;
