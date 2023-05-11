// import {redirect} from "react-router-dom"
import {redirect} from "./redirectUtil.js"

export async function requireAuth(request) {
  const path = new URL(request.url).pathname
  // console.log(path)

  // Fake authentication
  const isLoggedIn = localStorage.getItem("loggedIn") || false

  if (!isLoggedIn) {
    throw redirect(`/login?message=You must login first&redirectTo=${path}`)
  }
  return null
}
