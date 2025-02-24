
import HeroBottomCard from "@/app/Components/models/homeComponents/heroBottomCard/HeroBottomCard"
import BicyclingExperience from "../../../Components/models/homeComponents/heroBottomCard/bicyclingExperience/BicyclingExperience"

import EventCard from "@/app/Components/models/homeComponents/eventCard/EventCard"

import { Button } from "@/components/ui/button"
import Shop from "../../user/Shop/Shop"
import { Link } from "react-router-dom"
import { GiShoppingBag } from "react-icons/gi"
import { Phone } from "lucide-react"
import { setOpen } from "@/app/redux/api/features/drowerSlice"
import { useAppDispatch, useAppSelector } from "@/app/redux/hook"


const Home = () => {
  const dispatch = useAppDispatch()
    const carts = useAppSelector((state) => state.Product.items);
  return (
    <div className="">
      <div className="relative min-h-[600px] lg:h-[calc(100vh-100px)]" style={{ backgroundImage: 'url("/images/byclebg2.jpg")',
      backgroundPosition:"top",backgroundRepeat:'no-repeat' , backgroundSize:'cover',backgroundAttachment:'fixed'}}>
     <div className=" absolute top-0 z-10 left-0 w-full h-full   flex justify-center items-center  bg-[#0000009b]">
     <div className=" flex justify-center flex-col items-center space-y-8">
     <h2 className=" font-extrabold  text-3xl lg:text-5xl text-center text-white">Discover the joy  <br /> of cycling</h2>
     <Link to="/"><Button  size={"sm"} className=" py-6 text-lg rounded-none">Discover our service</Button></Link>
      
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
      
      <div>
       {/* Floating Action Buttons */}
       <div className="fixed z-40 bg-[#1E3A3A] py-6 px-2 top-[30%] -translate-y-[30%] right-0 flex flex-col gap-6">
       <div onClick={()=>{
                       dispatch(setOpen())
                      }}  className="relative cursor-pointer">
            <GiShoppingBag color="white" size={30} />
              <span className="absolute -top-1 -right-1 bg-[#1b3e41] text-white text-xs px-2 py-1 rounded-full">
                {carts?.length || 0}
              </span>
     
          </div>
       <Link to="https://wa.me/1302104188"> <div className="bg-none">
          <Phone size={30} color="white" />
        </div></Link>
      
      </div>
      <div>
     
      </div>
      </div>
    </div>
  )
}

export default Home
