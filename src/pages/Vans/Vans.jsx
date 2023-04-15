import {useEffect, useState} from "react"
import {Link, useSearchParams} from "react-router-dom"
import {getVans} from "../../api"

export default function Vans() {
  // We will use useSearchParams to get the query Parameter
  // Right here destructuring the things which are returned by useSearchParams
  const [searchParams, setSearchParams] = useSearchParams()

  // console.log(searchParams.toString())

  // searchParams has one method called "get" to access the query paramer by its name
  const typeFilter = searchParams.get("type")
  // console.log(typeFilter)

  const [vans, setVans] = useState([])
  // for handling sad path
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // There is lot more going here to handle sad path. and we need to set this up for all the pages where we are fetching data from servers. So we can see there is lot more repetition goin on here
  // All these is happening because we are loading page first and then we are doing fetch request so we need to handle edge cases
  // and that's where data layer api comes in

  // refactord useEffect code: shifted fetching in api.js so that we can implement data layer api
  useEffect(() => {
    async function loadVans() {
      // Here we haven't take into account what if server fails to respond, then in that case it will stuck on loading. So we will handle that now
      setLoading(true)
      try {
        // happy path
        const data = await getVans()
        setVans(data)
      } catch (error) {
        // sad path
        // console.log(error)
        setError(error)
      } finally {
        // whether we get vans or err we need to make loading false
        setLoading(false)
      }
    }
    loadVans()
  }, [])

  // Filtering vans
  const displayedVans = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() == typeFilter)
    : vans

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      {/* We are passing link state so that we can catch in VanDetails.jsx and go back to the filers query is user has filtered */}
      {/* Instead of doing only type we will pass whole searchParams because we might have multiple query and we need to preserve all of them */}
      {/* <Link to={`${van.id}`} state={{type: typeFilter}}> */}
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

  //   console.log(vans)

  /**
   * There is big cavet in setting the query param like this "?type=simple" or like this "setSearchParams({type: "simple"})}" because if we have exisitng query param and we click on this then exisitng query param will completely wipe off. So we need way to append to query param, instead of completing wiping it off.
   */

  // One way is with vanilla javascript which can be used with Link
  function genSearchParams(key, value) {
    // we will generate  new set of search params
    const sp = new URLSearchParams(searchParams)
    if (value == null) {
      sp.delete(key) // we will pass key that we want to delete
    } else {
      sp.set(key, value)
    }

    return `?${sp.toString()}`
  }
  /**
   * This is how it will look like and it will not remove the existing query param
   * <Link to={genSearchParam("type","simple")} className="van-type simple">
          Simple
        </Link>
   */

  // Other way is with setSearchparams, remember: setSearchParams is similar to setState, so it can take callback function where it can have access to prev query param
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value == null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }

  /**
   * With this our button will look like this
   * <button
          className={`van-type simple ${
            typeFilter && typeFilter.toLowerCase() === "simple"
              ? "selected "
              : null
          } `}
          onClick={() => handleFilterChange("type", "simple") }
        >
          Simple
        </button>
   */

  // Handling sad path
  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>There was an error: {error.message}</h1>
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>

      <div className="van-list-filter-buttons">
        {/* <Link to={"?type=simple"} className="van-type simple">
          Simple
        </Link>
        <Link to={"?type=rugged"} className="van-type rugged">
          Rugged
        </Link>
        <Link to={"?type=luxury"} className="van-type luxury">
          Luxury
        </Link>
        <Link to={"."} className="van-type clear-filters">
          Clear
        </Link> */}

        {/* Instead of directly typing harcoded link we can use setSearchParams to set the query param */}

        {/* setSearchParam can take objects as well as strings also */}
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
        {/* but for string we need to do like this but better way is using objects */}
        {/* <button
          className="van-type simple"
          // onClick={() => setSearchParams("?type=simple")}
          // or
          onClick={() => setSearchParams("type=simple")}
        >
          Simple
        </button> */}
      </div>

      <div className="van-list">{vanElements}</div>
    </div>
  )
}
