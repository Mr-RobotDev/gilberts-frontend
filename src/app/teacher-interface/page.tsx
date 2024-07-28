"use client";
import Image from "next/image";
import { useTeacherInterface, } from "@/fetchData";
import { Button, Spin } from "antd";
import TeacherInterface from "@/components/TeachersInterface";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const TeacherInterfacePage = () => {
  const { data: teacherInterface } = useTeacherInterface();
  const { isAuthenticated } = useSelector((state: RootState) => state.authReducer)
  const dispatch = useDispatch()
  const router = useRouter()
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/access')
      return;
    }
  }, [router, isAuthenticated])

  if (!teacherInterface) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

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

    <div className="flex justify-center py-4">
      <div></div>
      <TeacherInterface teacherInterface={teacherInterface} />
    </div>
  </div>
  );
};

export default TeacherInterfacePage;
