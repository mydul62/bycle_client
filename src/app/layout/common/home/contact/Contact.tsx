import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
  <div>
    <div style={{ backgroundImage: "url('https://i.ibb.co.com/k2rdkVtn/image-6.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="h-[500px] relative">
    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[#363535b4]">
      <div className="space-y-4 mt-10">
        <h2 className="text-6xl text-white font-extrabold text-center">Contact</h2>
        <div className="flex justify-center items-center text-white">
          <Link className="hover:text-green-400" to="/">Home / </Link>
          <Link className="hover:text-green-400" to="/about"> Contact</Link>
        </div>
      </div>
    </div>
  </div>
    <div className="w-full py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="w-[90%] mx-auto flex flex-col items-center text-center">
        <h2 className="text-5xl font-extrabold text-gray-900">Contact Us</h2>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          Have questions or need assistance? Reach out to us via phone, email, or visit our store. We're here to help you with all your cycling needs.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-12 w-full max-w-5xl">
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500 text-center">
            <Phone size={32} className="text-red-500 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">Call Us</h3>
            <p className="mt-2 text-gray-600">+88-01-30210-4188</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500 text-center">
            <Mail size={32} className="text-blue-500 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">Email Us</h3>
            <p className="mt-2 text-gray-600">support@bicyclezone.com</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-green-500 text-center">
            <MapPin size={32} className="text-green-500 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">Visit Us</h3>
            <p className="mt-2 text-gray-600">123 Cycle Street, City, Country</p>
          </div>
        </div>

        <div className="mt-16 w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 text-center">Send Us a Message</h3>
          <form className="mt-6 space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" required />
            <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" required />
            <input type="text" placeholder="Subject" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" required />
            <textarea placeholder="Your Message" className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-red-500" required></textarea>
            <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}
