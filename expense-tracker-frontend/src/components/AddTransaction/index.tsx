"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addData } from "@/redux/data/data";
import { useState } from "react";

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  costperunit: z.coerce
    .number()
    .min(0.01, "Cost per unit must be at least 0.01"),
  amount: z.coerce.number().optional(), // Auto-calculated
  date: z.coerce.date(),
});

export default function AddTransaction() {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      costperunit: 0,
      amount: 0,
      date: new Date(),
    },
  });

  // State to track the calculated amount
  const [amount, setAmount] = useState(0);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const updatedValues = {
        ...values,
        amount: values.costperunit * values.quantity, // Calculate amount
      };

     dispatch(
       addData({
         id: Date.now(), // Temporary ID
         name: updatedValues.name,
         quantity: updatedValues.quantity,
         costperunit: updatedValues.costperunit,
         amount: updatedValues.amount,
         date: format(updatedValues.date, "yyyy-MM-dd"), // Convert Date to String
       })
     );

      toast.success("Transaction added successfully!");

      // Reset form after submission
      form.reset({
        name: "",
        quantity: 0,
        costperunit: 0,
        amount: 0,
        date: new Date(),
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the transaction. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        {/* Name Input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Item Purchase" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cost per Unit Input */}
        <FormField
          control={form.control}
          name="costperunit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost per Unit</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 50.00"
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    form.setValue("costperunit", value);
                    setAmount(value * form.getValues("quantity"));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quantity Input */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 2"
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    form.setValue("quantity", value);
                    setAmount(form.getValues("costperunit") * value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount (Auto-Calculated) */}
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input value={amount} type="number" step="0.01" disabled />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Date Picker */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
