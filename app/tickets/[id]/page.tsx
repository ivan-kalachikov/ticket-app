import React from "react";
import prisma from "@/prisma/db";
import TicketDetails from "@/components/TicketDetails";

interface Props {
  params: {
    id: string;
  };
}

async function ViewTicket({ params }: Props) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className=" text-destructive">Ticket not found</p>;
  }

  return <TicketDetails ticket={ticket} />;
}

export default ViewTicket;
