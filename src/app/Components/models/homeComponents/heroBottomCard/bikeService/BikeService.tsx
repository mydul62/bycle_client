

const BikeService = () => {
  return (
    <div className="relative bg-[#1c313a] text-white px-10 py-16 flex items-center">
      <div className="w-1/2">
        <h1 className="text-5xl font-bold">Bike service & repair</h1>
        <div className="mt-6">
          <p className="text-red-500 font-bold">01. Tune-ups & builds</p>
          <p className="text-gray-300">We have all the necessary parts to create a bike that fits you perfectly</p>
        </div>
        <div className="mt-4">
          <p className="text-red-500 font-bold">02. Personal bike fit</p>
          <p className="text-gray-300">Adjustment of height, pedals, handlebar for the most comfortable ride</p>
        </div>
        <div className="mt-4">
          <p className="text-red-500 font-bold">03. Adjust & install</p>
          <p className="text-gray-300">Need a bike repair? We offer a range of spare parts and quality service</p>
        </div>
        <div className="mt-4">
          <p className="text-red-500 font-bold">04. Free delivery</p>
          <p className="text-gray-300">Choose a bike at our shop and get free delivery to any location in the city</p>
        </div>
      </div>
      <div className="w-1/2 flex justify-end">
        <img
          src="https://i.ibb.co/FLW5mh0w/mahim1-1.png"
          alt="Bike"
          className="max-w-xl drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default BikeService;
