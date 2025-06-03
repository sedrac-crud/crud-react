import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        Login
      </NavLink>
      <Button>Click me</Button>
    </div>
  )
}

export default App