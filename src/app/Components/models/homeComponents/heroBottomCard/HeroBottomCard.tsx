import { FaMapMarkerAlt } from "react-icons/fa";

const HeroBottomCard = () => {
  return (
    <div style={{ backgroundImage: 'url("/images/map.png")', backgroundRepeat:'no-repeat' , backgroundSize:'cover'}} className="absolute left-[50%] l -translate-x-[50%] z-40  w-[94%] mx-auto  flex flex-col md:flex-row bg-gray-200    ">
    {/* Left Section - Map and Address */}
    <div className="flex-1  text-white   lg:p-12  py-12 px-4 flex flex-col justify-center  md:rounded-r-none">
      <div className="flex items-center mb-2">
        <FaMapMarkerAlt className="text-red-500 text-xl mr-2" />
        <span className="font-bold text-2xl">326 South 8th Ave, New York</span>
      </div>
      <a href="#" className="text-gray-300 hover:underline">Get directions &rarr;</a>
    </div>
    
    {/* Right Section - Subscription Form */}
    <div className="flex-1 bg-white  lg:p-12  py-12 px-4 md:rounded-l-none shadow-md">
      <div className="flex border border-gray-300  overflow-hidden">
        <input
          type="email"
          placeholder="Your email address..."
          className="flex-1 p-3 border-none outline-none"
        />
        <button className="bg-teal-900 text-white px-6 py-3">Subscribe now</button>
      </div>
      <div className="flex items-center mt-4">
        <input type="checkbox" id="privacy" className="mr-2" />
        <label htmlFor="privacy" className="text-gray-600 text-sm">
          I agree to the <a href="#" className="text-red-500 underline">Privacy Policy.</a>
        </label>
      </div>
    </div>
  </div>
  )
}

export default HeroBottomCard
