import { Ticket } from "@prisma/client";
import React from "react";

interface Props {
  ticket: Ticket;
}

function TicketDetails({ ticket }: Props) {
  return (
    <div>
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>
    </div>
  );
}

export default TicketDetails;
