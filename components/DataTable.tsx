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
import Link from "next/link";
import { formatDate } from "@/app/utils/date";

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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>
                <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
              </TableCell>
              <TableCell className="text-center">
                <TicketStatusBadge status={ticket.status} />
              </TableCell>
              <TableCell className="text-center">
                <TicketPriority priority={ticket.priority} />
              </TableCell>
              <TableCell>{formatDate(ticket.updatedAt)}</TableCell>
              <TableCell>
                <Link href={`/tickets/edit/${ticket.id}`}>Edit</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
