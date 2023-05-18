import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom"
import { Suspense } from "react"
import { getVans } from "../../api"

export function loader({ params }) {
  return defer({ van: getVans(params.id) })
}

export default function VanDetail() {
  const location = useLocation()
  // console.log(location)

  const dataPromise = useLoaderData()

  // if location.state exists then it will go and find search if it doesn't then it will put empty string in this way if location.state is null we will not get any bug/errors
  // This is called optional chaining
  const search = location.state?.search || ""
  // console.log(search)

  return (
    <div className="van-detail-container">
      <Link to={`..?${search}`} relative="path" className="back-button">
        &larr; <span>Back to {search ? search.split("=")[1] : "all"} vans</span>
      </Link>

      <Suspense fallback={<h2>Loading Van...</h2>}>
        <Await resolve={dataPromise.van}>
          {(van) => (
            <div className="van-detail">
              <img src={van.imageUrl} />
              <i className={`van-type ${van.type} selected`}>{van.type}</i>
              <h2>{van.name}</h2>
              <p className="van-price">
                <span>${van.price}</span>/day
              </p>
              <p>{van.description}</p>
              <button className="link-button">Rent this van</button>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  )
}
