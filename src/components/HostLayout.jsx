import {Outlet, Link, NavLink} from "react-router-dom"

export default function HostLayout() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  }

  // instead of classname we can also use inline styling, only change is this time we have to return the styles object instead of classname string

  return (
    <>
      <nav className="host-nav">
        <NavLink
          // to="/host"
          // When we are on "/host" and we want to redirect to "/host" we can simply use "." to represent the current path
          to="."
          style={({isActive}) => (isActive ? activeStyle : null)}
          // currently bug is, if we go to /host/income, it will highlist both dashboard and income, because both paths are matching, to avoid this we will use "end" prop to tell to end the matching here
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          // to="/host/income"
          // Since our host layout is getting renderd on "/host" then for its nested route we can remove "/host/income" and can directly write "income"
          to="income"
          style={({isActive}) => (isActive ? activeStyle : null)}
        >
          Income
        </NavLink>
        <NavLink
          // to="/host/vans"
          to="vans"
          style={({isActive}) => (isActive ? activeStyle : null)}
        >
          Vans
        </NavLink>
        <NavLink
          // to="/host/reviews"
          to="reviews"
          style={({isActive}) => (isActive ? activeStyle : null)}
        >
          Reviews
        </NavLink>
      </nav>

      <Outlet />
    </>
  )
}
