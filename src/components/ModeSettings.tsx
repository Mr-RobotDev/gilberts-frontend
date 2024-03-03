import { Dropdown, Menu, Select, Slider, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ModeSettingsProps {
  marks: Record<number, string>;
  modeSettings: { id: string; value: number }[];
}

const ModeSettings: React.FC<ModeSettingsProps> = ({ marks, modeSettings }) => {
  const [heatingValueOutput, setHeatingValueOutput] = useState<number>(0);
  const [heatExchangerOutput, setHeatExchangerOutput] = useState<number>(0);

  const items: MenuProps['items'] = [
    {
      key: '0',
      value: 'Dormant',
    },
    {
      key: '1',
      value: 'Night Time Set Back',
    },
    {
      key: '2',
      value: 'Morning Warm-Up',
    },
    {
      key: '3',
      value: 'Night Time Cooling',
    },
    {
      key: '4',
      value: 'Automatic',
    },
  ];

  useState(() => {
    const heatingValueSetting = modeSettings.find(
      (setting) => setting.id === 'heating-valve-output'
    );
    if (heatingValueSetting) {
      setHeatingValueOutput(heatingValueSetting.value);
    }

    const heatExchangerSetting = modeSettings.find(
      (setting) => setting.id === 'heat-exchanger-damper'
    );
    if (heatExchangerSetting) {
      setHeatExchangerOutput(heatExchangerSetting.value);
    }
  });

  const handleChange = async (key: string, value: string) => {
    let url;

    if (key === 'unit') {
      url = 'unit-mode';
    } else {
      url = 'operating-mode';
    }

    try {
      const numericValue = parseInt(value.key, 10);
      await axios.post(
        `${apiUrl}/mode-settings/${url}`,
        { value: numericValue },
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error setting unit mode:', error);
    }
  };

  return (
    <div className='w-full md:w-1/2 space-y-4 pl-2 pr-10'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Mode Settings</h2>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Unit Mode
        </label>
        <Select
          style={{ width: 120 }}
          onChange={(key, value) => handleChange('unit', value)}
          options={items}
        />
      </div>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Operating Mode
        </label>
        <Select
          style={{ width: 120 }}
          onChange={(key, value) => handleChange('operating', value)}
          options={items}
        />
      </div>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Heat Valve Output (%)
        </label>
        <Slider disabled marks={marks} value={heatingValueOutput} />
      </div>
      <div className='mb-5'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Heat Exchanger Output (%)
        </label>
        <Slider disabled marks={marks} value={heatExchangerOutput} />
      </div>
    </div>
  );
};

export default ModeSettings;
