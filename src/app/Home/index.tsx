'use client';
import EngineerSettings from '@/components/EngineersSettings';
import CurrentReadings from '@/components/CurrentReadings';
import ModeSettings from '@/components/ModeSettings';
import OperationInfluence from '@/components/OperationInfluence';
import { Settings } from '@/types/Setting';
import Image from 'next/image';
import useSWR from 'swr';
import {
  useCurrentReadings,
  useEngineerSettings,
  useModeSettings,
  useOperationInfluence,
  useTeacherInterface,
} from '@/fetchData';
import { Spin } from 'antd';
import TeacherInterface from '@/components/TeachersInterface';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const { data: currentReadings } = useCurrentReadings();
  const { data: modeSettings } = useModeSettings();
  const { data: engineerSettings } = useEngineerSettings();
  const { data: teacherInterface } = useTeacherInterface();
  const { data: operationInfluence } = useOperationInfluence();

  if (
    !currentReadings ||
    !modeSettings ||
    !engineerSettings ||
    !teacherInterface ||
    !operationInfluence
  ) {
    return (
      <div className='flex w-screen h-screen items-center justify-center'>
        <Spin size='large' />
      </div>
    );
  }

  const co2Marks = { 0: '0', 5000: '5000' };
  const marks = { 0: '0', 100: '100' };

  return (
    <div className='container mx-auto p-4'>
      <div className='py-8'>
        <Image src='/gilbert-logo.jpeg' alt='Logo' width={200} height={200} />
      </div>

      <div className='flex flex-col md:flex-row'>
        <EngineerSettings
          co2Marks={co2Marks}
          marks={marks}
          engineerSettings={engineerSettings}
        />
        <CurrentReadings marks={marks} currentReadings={currentReadings} />
        <ModeSettings marks={marks} modeSettings={modeSettings} />
        <OperationInfluence
          marks={marks}
          co2Marks={co2Marks}
          operationInfluence={operationInfluence}
        />
      </div>

      <div className='flex justify-end p-7'>
        <div></div>
        <TeacherInterface teacherInterface={teacherInterface} />
      </div>
    </div>
  );
};

export default HomePage;
