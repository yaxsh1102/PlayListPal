import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

const Layout =()=>{
    return (
        <div className="flex">
      <Sidebar />
      <div className="ml-60 w-full">
        <Outlet/>
      </div>
    </div>
    )
}

export default Layout;