"use client";

import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ticketSchema } from "@/validationSchemes/ticket";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Ticket } from "@prisma/client";
import DeleteTicketButton from "./DeleteTicketButton";

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
  ticket?: Ticket;
}

function TicketForm({ ticket }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  async function onSubmit(values: TicketFormData) {
    try {
      setIsPending(true);
      setError("");
      if (!ticket) {
        await axios.post("/api/tickets", values);
      } else {
        await axios.patch(`/api/tickets/${ticket.id}`, values);
      }
      setIsPending(false);
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      setError("Unknow error occurred. Please try again.");
      setIsPending(false);
    }
  }

  const onCancel = () => {
    router.push("/tickets");
  };

  const onDelete = async () => {
    if (!ticket) {
      return;
    }
    setIsPending(true);
    await axios.delete(`/api/tickets/${ticket.id}`);
    setIsPending(false);
    router.push("/tickets");
    router.refresh();
  };

  return (
    <div className="rounded-md w-full border p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ticket title..." />
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            defaultValue={ticket?.description}
            render={({ field }) => (
              <SimpleMDE {...field} placeholder="Description..." />
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              defaultValue={ticket?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">Started</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-4">
            <Button type="submit" disabled={isPending}>
              {!ticket ? "Create Ticket" : "Update Ticket"}
            </Button>
            {ticket && (
              <DeleteTicketButton
                ticketId={ticket.id}
                setIsPending={setIsPending}
              />
            )}
            <Button variant="ghost" disabled={isPending} onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default TicketForm;
