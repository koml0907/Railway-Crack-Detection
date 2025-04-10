
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AlertCard from '@/components/ui/AlertCard';
import { Button } from '@/components/ui/button';
import { Alert, StatusType } from '@/types';
import { Bell, CheckCheck, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AlertPanelProps {
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
}

const AlertPanel = ({ alerts, onAcknowledge }: AlertPanelProps) => {
  const [statusFilter, setStatusFilter] = useState<StatusType | 'all'>('all');
  const [showAcknowledged, setShowAcknowledged] = useState(false);

  const filteredAlerts = alerts.filter(alert => {
    if (!showAcknowledged && alert.acknowledged) return false;
    if (statusFilter !== 'all' && alert.status !== statusFilter) return false;
    return true;
  });

  const unacknowledgedCount = alerts.filter(alert => !alert.acknowledged).length;
  const criticalCount = alerts.filter(alert => alert.status === 'critical' && !alert.acknowledged).length;

  return (
    <Card className="h-full flex flex-col border animate-fade-in">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" /> Alert Feed
          </CardTitle>
          {unacknowledgedCount > 0 && (
            <div className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
              {unacknowledgedCount} new
            </div>
          )}
          {criticalCount > 0 && (
            <div className="bg-status-criticalBg text-status-critical px-2 py-0.5 rounded-full text-xs font-medium animate-pulse-slow">
              {criticalCount} critical
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-8 w-8 rounded-full",
              showAcknowledged && "bg-primary/10 text-primary"
            )}
            onClick={() => setShowAcknowledged(!showAcknowledged)}
          >
            <CheckCheck className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center rounded-full border bg-background p-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-6 rounded-full px-2 text-xs",
                statusFilter === 'all' && "bg-primary text-primary-foreground"
              )}
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-6 rounded-full px-2 text-xs",
                statusFilter === 'critical' && "bg-status-critical text-white"
              )}
              onClick={() => setStatusFilter('critical')}
            >
              Critical
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-6 rounded-full px-2 text-xs",
                statusFilter === 'warning' && "bg-status-warning text-white"
              )}
              onClick={() => setStatusFilter('warning')}
            >
              Warning
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0">
        {filteredAlerts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-4">
            <Bell className="h-12 w-12 mb-2 opacity-20" />
            <p className="text-sm">No alerts match your filter criteria</p>
          </div>
        ) : (
          <ScrollArea className="h-full px-4 pb-4">
            {filteredAlerts.map(alert => (
              <AlertCard 
                key={alert.id} 
                alert={alert} 
                onAcknowledge={onAcknowledge} 
              />
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertPanel;
