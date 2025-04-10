
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Station, StatusType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { TrainFront, Filter, ArrowUpDown, Search, Map, Bell } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { timeSince } from '@/utils/mockData';

interface StationListProps {
  stations: Station[];
  onStationClick: (station: Station) => void;
  selectedStation?: Station | null;
}

const StationList = ({ stations, onStationClick, selectedStation }: StationListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'lastInspection' | 'defectCount'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter stations based on search query and status filter
  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         station.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || station.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort stations
  const sortedStations = [...filteredStations].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'lastInspection') {
      comparison = new Date(a.lastInspection).getTime() - new Date(b.lastInspection).getTime();
    } else if (sortBy === 'defectCount') {
      comparison = a.defectCount - b.defectCount;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  // Toggle sort order or change sort column
  const handleSort = (column: 'name' | 'lastInspection' | 'defectCount') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  
  // Status badge component
  const StatusBadge = ({ status }: { status: StatusType }) => {
    return (
      <div className={cn(
        "status-badge",
        status === 'normal' ? "status-badge-normal" : 
        status === 'warning' ? "status-badge-warning" : 
        "status-badge-critical"
      )}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrainFront className="h-5 w-5" /> Stations
          </CardTitle>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-8 px-2.5 rounded-md text-xs",
                statusFilter === 'all' && "bg-primary/10 text-primary"
              )}
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-8 px-2.5 rounded-md text-xs",
                statusFilter === 'critical' && "bg-status-criticalBg text-status-critical"
              )}
              onClick={() => setStatusFilter('critical')}
            >
              Critical
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-8 px-2.5 rounded-md text-xs",
                statusFilter === 'warning' && "bg-status-warningBg text-status-warning"
              )}
              onClick={() => setStatusFilter('warning')}
            >
              Warning
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-8 px-2.5 rounded-md text-xs",
                statusFilter === 'normal' && "bg-status-normalBg text-status-normal"
              )}
              onClick={() => setStatusFilter('normal')}
            >
              Normal
            </Button>
          </div>
        </div>
        
        <div className="flex mt-2 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stations..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 overflow-hidden">
        {sortedStations.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-4">
            <TrainFront className="h-12 w-12 mb-2 opacity-20" />
            <p className="text-center text-sm">No stations match your search criteria</p>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="min-w-full table">
              <div className="table-header-group">
                <div className="table-row text-xs font-medium text-muted-foreground border-b">
                  <div className="table-cell py-2 px-4 w-[40%]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-0 font-medium flex items-center gap-1"
                      onClick={() => handleSort('name')}
                    >
                      Station
                      {sortBy === 'name' && (
                        <ArrowUpDown className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          sortOrder === 'desc' && "rotate-180"
                        )} />
                      )}
                    </Button>
                  </div>
                  <div className="table-cell py-2 px-4 w-[30%]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-0 font-medium flex items-center gap-1"
                      onClick={() => handleSort('lastInspection')}
                    >
                      Last Inspection
                      {sortBy === 'lastInspection' && (
                        <ArrowUpDown className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          sortOrder === 'desc' && "rotate-180"
                        )} />
                      )}
                    </Button>
                  </div>
                  <div className="table-cell py-2 px-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-0 font-medium flex items-center gap-1"
                      onClick={() => handleSort('defectCount')}
                    >
                      Defects
                      {sortBy === 'defectCount' && (
                        <ArrowUpDown className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          sortOrder === 'desc' && "rotate-180"
                        )} />
                      )}
                    </Button>
                  </div>
                  <div className="table-cell py-2 px-4 text-right">
                    Status
                  </div>
                </div>
              </div>
              
              <div className="table-row-group">
                {sortedStations.map((station) => (
                  <div 
                    key={station.id}
                    className={cn(
                      "table-row text-sm hover:bg-muted/50 cursor-pointer transition-colors",
                      selectedStation?.id === station.id && "bg-primary/5"
                    )}
                    onClick={() => onStationClick(station)}
                  >
                    <div className="table-cell py-2.5 px-4">
                      <div className="font-medium">{station.name}</div>
                      <div className="text-xs text-muted-foreground">{station.id}</div>
                    </div>
                    <div className="table-cell py-2.5 px-4 align-middle">
                      <div className="text-muted-foreground">
                        {timeSince(station.lastInspection)}
                      </div>
                    </div>
                    <div className="table-cell py-2.5 px-4 align-middle">
                      <div className={cn(
                        "font-medium",
                        station.defectCount > 5 ? "text-status-critical" :
                        station.defectCount > 2 ? "text-status-warning" :
                        ""
                      )}>
                        {station.defectCount}
                      </div>
                    </div>
                    <div className="table-cell py-2.5 px-4 align-middle text-right">
                      <StatusBadge status={station.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default StationList;
