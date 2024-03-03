import { Dropdown, Menu, Slider, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useState } from 'react';

interface ModeSettingsProps {
    marks: Record<number, string>;
  }

const ModeSettings: React.FC<ModeSettingsProps> = ({marks}) => {
  const [heatingValueOutput] = useState<number>(0);
  const [heatExchangerOutput] = useState<number>(0);

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: "Dormant",
    },
    {
      key: "1",
      label: "Night Time Set Back",
    },
    {
      key: "2",
      label: "Morning Warm-Up",
    },
    {
      key: "3",
      label: "Night Time Cooling",
    },
    {
      key: "4",
      label: "Automatic",
    },
  ];

  return (
    <div className="w-full md:w-1/2 space-y-4 pl-2 pr-10">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Mode Settings</h2>
      <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Mode
            </label>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Hover me
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Operating Mode
            </label>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Hover me
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heat Valve Output (%)
            </label>
            <Slider disabled marks={marks} value={heatingValueOutput} />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heat Exchanger Output (%)
            </label>
            <Slider disabled marks={marks} value={heatExchangerOutput} />
          </div>
    </div>
  );
};

export default ModeSettings;
