
import { Station, Sensor, Alert, StatusType, SensorMetric, ChartData } from '../types';

// Helper function to get random status with weighted probability
const getRandomStatus = (normalProb = 0.7, warningProb = 0.2): StatusType => {
  const rand = Math.random();
  if (rand < normalProb) return 'normal';
  if (rand < normalProb + warningProb) return 'warning';
  return 'critical';
};

// Helper function to get random number between min and max
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper to generate random date in the last n days
const getRandomDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - getRandomNumber(0, days));
  return date.toISOString();
};

// Create mock stations
export const generateMockStations = (count: number): Station[] => {
  const stations: Station[] = [];

  for (let i = 1; i <= count; i++) {
    const status = getRandomStatus();
    const defectCount = status === 'normal' ? getRandomNumber(0, 3) : 
                        status === 'warning' ? getRandomNumber(3, 8) : 
                        getRandomNumber(8, 15);
    
    stations.push({
      id: `STN-${i.toString().padStart(4, '0')}`,
      name: `Station ${i}`,
      location: {
        // Generate random locations in Europe/UK area
        lat: getRandomNumber(48, 58) + Math.random(),
        lng: getRandomNumber(-5, 20) + Math.random()
      },
      status,
      sensorCount: getRandomNumber(4, 12),
      lastInspection: getRandomDate(30),
      defectCount
    });
  }

  return stations;
};

// Create mock sensors for a station
export const generateMockSensors = (stationId: string, count: number): Sensor[] => {
  const sensors: Sensor[] = [];
  const sensorTypes: Array<'vibration' | 'thermal' | 'structural' | 'signal'> = [
    'vibration', 'thermal', 'structural', 'signal'
  ];
  
  const units = {
    'vibration': 'Hz',
    'thermal': '°C',
    'structural': 'mm',
    'signal': 'dBm'
  };

  for (let i = 1; i <= count; i++) {
    const type = sensorTypes[i % sensorTypes.length];
    const status = getRandomStatus();
    
    let value: number;
    switch (type) {
      case 'vibration':
        value = getRandomNumber(5, 50);
        break;
      case 'thermal':
        value = getRandomNumber(15, 85);
        break;
      case 'structural':
        value = getRandomNumber(0, 25);
        break;
      case 'signal':
        value = getRandomNumber(-100, -30);
        break;
      default:
        value = 0;
    }
    
    sensors.push({
      id: `SEN-${stationId}-${i.toString().padStart(3, '0')}`,
      stationId,
      type,
      status,
      value,
      unit: units[type],
      lastUpdated: new Date().toISOString()
    });
  }
  
  return sensors;
};

// Create mock alerts
export const generateMockAlerts = (stations: Station[], count: number): Alert[] => {
  const alerts: Alert[] = [];
  const alertTypes: Array<'track' | 'signal' | 'power'> = ['track', 'signal', 'power'];
  const messages = {
    track: [
      'Excessive track vibration detected',
      'Track misalignment beyond threshold',
      'Rail temperature exceeding safety limits',
      'Unusual track wear detected'
    ],
    signal: [
      'Signal interference detected',
      'Signal strength below threshold',
      'Communication latency issues',
      'Signal equipment power fluctuation'
    ],
    power: [
      'Power supply interruption',
      'Voltage level anomalies',
      'Current surge detected',
      'Power distribution unit failure'
    ]
  };
  
  for (let i = 0; i < count; i++) {
    const station = stations[getRandomNumber(0, stations.length - 1)];
    const type = alertTypes[getRandomNumber(0, alertTypes.length - 1)];
    const status = getRandomStatus(0.3, 0.4);
    
    alerts.push({
      id: `ALT-${i.toString().padStart(6, '0')}`,
      stationId: station.id,
      stationName: station.name,
      timestamp: getRandomDate(7),
      type,
      status,
      message: messages[type][getRandomNumber(0, messages[type].length - 1)],
      acknowledged: Math.random() > 0.7
    });
  }
  
  // Sort by timestamp descending (newest first)
  return alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate sensor metrics for dashboard
export const generateSensorMetrics = (): SensorMetric[] => {
  return [
    {
      label: 'Vibration',
      value: getRandomNumber(15, 40),
      max: 50,
      unit: 'Hz',
      status: getRandomStatus(0.6, 0.3)
    },
    {
      label: 'Temperature',
      value: getRandomNumber(20, 75),
      max: 100,
      unit: '°C',
      status: getRandomStatus(0.7, 0.2)
    },
    {
      label: 'Structural',
      value: getRandomNumber(5, 20),
      max: 30,
      unit: 'mm',
      status: getRandomStatus(0.8, 0.15)
    },
    {
      label: 'Signal',
      value: getRandomNumber(-90, -40),
      max: -30,
      unit: 'dBm',
      status: getRandomStatus(0.75, 0.2)
    }
  ];
};

// Generate chart data for the last 24 hours
export const generateChartData = (points: number): ChartData[] => {
  const data: ChartData[] = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    
    data.push({
      timestamp: time.toISOString(),
      value: getRandomNumber(20, 80) + (Math.sin(i / 3) * 10)
    });
  }
  
  return data;
};

// Create the initial mock data
export const mockStations = generateMockStations(20);
export const mockAlerts = generateMockAlerts(mockStations, 15);
export const mockSensors = mockStations.flatMap(
  station => generateMockSensors(station.id, station.sensorCount)
);
export const mockSensorMetrics = generateSensorMetrics();
export const mockChartData = generateChartData(24);

// Helper function to format dates
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper to calculate time since
export const timeSince = (dateString: string): string => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
};
