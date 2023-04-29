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
  const handleNavigate = () => {
    router.push("/properties/mylistings");
  };

  return (
    <div className="bg-neutral-100 p-[3rem] h-full">
      <Avatar width={70} height={70} src={currentUser.image} />
      <h2 className="text-3xl my-3">Good Morning,</h2>
      <h2 className="text-3xl my-3 font-bold">
        {currentUser.name?.split(" ")[0]}
      </h2>
      <Button
        label="My Property"
        className="sm:my-5"
        onClick={handleNavigate}
      />
    </div>
  );
};

export default AdminPanel;
