import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Login from './Login.tsx'
import Detalhes from './Detalhes.tsx'
import MinhasReservas from './MinhasReservas.tsx'
import AdminLogin from './admin/AdminLogin.tsx';   
import AdminLayout from './admin/AdminLayout.tsx';
import AdminDashboard from './admin/AdminDashboard.tsx';    
import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true, element: <AdminDashboard />
      }
    ]
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'detalhes/:ferramentaId', element: <Detalhes /> },
      { path: 'minhasReservas', element: <MinhasReservas /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)