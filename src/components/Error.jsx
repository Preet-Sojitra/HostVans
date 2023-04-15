import {useRouteError} from "react-router-dom"

export default function Error() {
  // useRouteError is a special utility hook which we can use to get the details about the error

  const error = useRouteError()
  //   console.log(error)

  return (
    <>
      <h1>Error: {error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>
    </>
  )
}
