import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Vans, {loader as vansLoader} from "./pages/Vans/Vans"
import VanDetail, {loader as vanDetailLoader} from "./pages/Vans/VanDetail"
import Layout from "./components/Layout"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostLayout from "./components/HostLayout"
import HostVans, {loader as hostVansLoader} from "./pages/Host/HostVans"
import HostVanDetail, {
  loader as hostVanDetailLoader,
} from "./pages/Host/HostVanDetail"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import HostVanInfo from "./pages/Host/HostVanInfo"
import NotFound from "./pages/NotFound"
import Error from "./components/Error"
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login"
import {requireAuth} from "./utils"

// Since we will be using DataLayer API and BrowserRouter does not support it we need to use createBroweser Router and needs to change the setup

const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<Error />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route
        path="/vans"
        element={<Vans />}
        // we can use errorElement to show the error when any error occurs either in our component or in our loader function
        // errorElement={<Error />}
        // we can pass errorElement on the top level also, by doing this any error which occurs in the most nested route will also be handeled
        loader={vansLoader}
      />
      <Route
        path="/vans/:id"
        element={<VanDetail />}
        loader={vanDetailLoader}
      />

      <Route path="/host" element={<HostLayout />}>
        {/**
         * We will have to add loader to every host route (protected route) because the loader runs in parallel and that's why it is one of the current downside.
         */}
        <Route
          index
          element={<Dashboard />}
          loader={async ({request}) => await requireAuth(request)}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async ({request}) => await requireAuth({request})}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({request}) => await requireAuth(request)}
        />

        <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({request}) => await requireAuth(request)}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({request}) => await requireAuth(request)}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({request}) => await requireAuth(request)}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={browserRouter} />
}
