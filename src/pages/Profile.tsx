import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { CheckCircle } from "lucide-react";

const formSchema = z.object({
  fullname: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .gte(10, {
      message: "Must be older than 10 years old",
    })
    .int({
      message: "Must be an integer number",
    })
    .lte(100, {
      message: "Must be younger than 100 years old",
    }),
  height: z
    .number({
      required_error: "Height is required",
      invalid_type_error: "Height must be a number",
    })
    .gte(50, {
      message: "Must be higher than 50 cm",
    })
    .lte(250, {
      message: "Must be lower than 250 cm",
    }),
  weight: z
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .gte(10, {
      message: "Must weigh more than 10 kg",
    })
    .lte(200, {
      message: "Must weigh less than 200 kg",
    }),
});

export default function Profile() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      age: undefined,
      height: undefined,
      weight: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="grid grid-rows-2 my-4 p-1">
      <div>
        <div className="flex gap-4 mb-20 flex-col">
          <h1 className="head-text">Create Your Profile!</h1>
          <h2 className="subtitle">
            By creating your profile, you will have access to:
          </h2>
        </div>
        <ul className="flex flex-col gap-12 text-center items-center p-8 border-2 rounded-2xl">
          <li>
            <CheckCircle className="inline mr-1" /> Body Index Mass
          </li>
          <li>
            <CheckCircle className="inline mr-1" /> How much calories you must
            consume per day
          </li>
          <li>
            <CheckCircle className="inline mr-1" />
            The relation between your 1 Rep Max and your weight
          </li>
        </ul>
      </div>
      <div className="px-1 pb-16">
        <h2 className="subtitle">Form Profile</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="22"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="173"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="76"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
