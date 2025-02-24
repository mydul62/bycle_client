import { Outlet } from "react-router-dom"
import Navbar from "./app/Components/shared/navbar/Navbar"
import Footer from "./app/Components/models/homeComponents/footer/Footer"
import CartView from "./app/Components/viewCardDrowe/CartView"



function App() {

  return (
    <>
     <Navbar></Navbar>
     <div className=" min-h-screen">
     <Outlet></Outlet>
     </div>
     <Footer></Footer>
     <CartView></CartView>
    </>
  )
}

export default App
