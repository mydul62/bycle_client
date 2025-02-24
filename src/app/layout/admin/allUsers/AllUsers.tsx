import { useDeleteUserMutation, useGetAllUsersQuery } from "@/app/redux/api/features/auth/authApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Shield, XCircle, CheckCircle, Edit, Trash } from "lucide-react";
import AllUsersSkeleton from "@/app/Components/skeletons/AllUsersSkeleton";
import { toast } from "sonner";

// Define TypeScript type for User
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isBlocked: boolean;
}

const AllUsers = () => {
  const [deleteUser] = useDeleteUserMutation();
  const { data, error, isLoading } = useGetAllUsersQuery(undefined);
  const users: User[] = data?.data || [];

  if (isLoading) {
    return <AllUsersSkeleton />; // Use AllUsersSkeleton when loading
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6" />
        <p className="ml-2">Error fetching users: {JSON.stringify(error)}</p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully!"); // Toast on success
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user."); // Toast on error
    }
  };

  return (
    <Card className="p-6 rounded-none max-w-full w-[92%] mx-auto border-none">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Role & Status</TableHead>
              <TableHead className="text-center">Actions</TableHead> {/* New column */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="flex flex-col items-center space-y-1">
                  {/* Role */}
                  <div className="flex items-center space-x-2">
                    <Shield className={`h-4 w-4 ${user.role === "admin" ? "text-yellow-500" : "text-gray-500"}`} />
                    <span className="capitalize">{user.role}</span>
                  </div>
                  {/* Status (below role) */}
                  <div className="flex items-center space-x-2">
                    {user.isBlocked ? (
                      <>
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-red-500">Blocked</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">Active</span>
                      </>
                    )}
                  </div>
                </TableCell>
                {/* Action Buttons */}
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-4">
                    <button
                      // onClick={() => handleUpdateRole(user._id)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AllUsers;
