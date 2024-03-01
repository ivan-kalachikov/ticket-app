import { Priority } from "@prisma/client";
import { Flame } from "lucide-react";
import React from "react";

interface Props {
  priority: Priority;
}

const priorityMap: Record<Priority, { label: string; level: 1 | 2 | 3 }> = {
  LOW: {
    label: "Low",
    level: 1,
  },
  MEDIUM: {
    label: "Medium",
    level: 2,
  },
  HIGH: {
    label: "High",
    level: 3,
  },
};

function TicketPriority({ priority }: Props) {
  return (
    <div
      className="inline-flex justify-center"
      aria-label={priorityMap[priority].label}
    >
      <Flame
        className={
          priorityMap[priority].level >= 1 ? "text-red-500" : "text-muted"
        }
      />
      <Flame
        className={
          priorityMap[priority].level >= 2 ? "text-red-500" : "text-muted"
        }
      />
      <Flame
        className={
          priorityMap[priority].level >= 3 ? "text-red-500" : "text-muted"
        }
      />
    </div>
  );
}

export default TicketPriority;
