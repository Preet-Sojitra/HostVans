import React from "react"
import {
  useNavigate,
  useLoaderData,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom"
import {redirect} from "../redirectUtil"
import {loginUser} from "../api"
/**
 * For protected routes normal way:
 * 1. We will create one parent layout route and put element as AuthRequiredLayout or whatever. Then we will put all protected routes as children inside that route. Now in Layout route we will check if user logged in then we will return the outlet else we will navigate user to login page.
 *
 */

/**
 * For protected routes using Loaders:
 * 1. We will use redirect()
 * 2. Appproach: If user isn't logged in, redirect to Login page when protected route loaders run, before any route rendering happens
 * (Current) downside: needs to happen in every protected route's loader
 */

/**
 * React Router provides `Form` component which handles the form states and submission on its own just like we do normal html form submission. We now no longer need to use stats and functions to handle data and submission.
 * Just like we have `action` attribute in html form, in `Form` also we have `action` but it is the fuction that we will write to handle the form submission. It written similar way as we write `lodaer` functions.
 * This action function will be passed as prop to the `Route` component of the page where we want to use `Form` component just like loader function.
 */

export function loader({request}) {
  return new URL(request.url).searchParams.get("message")
}

// Similar to loader action also has access to `request` object and `params` object
export async function action({request}) {
  // console.log("I am form action")
  // console.log(request)
  const formData = await request.formData() // This will give us the form data. It is basically a promise, so we will have to await it
  const email = formData.get("email")
  const password = formData.get("password")
  // console.log(email, password)

  const path = new URL(request.url).searchParams.get("redirectTo") || "/host"

  // Calling loginUser function from api
  try {
    const data = await loginUser({email, password})
    localStorage.setItem("loggedIn", true)
    // console.log(data)
    throw redirect(path)
  } catch (error) {
    return error
  }

  // return null
}

export default function Login() {
  const message = useLoaderData()

  //Just like we have useLoaderData() to get the data from loader function, we have useActionData() to get the data from action function
  const error = useActionData()
  // console.log(error)

  /**
   * This hook tells you everything you need to know about a page navigation to build pending navigation indicators and optimistic UI on data mutations.
   * Things like:
   * Global loading indicators
   * Disabling forms while a mutation is happening
   * Adding busy indicators to submit buttons
   * Optimistically showing a new record while it's being created on the server
   * Optimistically showing the new state of a record while it's being updated
   */
  const navigation = useNavigation()
  // console.log(navigation)
  // console.log(navigation.state)

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {error && <h3 className="red">{error.message}</h3>}
      {/* Form with react-router similar to html */}
      <Form
        method="post"
        className="login-form"
        replace // Form submission is considered as navigation event. So when we login and it is being redirected to "/host" it will replace that "/login" in the history stack with the "/host" and when we click back button it will take us to the page before "/login" page (means to the page we were on before "/login" page)
      >
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging In..." : "Log In"}
        </button>
      </Form>
    </div>

    /* Old way react form */
    /* All functions for maintaing form state in react style */
    /*
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const [loginFormData, setLoginFormData] = React.useState({
      email: "",
      password: "",
    })

    function handleSubmit(e) {
      e.preventDefault()
      setStatus("submitting")
      setError(null)
      loginUser(loginFormData)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
          setError(err)
        })
        .finally(() => {
          setStatus("idle")
        })
    }

    function handleChange(e) {
      const {name, value} = e.target
      setLoginFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
    */

    /* 
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging In..." : "Log In"}
        </button>
      </form> 
      */
  )
}
