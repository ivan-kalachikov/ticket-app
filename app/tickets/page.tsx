import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";

async function Tickets() {
  const tickets = await prisma.ticket.findMany();
  console.log(tickets);

  return (
    <div className="mt-5 w-full">
      <div className="rounded-md sm:border">
        <DataTable tickets={tickets} />
      </div>
    </div>
  );
}

export default Tickets;
