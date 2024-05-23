import useSWR from "swr";

async function fetchData(url: string) {
  const res = await fetch(url, {
    headers: {
      "Cache-Control": "no-store",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export function useCurrentReadings() {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/current-readings`,
    fetchData
  );
}

export function useModeSettings() {
  return useSWR(`${process.env.NEXT_PUBLIC_API_URL}/mode-settings`, fetchData);
}

export function useEngineerSettings() {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/engineers-settings`,
    fetchData
  );
}

export function useTeacherInterface() {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/teacher-interface`,
    fetchData
  );
}

export function useOperatorInfluence() {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/operator-influence`,
    fetchData
  );
}
