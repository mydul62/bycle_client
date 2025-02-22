
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A3A] text-white py-12 px-6 md:px-20 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Useful Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Useful links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>› About us</li>
            <li>› Our community</li>
            <li>› Local events</li>
            <li>› Privacy policy</li>
            <li>› Service plus</li>
          </ul>
        </div>

        {/* Our Shop */}
        <div>
          <h3 className="font-bold text-lg mb-4">Our shop</h3>
          <ul className="space-y-2 text-gray-300">
            <li>› Bikes & parts</li>
            <li>› Clothing</li>
            <li>› Bikes for rent</li>
            <li>› Booking form</li>
          </ul>
        </div>

        {/* Sitemap */}
        <div>
          <h3 className="font-bold text-lg mb-4">Sitemap</h3>
          <ul className="space-y-2 text-gray-300">
            <li>› Home</li>
            <li>› Features</li>
            <li>› Shop</li>
            <li>› News</li>
            <li>› Contacts</li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="font-bold text-lg mb-4">Subscribe</h3>
          <div className="flex items-center  border border-[#335154] p-2 rounded-lg">
            <Input type="email" placeholder="Your email address..." className="text-black  bg-transparent border-none outline-none" />
            <Button className=" bg-transparent text-white px-4">➤</Button>
          </div>
          <div className="flex items-center mt-4">
            <input type="checkbox" id="policy" className="mr-2" />
            <label htmlFor="policy" className="text-gray-300 text-sm">
              I agree to the <span className="text-white underline">Privacy Policy</span>.
            </label>
          </div>
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-6">
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
        <div className="flex flex-wrap justify-center gap-6 mt-4 text-white">
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
