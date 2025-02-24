
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'sonner';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginSchema";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/app/redux/api/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/app/redux/hook";
import { setUser } from "@/app/redux/api/features/auth/authslice";
type DecodedToken = {
  userId: string; 
};
export default function LoginForm() {
 const toastId = 'Loading....'
const navigate = useNavigate()
const location = useLocation();
const redirectTo = (location.state as any)?.from || '/'; 
  const [login, 
  // { isLoading, error }
  ] = useLoginMutation();
  const dispatch = useAppDispatch()
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await login(data).unwrap();
    console.log(res)
    if (res?.data){
      const decoded = jwtDecode<DecodedToken>(res.data);
      console.log(decoded)
      dispatch(setUser({ token: res.data, user: decoded.userId }));
      navigate(redirectTo);
      toast.success("Successfully logged in!", { id: toastId });
    } else {
      toast.error("Invalid email or password");
    }
 
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <div className=" mb-4">
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button
            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ?
        <Link to="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
}
