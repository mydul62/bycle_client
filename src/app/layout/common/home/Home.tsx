
import HeroBottomCard from "@/app/Components/models/homeComponents/heroBottomCard/HeroBottomCard"
import BicyclingExperience from "../../../Components/models/homeComponents/heroBottomCard/bicyclingExperience/BicyclingExperience"

import EventCard from "@/app/Components/models/homeComponents/eventCard/EventCard"

import { Button } from "@/components/ui/button"
import Shop from "../../user/Shop/Shop"


const Home = () => {
  return (
    <div className="">
      <div className="relative h-[calc(100vh-100px)]" style={{ backgroundImage: 'url("/images/byclebg2.jpg")',
      backgroundPosition:"top",backgroundRepeat:'no-repeat' , backgroundSize:'cover',backgroundAttachment:'fixed'}}>
     <div className=" absolute top-0 z-10 left-0 w-full h-full   flex justify-center items-center  bg-[#0000009b]">
     <div className=" flex justify-center flex-col items-center space-y-8">
     <h2 className=" font-extrabold  text-5xl lg:text-7xl text-center text-white">Discover the joy  <br /> of cycling</h2>
     <Button size={"lg"} className=" py-8 text-lg rounded-none">Discover our service</Button>
      
     </div>
     </div>
      </div>
      <div className=" -mt-40 lg:-mt-24 ">
      <HeroBottomCard></HeroBottomCard>
      </div>
      <div>
      <BicyclingExperience></BicyclingExperience>
      </div>
      <div>
      {/* <BikeService></BikeService> */}
      </div>
      <div>
      <EventCard></EventCard>
      </div>
      <div>
      <Shop></Shop>
      </div>
    </div>
  )
}

export default Home
