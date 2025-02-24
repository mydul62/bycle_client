
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div>
     <div style={{ backgroundImage: "url('https://i.ibb.co.com/k2rdkVtn/image-6.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="h-[300px] md:h-[400px] lg:h-[500px] relative">
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[#363535b4]">
          <div className="space-y-4 mt-10">
            <h2 className="text-6xl text-white font-extrabold text-center">About</h2>
            <div className="flex justify-center items-center text-white">
              <Link className="hover:text-green-400" to="/">Home /</Link>
              <Link className="hover:text-green-400" to="/about">About</Link>
            </div>
          </div>
        </div>
      </div>
       <div className="w-full py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="w-[90%] mx-auto flex flex-col items-center text-center">
        <h2 className="text-5xl font-extrabold text-gray-900">About Bicycle Zone</h2>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          At Bicycle Zone, we believe in the power of cycling to transform lives. Our mission is to provide premium bicycles and accessories that cater to all riders, from beginners to professionals. Experience top-quality products, expert services, and a passionate community that shares your love for cycling.
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-12 w-full max-w-5xl">
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500">
            <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
            <p className="mt-4 text-gray-600">
              We are dedicated to fostering a healthy and eco-friendly lifestyle by offering top-notch bicycles, exceptional customer service, and expert maintenance support. Whether you ride for fitness, commuting, or adventure, we have something for you.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500">
            <h3 className="text-2xl font-semibold text-gray-800">Why Choose Us?</h3>
            <p className="mt-4 text-gray-600">
              With a carefully curated selection of high-performance bikes, competitive pricing, and a customer-first approach, Bicycle Zone ensures a seamless cycling experience. Our experts are always ready to guide you in choosing the perfect ride.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center gap-6 bg-white p-8 rounded-lg shadow-lg border-t-4 border-green-500 w-full max-w-4xl">
          <div className="bg-green-500 rounded-full p-5">
            <Phone size={28} color="white" />
          </div>
          <div className="text-lg font-semibold text-gray-800">
            Have questions? Contact our support team at <span className="text-red-500">+88-01-30210-4188</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default About
