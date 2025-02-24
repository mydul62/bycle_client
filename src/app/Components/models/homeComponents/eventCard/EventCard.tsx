import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const EventCard = () => {
  return (
    <section className="bg-gray-100 pt-[50px] lg:pt-[100px] px-4 text-center flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800">Don't miss</h2>
      <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">
        Upcoming events
      </h3>

      {/* Event Card */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-4 md:p-6 flex flex-col md:flex-row items-start">
        {/* Event Info */}
        <div className="md:w-3/4 text-left">
          <h4 className="text-lg md:text-xl font-bold text-gray-800">
            Maximum adventure race series – Blue Mountains 2019
          </h4>
          <p className="flex items-center text-xs md:text-sm text-gray-600 mt-2">
            <FaRegCalendarAlt className="text-red-500 mr-2" />
            Started on Jul 1, 2024 to Jun 1, 2026
          </p>
          <p className="text-xs md:text-sm text-gray-600 mt-3">
            The fantastic Manchester to Blue Mountains ride is a very popular
            event whether you're an experienced cyclist or a timid newbie. The
            route covers 60 miles.
          </p>
        </div>

        {/* Details Link */}
        <div className="md:w-1/4 text-left md:text-right mt-4 md:mt-0">
          <a href="#" className="text-red-500 font-semibold text-sm md:text-base">
            Details &rarr;
          </a>
        </div>
      </div>

      {/* View Other Events Button */}
      <Button className="bg-red-500 text-white mt-6 md:mt-8 px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold text-sm md:text-lg">
        View other events
      </Button>
    </section>
  );
};

export default EventCard;
