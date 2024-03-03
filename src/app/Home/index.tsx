'use client';

import EngineerSettings from '@/components/EngineersSettings';
import CurrentReadings from '@/components/CurrentReadings';
import ModeSettings from '@/components/ModeSettings';
import OperationInfluence from '@/components/OperationInfluence';
import { Settings } from '@/types/Setting';
import Image from 'next/image';

interface HomePageProps {
  currentReadings: Settings<'currentReadings'>;
  modeSettings: Settings<'modeSettings'>;
  engineerSettings: Settings<'engineerSettings'>;
  teacherInterface: Settings<'teacherInterface'>;
  operationInfluence: Settings<'operationInfluence'>;
}

const HomePage: React.FC<HomePageProps> = ({
  currentReadings,
  modeSettings,
  engineerSettings,
  teacherInterface,
  operationInfluence,
}) => {
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
    </div>
  );
};

export default HomePage;
