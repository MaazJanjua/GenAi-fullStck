import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { Toaster } from "react-hot-toast";

import './index.css'
const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false}/>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App 
