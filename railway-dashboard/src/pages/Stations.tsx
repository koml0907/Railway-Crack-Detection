
import { useState } from 'react';
import { mockStations, mockSensors } from '@/utils/mockData';
import StationList from '@/components/dashboard/StationList';
import SensorMetrics from '@/components/dashboard/SensorMetrics';
import { Station, Sensor } from '@/types';

const Stations = () => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  
  const handleStationClick = (station: Station) => {
    setSelectedStation(prev => prev?.id === station.id ? null : station);
  };
  
  // Get sensor metrics for selected station
  const getStationSensors = (stationId: string) => {
    return mockSensors.filter(sensor => sensor.stationId === stationId);
  };
  
  // Convert sensors to metric format
  const getSensorMetrics = (sensors: Sensor[]) => {
    return sensors.map(sensor => ({
      label: sensor.type.charAt(0).toUpperCase() + sensor.type.slice(1),
      value: sensor.value,
      max: sensor.type === 'vibration' ? 50 :
           sensor.type === 'thermal' ? 100 :
           sensor.type === 'structural' ? 30 : -30,
      unit: sensor.unit,
      status: sensor.status
    }));
  };
  
  const selectedStationSensors = selectedStation 
    ? getStationSensors(selectedStation.id)
    : [];
  
  const sensorMetrics = selectedStation 
    ? getSensorMetrics(selectedStationSensors)
    : [];

  return (
    <div className="h-full p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-[500px] lg:h-[calc(100vh-6rem)]">
        <StationList 
          stations={mockStations} 
          onStationClick={handleStationClick} 
          selectedStation={selectedStation}
        />
      </div>
      
      <div className="h-[400px] lg:h-[calc(100vh-6rem)]">
        {selectedStation && (
          <SensorMetrics 
            metrics={sensorMetrics}
            station={selectedStation}
          />
        )}
      </div>
    </div>
  );
};

export default Stations;
