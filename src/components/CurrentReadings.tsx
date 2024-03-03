import { Slider } from 'antd';

interface CurrentReadingsProps {
  marks: Record<number, string>;
  currentSettings: { id: string; value: number }[];
}

const CurrentReadings: React.FC<CurrentReadingsProps> = ({
  marks,
  currentSettings,
}) => {
  const getSliderValue = (id: string): number => {
    const setting = currentSettings.find((setting) => setting.id === id);
    return setting ? setting.value : 0;
  };

  return (
    <div className='w-full md:w-1/2 space-y-4 pl-2 pr-10'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Current Readings</h2>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Supply Fan Speed
        </label>
        <Slider
          disabled
          marks={marks}
          value={getSliderValue('supply-fan-speed')}
        />
      </div>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Extract Fan Speed
        </label>
        <Slider
          disabled
          marks={marks}
          value={getSliderValue('extract-fan-speed')}
        />
      </div>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Room CO2 Level (ppm)
        </label>
        <Slider
          disabled
          marks={marks}
          value={getSliderValue('room-co2-level')}
        />
      </div>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Room Temperature Level (°C)
        </label>
        <Slider
          disabled
          marks={marks}
          value={getSliderValue('room-temperature')}
        />
      </div>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Outside Air Temperature (°C)
        </label>
        <Slider
          disabled
          marks={marks}
          value={getSliderValue('outside-air-temperature')}
        />
      </div>
    </div>
  );
};

export default CurrentReadings;
