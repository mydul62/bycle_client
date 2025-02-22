import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { RxCheckCircled } from "react-icons/rx"

// Menu items.
const items = [
  {
    title: "All Products",
    url: "/dashboard/addproduct",
    icon: Home,
  },
  {
    title: "All Orders",
    url: "/dashboard/allorders",
    icon: Inbox,
  },
  {
    title: "All Users",
    url: "/dashboard/allusers",
    icon: Calendar,
  },
  {
    title: "Product Add",
    url: "/dashboard/addproduct",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
          <Card className="w-full p-4 border-none  shadow-none bg-transparent rounded-none">
      <CardContent className="flex flex-col items-center border-b space-y-2">
        <img
          src="https://i.ibb.co.com/dJ5j9TNL/Untitled-design.png"
          alt="Car Icon"
          className=" w-16 h-16 rounded-md"
        />
        <h2 className=" font-semibold">MD MYDUL ISLAM</h2>
        <h4 className="">{'admin'}</h4>
        <p className="text-gray-500 text-sm">mydulcse62.niter@gmail.com</p>
        <div className="flex items-center mt-2 text-lg font-bold">
          <span>0.00 BDT</span>
          <RxCheckCircled className="text-green-500 w-5 h-5 ml-1" />
        </div>
      </CardContent>
    </Card>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
