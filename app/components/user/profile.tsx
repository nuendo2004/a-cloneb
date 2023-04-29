"use client";

import { SafeUser } from "@/app/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface ProfileProps {
  currentUser: SafeUser;
}

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
  const {} = useForm<FieldValues>({
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
      avatar: currentUser.image,
    },
  });
  return <div></div>;
};

export default Profile;
