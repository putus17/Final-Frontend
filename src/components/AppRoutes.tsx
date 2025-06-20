import { Routes, Route } from "react-router-dom"

import Login from "../layout/Login"
import UserManagement from "../layout/UserManagement"
import ProtectedRoute from "./ProtectedRoute"
import Dashboard from "../layout/Dashboard"
// import DzongkhagDashboard from "./DzongkhagDashboard"
import Dzongkhag from "../layout/Dzongkhags"
import Gewog from "../layout/Gewog"
import NotFoundPage from "../layout/PageNotFound"
import HomePage from "../layout/Home"

const AppRoute = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adduser" element={<UserManagement />} />         
          <Route path="/alldzongkhag" element={<Dzongkhag/>}/>
          <Route path="/allgewog" element={<Gewog/>}/>

          
        </Route>
       <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default AppRoute
