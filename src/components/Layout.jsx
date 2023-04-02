// This outlet is used to render the shared UI. It will render the layout along with the route component
import {Outlet} from "react-router-dom"
import Footer from "./Footer"

import Header from "./Header"

export default function Layout() {
  return (
    <div className="site-wrapper">
      <Header />
      <main>
        {/* Adding this will render the route component */}
        <Outlet />
      </main>
      {/* We want to display footer after the route component */}
      <Footer />
    </div>
  )
}
