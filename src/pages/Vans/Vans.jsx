import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom"
import { getVans } from "../../api"
import React from "react"

export function loader() {
  // Defer means we are deferring the data fetching, we are not fetching the data right now, we are deferring it, we are telling the loader that we will fetch the data later, so we are deferring the data fetching.
  // Previously we were using loaders to fetch data, what they does is it fetches the data and then it renders the page, but now we are deferring the data fetching, so it will not fetch the data and then render the page, but it will render the page and then fetch the data.
  // Defer takes a object as parameter and that object has a property called "vans". This "vans" can be accessed using useLoaderData() hook
  return defer({ vans: getVans() })
}

export default function Vans() {
  const dataPromise = useLoaderData()
  // console.log(dataPromise);

  const [searchParams, setSearchParams] = useSearchParams()

  const typeFilter = searchParams.get("type")

  function renderVanElements(vans) {
    // console.log(vans)

    const displayedVans = typeFilter
      ? vans.filter((van) => van.type.toLowerCase() == typeFilter)
      : vans

    const vanElements = displayedVans.map((van) => (
      <div key={van.id} className="van-tile">
        <Link to={`${van.id}`} state={{ search: searchParams.toString() }}>
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
      <>
        <div className="van-list-filter-buttons">
          <button
            className={`van-type simple ${
              typeFilter && typeFilter.toLowerCase() === "simple"
                ? "selected "
                : null
            } `}
            onClick={() => setSearchParams({ type: "simple" })}
          >
            Simple
          </button>
          <button
            className={`van-type rugged ${
              typeFilter && typeFilter.toLowerCase() === "rugged"
                ? "selected "
                : null
            } `}
            onClick={() => setSearchParams({ type: "rugged" })}
          >
            Rugged
          </button>
          <button
            className={`van-type luxury ${
              typeFilter && typeFilter.toLowerCase() === "luxury"
                ? "selected "
                : null
            } `}
            onClick={() => setSearchParams({ type: "luxury" })}
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
      </>
    )
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      {/*
  React Suspense is used to show a fallback UI while waiting for a promise to resolve, or to defer rendering part of a tree until some condition is met (for example, data from an endpoint has been loaded).
  * Fallback UI: It is the UI that we want to show while the data is being fetched
 */}
      <React.Suspense fallback={<h2>Loading Vans...</h2>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </React.Suspense>
    </div>
  )
}
