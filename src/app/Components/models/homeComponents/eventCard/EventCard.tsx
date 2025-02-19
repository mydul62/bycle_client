import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const EventCard = () => {
  return (
    <section className="bg-gray-100 pb-16 px-4 text-center flex flex-col items-center">
    <h2 className="text-4xl font-bold text-gray-800">Don't miss</h2>
    <h3 className="text-4xl font-bold text-gray-800 mb-8">upcoming events</h3>

    <div className="bg-white shadow-lg rounded-lg w-full container p-6 flex flex-col md:flex-row items-center md:items-start">
      <div className="flex justify-center items-start md:w-3/4 text-left px-6">
        <div>
          <h4 className="text-xl font-bold text-gray-800">
            Maximum adventure race series – Blue Mountains 2019
          </h4>
          <p className="flex items-center text-sm text-gray-600 mt-2">
            <FaRegCalendarAlt className="text-red-500 mr-2" />
            Started on Jul 1, 2024 to Jun 1, 2026
          </p>
        </div>
        <div className="ml-6">
          <p className="text-sm text-gray-600 mt-4">
            The fantastic Manchester to Blue Mountains ride is a very popular event whether you're an experienced cyclist or a timid newbie. The route covers 60 miles.
          </p>
        </div>
      </div>
      <div className="md:w-1/4 text-right mt-4 md:mt-0 px-6">
        <a href="#" className="text-red-500 font-semibold">Details &rarr;</a>
      </div>
    </div>

    <Button className="bg-red-500 text-white mt-8 px-8 py-3 rounded-lg font-semibold text-lg">
      View other events
    </Button>
  </section>
  );
};

export default EventCard;
