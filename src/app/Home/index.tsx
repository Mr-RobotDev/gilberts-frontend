'use client';

import EngineerSettings from '@/components/EngineersSettings';
import CurrentReadings from '@/components/CurrentReadings';
import ModeSettings from '@/components/ModeSettings';
import OperationInfluence from '@/components/OperationInfluence';
import { Settings } from '@/types/Setting';

interface HomePageProps {
  currentSettings: Settings<'currentSettings'>;
  modeSettings: Settings<'modeSettings'>;
  engineerSettings: Settings<'engineerSettings'>;
  teacherInterface: Settings<'teacherInterface'>;
  operationInfluence: Settings<'operationInfluence'>;
}

const HomePage: React.FC<HomePageProps> = ({
  currentSettings,
  modeSettings,
  engineerSettings,
  teacherInterface,
  operationInfluence,
}) => {
  const co2Marks = { 0: '0', 5000: '5000' };
  const marks = { 0: '0', 100: '100' };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='uppercase text-3xl my-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-transparent bg-clip-text'>
        GILBERTS
      </h1>

      <div className='flex flex-col md:flex-row'>
        <EngineerSettings
          co2Marks={co2Marks}
          marks={marks}
          engineerSettings={engineerSettings}
        />
        <CurrentReadings marks={marks} currentSettings={currentSettings} />
        <ModeSettings marks={marks} modeSettings={modeSettings} />
        <OperationInfluence
          marks={marks}
          operationInfluence={operationInfluence}
        />
      </div>
    </div>
  );
};

export default HomePage;
