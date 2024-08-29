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
import { Button, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { logout } from "../store/slice/authSlice";

const SettingsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.authReducer)
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/access')
      return;
    }
  }, [router, isAuthenticated])

  const { data: currentReadings } = useCurrentReadings();
  const { data: modeSettings } = useModeSettings();
  const { data: engineerSettings } = useEngineerSettings();
  const { data: operatorInfluence } = useOperatorInfluence();

  if (
    !currentReadings ||
    !modeSettings ||
    !engineerSettings ||
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


  const handleLogout = () => {
    dispatch(logout()) 
  }
  return (
    isAuthenticated && <div className="container mx-auto p-4">
      <div className=" flex justify-between items-center">
        <div className="py-8">
          <Image src="/gilbert-logo.jpeg" alt="Logo" width={200} height={200} />
        </div>
        <Button danger type="primary" onClick={handleLogout} >Logout</Button>
      </div>


      <div className="flex flex-col md:flex-row gap-3">
        <EngineerSettings
          co2Marks={co2Marks}
          innerRoomMarks={innerRoomMarks}
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
    </div>
  );
};

export default SettingsPage;
