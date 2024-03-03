'use client';

import axios from 'axios';
import { Slider } from 'antd';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const apiUrl = process.env.API_URL;
interface EngineerSettingsProps {
  co2Marks: Record<number, string>;
  marks: Record<number, string>;
}
type SliderState = [number, number];

const EngineerSettings: React.FC<EngineerSettingsProps> = ({
  co2Marks,
  marks,
  engineerSettings,
}) => {
  const defaultCo2Level =
    engineerSettings.find((setting) => setting.id === 'co2-level-band-bottom')
      ?.value || 0;
  const defaultFanSpeedSummer =
    engineerSettings.find(
      (setting) => setting.id === 'fan-speed-settings-summer-lower'
    )?.value || 0;
  const defaultFanSpeedWinter =
    engineerSettings.find(
      (setting) => setting.id === 'fan-speed-settings-winter-lower'
    )?.value || 0;

  const [co2Level, setCo2Level] = useState<[number, number]>([
    defaultCo2Level,
    engineerSettings.find((setting) => setting.id === 'co2-level-band-top')
      ?.value || 0,
  ]);
  const [fanSpeedSummer, setFanSpeedSummer] = useState<[number, number]>([
    defaultFanSpeedSummer,
    engineerSettings.find(
      (setting) => setting.id === 'fan-speed-settings-summer-upper'
    )?.value || 0,
  ]);
  const [fanSpeedWinter, setFanSpeedWinter] = useState<[number, number]>([
    defaultFanSpeedWinter,
    engineerSettings.find(
      (setting) => setting.id === 'fan-speed-settings-winter-upper'
    )?.value || 0,
  ]);

  const onSliderChange =
    (setState: React.Dispatch<React.SetStateAction<SliderState>>) =>
    (value: number[]) => {
      setState(value as SliderState);
    };

  useEffect(() => {
    const debouncedApiCall = debounce(async (values: [number, number]) => {
      try {
        const [lowerLimit, upperLimit] = values;

        const response1 = await axios.post(
          `https://gilbert-api.origin.tech/engineers-settings/co2-level-band-bottom`,
          { value: lowerLimit },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response1.status !== 200) {
          throw new Error('Failed to fetch data for lower limit');
        }

        const response2 = await axios.post(
          `https://gilbert-api.origin.tech/engineers-settings/co2-level-band-top`,
          { value: upperLimit },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response2.status !== 200) {
          throw new Error('Failed to fetch data for upper limit');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 2000);

    debouncedApiCall([...co2Level]);

    return () => {
      debouncedApiCall.cancel();
    };
  }, [co2Level]);

  useEffect(() => {
    const debouncedApiCall = debounce(async (values: [number, number]) => {
      try {
        const [lowerLimit, upperLimit] = values;

        const response1 = await axios.post(
          `https://gilbert-api.origin.tech/engineers-settings/fan-speed-settings-summer-lower`,
          { value: lowerLimit },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response1.status !== 200) {
          throw new Error('Failed to fetch data for lower limit');
        }

        const response2 = await axios.post(
          `https://gilbert-api.origin.tech/engineers-settings/fan-speed-settings-summer-upper`,
          { value: upperLimit },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response2.status !== 200) {
          throw new Error('Failed to fetch data for upper limit');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 2000);

    debouncedApiCall([...fanSpeedSummer]);

    return () => {
      debouncedApiCall.cancel();
    };
  }, [fanSpeedSummer]);

  useEffect(() => {
    const debouncedApiCall = debounce(async (values: [number, number]) => {
      try {
        const [lowerLimit, upperLimit] = values;

        const response1 = await axios.post(
          `https://gilbert-api.origin.tech/engineers-settings/fan-speed-settings-winter-upper`,
          { value: upperLimit },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response1.status !== 200) {
          throw new Error('Failed to fetch data for lower limit');
        }

        const response2 = await axios.post(
          `https://gilbert-api.origin.tech/engineers-settings/fan-speed-settings-winter-lower`,
          { value: lowerLimit },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response2.status !== 200) {
          throw new Error('Failed to fetch data for upper limit');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 2000);

    debouncedApiCall([...fanSpeedWinter]);

    return () => {
      debouncedApiCall.cancel();
    };
  }, [fanSpeedWinter]);

  return (
    <div className='w-full md:w-1/2 space-y-4 pr-10'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>
        Engineer&apos;s Settings
      </h2>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          CO2 Level Band
        </label>
        <Slider
          range
          marks={co2Marks}
          defaultValue={co2Level}
          onChange={onSliderChange(setCo2Level)}
          min={0}
          max={5000}
          step={50}
        />
      </div>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Fan Speed Settings - Summer
        </label>
        <Slider
          range
          marks={marks}
          defaultValue={fanSpeedSummer}
          onChange={onSliderChange(setFanSpeedSummer)}
          min={0}
          max={100}
        />
      </div>
      <div className='mb-8'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Fan Speed Settings - Winter
        </label>
        <Slider
          range
          marks={marks}
          defaultValue={fanSpeedWinter}
          onChange={onSliderChange(setFanSpeedWinter)}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default EngineerSettings;
