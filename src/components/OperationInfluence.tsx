import { Slider, Switch } from 'antd';
import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface OperationInfluenceProps {
  marks: Record<number, string>;
  operationInfluence: { id: string; value: number }[];
}

const OperationInfluence: React.FC<OperationInfluenceProps> = ({
  marks,
  operationInfluence,
}) => {
  const defaultValues: Record<string, number> = {
    'outside-air-temperature': 0,
    'indoor-room-temperature': 0,
    'indoor-co2': 0,
  };

  operationInfluence.forEach((item) => {
    if (defaultValues.hasOwnProperty(item.id)) {
      defaultValues[item.id] = item.value;
    }
  });

  const [outsideAirTemperature, setOutsideAirTemperature] = useState<number>(
    defaultValues['outside-air-temperature']
  );
  const [indoorRoomTemperature, setIndoorRoomTemperature] = useState<number>(
    defaultValues['indoor-room-temperature']
  );
  const [indoorCO2, setIndoorCO2] = useState<number>(
    defaultValues['indoor-co2']
  );
  const [isChecked, setIsChecked] = useState<boolean>(
    operationInfluence.find((item) => item.id === 'override-value')?.value === 1
  );

  useEffect(() => {
    const debouncedApiCall = debounce(async (value: number) => {
      try {
        const response = await axios.post(
          `${apiUrl}/operation-influence/outside-air-temperature`,
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
          `${apiUrl}/operation-influence/indoor-room-temperature`,
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
          `${apiUrl}/operation-influence/indoor-co2`,
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
        `${apiUrl}/operation-influence/override-value`,
        { value: checked ? 1 : 0 },
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  return (
    <div className='w-full md:w-1/2 space-y-4 pr-2'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>
        Operature Influence
      </h2>
      <Switch
        checked={isChecked}
        onChange={handleChange}
        checkedChildren='1'
        unCheckedChildren='0'
        style={{ backgroundColor: 'blue' }}
      />
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Outside Air Temperature
        </label>
        <Slider
          marks={marks}
          min={0}
          max={35}
          defaultValue={outsideAirTemperature}
          onChange={setOutsideAirTemperature}
        />
      </div>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Indoor Room Temperature
        </label>
        <Slider
          marks={marks}
          min={0}
          max={35}
          defaultValue={indoorRoomTemperature}
          onChange={setIndoorRoomTemperature}
        />
      </div>
      <div className='mb-8'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Indoor CO2 (ppm)
        </label>
        <Slider
          marks={marks}
          min={0}
          max={35}
          defaultValue={indoorCO2}
          onChange={setIndoorCO2}
        />
      </div>
    </div>
  );
};

export default OperationInfluence;
