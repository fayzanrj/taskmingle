import ProfileCard from "@/components/profile/ProfileCard";
import { authOptions } from "@/utils/AuthOptions";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "My Profile",
};

const Profile: NextPage = async () => {
  const data = await getServerSession(authOptions);
  return (
    <div className="w-full mx-auto my-10 text-center">
      {/* @ts-ignore */}
      <ProfileCard accessToken={data?.user?.accessToken} />
    </div>
  );
};

export default Profile;
