import { Slider } from "antd";
import { Settings } from "@/types/Setting";

interface CurrentReadingsProps {
  marks: Record<number, string>;
  co2marks: Record<number, string>;
  currentReadings: Settings<"currentReadings">;
}

const CurrentReadings: React.FC<CurrentReadingsProps> = ({
  marks,
  co2marks,
  currentReadings,
}) => {
  const getSliderValue = (id: string): number => {
    const setting = currentReadings.find((setting) => setting.id === id);
    return setting ? setting.value : 0;
  };

  const roomTemperatureLevelMarks = { 0: "0", 30: "30" };
  const outsideAirTemperatureMarks = { "-10": "-10", "30": "30" };

  return (
    <div className="w-full border-2 p-4 md:p-2 flex flex-col flex-1">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Current Readings</h2>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supply Fan Speed
        </label>
        <Slider
          disabled
          tooltip={{
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          marks={marks}
          value={getSliderValue("supply-fan-speed")}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Extract Fan Speed
        </label>
        <Slider
          disabled
          tooltip={{
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          marks={marks}
          value={getSliderValue("extract-fan-speed")}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Room CO2 Level (ppm)
        </label>
        <Slider
          disabled
          tooltip={{
            formatter: (value) => `${value} ppm`,
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          min={0}
          max={5000}
          marks={co2marks}
          value={getSliderValue("room-co2-level")}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Room Temperature Level (°C)
        </label>
        <Slider
          disabled
          tooltip={{
            formatter: (value) => `${value}°C`,
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          min={0}
          max={30}
          marks={roomTemperatureLevelMarks}
          value={getSliderValue("room-temperature")}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Outside Air Temperature (°C)
        </label>
        <Slider
          disabled
          tooltip={{
            formatter: (value) => `${value}°C`,
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          min={-10}
          max={30}
          marks={outsideAirTemperatureMarks}
          value={getSliderValue("outside-air-temperature")}
        />
      </div>
    </div>
  );
};

export default CurrentReadings;
