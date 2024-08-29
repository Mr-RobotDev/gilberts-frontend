"use client";

import { useEffect, useState } from "react";
import { Slider, notification } from "antd";
import { debounce } from "lodash";
import axios from "axios";
import { Settings } from "@/types/Setting";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
interface EngineerSettingsProps {
  co2Marks: Record<number, string>;
  marks: Record<number, string>;
  innerRoomMarks: Record<number, string>;
  engineerSettings: Settings<"engineerSettings">;
}
type SliderState = [number, number];

const EngineerSettings: React.FC<EngineerSettingsProps> = ({
  co2Marks,
  innerRoomMarks,
  marks,
  engineerSettings,
}) => {
  const defaultCo2Level =
    Array.isArray(engineerSettings) &&
    (engineerSettings.find((setting) => setting.id === "co2-level-band-bottom")
      ?.value ||
      0);

  const defaultFanSpeedSummer =
    Array.isArray(engineerSettings) &&
    (engineerSettings.find(
      (setting) => setting.id === "fan-speed-settings-summer-lower"
    )?.value ||
      0);

  const defaultFanSpeedWinter =
    Array.isArray(engineerSettings) &&
    (engineerSettings.find(
      (setting) => setting.id === "fan-speed-settings-winter-lower"
    )?.value ||
      0);

  const [co2SetPoint, setCo2SetPoint] = useState<number>(engineerSettings.find(setting => setting.id === "co2-set-point")?.value || 0);
  const [temperatureSetPoint, setTemperatureSetPoint] = useState<number>(engineerSettings.find(setting => setting.id === "temperature-set-point")?.value || 0);

  const onSliderChange =
    (setState: React.Dispatch<React.SetStateAction<SliderState>>) =>
      (value: number[]) => {
        setState(value as SliderState);
      };

  const onChangeTemperatureSetPoint = (value: number) => {
    setTemperatureSetPoint(value);
  };

  const onChangeCO2SetPoint = (value: number) => {
    setCo2SetPoint(value)
  }

  const onChangeTemperatureSetPointComplete = async (value: number) => {
    const response = await axios.post(`${apiUrl}/room-settings/temperature-set-point`, { value: value })

    if (response.status !== 200) {
      notification.error({
        message: "Failed to Updated the Temperature Set Point",
      });
      throw new Error("Failed to Updated the InDoor room Set Point");
    }
  };

  const onChangeCo2SetPointComplete = async (value: number) => {
    try {
      const response = await axios.post(`${apiUrl}/room-settings/co2-set-point`, { value: value })

      if (response.status !== 200) {
        notification.error({
          message: "Failed to Updated the CO2 Set Point",
        });
        throw new Error("Failed to Updated the InDoor room Set Point");
      }

    } catch (error) {
      console.log('Error ->', error)
      notification.error({
        message: "Failed to Updated the CO2 Set Point",
      });
    }
  };


  return (
    <div className="w-full border-2 p-4 md:p-2 flex flex-col flex-1">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Room Settings
      </h2>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CO2 Set Point
        </label>
        <Slider
          tooltip={{
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          marks={co2Marks}
          step={50}
          min={0}
          max={5000}
          value={co2SetPoint}
          onChange={onChangeCO2SetPoint}
          onChangeComplete={onChangeCo2SetPointComplete}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Temperature Set Point
        </label>
        <Slider
          tooltip={{
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          marks={innerRoomMarks}
          min={0}
          max={35}
          value={temperatureSetPoint}
          onChange={onChangeTemperatureSetPoint}
          onChangeComplete={onChangeTemperatureSetPointComplete}
        />
      </div>
    </div>
  );
};

export default EngineerSettings;
