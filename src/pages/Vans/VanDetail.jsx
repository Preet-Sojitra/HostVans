import {useParams, Link, useLocation, useLoaderData} from "react-router-dom"
import {useEffect, useState} from "react"
import {getVans} from "../../api"

export function loader({params}) {
  // To access params from path here we have immediate access to param "params"
  // console.log(params) // Output: id from url
  return getVans(params.id)
}

export default function VanDetail() {
  // const params = useParams()
  // will use useLocation hook to catch the state that we passed from "Vans"
  const location = useLocation()
  // console.log(location)

  const van = useLoaderData()
  // console.log(van)

  // const [van, setVan] = useState(null)

  //   console.log(useState)

  // useEffect(() => {
  //   fetch(`/api/vans/${params.id}`)
  //     .then((res) => res.json())
  //     .then((data) => setVan(data.vans))
  //     .catch((err) => console.log(err))
  // }, [params.id])

  //   console.log(van)

  // if location.state exists then it will go and find search if it doesn't then it will put empty string in this way if location.state is null we will not get any bug/errors
  // This is called optional chaining
  const search = location.state?.search || ""
  // console.log(search)

  return (
    <div className="van-detail-container">
      {/* Here one problem is, if user filters and then go to detial page and then if he clicks back hen it will go back to all vans page instead of to page with filters */}

      {/* <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link> */}

      {/* and to solve this problem we will use Link State, we will pass state from Vans.jsx page and will catch it here using useLocationHook */}
      <Link to={`..?${search}`} relative="path" className="back-button">
        &larr; <span>Back to {search ? search.split("=")[1] : "all"} vans</span>
      </Link>

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
    </div>
  )
}
