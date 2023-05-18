import { Suspense } from "react"
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"

export async function loader({ params, request }) {
  // console.log(params)
  await requireAuth(request)
  return defer({ currentVan: getHostVans(params.id) })
}

export default function HostVanDetail() {
  const dataPromise = useLoaderData()

  // const {id} = useParams()

  // const [currentVan, setCurrentVan] = useState(null)

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  }

  return (
    <>
      <section>
        <Link
          //   ".." will not take us back one level up, but takes bake to parent route, here parent is "/host", so it will take to "/host"
          //   to=".."
          // to solve this we will use "relative" prop
          to=".."
          relative="path" // this tells that we want relative path, and then go one back according to path and not parent
          className="back-button"
        >
          &larr; <span>Back to all vans</span>
        </Link>
        <Suspense fallback={<h2>Loading Van...</h2>}>
          <Await resolve={dataPromise.currentVan}>
            {(currentVan) => (
              <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                  <img src={currentVan.imageUrl} />
                  <div className="host-van-detail-info-text">
                    <i className={`van-type van-type-${currentVan.type}`}>
                      {currentVan.type}
                    </i>
                    <h3>{currentVan.name}</h3>
                    <h4>${currentVan.price}/day</h4>
                  </div>
                </div>
                <nav className="host-van-detail-nav">
                  <NavLink
                    to="."
                    end
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                  >
                    Details
                  </NavLink>
                  <NavLink
                    to="pricing"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                  >
                    Pricing
                  </NavLink>
                  <NavLink
                    to="photos"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                  >
                    Photos
                  </NavLink>
                </nav>

                {/* We are fetching data here, and the childrens which needs data are renderd by Outlet so we need way to pass that data to child and it is done by Outlet context */}
                <Outlet context={currentVan} />
              </div>
            )}
          </Await>
        </Suspense>
      </section>
    </>
  )
}
