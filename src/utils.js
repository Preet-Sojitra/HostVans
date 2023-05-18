// import {redirect} from "react-router-dom"
import {redirect} from "./redirectUtil.js"

export async function requireAuth(request) {
  // console.log(request.url);
  const path = new URL(request.url).pathname
  
  // Fake authentication
  const isLoggedIn = localStorage.getItem("loggedIn") || false

  if (!isLoggedIn) {
    throw redirect(`/login?message=You must login first&redirectTo=${path}`)
  }
  return null
}
