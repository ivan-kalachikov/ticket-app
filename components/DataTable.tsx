import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Ticket } from "@prisma/client";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/TicketPriority";

interface Props {
  tickets: Ticket[];
}

function DataTable({ tickets }: Props) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Priority</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.title}</TableCell>
              <TableCell className="text-center">
                <TicketStatusBadge status={ticket.status} />
              </TableCell>
              <TableCell className="text-center">
                <TicketPriority priority={ticket.priority} />
              </TableCell>
              <TableCell>
                {ticket.updatedAt.toLocaleString("en-US", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
