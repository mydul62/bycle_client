import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useChangePasswordMutation } from "@/app/redux/api/features/auth/authApi";
import { toast } from "sonner"; // ✅ Using Sonner for toast notifications

// Form data interface
interface PasswordChangeForm {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const Profile = () => {
  const { register, handleSubmit, reset } = useForm<PasswordChangeForm>();
  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (data: PasswordChangeForm) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* User Profile Section */}
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-8 bg-gradient-to-r from-gray-100 to-gray-200">
          <div className="relative">
            <Avatar className="w-24 h-24 border-2 border-gray-400">
              <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition">
              <Pencil className="text-gray-600" size={16} />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">MD MYDUL ISLAM</h2>
            <p className="text-gray-600">mydulcse62.niter@gmail.com</p>
          </div>
        </CardContent>
      </Card>

      {/* Password Change Form */}
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="bg-gray-100 p-5 rounded-t-lg">
          <CardTitle className="text-lg font-semibold text-gray-800">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label className="font-medium text-gray-700">Old Password</Label>
              <Input
                type="password"
                {...register("oldPassword", { required: true })}
                className="border-gray-300 focus:ring focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-medium text-gray-700">New Password</Label>
              <Input
                type="password"
                {...register("newPassword", { required: true })}
                className="border-gray-300 focus:ring focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-medium text-gray-700">Confirm New Password</Label>
              <Input
                type="password"
                {...register("confirmNewPassword", { required: true })}
                className="border-gray-300 focus:ring focus:ring-gray-400"
              />
            </div>
            <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-700 transition">
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
