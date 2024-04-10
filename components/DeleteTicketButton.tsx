"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "./ui/use-toast";

interface Props {
  ticketId: number;
  setIsPending: (isPending: boolean) => void;
}

export default function DeleteTicketButton({ ticketId, setIsPending }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const deleteTicket = async () => {
    try {
      setIsPending(true);
      setIsDeleting(true);
      await axios.delete(`/api/tickets/${ticketId}`);
      toast({
        title: "Ticket deleted successfully.",
        variant: "default",
      });
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
    setIsDeleting(false);
    setIsPending(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isDeleting}
        className={buttonVariants({ variant: "destructive" })}
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            ticket.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={deleteTicket}
            disabled={isDeleting}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
