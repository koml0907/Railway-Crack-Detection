
import { cn } from '@/lib/utils';
import { MetricCardProps } from '@/types';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const MetricCard = ({
  title,
  value,
  unit,
  icon,
  status = 'normal',
  change,
  loading = false
}: MetricCardProps) => {
  const statusColors = {
    normal: 'text-status-normal',
    warning: 'text-status-warning',
    critical: 'text-status-critical'
  };

  const changeColors = {
    increase: 'text-status-normal',
    decrease: 'text-status-critical'
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-elevated bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base font-medium">
          <span className="text-muted-foreground">{title}</span>
          <span className={cn(
            "rounded-full flex items-center justify-center p-1.5",
            status === 'normal' ? 'bg-status-normalBg' : 
            status === 'warning' ? 'bg-status-warningBg' : 
            'bg-status-criticalBg'
          )}>
            {icon}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-9 w-full rounded bg-muted/50 animate-pulse" />
        ) : (
          <>
            <div className="flex items-baseline">
              <span className={cn(
                "text-2xl font-semibold",
                statusColors[status]
              )}>
                {value}
              </span>
              {unit && (
                <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
              )}
            </div>
            
            {change && (
              <div className="mt-1 flex items-center text-xs">
                <span className={cn(
                  "flex items-center gap-0.5",
                  changeColors[change.type]
                )}>
                  {change.type === 'increase' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  )}
                  {Math.abs(change.value)}%
                </span>
                <span className="ml-1 text-muted-foreground">from last period</span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
