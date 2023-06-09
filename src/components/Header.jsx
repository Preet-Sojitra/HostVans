import {Link, NavLink} from "react-router-dom"

export default function Header() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  }

  function fakeLogOut() {
    localStorage.removeItem("loggedIn")
  }

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        {/* When we need to show the styling to the current page we are on then we can use NavLink, it takes className or styles as props and in that prop we pass in a function which return the classname or the styles */}
        <NavLink
          to="/host"
          // This classname takes function and inside that function it takes object as parameter, here we care about "isActive" property, so we destructure it right there and return the classname "active-link" is "isActive" is true
          // className={({isActive}) => (isActive ? "active-link" : null)}
          style={({isActive}) => (isActive ? activeStyle : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          // className={({isActive}) => (isActive ? "active-link" : null)}
          style={({isActive}) => (isActive ? activeStyle : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          // className={({ isActive }) => (isActive ? "active-link" : null)}
          style={({isActive}) => (isActive ? activeStyle : null)}
        >
          Vans
        </NavLink>
        <Link to="login" className="login-link">
          <img src="/assets/images/avatar.png" className="login-icon" />
        </Link>
        <button onClick={fakeLogOut}>X</button>
      </nav>
    </header>
  )
}
