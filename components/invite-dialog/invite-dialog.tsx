"use client";

import { FC, useState, ChangeEvent } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Trash } from "lucide-react";
import { ActionMenu } from "../action-menu/action-menu";
import { useAddTripAccess, useFetchTripAccess, useRemoveTripAccess } from "@/hooks/trip-access";
import { useMediaQuery } from "@react-hookz/web";
import { ActionDialog } from "../action-dialog/action-dialog";
import { useXlViewport } from "@/hooks/use-xl-viewport";

interface InviteDialogProps {
  tripId: string;
}

export const InviteDialog: FC<InviteDialogProps> = ({ tripId }) => {
  const [email, setEmail] = useState<string>("");
  const { mutate: addUser } = useAddTripAccess();
  const { mutate: removeUser } = useRemoveTripAccess();
  const { data: users } = useFetchTripAccess(tripId);
  const { isXl } = useXlViewport();
  const Component = isXl ? ActionDialog : ActionMenu;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const addEmail = () => {
    const trimmed = email.trim();
    if (trimmed && !users?.allowedEmails.includes(trimmed)) {
      addUser({ email: trimmed, tripId });
      setEmail("");
    }
  };

  const removeEmail = (emailToRemove: string) => {
    removeUser({ email: emailToRemove, tripId });
  };

  return (
    <Component
      header="Invite friends"
      description="Invite friends with existing accounts to collaborate with you."
      trigger={
        <Button variant="outline" className="w-28 h-11">
          Invite friends
        </Button>
      }
      closeText="Done"
    >
      <div className="flex flex-col gap-8">
        <div className="flex gap-2">
          <Input
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            className="flex-1 h-10"
          />
          <Button
            onClick={addEmail}
            className="bg-primary-500 text-black h-10 hover:bg-primary-500"
            variant="default"
          >
            Invite
          </Button>
        </div>
        <div>
          <h3 className="font-medium text-sm mb-1">Who has access:</h3>
          {users?.allowedEmails.length === 0 ? (
            <p className="text-gray-500 text-sm">No users added yet.</p>
          ) : (
            <div className="min-h-32 h-32 overflow-y-auto no-scrollbar">
              <ul className="space-y-1">
                {users?.allowedEmails.map((e, index) => (
                  <li key={index} className="flex items-center justify-between text-sm">
                    <span>{e}</span>
                    <Button
                      variant="ghost"
                      className="p-4 hover:bg-white"
                      onClick={() => removeEmail(e)}
                    >
                      <Trash size={16} className="text-red-500" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Component>
  );
};
