import { Outlet } from "react-router-dom"
import Layout from "./Layout"

const DashboardLayout = () => {
  return (
    <div>
      <Layout>
      <Outlet></Outlet>
      </Layout>
    </div>
  )
}

export default DashboardLayout
