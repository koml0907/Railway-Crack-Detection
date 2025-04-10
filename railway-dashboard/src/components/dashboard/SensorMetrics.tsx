
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SensorMetric, Station } from '@/types';
import { Activity, Thermometer, Compass, Signal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SensorMetricsProps {
  metrics: SensorMetric[];
  station?: Station;
}

const SensorMetrics = ({ metrics, station }: SensorMetricsProps) => {
  // Icons for different metric types
  const metricIcons = {
    'Vibration': <Activity className="h-4 w-4" />,
    'Temperature': <Thermometer className="h-4 w-4" />,
    'Structural': <Compass className="h-4 w-4" />,
    'Signal': <Signal className="h-4 w-4" />
  };

  return (
    <Card className="h-full flex flex-col animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          {station ? `${station.name} Sensors` : 'Network Sensor Metrics'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "rounded-full flex items-center justify-center p-1.5",
                  metric.status === 'normal' ? 'bg-status-normalBg text-status-normal' : 
                  metric.status === 'warning' ? 'bg-status-warningBg text-status-warning' : 
                  'bg-status-criticalBg text-status-critical'
                )}>
                  {metricIcons[metric.label as keyof typeof metricIcons]}
                </span>
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={cn(
                  "font-semibold",
                  metric.status === 'normal' ? 'text-status-normal' : 
                  metric.status === 'warning' ? 'text-status-warning' : 
                  'text-status-critical'
                )}>
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground">{metric.unit}</span>
              </div>
            </div>
            
            <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  metric.status === 'normal' ? 'bg-status-normal' : 
                  metric.status === 'warning' ? 'bg-status-warning' : 
                  'bg-status-critical'
                )}
                style={{ 
                  width: `${(metric.value / metric.max) * 100}%`,
                }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 {metric.unit}</span>
              <span>{metric.max} {metric.unit}</span>
            </div>
          </div>
        ))}
        
        {station && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium">Last Inspection</span>
              <span className="text-sm">{new Date(station.lastInspection).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-baseline mt-2">
              <span className="text-sm font-medium">Active Sensors</span>
              <span className="text-sm">{station.sensorCount}</span>
            </div>
            <div className="flex justify-between items-baseline mt-2">
              <span className="text-sm font-medium">Defect Count</span>
              <span className={cn(
                "text-sm font-medium",
                station.defectCount > 5 ? "text-status-critical" :
                station.defectCount > 2 ? "text-status-warning" :
                "text-status-normal"
              )}>
                {station.defectCount}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SensorMetrics;
