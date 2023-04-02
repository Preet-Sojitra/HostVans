import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import Layout from "./components/Layout"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostLayout from "./components/HostLayout"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* This will render the layout for all the routes. First layout will render then the component matching the path will render */}
        {/* With simply h1 in layout component, it will render only that h1 for all the below routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />

          {/* Nested Route */}
          <Route path="/host" element={<HostLayout />}>
            {/* We can use relative path inside parent route. When route starts with "/" it is absoulute route */}
            {/* When we want to display component on route on which layout is render, we can add "index" as prop to show that additional component (for relative routing). Here Dashboard will be shown on "/host" route only  */}
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
