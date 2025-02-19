import { useEffect, useState } from "react";
import { ShoppingCart, Phone, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Shop", path: "/shop" },

  { name: "Contacts", path: "/contact" },
  
];

export default function Navbar() {
  const [cartCount] = useState(100);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full z-50 transition-all duration-300 ${
        isScrolled ? "lg:fixed top-0 left-0 bg-white shadow-md" : "lg:absolute top-10"
      }`}
    >
      <nav className={`w-[94%] mx-auto flex items-center justify-between px-4 py-3 ${!isScrolled && "bg-white"}`}>
        {/* Logo */}
        <div className="text-2xl font-bold w-[20%]">
          <span className="text-red-500">Bicyle</span>
          <span className="text-black">Zone.</span>
        </div>

        {/* Main Navigation for Large Devices */}
        <div className="hidden md:flex items-center justify-center gap-6 py-4">
          {navLinks.map((link, index) => (
            link?.dropdown ? (
              <div key={index} className="relative group">
                <div className="flex items-center gap-1 py-8 hover:text-red-500 cursor-pointer">
                  {link.name} <ChevronDown size={16} />
                </div>
                <div className="absolute left-0 top-[80%] w-40 bg-gray-900 text-white shadow-lg rounded-md hidden group-hover:block">
                  {link?.subLinks?.map((subLink, subIndex) => (
                    <a key={subIndex} href={subLink.path} className="block px-4 py-2 hover:bg-gray-700">
                      {subLink.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={index} to={link.path ?? "/"} className="hover:text-red-500">
               <span className=" text-xl font-light">  {link.name}</span>
              </Link>
            )
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end gap-6 w-[20%]">
        <div>
        <DropdownMenu>
  <DropdownMenuTrigger>
  <Avatar className="">
  <AvatarImage src="https://github.com/shadcn.png"  className="w-16"/>
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
    <Link to={"/login"}>Login</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
    <Link to={"/login"}>Dashboard</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        </div>
          {/* Cart Icon */}
          <div className="relative cursor-pointer">
            <div className="relative bg-red-500 rounded-full p-4">
              <ShoppingCart size={15} color="white" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#1b3e41] text-white text-xs px-2 py-1 rounded-full">{cartCount}</span>
            )}
          </div>

          {/* Phone */}
          <div className="hidden md:flex items-center gap-2">
            <div className="bg-[#1b3e41] rounded-full p-4">
              <Phone size={15} color="white" />
            </div>
            <span className="text-lg font-semibold">+88-01-30210-4188</span>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 z-50 left-0 w-64 h-full bg-white shadow-lg transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform ease-in-out duration-300 md:hidden`}
      >
        <button className="absolute top-4 right-4" onClick={() => setMobileMenuOpen(false)}>
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col mt-12 space-y-4 px-6 text-lg">
          {navLinks.map((link, index) => (
            link.dropdown ? (
              <div key={index} className="relative group">
                <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
                  {link.name} <ChevronDown size={16} />
                </div>
                <div className="mt-2 w-full bg-gray-900 text-white shadow-lg rounded-md hidden group-hover:block">
                  {link.subLinks.map((subLink, subIndex) => (
                    <a key={subIndex} href={subLink.path} className="block px-4 py-2 hover:bg-gray-700">
                      {subLink.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <Link  key={index} to={link.path ?? "/"} className="hover:text-red-500">
              <span className=" text-xl">  {link.name}</span>
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}