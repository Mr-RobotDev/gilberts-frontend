import { Settings } from '@/types/Setting';
import { Slider, Switch } from 'antd';
import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface OperatorInfluenceProps {
  co2Marks: Record<number, string>;
  operatorInfluence: Settings<'operatorInfluence'>;
}

const OperatorInfluence: React.FC<OperatorInfluenceProps> = ({
  co2Marks,
  operatorInfluence,
}) => {
  const marks = {
    '-25': '-25°',
    '35': '35°',
  };

  const imarks = {
    '0': '0',
    '35': '35',
  };
  const [outsideAirTemperature, setOutsideAirTemperature] = useState<number>(
    operatorInfluence.find((op) => op.id === 'outside-air-temperature')
      ?.value || 0
  );

  const [indoorRoomTemperature, setIndoorRoomTemperature] = useState<number>(
    operatorInfluence.find((op) => op.id === 'indoor-room-temperature')
      ?.value || 0
  );

  const [indoorCO2, setIndoorCO2] = useState<number>(
    operatorInfluence.find((op) => op.id === 'indoor-co2')?.value || 0
  );
  const [isChecked, setIsChecked] = useState<boolean>(
    operatorInfluence.find((item) => item.id === 'override-value')?.value === 1
  );

  useEffect(() => {
    const debouncedApiCall = debounce(async (value: number) => {
      try {
        const response = await axios.post(
          `${apiUrl}/operator-influence/outside-air-temperature`,
          { value },
          { headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('Error setting unit mode:', error);
      }
    }, 2000);

    debouncedApiCall(outsideAirTemperature);

    return () => {
      debouncedApiCall.cancel();
    };
  }, [outsideAirTemperature]);

  useEffect(() => {
    const debouncedApiCall = debounce(async (value: number) => {
      try {
        const response = await axios.post(
          `${apiUrl}/operator-influence/indoor-room-temperature`,
          { value },
          { headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('Error setting operating mode:', error);
      }
    }, 2000);

    debouncedApiCall(indoorRoomTemperature);

    return () => {
      debouncedApiCall.cancel();
    };
  }, [indoorRoomTemperature]);

  useEffect(() => {
    const debouncedApiCall = debounce(async (value: number) => {
      try {
        const response = await axios.post(
          `${apiUrl}/operator-influence/indoor-co2`,
          { value },
          { headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('Error setting indoor CO2:', error);
      }
    }, 2000);

    debouncedApiCall(indoorCO2);

    return () => {
      debouncedApiCall.cancel();
    };
  }, [indoorCO2]);

  const handleChange = async (checked: boolean) => {
    setIsChecked(checked);
    try {
      await axios.post(
        `${apiUrl}/operator-influence/override-value`,
        { value: checked ? 1 : 0 },
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  return (
    <div className='border-2 p-4 md:p-2 flex flex-col flex-1'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>
        Operator Influence
      </h2>
      <div className='mb-2'>
        <Switch
          checked={isChecked}
          onChange={handleChange}
          checkedChildren='1'
          unCheckedChildren='0'
          style={{ backgroundColor: 'blue' }}
        />
      </div>
      <div className='mb-5 p-2'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Outside Air Temperature
        </label>
        <Slider
          min={-25}
          max={35}
          defaultValue={outsideAirTemperature}
          onChange={setOutsideAirTemperature}
          marks={marks}
        />
      </div>
      <div className='mb-5 p-2'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Indoor Room Temperature
        </label>
        <Slider
          marks={imarks}
          min={0}
          max={35}
          defaultValue={indoorRoomTemperature}
          onChange={setIndoorRoomTemperature}
        />
      </div>
      <div className='mb-8 p-2'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Indoor CO2 (ppm)
        </label>
        <Slider
          marks={co2Marks}
          min={0}
          max={5000}
          step={50}
          defaultValue={indoorCO2}
          onChange={setIndoorCO2}
        />
      </div>
    </div>
  );
};

export default OperatorInfluence;
