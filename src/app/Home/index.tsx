"use client";
import Image from "next/image";
import EngineerSettings from "@/components/EngineersSettings";
import CurrentReadings from "@/components/CurrentReadings";
import ModeSettings from "@/components/ModeSettings";
import OperatorInfluence from "@/components/OperatornInfluence";

import {
  useCurrentReadings,
  useEngineerSettings,
  useModeSettings,
  useOperatorInfluence,
  useTeacherInterface,
} from "@/fetchData";
import { Spin } from "antd";
import TeacherInterface from "@/components/TeachersInterface";

interface HomePageProps { }

const HomePage: React.FC<HomePageProps> = ({ }) => {
  const { data: currentReadings } = useCurrentReadings();
  const { data: modeSettings } = useModeSettings();
  const { data: engineerSettings } = useEngineerSettings();
  const { data: teacherInterface } = useTeacherInterface();
  const { data: operatorInfluence } = useOperatorInfluence();

  if (
    !currentReadings ||
    !modeSettings ||
    !engineerSettings ||
    !teacherInterface ||
    !operatorInfluence
  ) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const co2Marks = { 0: "0", 5000: "5000" };
  const marks = { 0: "0", 100: "100" };
  const innerRoomMarks = { 0: "0", 35: "35" };

  return (
    <div className="container mx-auto p-4">
      <div className="py-8">
        <Image src="/gilbert-logo.jpeg" alt="Logo" width={200} height={200} />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <EngineerSettings
          innerRoomMarks={innerRoomMarks}
          co2Marks={co2Marks}
          marks={marks}
          engineerSettings={engineerSettings}
        />
        <CurrentReadings
          marks={marks}
          co2marks={co2Marks}
          currentReadings={currentReadings}
        />
        <ModeSettings marks={marks} modeSettings={modeSettings} />
        <OperatorInfluence
          co2Marks={co2Marks}
          operatorInfluence={operatorInfluence}
        />
      </div>

      <div className="flex justify-end py-4">
        <div></div>
        <TeacherInterface teacherInterface={teacherInterface} />
      </div>
    </div>
  );
};

export default HomePage;
