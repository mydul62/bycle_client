import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registrationSchema";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/app/redux/api/features/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useState } from "react";
import { useImageUpload } from "@/hooks/hooks";
import { toast } from "sonner";

// Type Guards for Error Handling
function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === "object" && error !== null && "message" in error;
}

// Define TypeScript type for form data
type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  photo: string;
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const { uploadImage, uploading } = useImageUpload(); // Use image upload hook
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      photo: "",
    },
  });

  const { control, handleSubmit, setValue, formState: { errors } } = form;

  // Image Upload Handler
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const uploadedImageUrl = await uploadImage(file); // Upload image and get URL
      if (uploadedImageUrl) {
        setPreviewImage(uploadedImageUrl);
        setValue("photo", uploadedImageUrl); // Save uploaded image URL to form
      }
    }
  };

  const onSubmit: SubmitHandler<RegistrationFormData> = async (formData) => {
    console.log("Submitting Form:", formData); // Check if data is being passed
  
    try {
      const res = await registerUser(formData).unwrap(); // Ensure this call is resolving properly
      console.log("API Response:", res); // Log response
  
      if (res.success) {
        toast.success("Register successful");
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (err:any) {
      console.error("Registration failed:", err);
      toast.error(err?.message);
    }
  };
  
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Register</h1>
        <p className="text-sm text-gray-600">Join us today and start your journey!</p>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage>{errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" {...field} /></FormControl>
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl><Input type="password" {...field} /></FormControl>
                <FormMessage>{errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl><Input type="password" {...field} /></FormControl>
                <FormMessage>{errors.passwordConfirm?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><Input type="tel" {...field} /></FormControl>
                <FormMessage>{errors.phone?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
          <div className="space-y-2">
            <FormLabel>Upload Photo</FormLabel>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {uploading && <p className="text-gray-500">Uploading...</p>}
            {previewImage && (
              <div className="mt-2">
                <img src={previewImage} alt="Preview" className="w-24 h-24 object-cover rounded-md border" />
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm my-2">
              {isFetchBaseQueryError(error) && error.data && isErrorWithMessage(error.data)
                ? error.data.message
                : "Registration failed"}
            </p>
          )}

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-gray-600 text-center my-3">
        Already have an account? <Link to="/login" className="text-primary">Login</Link>
      </p>
    </div>
  );
}