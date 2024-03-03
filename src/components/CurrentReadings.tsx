import { Slider } from "antd";

interface CurrentReadingsProps {
  marks: Record<number, string>;
  supplyFanSpeed: number;
  extractFanSpeed: number;
  roomCO2Level: number;
  roomTemperatureLevel: number;
  outsideAirTemperature: number;
}

const CurrentReadings: React.FC<CurrentReadingsProps> = ({
  marks,
  supplyFanSpeed,
  extractFanSpeed,
  roomCO2Level,
  roomTemperatureLevel,
  outsideAirTemperature,
}) => {
  return (
    <div className="w-full md:w-1/2 space-y-4 pl-2 pr-10">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Current Readings</h2>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supply Fan Speed
        </label>
        <Slider disabled marks={marks} value={supplyFanSpeed} />
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Extract Fan Speed
        </label>
        <Slider disabled marks={marks} value={extractFanSpeed} />
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Room CO2 Level (ppm)
        </label>
        <Slider disabled marks={marks} value={roomCO2Level} />
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Room Temperature Level (°C)
        </label>
        <Slider disabled marks={marks} value={roomTemperatureLevel} />
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Outside Air Temperature (°C)
        </label>
        <Slider disabled marks={marks} value={outsideAirTemperature} />
      </div>
    </div>
  );
};

export default CurrentReadings;
