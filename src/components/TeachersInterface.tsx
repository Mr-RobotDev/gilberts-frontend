import { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

enum ButtonValue {
  AUTO = 1,
  VENT_BOOST = 2,
  HEAT_BOOST = 3,
  OFF = 4,
}
interface TeacherInterfaceProps {
  teacherInterface: number;
}

const TeacherInterface: React.FC<TeacherInterfaceProps> = ({
  teacherInterface,
}) => {
  const [selectedButton, setSelectedButton] = useState<ButtonValue | null>(
    () => {
      switch (teacherInterface) {
        case 1:
          return ButtonValue.AUTO;
        case 2:
          return ButtonValue.VENT_BOOST;
        case 3:
          return ButtonValue.HEAT_BOOST;
        case 4:
          return ButtonValue.OFF;
        default:
          return null;
      }
    }
  );

  const handleButtonClick = async (value: ButtonValue) => {
    try {
      const response1 = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/teacher-interface`,
        { value },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response1.status !== 200) {
        throw new Error('Failed to fetch data for lower limit');
      }

      setSelectedButton(value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='border-2 p-2 flex flex-col gap-3 w-full md:w-4/12'>
      <p className='font-bold text-md md:text-lg text-gray-900'>
        Teacher Interface{' '}
        <span className='text-[11px] md:text-[14px]'>
          Auto/VENT BOOST/HEAT BOOST/OFF
        </span>
      </p>

      <Button
        type={selectedButton === ButtonValue.AUTO ? 'primary' : 'default'}
        onClick={() => handleButtonClick(ButtonValue.AUTO)}
        style={{
          backgroundColor:
            selectedButton === ButtonValue.AUTO ? '#1890ff' : 'transparent',
          color: selectedButton === ButtonValue.AUTO ? '#fff' : '#000',
        }}
      >
        AUTO
      </Button>
      <Button
        type={selectedButton === ButtonValue.VENT_BOOST ? 'primary' : 'default'}
        onClick={() => handleButtonClick(ButtonValue.VENT_BOOST)}
        style={{
          backgroundColor:
            selectedButton === ButtonValue.VENT_BOOST
              ? '#1890ff'
              : 'transparent',
          color: selectedButton === ButtonValue.VENT_BOOST ? '#fff' : '#000',
        }}
      >
        VENT BOOST
      </Button>
      <Button
        type={selectedButton === ButtonValue.HEAT_BOOST ? 'primary' : 'default'}
        onClick={() => handleButtonClick(ButtonValue.HEAT_BOOST)}
        style={{
          backgroundColor:
            selectedButton === ButtonValue.HEAT_BOOST
              ? '#1890ff'
              : 'transparent',
          color: selectedButton === ButtonValue.HEAT_BOOST ? '#fff' : '#000',
        }}
      >
        HEAT BOOST
      </Button>
      <Button
        type={selectedButton === ButtonValue.OFF ? 'primary' : 'default'}
        onClick={() => handleButtonClick(ButtonValue.OFF)}
        style={{
          backgroundColor:
            selectedButton === ButtonValue.OFF ? '#1890ff' : 'transparent',
          color: selectedButton === ButtonValue.OFF ? '#fff' : '#000',
        }}
      >
        OFF
      </Button>
    </div>
  );
};

export default TeacherInterface;
