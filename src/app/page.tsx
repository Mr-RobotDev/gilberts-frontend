import HomePage from './Home';

async function fetchData(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const currentReadings = await fetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/current-readings`
  );
  const modeSettings = await fetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/mode-settings`
  );
  const engineerSettings = await fetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/engineers-settings`
  );
  const teacherInterface = await fetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/teacher-interface`
  );
  const operationInfluence = await fetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/operation-influence`
  );

  return (
    <HomePage
      engineerSettings={engineerSettings}
      currentReadings={currentReadings}
      modeSettings={modeSettings}
      operationInfluence={operationInfluence}
      teacherInterface={teacherInterface}
    />
  );
}
