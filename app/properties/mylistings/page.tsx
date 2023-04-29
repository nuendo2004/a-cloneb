"use client";

import WideSection from "@/app/components/WideSection";
import { SafeListing } from "../../types";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

interface MyPropProps {
  listings: SafeListing[];
}

const MyProperties: React.FC<MyPropProps> = ({ listings }) => {
  return (
    <WideSection>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <Heading title="My properties" subtitle="Manage your listings" />
        <div className="my-auto">
          <Button label="Add New" onClick={() => {}} />
        </div>
      </div>
    </WideSection>
  );
};

export default MyProperties;
