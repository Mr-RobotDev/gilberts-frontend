import { Settings } from '@/types/Setting';
import { Slider } from 'antd';

interface CurrentReadingsProps {
  marks: Record<number, string>;
  currentReadings: Settings<'currentReadings'>;
}

const CurrentReadings: React.FC<CurrentReadingsProps> = ({
  marks,
  currentReadings,
}) => {
  const getSliderValue = (id: string): number => {
    const setting = currentReadings.find((setting) => setting.id === id);
    return setting ? setting.value : 0;
  };

  return (
    <div className='w-full border-2 p-4 md:p-2 flex flex-col flex-1'>
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
      <div className='mb-5 p-2'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Extract Fan Speed
        </label>
        <Slider
          disabled
          marks={marks}
          value={getSliderValue('extract-fan-speed')}
        />
      </div>
      <div className='mb-5 p-2'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Room CO2 Level (ppm)
        </label>
        <Slider
          disabled
          marks={marks}
          value={getSliderValue('room-co2-level')}
        />
      </div>
      <div className='mb-5 p-2'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Room Temperature Level (°C)
        </label>
        <Slider
          disabled
          marks={marks}
          value={getSliderValue('room-temperature')}
        />
      </div>
      <div className='mb-5 p-2'>
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
