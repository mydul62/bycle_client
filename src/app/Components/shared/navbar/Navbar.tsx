import { useEffect, useState, useRef } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { IoIosLogIn } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { logout } from "@/app/redux/api/features/auth/authslice";
import { setOpen } from "@/app/redux/api/features/drowerSlice";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Shop", path: "/shop" },
  { name: "Contacts", path: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const carts = useAppSelector((state) => state.Product.items);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <div
      className={`w-full z-50 transition-all duration-300 ${
        isScrolled ? "lg:fixed top-0 left-0 bg-white " : "lg:absolute top-10"
      }`}
    >
      <nav className="w-[94%] mx-auto flex gap-8 items-center justify-between px-4 py-3 bg-white">
        {/* Logo */}
        <div className="text-2xl font-bold w-[20%]">
          <Link to={"/"}>
            <span className="text-red-500">Bicycle</span>
            <span className="text-black">Zone.</span>
          </Link>
        </div>

        {/* Main Navigation for Large Devices */}
        <div className="hidden md:flex items-center justify-end gap-6 w-full py-4">
          {navLinks.map((link, index) => (
            <Link key={index} to={link.path ?? "/"} className="hover:text-red-500 text-lg font-light">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end gap-6 w-[45%]">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoIosLogIn className="mt-[3px]" size={30} color="black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {token ? <span onClick={() => dispatch(logout())}>Logout</span> : <Link to={"/login"}>Login</Link>}
              </DropdownMenuItem>
              <DropdownMenuItem>
               { token && <Link to={"/dashboard"}>Dashboard</Link>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart Icon */}
          <div onClick={()=>{
                       dispatch(setOpen())
                      }}  className="relative cursor-pointer">
            <GiShoppingBag color="green" size={30} />
              <span className="absolute -top-2 -right-2 bg-[#1b3e41] text-white text-xs px-1 py-1 rounded-full">
                {carts?.length || 0}
              </span>
     
          </div>

          {/* Phone */}
          <div className="hidden md:flex items-center gap-2">
            <Phone className="mt-[3px]" size={25} color="green" />
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
        ref={mobileMenuRef}
        className={`fixed top-0 z-50 left-0 w-64 h-full bg-white shadow-lg transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform ease-in-out duration-300 md:hidden`}
      >
        <button className="absolute top-4 right-4" onClick={() => setMobileMenuOpen(false)}>
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col mt-12 space-y-4 px-6 text-lg">
          {navLinks.map((link, index) => (
            <Link key={index} to={link.path ?? "/"} onClick={() => setMobileMenuOpen(false)} className="hover:text-red-500 text-xl">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
