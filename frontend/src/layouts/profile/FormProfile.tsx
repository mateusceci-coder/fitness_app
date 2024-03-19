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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch } from "react-redux";
import { isUpdating } from "@/store/reducers/profile";


import { useState } from "react";
import { useProfile } from "@/api/profile/useProfile";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  birthday: z.coerce.string().includes("-", {
    message: "Must include birthday",
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
  gender: z.string({
    required_error: "Please select a gender",
  }),
  profile_picture: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
});

export interface dataUser {
  id: number;
  first_name: string;
  last_name: string;
  birthday: string;
  height: number;
  weight: number;
  profile_picture: string;
  gender: string;
}

export default function FormProfile({ dataUser }: { dataUser: dataUser }) {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { updateUser } = useProfile();

  if (!dataUser.profile_picture) {
    dataUser.profile_picture = "";
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthday: dataUser.birthday,
      height: dataUser.height,
      weight: dataUser.weight,
      gender: dataUser.gender,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("birthday", values.birthday);
    formData.append("height", values.height.toString());
    formData.append("weight", values.weight.toString());
    formData.append("gender", values.gender);

    if (selectedImage) {
      formData.append("profile_picture", selectedImage);
    }
    updateUser(formData, dataUser.id);

    setTimeout(() => {
      dispatch(isUpdating(true));
      window.location.href = "/profile";
    }, 5000);

  }

  return (
    <div className="px-1 py-16 bg-grayBg">
      <h2 className="subtitle mb-8">Form Profile</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-lg mx-auto p-4 rounded-2xl shadow-xl bg-white"
        >
          <FormField
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      setSelectedImage(e.target.files?.[0] || null);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    data-test="birthday"
                    min="1900-01-01"
                    max="2022-01-01"
                    {...field}
                    onChange={(event) => field.onChange(event.target.value)}
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
                    data-test="height"
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
                    data-test="weight"
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
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} required>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem data-test="female" value="Female">
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button data-test="submit-update-btn" type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
