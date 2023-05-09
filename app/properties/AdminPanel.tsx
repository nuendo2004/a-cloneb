"use client";
import { useRouter } from "next/navigation";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { SafeUser } from "../types";

interface AdminPanelProps {
  currentUser: SafeUser;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser }) => {
  const router = useRouter();

  return (
    <div className="bg-neutral-100 p-[2rem] min-w-[20rem] h-full">
      <Avatar width={70} height={70} src={currentUser.image} />
      <h2 className="text-3xl my-3">Good Morning,</h2>
      <h2 className="text-3xl my-3 font-bold">
        {currentUser.name?.split(" ")[0]}
      </h2>
      <Button
        label="My Property"
        className="sm:my-5"
        onClick={() => router.push("/properties/mylistings")}
      />
      <Button
        label="My Reservation"
        className="sm:my-5"
        onClick={() => router.push("/reservations")}
      />
    </div>
  );
};

export default AdminPanel;
