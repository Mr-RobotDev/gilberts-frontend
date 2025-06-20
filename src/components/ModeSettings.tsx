import { useEffect, useState } from "react";
import { Select, Slider } from "antd";
import axios from "axios";
import { Settings } from "@/types/Setting";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ModeSettingsProps {
  marks: Record<number, string>;
  modeSettings: Settings<"modeSettings">;
}

const ModeSettings: React.FC<ModeSettingsProps> = ({ marks, modeSettings }) => {
  const [unitValue, setUnitValue] = useState<number>(
    modeSettings.find((setting) => setting.id === "unit-mode")?.value || 0
  );
  const [operatingValue, setOperatingValue] = useState<number>(
    modeSettings.find((setting) => setting.id === "operating-mode")?.value || 0
  );

  const [heatingValueOutput, setHeatingValueOutput] = useState<number>(0);
  const [heatExchangerOutput, setHeatExchangerOutput] = useState<number>(0);

  const items = [
    {
      key: "0",
      value: "Master",
    },
    {
      key: "1",
      value: "Master/Slave",
    },
  ];

  const operatingModeItems = [
    {
      key: "0",
      value: "Dormant",
    },
    {
      key: "1",
      value: "Night Time Set Back",
    },
    {
      key: "2",
      value: "Morning Warm-Up",
    },
    {
      key: "3",
      value: "Night Time Cooling",
    },
    {
      key: "4",
      value: "Automatic",
    },
  ];

  useEffect(() => {
    const heatingValueSetting = modeSettings.find(
      (setting) => setting.id === "heating-valve-output"
    );
    if (heatingValueSetting) {
      setHeatingValueOutput(heatingValueSetting.value);
    }

    const heatExchangerSetting = modeSettings.find(
      (setting) => setting.id === "heat-exchanger-damper"
    );
    if (heatExchangerSetting) {
      setHeatExchangerOutput(heatExchangerSetting.value);
    }
  }, [modeSettings]);

  const handleChange = async (selectedValue: number | string, type: string) => {
    let url = type === "unit" ? "unit-mode" : "operating-mode";

    try {
      const numericValue =
        typeof selectedValue === "string"
          ? parseInt(selectedValue, 10)
          : selectedValue;

      await axios.post(
        `${apiUrl}/mode-settings/${url}`,
        { value: numericValue },
        { headers: { "Content-Type": "application/json" } }
      );

      if (type === "unit") {
        setUnitValue(numericValue);
      } else if (type === "operating") {
        setOperatingValue(numericValue);
      }
    } catch (error) {
      console.error("Error setting unit mode:", error);
    }
  };

  return (
    <div className="w-full border-2 p-4 md:p-2 flex flex-col flex-1">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Mode Settings</h2>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Unit Mode (Master/Slave)
        </label>
        <Select
          style={{ width: 200 }}
          onChange={(selectedValue) => handleChange(selectedValue, "unit")}
          options={items.map((item) => ({
            label: item.value,
            value: item.key,
          }))}
          value={items[unitValue].value}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Operating Mode
        </label>
        <Select
          style={{ width: 200 }}
          onChange={(selectedValue) => handleChange(selectedValue, "operating")}
          options={operatingModeItems.map((item) => ({
            label: item.value,
            value: item.key,
          }))}
          value={operatingModeItems[operatingValue].value}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Heat Valve Output (%)
        </label>
        <Slider
          disabled
          tooltip={{
            formatter: (value) => `${value} %`,
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          min={0}
          max={100}
          marks={marks}
          value={heatingValueOutput}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Heat Exchanger Output (%)
        </label>
        <Slider
          disabled
          tooltip={{
            formatter: (value) => `${value} %`,
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          min={0}
          max={100}
          marks={marks}
          value={heatExchangerOutput}
        />
      </div>
    </div>
  );
};

export default ModeSettings;
