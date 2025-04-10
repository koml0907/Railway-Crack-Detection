
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Station } from '@/types';
import { cn } from '@/lib/utils';
import { MapPin, Train } from 'lucide-react';

interface StationMapProps {
  stations: Station[];
  onStationClick: (station: Station) => void;
  selectedStation?: Station | null;
}

const StationMap = ({ stations, onStationClick, selectedStation }: StationMapProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate map loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const statusColors = {
    normal: '#10b981',
    warning: '#f59e0b',
    critical: '#ef4444'
  };
  
  return (
    <Card className="h-full border overflow-hidden animate-fade-in">
      <div className="h-full relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <div className="h-32 w-32 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          </div>
        ) : (
          <div className="h-full" ref={mapContainerRef}>
            <div className="h-full w-full bg-[#f8fafc] dark:bg-[#1a1b26] relative overflow-hidden">
              {/* OpenRailwayMap iframe integration */}
              <iframe 
                src="https://www.openrailwaymap.org/" 
                className="absolute inset-0 w-full h-full border-0"
                title="OpenRailwayMap"
              />
              
              {/* Overlay for station markers */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Note: In a real implementation, we would convert the lat/lng to match OpenRailwayMap's projection */}
                {/* This is a visual simulation for demonstration purposes */}
                {stations.map((station) => (
                  <div 
                    key={station.id}
                    className={cn(
                      "absolute cursor-pointer transition-all duration-300 transform pointer-events-auto",
                      selectedStation?.id === station.id && "scale-125 z-10"
                    )}
                    style={{
                      // Normalize coordinates to fit within the container
                      left: `${((station.location.lng + 5) / 25) * 100}%`,
                      top: `${(1 - ((station.location.lat - 48) / 10)) * 100}%`,
                    }}
                    onClick={() => onStationClick(station)}
                  >
                    <div className="relative">
                      <div 
                        className={cn(
                          "h-5 w-5 rounded-full shadow-md transition-all duration-300 border-2 border-white dark:border-gray-800 flex items-center justify-center",
                          selectedStation?.id === station.id && "h-6 w-6"
                        )}
                        style={{ backgroundColor: statusColors[station.status] }}
                      >
                        <Train className="h-2.5 w-2.5 text-white" />
                      </div>
                      
                      <div 
                        className="absolute -inset-2 rounded-full opacity-30 animate-pulse-slow"
                        style={{ backgroundColor: statusColors[station.status] }}
                      />
                      
                      {station.status === 'critical' && (
                        <div 
                          className="absolute -inset-4 rounded-full opacity-20 animate-pulse-slow"
                          style={{ backgroundColor: statusColors.critical }}
                        />
                      )}
                      
                      {selectedStation?.id === station.id && (
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-background/90 px-2 py-1 rounded-md text-xs font-medium shadow-sm border">
                          {station.name}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Map attribution */}
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded backdrop-blur-sm">
                Data from <a href="https://www.openrailwaymap.org/" target="_blank" rel="noopener noreferrer" className="underline">OpenRailwayMap</a>
              </div>
              
              {/* Map disclaimer */}
              <div className="absolute bottom-2 left-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded backdrop-blur-sm max-w-xs">
                Note: This is a simplified integration. A full implementation would utilize the OpenRailwayMap data API with proper coordinate conversion.
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StationMap;
