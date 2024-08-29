import { useEffect, useState } from "react";
import { Slider, notification } from "antd";
import axios from "axios";
import { Settings, teacherInterfaceResponse } from "@/types/Setting";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface TeacherInterfaceSlidersProps {
  teacherInterfaceResponse: teacherInterfaceResponse[];
}

const co2Marks = { 0: "0", 5000: "5000" };

const TeacherInterfaceSliders: React.FC<TeacherInterfaceSlidersProps> = ({ teacherInterfaceResponse }) => {
  const marks = {
    "-25": "-25°",
    "35": "35°",
  };

  const imarks = {
    "0": "0",
    "35": "35",
  };

  const [temperatureSetPoint, setTemperatureSetPoint] = useState<number>();

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${apiUrl}/room-settings`)
      if (response.status === 200) {
        const data = response.data
        setTemperatureSetPoint(data.find((sp: any) => sp.id === 'temperature-set-point').value)
      }
    })()
  }, [])


  const [outsideAirTemperature, setOutsideAirTemperature] = useState<number>(
    teacherInterfaceResponse.find((op) => op.id === "outside-air-temperature")
      ?.value || 0
  );

  const [indoorRoomTemperature, setIndoorRoomTemperature] = useState<number>(
    teacherInterfaceResponse.find((op) => op.id === "indoor-room-temperature")
      ?.value || 0
  );

  const [indoorCO2, setIndoorCO2] = useState<number>(
    teacherInterfaceResponse.find((op) => op.id === "indoor-co2")?.value || 0
  );

  const onChangeTemperatureSetPoint = (value: number) => {
    setTemperatureSetPoint(value);
  };

  const onChangeTemperatureSetPointComplete = async (value: number) => {
    const response = await axios.post(`${apiUrl}/room-settings/temperature-set-point`, { value: value })

    if (response.status !== 200) {
      notification.error({
        message: "Failed to Updated the Temperature Set Point",
      });
      throw new Error("Failed to Updated the InDoor room Set Point");
    }
  };

  return (
    <div className="border-2 p-4 md:p-2 flex flex-col flex-1">
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Outside Air Temperature
        </label>
        <Slider
          disabled
          tooltip={{
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          min={-25}
          max={35}
          value={outsideAirTemperature}
          marks={marks}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Indoor Room Temperature
        </label>
        <Slider
          disabled
          tooltip={{
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          marks={imarks}
          min={0}
          max={35}
          value={indoorRoomTemperature}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Indoor CO2 (ppm)
        </label>
        <Slider
          disabled
          tooltip={{
            open: true,
            placement: "bottom",
            color: "blue",
            autoAdjustOverflow: false,
          }}
          marks={co2Marks}
          min={0}
          max={5000}
          value={indoorCO2}
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
          marks={{ 0: "0", 35: "35" }}
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

export default TeacherInterfaceSliders;
