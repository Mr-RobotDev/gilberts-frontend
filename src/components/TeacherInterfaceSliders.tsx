import { useEffect, useState } from "react";
import { Slider, Switch } from "antd";
import { debounce } from "lodash";
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

  useEffect(() => {
    const debouncedApiCall = debounce(async (value: number) => {
      try {
        const response = await axios.post(
          `${apiUrl}/teacher-interface/outside-air-temperature`,
          { value },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error("Error setting unit mode:", error);
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
          `${apiUrl}/teacher-interface/indoor-room-temperature`,
          { value },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error("Error setting operating mode:", error);
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
          `${apiUrl}/teacher-interface/indoor-co2`,
          { value },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error("Error setting indoor CO2:", error);
      }
    }, 2000);

    debouncedApiCall(indoorCO2);

    return () => {
      debouncedApiCall.cancel();
    };
  }, [indoorCO2]);

  return (
    <div className="border-2 p-4 md:p-2 flex flex-col flex-1">
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Outside Air Temperature
        </label>
        <Slider
          min={-25}
          max={35}
          defaultValue={outsideAirTemperature}
          onChangeComplete={setOutsideAirTemperature}
          marks={marks}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Indoor Room Temperature
        </label>
        <Slider
          marks={imarks}
          min={0}
          max={35}
          defaultValue={indoorRoomTemperature}
          onChangeComplete={setIndoorRoomTemperature}
        />
      </div>
      <div className="mb-5 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Indoor CO2 (ppm)
        </label>
        <Slider
          marks={co2Marks}
          min={0}
          max={5000}
          step={50}
          defaultValue={indoorCO2}
          onChangeComplete={setIndoorCO2}
        />
      </div>
    </div>
  );
};

export default TeacherInterfaceSliders;
