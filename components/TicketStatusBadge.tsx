import { Status } from "@prisma/client";
import React from "react";
import { Badge } from "./ui/badge";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  {
    label: string;
    color: "bg-green-400" | "bg-red-400" | "bg-blue-400";
    hoverColor: "bg-green-500" | "bg-red-600" | "bg-blue-600";
  }
> = {
  OPEN: {
    label: "Open",
    color: "bg-red-400",
    hoverColor: "bg-red-600",
  },
  STARTED: {
    label: "Started",
    color: "bg-blue-400",
    hoverColor: "bg-blue-600",
  },
  CLOSED: {
    label: "Closed",
    color: "bg-green-400",
    hoverColor: "bg-green-500",
  },
};

function StatusBadge({ status }: Props) {
  return (
    <Badge className={`${statusMap[status].color} hover:bg-unset`}>
      {statusMap[status].label}
    </Badge>
  );
}

export default StatusBadge;
