import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function BicyclingExperience() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-gray-100 mt-24 lg:mt-0">
      <div className="container mx-auto w-[90%] flex gap-5 py-[150px] pt-[300px] flex-col md:flex-row items-center rounded-lg">
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The best bicycling experience
          </h2>
          <p className="text-gray-700 mb-6">
            Welcome to Yokoo! We are one of the biggest bicycle-families in the world.
            Our services include all types of repair, search of a perfect bike for every customer,
            sport events organization, and much more. Join our community and become a part of the bike-family.
          </p>
          <button className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition">
            More about our mission
          </button>
        </div>

        {/* Video Section with Modal */}
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center relative">
          <img
            src="https://yokoo.themerex.net/wp-content/uploads/2019/09/image-copyright-2.jpg"
            alt="Bicycling Experience"
            className="rounded-lg shadow-lg w-full max-w-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="bg-white hover:bg-red-400  p-3 rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-800"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
                  </svg>
                </button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-2xl bg-white p-0">
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/PH-kqdzTgqE?si=5tkrD5UGNtXDhEf0&autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
