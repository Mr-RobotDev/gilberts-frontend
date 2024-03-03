import { Slider } from 'antd';
import { useState } from 'react';

interface OperationInfluenceProps {
  marks: Record<number, string>;
}

const OperationInfluence: React.FC<OperationInfluenceProps> = ({ marks }) => {
  const [outsideAirTemperature, setOutsideAirTemperature] = useState<number>(300);
  const [indoorRoomTemperature, setIndoorRoomTemperature] = useState<number>(50);
  const [indoorCO2, setIndoorCO2] = useState<number>(30);

  return (
    <div className="w-full md:w-1/2 space-y-4 pr-2">
    <h2 className="text-lg font-bold text-gray-900 mb-4">Operature Influence</h2>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Outside Air Temperature</label>
        <Slider marks={marks} defaultValue={outsideAirTemperature} onChange={setOutsideAirTemperature} />
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Indoor Room Temperature</label>
        <Slider marks={marks} defaultValue={indoorRoomTemperature} onChange={setIndoorRoomTemperature} />
      </div>
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-1">Indoor CO2 (ppm)</label>
        <Slider marks={marks} defaultValue={indoorCO2} onChange={setIndoorCO2} />
      </div>
    </div>
  );
};

export default OperationInfluence;
