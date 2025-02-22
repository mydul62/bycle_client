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

// Define the TypeScript type for the form data
type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  photo: string;
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      photo: "",
    },
  });

  const { control, handleSubmit, watch, formState: { errors } } = form;

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  const onSubmit: SubmitHandler<RegistrationFormData> = async ({
    name,
    email,
    password,
    phone,
    gender,
    dateOfBirth,
    photo,
  }) => {
    console.log("Form Submitted:", { name, email, password, phone, gender, dateOfBirth, photo });

    try {
      const res = await register({ name, email, password, phone, gender, dateOfBirth, photo }).unwrap();
      if (res.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                {password !== passwordConfirm && (
                  <FormMessage>Passwords do not match</FormMessage>
                )}
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{errors.gender?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage>{errors.dateOfBirth?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo URL</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormMessage>{errors.photo?.message}</FormMessage>
              </FormItem>
            )}
          />
          {error && (
            <p className="text-red-500 text-sm my-2">
              {error?.data?.message || "Registration failed"}
            </p>
          )}
          <Button
            disabled={isLoading || password !== passwordConfirm}
            type="submit"
            className="mt-5 w-full"
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Already have an account?{" "}
        <Link to="/login" className="text-primary">
          Login
        </Link>
      </p>
    </div>
  );
}
