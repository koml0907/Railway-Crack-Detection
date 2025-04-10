
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { mockStations, mockAlerts } from '@/utils/mockData';
import { Alert, Station } from '@/types';
import MetricCard from '@/components/ui/MetricCard';
import AlertPanel from '@/components/dashboard/AlertPanel';
import StationMap from '@/components/dashboard/StationMap';
import { Bell, TrainFront, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { toast } = useToast();
  const [stations] = useState(mockStations);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
    
    toast({
      title: "Alert Acknowledged",
      description: "The alert has been marked as acknowledged.",
      duration: 3000,
    });
  };
  
  const handleStationClick = (station: Station) => {
    setSelectedStation(prev => prev?.id === station.id ? null : station);
  };
  
  // Count stats for metric cards
  const criticalStations = stations.filter(s => s.status === 'critical').length;
  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="h-full p-6 space-y-6 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Total Stations" 
          value={stations.length} 
          icon={<TrainFront className="h-4 w-4" />} 
          loading={isLoading} 
        />
        <MetricCard 
          title="Critical Stations" 
          value={criticalStations} 
          icon={<AlertTriangle className="h-4 w-4" />} 
          status={criticalStations > 0 ? 'critical' : 'normal'} 
          loading={isLoading} 
        />
        <MetricCard 
          title="Active Alerts" 
          value={unacknowledgedAlerts} 
          icon={<Bell className="h-4 w-4" />} 
          status={unacknowledgedAlerts > 5 ? 'critical' : unacknowledgedAlerts > 2 ? 'warning' : 'normal'} 
          loading={isLoading} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[calc(100vh-13rem)]">
        <div className="lg:col-span-2 h-[400px] lg:h-full">
          <StationMap 
            stations={stations}
            onStationClick={handleStationClick}
            selectedStation={selectedStation}
          />
        </div>
        <div className="h-[400px] lg:h-full">
          <AlertPanel alerts={alerts} onAcknowledge={handleAcknowledgeAlert} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
