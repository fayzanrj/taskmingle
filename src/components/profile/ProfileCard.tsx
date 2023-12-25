"use client";
import { UserProps } from "@/props/UserProps";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiLock } from "react-icons/fi";
import ProfileSkeleton from "./ProfileSkeleton";
import SendRemindersBtn from "./SendRemindersBtn";
import VerifyEmailBtn from "./VerifyEmailBtn";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import toast from "react-hot-toast";

// Profile Card interface
interface ProfileCardProps {
  accessToken: string;
}

// UserInfoDiv component for displaying user information
const UserInfoDiv: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <p className={`font-bold text-lg my-2`}>
      {label} : <span className="font-semibold">{value}</span>
    </p>
  );
};

// ProfileCard component
const ProfileCard: React.FC<ProfileCardProps> = ({ accessToken }) => {
  // State variables
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    profilePic: "",
    isVerified: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Headers for API request
  const headers = {
    "Content-Type": "application/json",
    accessToken,
  };

  // Function to fetch user details
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user/getUser", { headers });
      setUser(res.data.user);
    } catch (error: any) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user details on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // If profile card is loading
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="w-[90%] md:w-[30rem] mx-auto break-words p-4 rounded-lg">
      {/* Image */}
      <div className="w-20 h-20 mx-auto mb-4">
        <Image
          src={user?.profilePic || ""}
          width={100}
          height={100}
          className="rounded-full"
          quality={100}
          alt="Profile pic"
        />
      </div>

      {/* User info */}
      <div className="w-full text-left mt-10">
        <UserInfoDiv label="Name" value={user?.name || ""} />
        <UserInfoDiv label="Email" value={user?.email || ""} />

        {/* If user's email is not verified */}
        {user?.isVerified === false && (
          <VerifyEmailBtn
            email={user?.email}
            headers={headers}
            userId={user?.id}
            setUser={setUser}
          />
        )}
      </div>

      {/* Change password button */}
      <Link href="/dashboard/profile/changepassword" className="mt-5">
        <button className="px-4 py-2 bg-[#19fa91] text-black font-bold rounded-lg flex items-center">
          <FiLock className="mr-1" />
          Change Password
        </button>
      </Link>

      {/* Send emails toggle button */}
      <SendRemindersBtn sendReminders={false} />
    </div>
  );
};

export default ProfileCard;
