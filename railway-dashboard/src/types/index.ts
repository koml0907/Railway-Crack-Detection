
export type StatusType = 'normal' | 'warning' | 'critical';

export interface Station {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  status: StatusType;
  sensorCount: number;
  lastInspection: string;
  defectCount: number;
}

export interface Sensor {
  id: string;
  stationId: string;
  type: 'vibration' | 'thermal' | 'structural' | 'signal';
  status: StatusType;
  value: number;
  unit: string;
  lastUpdated: string;
}

export interface Alert {
  id: string;
  stationId: string;
  stationName: string;
  timestamp: string;
  type: 'track' | 'signal' | 'power';
  status: StatusType;
  message: string;
  acknowledged: boolean;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  status?: StatusType;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  loading?: boolean;
}

export interface AlertCardProps {
  alert: Alert;
  onAcknowledge: (id: string) => void;
}

export interface SensorMetric {
  label: string;
  value: number;
  max: number;
  unit: string;
  status: StatusType;
}

export interface StationDetailProps {
  station: Station;
  sensors: Sensor[];
}

export interface ChartData {
  timestamp: string;
  value: number;
}

export interface MapMarker {
  id: string;
  position: [number, number];
  status: StatusType;
  popupContent: React.ReactNode;
}

export interface OpenRailwayMapOptions {
  apiKey?: string;
  zoom?: number;
  center?: [number, number];
  style?: string;
}
