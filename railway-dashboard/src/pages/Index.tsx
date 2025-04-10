
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  TrainFront, 
  BarChart2, 
  Bell, 
  Settings,
  ChevronRight,
  MapPin
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const navigateToPage = (path: string) => {
    navigate(path);
  };

  const features = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'View real-time metrics and station statuses',
      icon: <LayoutDashboard className="h-6 w-6" />,
      path: '/',
      color: 'from-blue-500/20 to-violet-500/20'
    },
    {
      id: 'stations',
      title: 'Stations',
      description: 'Manage and monitor all railway stations',
      icon: <TrainFront className="h-6 w-6" />,
      path: '/stations',
      color: 'from-emerald-500/20 to-green-500/20'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Review historical data and trends',
      icon: <BarChart2 className="h-6 w-6" />,
      path: '/analytics',
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'alerts',
      title: 'Alerts',
      description: 'Manage notifications and critical events',
      icon: <Bell className="h-6 w-6" />,
      path: '/alerts',
      color: 'from-red-500/20 to-pink-500/20'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjMuNSAzIDEuNGwuMi4yYy41LjggMS4zIDEuNCAyLjMgMS40aDEyYzEuMiAwIDIuMy0uNSAzLTEuNGwuMi0uMmMuNi0xIDEuNS0xLjYgMi41LTEuNiIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik02IDQ2YzEuMiAwIDIuMy41IDMgMS40bC4yLjJjLjUuOCAxLjMgMS40IDIuMyAxLjRoMTJjMS4yIDAgMi4zLS41IDMtMS40bC4yLS4yYy42LTEgMS41LTEuNiAyLjUtMS42IiBzdHJva2U9InJnYmEoMCwgMCwgMCwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-6 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm border border-primary/20">
              <MapPin className="h-4 w-4 mr-2" />
              Railway Station Monitoring System
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Real-time Railway Network Monitoring
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 md:mb-10">
              Monitor station conditions, detect defects, and receive alerts to ensure railway safety and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigateToPage('/stations')}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Stations
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigateToPage('/')}
                className="rounded-lg border-primary/20 hover:bg-primary/5 shadow-sm hover:shadow transition-all duration-300"
              >
                Open Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Monitoring Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access a suite of powerful tools designed to keep your railway network running smoothly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map(feature => (
              <Card 
                key={feature.id}
                className={cn(
                  "relative overflow-hidden border cursor-pointer transition-all duration-300 h-64",
                  hoveredCard === feature.id ? "shadow-lg scale-[1.02]" : "shadow-md"
                )}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigateToPage(feature.path)}
              >
                <div className="h-full p-6 flex flex-col justify-between relative z-10">
                  <div>
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br",
                      feature.color
                    )}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                  
                  <div className={cn(
                    "mt-4 flex items-center text-sm text-primary font-medium transition-all duration-300",
                    hoveredCard === feature.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  )}>
                    Explore {feature.title}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
                
                <div className={cn(
                  "absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl transition-opacity duration-300",
                  `bg-gradient-to-br ${feature.color}`,
                  hoveredCard === feature.id ? "opacity-50" : "opacity-20"
                )} />
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Status Banner */}
      <div className="bg-muted py-8">
        <div className="container px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">System Status: Operational</h3>
              <p className="text-muted-foreground">All monitoring systems are online and functioning normally</p>
            </div>
            <Button 
              onClick={() => navigateToPage('/')}
              className="rounded-lg"
            >
              Open Dashboard <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
