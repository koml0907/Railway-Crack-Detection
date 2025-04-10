
import { AlertCardProps } from '@/types';
import { timeSince } from '@/utils/mockData';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Bell, Info, AlertTriangle, Zap } from 'lucide-react';

const AlertCard = ({ alert, onAcknowledge }: AlertCardProps) => {
  // Icons for alert types
  const alertIcons = {
    'track': <Info className="h-4 w-4" />,
    'signal': <AlertTriangle className="h-4 w-4" />,
    'power': <Zap className="h-4 w-4" />
  };
  
  // Status colors
  const statusClasses = {
    'normal': 'border-l-status-normal bg-status-normalBg/5',
    'warning': 'border-l-status-warning bg-status-warningBg/5',
    'critical': 'border-l-status-critical bg-status-criticalBg/5 animate-pulse-slow'
  };
  
  // Status badges
  const statusBadges = {
    'normal': <span className="status-badge-normal">Normal</span>,
    'warning': <span className="status-badge-warning">Warning</span>,
    'critical': <span className="status-badge-critical">Critical</span>
  };

  return (
    <Card className={cn(
      "mb-3 overflow-hidden transition-all duration-300 border-l-4",
      statusClasses[alert.status],
      !alert.acknowledged && "shadow-md"
    )}>
      <CardHeader className="p-3 pb-0 flex flex-row items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={cn(
            "rounded-full flex items-center justify-center p-1.5",
            alert.status === 'normal' ? 'bg-status-normalBg text-status-normal' : 
            alert.status === 'warning' ? 'bg-status-warningBg text-status-warning' : 
            'bg-status-criticalBg text-status-critical'
          )}>
            {!alert.acknowledged && <Bell className="h-3.5 w-3.5" />}
            {alert.acknowledged && alertIcons[alert.type]}
          </span>
          <div>
            <p className="text-sm font-medium">{alert.stationName}</p>
            <p className="text-xs text-muted-foreground">
              {timeSince(alert.timestamp)}
            </p>
          </div>
        </div>
        {statusBadges[alert.status]}
      </CardHeader>
      
      <CardContent className="p-3 pt-2">
        <p className="text-sm">
          {alert.message}
        </p>
      </CardContent>
      
      {!alert.acknowledged && (
        <CardFooter className="p-3 pt-0 flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "text-xs",
              alert.status === 'critical' && "bg-status-critical/10 hover:bg-status-critical/20 text-status-critical border-status-critical/30"
            )}
            onClick={() => onAcknowledge(alert.id)}
          >
            Acknowledge
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AlertCard;
