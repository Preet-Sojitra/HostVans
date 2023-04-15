import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Vans, {loader as vansLoader} from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import Layout from "./components/Layout"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostLayout from "./components/HostLayout"
import HostVans from "./pages/Host/HostVans"
import HostVanDetail from "./pages/Host/HostVanDetail"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import HostVanInfo from "./pages/Host/HostVanInfo"
import NotFound from "./pages/NotFound"
import Error from "./components/Error"

// Since we will be using DataLayer API and BrowserRouter does not support it we need to use createBroweser Router and needs to change the setup

const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<Error />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/vans"
        element={<Vans />}
        // we can use errorElement to show the error when any error occurs either in our component or in our loader function
        // errorElement={<Error />}
        // we can pass errorElement on the top level also, by doing this any error which occurs in the most nested route will also be handeled
        loader={vansLoader}
      />
      <Route path="/vans/:id" element={<VanDetail />} />

      <Route path="/host" element={<HostLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />
        <Route path="reviews" element={<Reviews />} />

        <Route path="vans" element={<HostVans />} />
        <Route path="vans/:id" element={<HostVanDetail />}>
          <Route index element={<HostVanInfo />} />
          <Route path="pricing" element={<HostVanPricing />} />
          <Route path="photos" element={<HostVanPhotos />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={browserRouter} />
}
