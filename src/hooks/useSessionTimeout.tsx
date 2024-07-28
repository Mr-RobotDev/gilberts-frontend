'use client'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { logout } from "@/app/store/slice/authSlice";
import { RootState } from "@/app/store/store";

const useSessionTimeout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginTime = useSelector((state: RootState) => state.authReducer.loginTime);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const logoutTimer = (process.env.NEXT_PUBLIC_LOGOUT_TIMER || 30000) as number

    if (loginTime) {
      const currentTime = Date.now();
      const timeDiff = currentTime - loginTime;

      if (timeDiff >= logoutTimer) { // 1 hour in milliseconds
        dispatch(logout());
        router.push('/access');
      } else {
        timeout = setTimeout(() => {
          dispatch(logout());
          router.push('/access');
        }, logoutTimer - timeDiff);
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [loginTime, dispatch, router]);
};

export default useSessionTimeout;
