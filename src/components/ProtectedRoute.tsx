import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from '../store/useAuthStore'

const ProtectedRoute = () => {
  const {  token } = useUserStore()


  if (!token) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute
