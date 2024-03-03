"use client";

import EngineerSettings from "@/components/EngineersSettings";
import CurrentReadings from "@/components/CurrentReadings";
import ModeSettings from "@/components/ModeSettings";
import OperationInfluence from "@/components/OperationInfluence";

const HomePage: React.FC = () => {
  const co2Marks = { 0: '0', 5000: '5000' };
  const marks = { 0: '0', 100: '100' };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <EngineerSettings co2Marks={co2Marks} marks={marks} />
        <CurrentReadings
          marks={marks}
          supplyFanSpeed={40}
          extractFanSpeed={60}
          roomCO2Level={20}
          roomTemperatureLevel={22}
          outsideAirTemperature={15}
        />
        <ModeSettings marks={marks}/>
        <OperationInfluence marks={marks}/>
      </div>
    </div>
  );
};

export default HomePage;
