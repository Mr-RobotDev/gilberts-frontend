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
    <div className='flex flex-col'>
      <Button
        type={selectedButton === ButtonValue.AUTO ? 'primary' : 'default'}
        onClick={() => handleButtonClick(ButtonValue.AUTO)}
      >
        AUTO
      </Button>
      <Button
        type={selectedButton === ButtonValue.VENT_BOOST ? 'primary' : 'default'}
        onClick={() => handleButtonClick(ButtonValue.VENT_BOOST)}
      >
        VENT BOOST
      </Button>
      <Button
        type={selectedButton === ButtonValue.HEAT_BOOST ? 'primary' : 'default'}
        onClick={() => handleButtonClick(ButtonValue.HEAT_BOOST)}
      >
        HEAT BOOST
      </Button>
      <Button
        type={selectedButton === ButtonValue.OFF ? 'primary' : 'default'}
        onClick={() => handleButtonClick(ButtonValue.OFF)}
      >
        OFF
      </Button>
    </div>
  );
};

export default TeacherInterface;
