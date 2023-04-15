import {useEffect, useState} from "react"
import {Link, useSearchParams, useLoaderData} from "react-router-dom"
import {getVans} from "../../api"

// Loader is a function which fetches the data, then we paas that function as prop to the Route of the page which needs that data and inside that page we will use an hook "useLoaderData" to get the fetched data. In this way we will not be fetching data when components mount be will fetch data and then the component will render

// Using loader to fetch the data:
export async function loader() {
  return getVans()
}

export default function Vans() {
  const vans = useLoaderData() // pulling data that loader is returning
  // console.log(vans)

  // This now we have data, we can delete a lot more code like , removing useeffect, removing loading state and the state which we useed earlier to store the vans when data was fetched

  const [searchParams, setSearchParams] = useSearchParams()

  // const [error, setError] = useState(null) // Now we have no access to this error, since our data is being fetched by loader. So we can use errorElement prop and pass it in Route of the the page

  const typeFilter = searchParams.get("type")

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() == typeFilter)
    : vans

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={`${van.id}`} state={{search: searchParams.toString()}}>
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ))

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>

      <div className="van-list-filter-buttons">
        <button
          className={`van-type simple ${
            typeFilter && typeFilter.toLowerCase() === "simple"
              ? "selected "
              : null
          } `}
          onClick={() => setSearchParams({type: "simple"})}
        >
          Simple
        </button>
        <button
          className={`van-type rugged ${
            typeFilter && typeFilter.toLowerCase() === "rugged"
              ? "selected "
              : null
          } `}
          onClick={() => setSearchParams({type: "rugged"})}
        >
          Rugged
        </button>
        <button
          className={`van-type luxury ${
            typeFilter && typeFilter.toLowerCase() === "luxury"
              ? "selected "
              : null
          } `}
          onClick={() => setSearchParams({type: "luxury"})}
        >
          Luxury
        </button>
        {typeFilter && (
          <button
            className="van-type clear-filters"
            onClick={() => setSearchParams({})}
          >
            Clear
          </button>
        )}
      </div>

      <div className="van-list">{vanElements}</div>
    </div>
  )
}
