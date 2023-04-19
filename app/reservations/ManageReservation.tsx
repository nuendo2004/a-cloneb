"use client";
import useManageReservation from "../hooks/useManageReservation";
import Avatar from "../components/Avatar";
import { format } from "date-fns";
import Model from "../components/Model/Model";
import Button from "../components/Button";
import { sendEmail } from "../service/userService";
import { useRef } from "react";
import { toast } from "react-hot-toast";

const ManageReservation = () => {
  const { reservation, isActive, onClose } = useManageReservation();
  const messageBody = useRef<HTMLTextAreaElement>(null);
  let body;
  if (!reservation) return <></>;
  const { user, listing } = reservation;
  const startDate = format(new Date(reservation.startDate), "MM/dd/yyyy");
  const endDate = format(new Date(reservation.endDate), "MM/dd/yyyy");

  const handleCancelReservation = () => {
    onClose();
  };
  const handleSendMessage = () => {
    sendEmail(user.email || "", messageBody.current?.value);
    toast.success("Message Sent");
    onClose();
  };
  body = (
    <div className="h-full w-full rounded ">
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex mb-2">
          <Avatar src={user.image} height={50} width={50} />
          <div className="flex items-center ms-2">{user.name}</div>
        </div>
        <div>
          {"Reservation Date: "} {startDate} {" - "} {endDate}
        </div>
        <div>Location: {reservation.listing.location.address}</div>
        <div>
          Payment: $
          <span className="text-green-600 font-bold text-lg">
            {" "}
            {reservation.totalPrice}
          </span>
        </div>
      </div>
      <p>Message to {user.name}:</p>
      <textarea
        rows={5}
        className="w-full border border-neutral-400 rounded-md p-2"
        ref={messageBody}
      />
      <Button
        className="mt-4"
        outline
        label="Send"
        onClick={handleSendMessage}
      />
    </div>
  );

  return (
    <div className="z-20">
      {isActive && (
        <Model
          title="Reservation"
          isActive={isActive}
          onClose={onClose}
          body={body}
          onSubmit={handleCancelReservation}
          actionLabel="Cancel This Reservation"
        />
      )}
    </div>
  );
};

export default ManageReservation;
