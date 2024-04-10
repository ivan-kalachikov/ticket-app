"use client";

import { Ticket } from "@prisma/client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/app/utils/date";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriority from "./TicketPriority";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  ticket: Ticket;
}

function TicketDetails({ ticket }: Props) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onDelete = async () => {
    setIsPending(true);
    await axios.delete(`/api/tickets/${ticket.id}`);
    setIsPending(false);
    router.push("/tickets");
    router.refresh();
  };

  return (
    <div className="flex gap-6 flex-col lg:flex-row px-4 xl:px-0">
      <Card className="lg:w-3/4">
        <CardHeader>
          <div className="flex justify-between mb-4">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>{`Created At: ${formatDate(
            ticket.createdAt
          )}`}</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ReactMarkdown>{ticket.description}</ReactMarkdown>
        </CardContent>
        <CardFooter>{`Updated At: ${formatDate(ticket.updatedAt)}`}</CardFooter>
      </Card>
      <div className="flex self-start gap-4 items-center lg:flex-col lg:items-stretch lg:w-1/4 text-center">
        <Button
          onClick={() => router.push(`/tickets/edit/${ticket.id}`)}
          disabled={isPending}
        >
          Edit
        </Button>
        <Button disabled={isPending} onClick={onDelete} variant="destructive">
          Delete
        </Button>
        <Button
          onClick={() => router.push("/tickets")}
          disabled={isPending}
          variant="ghost"
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default TicketDetails;
