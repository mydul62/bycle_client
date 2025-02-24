import { 
  FaHome, 
  FaBoxOpen, 
  FaShoppingCart, 
  FaUsers, 
  FaPlusSquare, 
  FaCog 
} from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { RxCheckCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useGetSingleUserQuery } from "@/app/redux/api/features/auth/authApi";
import { logout } from "@/app/redux/api/features/auth/authslice";
import { useAppDispatch } from "@/app/redux/hook";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";

// Admin menu items
const adminItems = [
  { title: "My Orders", url: "/dashboard/myorders", icon: FaShoppingCart },
  { title: "My Profile", url: "/dashboard/profile", icon: FaHome },
  { title: "Manage Products", url: "/dashboard/allproducts", icon: FaBoxOpen },
  { title: "Customer Orders", url: "/dashboard/allorders", icon: FaShoppingCart },
  { title: "All Users", url: "/dashboard/allusers", icon: FaUsers },
  { title: "Product Add", url: "/dashboard/addproduct", icon: FaPlusSquare },
  { title: "Settings", url: "#", icon: FaCog },
];

// User menu items
const userItems = [
  { title: "My Profile", url: "/dashboard/profile", icon: FaHome },
  { title: "My Orders", url: "/dashboard/myorders", icon: FaShoppingCart },
];

export function AppSidebar() {
  const { data: user } = useGetSingleUserQuery(undefined);
  const currentUser = user?.data;
  const email = currentUser?.email;
  const dispatch = useAppDispatch();

  const items = currentUser?.role === "admin" ? adminItems : userItems;

  return (
    <Sidebar>
      <SidebarContent className="justify-between pb-10">
        <SidebarGroup>
          {/* Sidebar Logo */}
          <SidebarGroupLabel className="flex justify-start gap-2">
            <Link to={"/"}>
              <span className="text-red-500">Bicycle</span>
              <span className="text-black">Zone.</span>
            </Link>
            <div>/</div>
            <div>
             <Link className="text-sm" to={'/'}>Home</Link>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            {/* User Info Card */}
            <Card className="w-full p-4 border-none shadow-none bg-transparent rounded-none">
              <CardContent className="flex flex-col items-center border-b space-y-2">
               <div className=" h-20 w-20 rounded-full">
               <img src={currentUser?.photo} alt=" " className="rounded-full" />
               </div>
                <h2 className="font-semibold uppercase">{currentUser?.name}</h2>
                <h4 className="text-gray-600">{currentUser?.role}</h4>
                <p className="text-gray-500 text-sm">{email}</p>
                <div className="flex items-center mt-2 text-lg font-bold">
                  <RxCheckCircled className="text-green-500 w-5 h-5 ml-1" />
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Menu */}
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <IoIosLogOut
          onClick={() => dispatch(logout())}
          className="mt-3 ml-4 cursor-pointer"
          size={30}
          color="black"
        />
      </SidebarContent>
    </Sidebar>
  );
}
