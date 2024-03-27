import React from "react";
import prisma from "@/prisma/db";
import DataTable from "@/components/DataTable";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

async function Tickets() {
  const tickets = await prisma.ticket.findMany();

  return (
    <div className="w-full">
      <Link
        href="/tickets/new"
        className={`mb-6 ${buttonVariants({ variant: "default" })}`}
      >
        Create Ticket
      </Link>
      <div className="rounded-md sm:border">
        <DataTable tickets={tickets} />
      </div>
    </div>
  );
}

export default Tickets;
