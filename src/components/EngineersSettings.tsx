'use client';

import axios from 'axios';
import { Slider } from 'antd';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Settings } from '@/types/Setting';
import { notification } from 'antd';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
interface EngineerSettingsProps {
  co2Marks: Record<number, string>;
  marks: Record<number, string>;
  engineerSettings: Settings<'engineerSettings'>;
}
type SliderState = [number, number];

const EngineerSettings: React.FC<EngineerSettingsProps> = ({
  co2Marks,
  marks,
  engineerSettings,
}) => {
  const defaultCo2Level =
    Array.isArray(engineerSettings) &&
    (engineerSettings.find((setting) => setting.id === 'co2-level-band-bottom')
      ?.value ||
      0);

  const defaultFanSpeedSummer =
    Array.isArray(engineerSettings) &&
    (engineerSettings.find(
      (setting) => setting.id === 'fan-speed-settings-summer-lower'
    )?.value ||
      0);

  const defaultFanSpeedWinter =
    Array.isArray(engineerSettings) &&
    (engineerSettings.find(
      (setting) => setting.id === 'fan-speed-settings-winter-lower'
    )?.value ||
      0);

  const [co2Level, setCo2Level] = useState<[number, number]>(
    (() => {
      const defaultCo2LevelSetting = engineerSettings.find(
        (setting) => setting.id === 'co2-level-band-bottom'
      );
      const upperCo2LevelSetting = engineerSettings.find(
        (setting) => setting.id === 'co2-level-band-top'
      );

      const defaultCo2LevelValue =
        defaultCo2LevelSetting?.value !== undefined
          ? defaultCo2LevelSetting.value
          : 0;

      const upperCo2LevelValue =
        upperCo2LevelSetting?.value !== undefined
          ? upperCo2LevelSetting.value
          : 0;

      return [defaultCo2LevelValue, upperCo2LevelValue];
    })()
  );

  const [fanSpeedSummer, setFanSpeedSummer] = useState<[number, number]>(
    (() => {
      const defaultFanSpeedSummerSetting = engineerSettings.find(
        (setting) => setting.id === 'fan-speed-settings-summer-lower'
      );
      const upperFanSpeedSummerSetting = engineerSettings.find(
        (setting) => setting.id === 'fan-speed-settings-summer-upper'
      );

      const defaultFanSpeedSummerValue =
        defaultFanSpeedSummerSetting?.value !== undefined
          ? defaultFanSpeedSummerSetting.value
          : 0;

      const upperFanSpeedSummerValue =
        upperFanSpeedSummerSetting?.value !== undefined
          ? upperFanSpeedSummerSetting.value
          : 0;

      return [defaultFanSpeedSummerValue, upperFanSpeedSummerValue];
    })()
  );

  const [fanSpeedWinter, setFanSpeedWinter] = useState<[number, number]>(
    (() => {
      const defaultFanSpeedWinterSetting = engineerSettings.find(
        (setting) => setting.id === 'fan-speed-settings-winter-lower'
      );
      const upperFanSpeedWinterSetting = engineerSettings.find(
        (setting) => setting.id === 'fan-speed-settings-winter-upper'
      );

      const defaultFanSpeedWinterValue =
        defaultFanSpeedWinterSetting?.value !== undefined
          ? defaultFanSpeedWinterSetting.value
          : 0;

      const upperFanSpeedWinterValue =
        upperFanSpeedWinterSetting?.value !== undefined
          ? upperFanSpeedWinterSetting.value
          : 0;

      return [defaultFanSpeedWinterValue, upperFanSpeedWinterValue];
    })()
  );

  const onSliderChange =
    (setState: React.Dispatch<React.SetStateAction<SliderState>>) =>
    (value: number[]) => {
      setState(value as SliderState);
    };

  useEffect(() => {
    const debouncedApiCall = debounce(async (values: [number, number]) => {
      try {
        const [lowerLimit, upperLimit] = values;

        if (lowerLimit > 1000) {
          notification.error({
            message: 'Value must not be greater than 1000',
          });

          return;
        }
        const response1 = await axios.post(
          `${apiUrl}/engineers-settings/co2-level-band-bottom`,
          { value: lowerLimit },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response1.status !== 200) {
          throw new Error('Failed to fetch data for lower limit');
        }

        const response2 = await axios.post(
          `${apiUrl}/engineers-settings/co2-level-band-top`,
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
          `${apiUrl}/engineers-settings/fan-speed-settings-summer-lower`,
          { value: lowerLimit },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response1.status !== 200) {
          throw new Error('Failed to fetch data for lower limit');
        }

        const response2 = await axios.post(
          `${apiUrl}/engineers-settings/fan-speed-settings-summer-upper`,
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
          `${apiUrl}/engineers-settings/fan-speed-settings-winter-upper`,
          { value: upperLimit },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response1.status !== 200) {
          throw new Error('Failed to fetch data for lower limit');
        }

        const response2 = await axios.post(
          `${apiUrl}/engineers-settings/fan-speed-settings-winter-lower`,
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
    <div className='w-full border-2 p-4 md:p-2 flex flex-col flex-1'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>
        Engineer&apos;s Settings
      </h2>
      <div className='mb-5 p-2'>
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
      <div className='mb-5 p-2'>
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
