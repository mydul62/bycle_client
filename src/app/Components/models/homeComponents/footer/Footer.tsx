import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A3A] text-white py-12 px-6 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Logo and About Section */}
        <div className="text-center md:text-left w-full md:w-2/5 space-y-3">
          <Link className="text-3xl font-bold" to={"/"}>
            <span className="text-red-500">Bicycle</span>
            <span className="text-white">Zone.</span>
          </Link>
          <p className=" text-xl font-light text-[#eaeaea8e]">
          At BicycleZone, we are passionate about providing high-quality bicycles and exceptional service. Our mission is to help every rider find their perfect bike, whether for commuting, adventure, or fitness. With expert guidance and top-tier products, we ensure an unforgettable cycling experience! 🚴‍♂️
          </p>
        </div>

        {/* Subscribe Section */}
        <div className="w-full md:w-1/3">
          <h3 className="font-bold text-lg mb-4 text-center md:text-left">Subscribe</h3>
          <div className="flex items-center border border-[#335154] p-2 rounded-lg">
            <Input
              type="email"
              placeholder="Your email address..."
              className="text-black bg-transparent border-none outline-none w-full"
            />
            <Button className="bg-transparent text-white px-4">➤</Button>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <input type="checkbox" id="policy" className="mr-2" />
            <label htmlFor="policy" className="text-gray-300">
              I agree to the <span className="text-white underline">Privacy Policy</span>.
            </label>
          </div>
          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <FaFacebookF className="text-xl cursor-pointer" />
            <FaTwitter className="text-xl cursor-pointer" />
            <FaInstagram className="text-xl cursor-pointer" />
            <FaLinkedin className="text-xl cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-gray-300">
        <p>ThemeREX © 2025. All Rights Reserved.</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-white text-sm md:text-base">
          <span>Home</span>
          <span>Shop</span>
          <span>Bikes</span>
          <span>Services</span>
          <span>Rides</span>
          <span>About Us</span>
          <span>Contacts</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
