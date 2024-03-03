import { Slider } from 'antd';
import { useState } from 'react';

interface EngineerSettingsProps {
  co2Marks: Record<number, string>;
  marks: Record<number, string>;
}

const EngineerSettings: React.FC<EngineerSettingsProps> = ({ co2Marks, marks }) => {
  const [co2Level, setCo2Level] = useState<[number, number]>([300, 700]);
  const [fanSpeedSummer, setFanSpeedSummer] = useState<number>(50);
  const [fanSpeedWinter, setFanSpeedWinter] = useState<number>(30);

  const onCo2LevelChange = (value: number[]) => {
    setCo2Level(value as [number, number]);
  };


  return (
    <div className="w-full md:w-1/2 space-y-4 pr-10">
    <h2 className="text-lg font-bold text-gray-900 mb-4">Engineer&apos;s Settings</h2>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">CO2 Level Band</label>
        <Slider
          range
          marks={co2Marks}
          defaultValue={co2Level}
          onChange={onCo2LevelChange}
          min={0}
          max={5000}
          step={50}
        />
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Fan Speed Settings - Summer</label>
        <Slider marks={marks} defaultValue={fanSpeedSummer} onChange={setFanSpeedSummer} />
      </div>
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-1">Fan Speed Settings - Winter</label>
        <Slider marks={marks} defaultValue={fanSpeedWinter} onChange={setFanSpeedWinter} />
      </div>
    </div>
  );
};

export default EngineerSettings;
